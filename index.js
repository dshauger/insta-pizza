'use strict';

/**
 * This is a sample Lambda function that sends an Email on click of a
 * button. It creates a SNS topic, subscribes an endpoint (EMAIL)
 * to the topic and publishes to the topic.
 *
 * Follow these steps to complete the configuration of your function:
 *
 * 1. Update the email environment variable with your email address.
 * 2. Enter a name for your execution role in the "Role name" field.
 *    Your function's execution role needs specific permissions for SNS operations
 *    to send an email. We have pre-selected the "AWS IoT Button permissions"
 *    policy template that will automatically add these permissions.
 */

const AWS = require('aws-sdk');
var pizzapi = require('dominos');

const EMAIL = process.env.email;
const PHONE = process.env.phone;
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });


const options = { ID: 1714};
var myStore = new pizzapi.Store(options);

function isLarge(menuItem) {
  return Object.keys(menuItem)[0].includes('Large');
}

function findExistingSubscription(topicArn, nextToken, cb) {
    const params = {
        TopicArn: topicArn,
        NextToken: nextToken || null,
    };
    SNS.listSubscriptionsByTopic(params, (err, data) => {
        if (err) {
            console.log('Error listing subscriptions.', err);
            return cb(err);
        }
        const subscription = data.Subscriptions.filter((sub) => sub.Protocol === 'email' && sub.Endpoint === EMAIL)[0];
        if (!subscription) {
            if (!data.NextToken) {
                cb(null, null); // indicate that no subscription was found
            } else {
                findExistingSubscription(topicArn, data.NextToken, cb); // iterate over next token
            }
        } else {
            cb(null, subscription); // a subscription was found
        }
    });
}

/**
 * Subscribe the specified EMAIL to a topic.
 */
function createSubscription(topicArn, cb) {
    // check to see if a subscription already exists
    findExistingSubscription(topicArn, null, (err, res) => {
        if (err) {
            console.log('Error finding existing subscription.', err);
            return cb(err);
        }
        if (!res) {
            // no subscription, create one
            // const params = {
            //     Protocol: 'email',
            //     TopicArn: topicArn,
            //     Endpoint: EMAIL,
            // };

            const params = {
                Protocol: 'sms',
                // TopicArn: topicArn,
                PhoneNumber: PHONE,
            };
            SNS.subscribe(params, (subscribeErr) => {
                if (subscribeErr) {
                    console.log('Error setting up email subscription.', subscribeErr);
                    return cb(subscribeErr);
                }
                // subscription complete
                console.log(`Subscribed ${EMAIL} to ${topicArn}.`);
                cb(null, topicArn);
            });
        } else {
            // subscription already exists, continue
            cb(null, topicArn);
        }
    });
}

/**
 * Create a topic.
 */
function createTopic(topicName, cb) {
    SNS.createTopic({ Name: topicName }, (err, data) => {
        if (err) {
            console.log('Creating topic failed.', err);
            return cb(err);
        }
        const topicArn = data.TopicArn;
        console.log(`Created topic: ${topicArn}`);
        console.log('Creating subscriptions.');
        createSubscription(topicArn, (subscribeErr) => {
            if (subscribeErr) {
                return cb(subscribeErr);
            }
            // everything is good
            console.log('Topic setup complete.');
            cb(null, topicArn);
        });
    });
}
exports.handler = (event, context, callback) => {
    console.log('Received event:', event.clickType);


    if(event.clickType === 'DOUBLE') {
      console.log('DOUBLE CLICK PIZZA');
      myStore.getFriendlyNames(
        (menu) => {
          const largeItems = menu.result.filter((menuItem) => isLarge(menuItem));
          console.log(largeItems);
        }
      )
    }
    // create/get topic
    createTopic('aws-iot-button-sns-topic', (err, topicArn) => {
        if (err) {
            return callback(err);
        }
        console.log(`Publishing to topic ${topicArn}`);
        // publish message
        const params = {
            Message: `${event.serialNumber} -- processed by Pizza Party\nBattery voltage: ${event.batteryVoltage} \n Hello from your IoT Button ${event.serialNumber}: ${event.clickType}`,
            PhoneNumber: PHONE,
            // Subject: `Hello from your IoT Button ${event.serialNumber}: ${event.clickType}`,
            // TopicArn: topicArn,
        };
        // result will go to function callback
        SNS.publish(params, callback);
    });
};

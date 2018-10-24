var pizzapi = require('dominos');
const util = require('util');


const handTossedAllMeatPizzaCode = '14SCMEATZA';

// pizzapi.Util.findNearbyStores(
//     '2002 27th Street, Des Moines, IA, 50310',
//     'Delivery',
//     function(storeData){
//         console.log(util.inspect(storeData, false, null, true));
//     }
// );
const options = { ID: 1714};
var myStore = new pizzapi.Store(options);

function isLarge(menuItem) {
  return Object.keys(menuItem)[0].includes('Large');
}

myStore.getFriendlyNames(
  (menu) => {
    const largeItems = menu.result.filter((menuItem) => isLarge(menuItem));
    console.log(largeItems);
  }
)

// Setup your Address
var myAddress = new pizzapi.Address(
        {
            Street: '2002 27th Street',
            City: 'Des Moines',
            Region: 'IA',
            PostalCode: '50310'
        }
    );

// Setup your Customer
var myCustomer = new pizzapi.Customer(
    {
        firstName: 'Barack',
        lastName: 'Obama',
        address: myAddress,
        phone: '1238675309',
        email: 'barack@whitehouse.gov'
    }
);

// Setup your Credit Card Info
var cardNumber='4100123422343234';// Valid but fake credit card
// var cardInfo = new pizzapi.order.PaymentObject();
// cardInfo.Amount = order.Amounts.Customer;
// cardInfo.Number = cardNumber;
// cardInfo.CardType = order.validateCC(cardNumber);
// cardInfo.Expiration = '0115';//  01/15 just the numbers "01/15".replace(/\D/g,'');
// cardInfo.SecurityCode = '777';
// cardInfo.PostalCode = '90210'; // Billing Zipcode
//
// order.Payments.push(cardInfo);

// function orderDominos(event, context) {
//   var clickType = event.clickType;
//   switch(clickType.toLowerCase()) {
//     case "single": {
//       // Setup your Default Order
//       // 14SCREEN = Large (14") Hand Tossed Pizza Whole: Cheese
//       order.addItem(
//           new pizzapi.Item(
//               {
//                   code: '14SCREEN',
//                   options: {},
//                   quantity: 1
//               }
//           )
//       );
//       break;
//     }
//     case "double": {
//         order.addItem(
//           new pizzapi.Item(
//               {
//                   code: '14SCREEN',
//                   options: {},
//                   quantity: 2
//               }
//           )
//       );
//       break;
//     }
//     case "long": {
//         order.addItem(
//           new pizzapi.Item(
//               {
//                   code: '14SCREEN',
//                   options: {},
//                   quantity: 3
//               }
//           )
//       );
//       break;
//     }
//   }
//   //Validate, price, and place order!
//   order.validate(
//       function(result) {
//           console.log("Order is Validated");
//       }
//   );
//   order.price(
//       function(result) {
//             console.log("Order is Priced");
//       }
//   );
//   order.place(
//       function(result) {
//           console.log("Price is", result.result.Order.Amounts, "\nEstimated Wait Time",result.result.Order.EstimatedWaitMinutes, "minutes");
//           console.log("Order placed!");
//           context.succeed(event);
//       }
//   );
// }
//
// exports.handler = orderDominos;

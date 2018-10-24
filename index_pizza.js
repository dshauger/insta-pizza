var pizzapi = require('dominos');
const util = require('util');


const handTossedAllMeatPizzaCode = '14SCMEATZA';


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

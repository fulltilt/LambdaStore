const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
const rp = require("minimal-request-promise");

function createOrder(request) {
  if (!request || !request.pizza || !request.address)
    throw new Error(
      "To order pizza please provide pizza type and address where pizza should be delivered"
    );

  return rp
    .post("https://some-like-it-hot.effortless-serverless.com/delivery", {
      headers: {
        Authorization: "aunt-marias-pizzeria-1234567890",
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        pickupTime: "15.34pm",
        pickupAddress: "Aunt Maria Pizzeria",
        deliveryAddress: request.address,
        webhookUrl:
          "https://agahhfd682.execute-api.us-west-1.amazonaws.com/latest/delivery"
      })
    })
    .then(rawResponse => JSON.parse(rawResponse.body))
    .then(response => {
      return docClient
        .put({
          TableName: "pizza-orders",
          Item: {
            orderId: response.deliveryId,
            pizza: request.pizza,
            address: request.address,
            orderStatus: "pending"
          }
        })
        .promise();
    })
    .then(res => {
      console.log("Order is saved!", res);
      return res;
    })
    .catch(err => {
      console.log(`Oops, order is not saved :(`, error);
      throw err;
    });
}

module.exports = createOrder;

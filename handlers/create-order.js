const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

function createOrder(request) {
  if (!request || !request.pizza || !request.address)
    throw new Error(
      "To order pizza please provide pizza type and address where pizza should be delivered"
    );

  return docClient
    .put({
      TableName: "pizza-orders",
      Item: {
        orderId: "some-id",
        pizza: request.pizza,
        address: request.address,
        orderStatus: "pending"
      }
    })
    .promise()
    .then(res => {
      console.log("Order is saved!", res);
      return res;
    })
    .catch(err => {
      console.log(`Oops, order is not save :(`, error);
      throw err;
    });
}

module.exports = createOrder;

"use strict";

/*
export AWS_PROFILE=[username]
*/
const Api = require("claudia-api-builder");
const api = new Api();

const getPizzas = require("./handlers/get-pizzas");
const createOrder = require("./handlers/create-order");
const getOrders = require("./handlers/get-orders");
const updateOrder = require("./handlers/update-order");
const deleteOrder = require("./handlers/delete-order");

api.get("/", () => "Welcome to Pizza API");

/*
aws dynamodb scan \
  --table-name pizza-orders \
  --region us-west-1 \
  --output json
*/
api.get("/pizzas", () => {
  return getPizzas();
});

api.get(
  "/pizzas/{id}",
  request => {
    return getPizzas(request.pathParams.id);
  },
  {
    error: 404
  }
);

/* GET all orders
curl -i \
  -H "Content-Type: application/json" \
  https://agahhfd682.execute-api.us-west-1.amazonaws.com/latest/orders
*/
api.get(
  "/orders",
  request => {
    return getOrders();
  },
  {
    error: 400
  }
);

/* GET a particular order
curl -i \
  -H "Content-Type: application/json" \
  https://agahhfd682.execute-api.us-west-1.amazonaws.com/latest/orders/fd09445d-076b-4604-8d83-8828e1c0b009
*/
api.get(
  "/orders/{id}",
  request => {
    return getOrders(request.pathParams.id);
  },
  {
    error: 400
  }
);

/* test with: 
curl -i \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"pizza":3,"address":"221B Baker Street"}' \
  https://agahhfd682.execute-api.us-west-1.amazonaws.com/latest/orders
*/
api.post(
  "/orders",
  request => {
    return createOrder(request.body);
  },
  {
    success: 201,
    error: 400
  }
);

/* test with: 
curl -i \
  -H "Content-Type: application/json" \
  -X PUT \
  -d '{"pizzaId":2}' \
  https://agahhfd682.execute-api.us-west-1.amazonaws.com/latest/orders/42
*/
api.put(
  "/orders/{id}",
  request => {
    return updateOrder(request.pathParams.id, request.body);
  },
  {
    error: 400
  }
);

/* test with: 
curl -i \
  -H "Content-Type: application/json" \
  -X DELETE \
  https://agahhfd682.execute-api.us-west-1.amazonaws.com/latest/orders/42
*/
api.delete(
  "/orders/{id}",
  request => {
    return deleteOrder(request.pathParams.id);
  },
  {
    error: 400
  }
);

module.exports = api;

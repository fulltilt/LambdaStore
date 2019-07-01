"use strict";

/*
export AWS_PROFILE=[username]
*/
const Api = require("claudia-api-builder");
const api = new Api();

const getPizzas = require("./handlers/get-pizzas");
const createOrder = require("./handlers.create-order");
const updateOrder = require("./handlers.update-order");
const deleteOrder = require("./handlers.delete-order");

api.get("/", () => "Welcome to Pizza API");

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

/* test with: 
curl -i \
  -H "Content-Type: application/json" \
  -X POST \
  -d '{"pizzaId":1,"address":"221B Baker Street"}' \
  [aws lambda url]/orders
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
  [aws lambda url]/orders/42
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
  [aws lambda url]/orders/42
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

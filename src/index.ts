/*import config from "./config"

const firstName= 'Fatima S';
console.log("Hello Worlds, this is", firstName);
console.log("Secret is:", config.secret);*/

import { OrderService, FinanceCalculator, PriceValidator, MaxPriceValidator, ItemValidator, Validator  } from "./app";

const orders = [
    { id: 1, item: "Sponge", price: 15 },
    { id: 2, item: "Chocolate", price: 20 },
    { id: 3, item: "Fruit", price: 18 },
    { id: 4, item: "Red Velvet", price: 25 },
    { id: 5, item: "Coffee", price: 8 },
  ];

  const rules =  [
        new PriceValidator(),
        new MaxPriceValidator(),
        new ItemValidator()
      ]

  const orderService = new OrderService( new Validator(rules), new FinanceCalculator());

  for (const order of orders) {
    orderService.addOrder(order.item, order.price);
  };

  const newItem = "Marble";
  const newPrice = 22;

  orderService.addOrder(newItem, newPrice);
  console.log("Orders after adding a new order:", orderService.getOrders());

  console.log("Total Revenue:", orderService.getTotalRevenue());
  console.log("Average Buy Power:", orderService.getbyAverageBuyPower());
  console.log("Order of id = 2:", orderService.fetchOrderById(2));
  console.log("Order of  non-existent id = 10:", orderService.fetchOrderById(10));
  

 
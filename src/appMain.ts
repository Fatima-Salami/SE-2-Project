/*import config from "./config"

const firstName= 'Fatima S';
logger.info("Hello Worlds, this is", firstName);
logger.info("Secret is:", config.secret);*/

import { OrderService, FinanceCalculator, PriceValidator, MaxPriceValidator, ItemValidator, Validator  } from "./app";
import logger from "./util/logger"; 

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
  logger.info("Orders after adding a new order: %o", orderService.getOrders());

  logger.info("Total Revenue:"+ orderService.getTotalRevenue());
  logger.info("Average Buy Power:"+ orderService.getbyAverageBuyPower());
  logger.info("Order of id = 2: %o", orderService.fetchOrderById(2));
  logger.info("Order of  non-existent id = 10:"+ orderService.fetchOrderById(10));
  

 
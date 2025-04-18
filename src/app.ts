



export interface Order {
  id: number;
  item: string;
  price: number;
}

export class OrderService {
  private orders: Order[] = [];

  constructor(
    private validator: IValidator,
    private calculator: ICalculator
  ) {}

  addOrder(item: string, price: number): void {
    const newOrder:  Order={id: this.orders.length + 1, item, price};
    this.validator.validate(newOrder);
    this.orders.push(newOrder);
  }

  getOrders(): Order[] { 
    return this.orders;
  }

  fetchOrderById(id: number): Order | null {
    return this.orders.find(order => order.id === id) || null;
  }

  getTotalRevenue(): number {
    return this.calculator.calculateTotalRevenue(this.orders);
  }

  getbyAverageBuyPower(): number {
    return this.calculator.calculateAverageBuyPower(this.orders);
  }

}

/* class PremiumOrderService extends OrderService { //can replace OrderService by PremiumOrderService easily in main
  fetchOrderById(id: number): Order | null {
    console.log(`Fetching premium order with ID: ${id}`);
    return super.fetchOrderById(id);
  }
} */

interface ICalculator {
  calculateTotalRevenue(orders: Order[]): number;
  calculateAverageBuyPower(orders: Order[]): number;
}

export class FinanceCalculator implements ICalculator {

  public calculateTotalRevenue(orders: Order[]): number {
    return orders.reduce((total, order) => total + order.price, 0);
  }

  public calculateAverageBuyPower(orders: Order[]): number {
    return orders.length === 0 ? 0 : parseFloat((this.calculateTotalRevenue(orders) / orders.length).toFixed(2));
  }
}

interface IValidator {
  validate(order: Order): void;
}

export class PriceValidator implements IValidator {
  validate(order: Order) {
      if (order.price <= 0) {
          throw new Error("Price must be greater than zero");
      }
  }
}
export class MaxPriceValidator implements IValidator {
  validate(order:Order) {
      if (order.price > 100) {
          throw new Error("Price must be less than 100");
      }
  }
}

export class ItemValidator implements IValidator {
  private static possibleItems = [
    "Sponge",
    "Chocolate",
    "Fruit",
    "Red Velvet",
    "Birthday",
    "Carrot",
    "Marble",
    "Coffee",
  ];
  
  validate(order: Order) {  
      if (!ItemValidator.possibleItems.includes(order.item)) {
          throw new Error(`Invalid item. Must be one of: ${ItemValidator.possibleItems.join(", ")}`);
      }
  }
}

export class Validator implements IValidator {

  constructor(private rules: IValidator[]) {
  }

  validate(order: Order): void {
      this.rules.forEach(rule => rule.validate(order));
  }
}


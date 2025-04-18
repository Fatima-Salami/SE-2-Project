
import { OrderService, FinanceCalculator, ItemValidator, Validator, Order } from "../src/app";   

describe("OrderService", () => {

    let validator: Validator;
    let calculator: FinanceCalculator;
    let orderService: OrderService;
    let baseValidator: (order: Order) => void;

    beforeAll(() => {
        const rules: ItemValidator[] = [];
        validator = new Validator(rules);
        calculator = new FinanceCalculator();
    });

    beforeEach(() => {
        baseValidator = validator.validate; 
        validator.validate = jest.fn(); // or () => null; // if  i assume that this is a heavy call, i can mock it to return null
        orderService = new OrderService(validator, calculator); 
    });

    afterEach(() => {
        validator.validate = baseValidator; // restore the original validate method after each test
    }); 

    it("should add an order", () => {
        const item = "Test Item";
        const price = 10;

        orderService.addOrder(item, price);

        expect(orderService.getOrders()).toEqual([{ id: 1, item, price }]);
    });

    it ("should get orders", () => {
        const item1 = "Test Item 1";
        const price1 = 10;

        orderService.addOrder(item1, price1);

        expect(orderService.getOrders()).toEqual([
            { id: 1, item: item1, price: price1 }
        ]);
    });

    it("should call finance calculator to calculate total revenue", () => {
        const item1 = "Test Item 1";
        const price1 = 10;
        orderService.addOrder(item1, price1);

        const spy = jest.spyOn(calculator, "calculateTotalRevenue")

        orderService.getTotalRevenue();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith([{ id: 1, item: item1, price: price1 }]);
        expect(spy).toHaveReturnedWith(price1);
    });

    it("should throw addition exception if validator does not pass", () => {
        const item = "Test Item";
        const price = 10;

        (validator.validate as jest.Mock).mockImplementation(() => {
            throw new Error("Invalid Order");
        });

        expect(() => orderService.addOrder(item, price)).toThrow("[Order Management] Error adding order: " + "Invalid Order");
    });

});
    
describe("FinanceCalculator", () => {
    it("should calculate total revenue", () => {
        const orders = [
            { id: 1, item: "Test Item 1", price: 10 },
            { id: 2, item: "Test Item 2", price: 20 },
        ];
        const calculator = new FinanceCalculator();

        const totalRevenue = calculator.calculateTotalRevenue(orders);

        expect(totalRevenue).toBe(30);
    });

    it("should calculate average buy power", () => {
        const orders = [
            { id: 1, item: "Test Item 1", price: 10 },
            { id: 2, item: "Test Item 2", price: 20 },
        ];
        const calculator = new FinanceCalculator();

        const averageBuyPower = calculator.calculateAverageBuyPower(orders);

        expect(averageBuyPower).toBe(15);
    });
});
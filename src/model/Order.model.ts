import { IItem } from "./IItem";
import { IOrder } from "./IOrder";

export class Order implements IOrder{

    private item: IItem;
    private price: number;
    private quantity: number;
    private id: string;

    constructor(item: IItem, price: number, quantity: number, id: string) {
        this.item = item;
        this.price = price;
        this.quantity = quantity;
        this.id = id;
    }

    public getItem(): IItem {
        return this.item;
    }

    public getPrice(): number {
        return this.price;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getId(): string {
        return this.id;
    }
    

}
import { Item } from "./Item.model";

export interface Order {
    getItem(): Item;
    getPrice(): number;
    getId(): string;
    getQuantity(): number;
}
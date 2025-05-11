import { IItem } from "../model/IItem";
import { OrderBuilder } from "../model/builders/Order.builder";
import { Order } from "../model/Order.model";
import { IMapper } from "./IMapper";

export class CSVOrderMapper implements IMapper<string[], Order>{
    constructor ( private itemMapper: IMapper<string[], IItem>){}
    
    map(data: string[]): Order {
        const item : IItem = this.itemMapper.map(data);
        return OrderBuilder.newBuilder()   
        .setId(data[0])
        .setQuantity(parseInt(data[data.length - 1]))
        .setPrice(parseInt(data[data.length - 2]))
        .setItem(item)
        .build()

    }

    reverseMap(data: Order): string[] {
        return [
            data.getId(),
            this.itemMapper.reverseMap(data.getItem()).join(','),
            data.getPrice().toString(),
            data.getQuantity().toString(),
        ];
    }
}

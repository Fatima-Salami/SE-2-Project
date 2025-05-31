import { Toy } from "../model/Toy.model";
import { IMapper } from "./IMapper";
import { ToyBuilder } from "../model/builders/Toy.builder";

export class XMLToyMapper implements IMapper<string[], Toy> {
    map(data: string[]): Toy {
        return ToyBuilder.newBuilder()
            .setType(data[1])       
            .setAgeGroup(data[2])     
            .setBrand(data[3])
            .setMaterial(data[4])
            .setBatteryRequired(data[5].toUpperCase() === 'YES')
            .setEducational(data[6].toUpperCase() === 'YES')
            .build();
    }

    reverseMap(data: Toy): string[] {
        return [
            data.getType(),
            data.getAgeGroup(),
            data.getBrand(),
            data.getMaterial(),
            data.getBatteryRequired() ? 'YES' : 'NO',
            data.getEducational() ? 'YES' : 'NO'
        ];
    }
}
import { Cake } from "../model/Cake.model";
import { IMapper } from "./IMapper";
import { CakeBuilder, Type, packType } from "../model/builders/Cake.builder";

const validTypes: Type[] = ['Birthday', 'Wedding', 'Anniversary', 'Graduation', 'Baby Shower', 'Other'];
const validPackTypes: packType[] = ['Box', 'Luxury Box', 'Luxury Box with Ribbon', 'Standard Box', 'Standard Box with Ribbon'];

export class CSVCakeMapper implements IMapper<string[], Cake> {
    map(data: string[]): Cake {

        if (!validTypes.includes(data[1] as Type)) {
            throw new Error(`Invalid cake type: ${data[1]}`);
        }
        const type = data[1] as Type;

        if (!validPackTypes.includes(data[14] as packType)) {
            throw new Error(`Invalid packaging type: ${data[14]}`);
        }
        const packagingType = data[14] as packType;

        return CakeBuilder.newBuilder()
            .setType(type)
            .setFlavor(data[2])
            .setFilling(data[3])
            .setSize(parseInt(data[4]))
            .setLayers(parseInt(data[5]))
            .setFrostingType(data[6])
            .setFrostingFlavor(data[7])
            .setDecorationType(data[8])
            .setDecorationColor(data[9])
            .setCustomMessage(data[10])
            .setShape(data[11])
            .setAllergies(data[12])
            .setSpecialIngredients(data[13])
            .setPackagingType(packagingType)
            .build();
    }

    reverseMap(data: Cake): string[] {
        return [
            data.getType(),
            data.getFlavor(),
            data.getFilling(),
            data.getSize().toString(),
            data.getLayers().toString(),
            data.getFrostingType(),
            data.getFrostingFlavor(),
            data.getDecorationType(),
            data.getDecorationColor(),
            data.getCustomMessage(),
            data.getShape(),
            data.getAllergies(),
            data.getSpecialIngredients(),
            data.getPackagingType()
        ];
    } 
}
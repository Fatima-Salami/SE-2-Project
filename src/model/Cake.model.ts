import { IItem, ItemCategory } from './IItem';

type Type = 'Birthday' | 'Wedding' | 'Anniversary' | 'Graduation' | 'Baby Shower' | 'Other';

type packType = 'Box' | 'Luxury Box' | 'Luxury Box with Ribbon' | 'Standard Box' | 'Standard Box with Ribbon';

export class Cake implements IItem {
   
    
    private type: Type;
    private flavor: string;
    private filling: string;
    private size: number;
    private layers: number;
    private frostingType: string;
    private frostingFlavor: string;
    private decorationType: string;
    private decorationColor: string;
    private customMessage: string;
    private shape: string;
    private allergies: string;
    private specialIngredients: string;
    private packagingType: packType;

    constructor(
        type: Type,
        flavor: string,
        filling: string,
        size: number,
        layers: number,
        frostingType: string,
        frostingFlavor: string,
        decorationType: string,
        decorationColor: string,
        customMessage: string,
        shape: string,
        allergies: string,
        specialIngredients: string,
        packagingType: packType
    ) {
        this.type = type;
        this.flavor = flavor;
        this.filling = filling;
        this.size = size;
        this.layers = layers;
        this.frostingType = frostingType;
        this.frostingFlavor = frostingFlavor;
        this.decorationType = decorationType;
        this.decorationColor = decorationColor;
        this.customMessage = customMessage;
        this.shape = shape;
        this.allergies = allergies;
        this.specialIngredients = specialIngredients;
        this.packagingType = packagingType;
    }

    getCategory(): ItemCategory {
        return ItemCategory.CAKE;
    }


    getType(): Type {
        return this.type;
    }

    getFlavor(): string {
        return this.flavor;
    }

    getFilling(): string {
        return this.filling;
    }

    getSize(): number {
        return this.size;
    }

    getLayers(): number {
        return this.layers;
    }

    getFrostingType(): string {
        return this.frostingType;
    }

    getFrostingFlavor(): string {
        return this.frostingFlavor;
    }

    getDecorationType(): string {
        return this.decorationType;
    }

    getDecorationColor(): string {
        return this.decorationColor;
    }

    getCustomMessage(): string {
        return this.customMessage;
    }

    getShape(): string {
        return this.shape;
    }

    getAllergies(): string {
        return this.allergies;
    }

    getSpecialIngredients(): string {
        return this.specialIngredients;
    }

    getPackagingType(): packType {
        return this.packagingType;
    }

}
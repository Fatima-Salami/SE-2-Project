import logger from "../../util/logger";
import { Cake } from "../Cake.model";

export type Type = 'Birthday' | 'Wedding' | 'Anniversary' | 'Graduation' | 'Baby Shower' | 'Other';

export type packType = 'Box' | 'Luxury Box' | 'Luxury Box with Ribbon' | 'Standard Box' | 'Standard Box with Ribbon';

export class CakeBuilder {

    private type!: Type;
    private flavor!: string;
    private filling!: string;
    private size!: number;
    private layers = 1;
    private frostingType!: string;
    private frostingFlavor!: string;
    private decorationType!: string;
    private decorationColor!: string;
    private customMessage!: string;
    private shape!: string;
    private allergies!: string;
    private specialIngredients!: string;
    private packagingType!: packType;

    public static newBuilder(): CakeBuilder
    {
        return new CakeBuilder();
    }

    setLayers(layers: number): CakeBuilder {
        this.layers = layers;
        return this;
    }

    setType(type: Type): CakeBuilder {
        this.type = type;
        return this;
    }

    setFlavor(flavor: string): CakeBuilder {
        this.flavor = flavor;
        return this;
    }

    setFilling(filling: string): CakeBuilder {
        this.filling = filling;
        return this;
    }

    setSize(size: number): CakeBuilder {
        this.size = size;
        return this;
    }

    setFrostingType(frostingType: string): CakeBuilder {
        this.frostingType = frostingType;
        return this;
    }

    setFrostingFlavor(frostingFlavor: string): CakeBuilder {
        this.frostingFlavor = frostingFlavor;
        return this;
    }

    setDecorationType(decorationType: string): CakeBuilder {
        this.decorationType = decorationType;
        return this;
    }

    setDecorationColor(decorationColor: string): CakeBuilder {
        this.decorationColor = decorationColor;
        return this;
    }

    setCustomMessage(customMessage: string): CakeBuilder {
        this.customMessage = customMessage;
        return this;
    }

    setShape(shape: string): CakeBuilder {
        this.shape = shape;
        return this;
    }

    setAllergies(allergies: string): CakeBuilder {
        this.allergies = allergies;
        return this;
    }

    setSpecialIngredients(specialIngredients: string): CakeBuilder {
        this.specialIngredients = specialIngredients;
        return this;
    }

    setPackagingType(packagingType: packType): CakeBuilder {
        const validPackagings: packType[] = ['Box', 'Luxury Box', 'Luxury Box with Ribbon', 'Standard Box', 'Standard Box with Ribbon'];
        if (!validPackagings.includes(packagingType)) {
            logger.error(`Invalid packaging type: ${packagingType}.`);
            throw new Error(`Invalid packaging type: ${packagingType}.`);
        }
        this.packagingType = packagingType;
        return this;
    }

    build(): Cake {
        const requiredFields = [
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType  
        ];

        for (const field of requiredFields) {
            if (!field) {
                logger.error("Missing required cake properties, could not build cake.");
                throw new Error("Missing required cake properties.");
            }
        }


        return new Cake(
            this.type,
            this.flavor,
            this.filling,
            this.size,
            this.layers,
            this.frostingType,
            this.frostingFlavor,
            this.decorationType,
            this.decorationColor,
            this.customMessage,
            this.shape,
            this.allergies,
            this.specialIngredients,
            this.packagingType
        );
    }
}
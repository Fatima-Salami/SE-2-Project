import logger from "../../util/logger";
import { Toy } from "../Toy.model";

export class ToyBuilder {

    private type!: string;
    private material!: string;
    private ageGroup!: string;
    private brand!: string;
    private batteryRequired!: boolean;
    private educational!: boolean;

    public static newBuilder(): ToyBuilder
    {
        return new ToyBuilder();
    }

    setType(type: string): ToyBuilder {
        this.type = type;
        return this;
    }

    setMaterial(material: string): ToyBuilder {
        this.material = material;
        return this;
    }

    setAgeGroup(ageGroup: string): ToyBuilder {
        this.ageGroup = ageGroup;
        return this;
    }

    setBrand(brand: string): ToyBuilder {
        this.brand = brand;
        return this;
    }

    setBatteryRequired(batteryRequired: boolean): ToyBuilder {
        this.batteryRequired = batteryRequired;
        return this;
    }

    setEducational(educational: boolean): ToyBuilder {
        this.educational = educational;
        return this;
    }

    build(): Toy {
        const requiredFields = [
            this.type,
            this.material,
            this.ageGroup,
            this.brand,
            this.batteryRequired,
            this.educational
        ];

        for (const field of requiredFields) {
            if (field === undefined || field === null) {
                logger.error("Missing required toy properties, could not build toy.");
                throw new Error("Missing required toy properties.");
            }
        }

        return new Toy(
            this.type,
            this.material,
            this.ageGroup,
            this.brand,
            this.batteryRequired,
            this.educational
        );
    }
}
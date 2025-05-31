import { Item, ItemCategory } from './Item.model';

export class Toy implements Item {
    private type: string;
    private material: string;
    private ageGroup: string;
    private brand: string;
    private batteryRequired: boolean;
    private educational: boolean;

    constructor(
        type: string,
        material: string,
        ageGroup: string,
        brand: string,
        batteryRequired: boolean,
        educational: boolean
    ) {
        this.type = type;
        this.material = material;
        this.ageGroup = ageGroup;
        this.brand = brand;
        this.batteryRequired = batteryRequired;
        this.educational = educational;
    }

    getCategory(): ItemCategory {
        return ItemCategory.TOY;
    }
    getType(): string {
        return this.type;
    }

    getMaterial(): string {
        return this.material;
    }

    getAgeGroup(): string {
        return this.ageGroup;
    }

    getBrand(): string {
        return this.brand;
    }

    getBatteryRequired(): boolean {
        return this.batteryRequired;
    }

    getEducational(): boolean {
        return this.educational;
    }

}
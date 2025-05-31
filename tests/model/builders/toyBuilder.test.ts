import { ToyBuilder } from '../../../src/model/builders/Toy.builder';

describe('ToyBuilder', () => {
    let toyBuilder: ToyBuilder;

    beforeEach(() => {
        toyBuilder = new ToyBuilder();
    });

    it("should create a toy with all required fields", () => {
        const toy = toyBuilder
            .setType("Action Figure")
            .setMaterial("Plastic")
            .setAgeGroup("5-10")
            .setBrand("ToyBrand")
            .setBatteryRequired(true)
            .setEducational(false)
            .build();

        expect(toy).toEqual({
            type: "Action Figure",
            material: "Plastic",
            ageGroup: "5-10",
            brand: "ToyBrand",
            batteryRequired: true,
            educational: false
        });
    });

    it("should throw an error if required fields are missing", () => {
        expect(() => {
            toyBuilder //without setting type
                .setMaterial("Plastic")
                .setAgeGroup("5-10")
                .setBrand("ToyBrand")
                .setBatteryRequired(true)
                .setEducational(false)
                .build();
        }).toThrow("Missing required toy properties.");
    });
});
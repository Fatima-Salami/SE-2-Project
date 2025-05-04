import { CakeBuilder } from '../../../src/model/builders/Cake.builder';

describe('CakeBuilder', () => {
    let cakeBuilder: CakeBuilder;

    beforeEach(() => {
        cakeBuilder = new CakeBuilder();
    });

    it("should create a book with all required fields", () => {
        const cake = cakeBuilder
            .setType("Birthday")
            .setFlavor("Chocolate")
            .setFilling("Vanilla Cream")
            .setSize(8)
            .setLayers(2)
            .setFrostingType("Buttercream")
            .setFrostingFlavor("Vanilla")
            .setDecorationType("Flowers")
            .setDecorationColor("Pink")
            .setCustomMessage("Happy Birthday!")
            .setShape("Round")
            .setAllergies("None")
            .setSpecialIngredients("Organic Cocoa")
            .setPackagingType("Box")
            .build();

        expect(cake).toEqual({
            type: "Birthday",
            flavor: "Chocolate",
            filling: "Vanilla Cream",
            size: 8,
            layers: 2,
            frostingType: "Buttercream",
            frostingFlavor: "Vanilla",
            decorationType: "Flowers",
            decorationColor: "Pink",
            customMessage: "Happy Birthday!",
            shape: "Round",
            allergies: "None",
            specialIngredients: "Organic Cocoa",
            packagingType: "Box",
        });

      
    });

    it("should throw an error if required fields are missing", () => {
        expect(() => {
            cakeBuilder //without setting flavor
            .setType("Birthday")
            .setFilling("Vanilla Cream")
            .setSize(8)
            .setLayers(2)
            .setFrostingType("Buttercream")
            .setFrostingFlavor("Vanilla")
            .setDecorationType("Flowers")
            .setDecorationColor("Pink")
            .setCustomMessage("Happy Birthday!")
            .setShape("Round")
            .setAllergies("None")
            .setSpecialIngredients("Organic Cocoa")
            .setPackagingType("Box")
                .build();
        }).toThrow("Missing required cake properties.");
    });

    it("should throw an error if packaging type is not valid", () => {
        expect(() => {
            cakeBuilder
                .setType("Birthday")
                .setFlavor("Chocolate")
                .setFilling("Vanilla Cream")
                .setSize(8)
                .setLayers(2)
                .setFrostingType("Buttercream")
                .setFrostingFlavor("Vanilla")
                .setDecorationType("Flowers")
                .setDecorationColor("Pink")
                .setCustomMessage("Happy Birthday!")
                .setShape("Round")
                .setAllergies("None")
                .setSpecialIngredients("Organic Cocoa")
                .setPackagingType("InvalidPackaging" as any);


            cakeBuilder.build();
        }).toThrow("Invalid packaging type: InvalidPackaging.");
    });
})
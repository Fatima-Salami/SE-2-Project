import { CSVCakeMapper } from "../../src/mappers/Cake.mapper";
import { CakeBuilder } from "../../src/model/builders/Cake.builder";

describe("Cake Mapper", () => {
    let mapper: CSVCakeMapper;

    beforeEach(() => {
        mapper = new CSVCakeMapper();
    });

    it("should map valid CSV data to a Cake object", () => {
        const csvData = [
            "1", "Birthday", "Vanilla", "Chocolate", "8", "2", "Buttercream", "Vanilla",
            "Sprinkles", "Red", "Happy Birthday!", "Round", "None", "Edible Gold", "Box"
        ];

        const cake = mapper.map(csvData);

        expect(cake).toEqual({
            type: 'Birthday',
            flavor: 'Vanilla',
            filling: 'Chocolate',
            size: 8,
            layers: 2,
            frostingType: 'Buttercream',
            frostingFlavor: 'Vanilla',
            decorationType: 'Sprinkles',
            decorationColor: 'Red',
            customMessage: 'Happy Birthday!',
            shape: 'Round',
            allergies: 'None',
            specialIngredients: 'Edible Gold',
            packagingType: 'Box'
        });
    });

    it("should reverse map a Cake object to CSV data", () => {
        const cake = CakeBuilder.newBuilder()
            .setType("Wedding")
            .setFlavor("Chocolate")
            .setFilling("Strawberry")
            .setSize(10)
            .setLayers(3)
            .setFrostingType("Fondant")
            .setFrostingFlavor("Vanilla")
            .setDecorationType("Flowers")
            .setDecorationColor("White")
            .setCustomMessage("Congratulations!")
            .setShape("Square")
            .setAllergies("Nuts")
            .setSpecialIngredients("Edible Pearls")
            .setPackagingType("Box")
            .build();

        const csvData = mapper.reverseMap(cake);

        expect(csvData).toEqual([
            "Wedding", "Chocolate", "Strawberry", "10", "3", "Fondant", "Vanilla",
            "Flowers", "White", "Congratulations!", "Square", "Nuts", "Edible Pearls", "Box"
        ]);
    });

    it("should throw an error when mapping CSV data with missing fields", () => {
        const csvData = ["1", "Birthday", "Vanilla"];

        expect(() => mapper.map(csvData)).toThrowError();
    });

    it("should throw an error when mapping CSV data with invalid data types", () => {
        const csvData = [
            "1", "Birthday", "Vanilla", "Chocolate", "invalid_size", "2", "Buttercream",
            "Vanilla", "Sprinkles", "Red", "Happy Birthday!", "Round", "None", "Edible Gold", "Box"
        ];

        expect(() => mapper.map(csvData)).toThrowError();
    });

    it("should handle empty CSV data gracefully", () => {
        const csvData: string[] = [];

        expect(() => mapper.map(csvData)).toThrowError();
    });
});


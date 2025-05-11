import { XMLToyMapper } from "../../src/mappers/Toy.mapper";
import { ToyBuilder } from "../../src/model/builders/Toy.builder";

describe("Toy Mapper", () => {
    let mapper: XMLToyMapper;

    beforeEach(() => {
        mapper = new XMLToyMapper();
    });

    it("should map valid data to a Toy object", () => {
        const xmlDataParsed = ['5248', 'Board Game', '0-3','Adventure Co.', 'Plastic','no', 'no', '63', '1'];

        const toy = mapper.map(xmlDataParsed);


        expect(toy).toEqual({
            type: "Board Game",
            material: "Plastic",
            ageGroup: "0-3",
            brand: "Adventure Co.",
            batteryRequired: false,
            educational: false
        });
    });

    it("should reverse map a Toy object to XML data", () => {
        const toy = ToyBuilder.newBuilder()
            .setType("Board Game")
            .setMaterial("Plastic")
            .setAgeGroup("0-3")
            .setBrand("Adventure Co.")
            .setBatteryRequired(false)
            .setEducational(false)
            .build();

        const toyData = mapper.reverseMap(toy);

        expect(toyData).toEqual(['Board Game', '0-3','Adventure Co.', 'Plastic','NO', 'NO']);
    });

    it("should throw an error when mapping data with missing fields", () => {
        const toyData = ['5248', 'Board Game', '1'];

        expect(() => mapper.map(toyData)).toThrowError();
    });

    it("should handle empty data gracefully", () => {
        const toyData : string[] = [];

        expect(() => mapper.map(toyData)).toThrowError();
    });
});
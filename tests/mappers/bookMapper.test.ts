import { JSONBookMapper } from "../../src/mappers/Book.mapper";
import { BookBuilder } from "../../src/model/builders/Book.builder";

describe("Book Mapper", () => {
    let mapper: JSONBookMapper;

    beforeEach(() => {
        mapper = new JSONBookMapper();
    });

    it("should map valid JSON data to a Book object", () => {
        const jsonDataParsed = ["2001","Edge of Eternity","Dan Brown","Science Fiction","Paperback","French","Oxford Press","Signed Copy","Eco-Friendly Packaging","12","5"];

        const book = mapper.map(jsonDataParsed);

        expect(book).toEqual({
            title: "Edge of Eternity",
            author: "Dan Brown",
            genre: "Science Fiction",
            format: "Paperback",
            language: "French",
            publisher: "Oxford Press",
            specialEdition: "Signed Copy",
            packaging: "Eco-Friendly Packaging"
        });
    });

    it("should reverse map a Book object to data as string", () => {
        const book = BookBuilder.newBuilder()
            .setTitle("Edge of Eternity")
            .setAuthor("Dan Brown")
            .setGenre("Science Fiction")
            .setFormat("Paperback")
            .setLanguage("French")
            .setPublisher("Oxford Press")
            .setSpecialEdition("Signed Copy")
            .setPackaging("Eco-Friendly Packaging")
            .build();

        const bookData = mapper.reverseMap(book);

        expect(bookData).toEqual([
            "Edge of Eternity","Dan Brown","Science Fiction","Paperback","French","Oxford Press","Signed Copy","Eco-Friendly Packaging"
        ]);
    });

    it("should throw an error when mapping data with missing fields", () => {
        const bookData = ["1", "The Great Gatsby", "F. Scott Fitzgerald"];

        expect(() => mapper.map(bookData)).toThrowError();
    });

    it("should handle empty data gracefully", () => {
        const bookData: string[] = [];
        expect(() => mapper.map(bookData)).toThrowError();
    });
});
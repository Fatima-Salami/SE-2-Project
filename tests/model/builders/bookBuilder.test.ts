import { BookBuilder } from '../../../src/model/builders/Book.builder';

//Write tes ts for the BookBuilder class using Jest 
// unit test to validate the functionality of each builder.
//Cover edge cases such as missing required fields or incorrect data types.

describe('BookBuilder', () => {
    let bookBuilder: BookBuilder;

    beforeEach(() => {
        bookBuilder = new BookBuilder();
    });

    it("should create a book with all required fields", () => {
        const book = bookBuilder
            .setTitle("The Great Book")
            .setAuthor("John Doe")
            .setGenre("Fiction")
            .setFormat("Hardcover")
            .setLanguage("English")
            .setPublisher("Great Publishing")
            .setSpecialEdition("Illustrated Edition")
            .setPackaging("Standard")
            .build();

        expect(book).toEqual({
            title: "The Great Book",
            author: "John Doe",
            genre: "Fiction",
            format: "Hardcover",
            language: "English",
            publisher: "Great Publishing",
            specialEdition: "Illustrated Edition",
            packaging: "Standard"
        });
    });

    it("should throw an error if required fields are missing", () => {
        expect(() => {
            bookBuilder //without setting title
                .setAuthor("John Doe")
                .setGenre("Fiction")
                .setFormat("Hardcover")
                .setLanguage("English")
                .setPublisher("Great Publishing")
                .setSpecialEdition("Illustrated Edition")
                .setPackaging("Standard")
                .build();
        }).toThrow("Missing required book properties.");
    });

})
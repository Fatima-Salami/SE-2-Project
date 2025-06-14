import logger from "../../util/logger";
import { Book } from "../Book.model";

export class BookBuilder {

    private title!: string;
    private author!: string;
    private genre!: string;
    private format!: string;
    private language!: string;
    private publisher!: string;
    private specialEdition!: string;
    private packaging!: string;

    public static newBuilder(): BookBuilder
    {
        return new BookBuilder();
    }

    setTitle(title: string): BookBuilder {
        this.title = title;
        return this;
    }

    setAuthor(author: string): BookBuilder {
        this.author = author;
        return this;
    }

    setGenre(genre: string): BookBuilder {
        this.genre = genre;
        return this;
    }

    setFormat(format: string): BookBuilder {
        this.format = format;
        return this;
    }

    setLanguage(language: string): BookBuilder {
        this.language = language;
        return this;
    }

    setPublisher(publisher: string): BookBuilder {
        this.publisher = publisher;
        return this;
    }

    setSpecialEdition(specialEdition: string): BookBuilder {
        this.specialEdition = specialEdition;
        return this;
    }

    setPackaging(packaging: string): BookBuilder {
        this.packaging = packaging;
        return this;
    }

    build(): Book {
        const requiredFields = [
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging
        ];

        for (const field of requiredFields) {
            if (!field) {
                logger.error("Missing required book properties, could not build book.");
                throw new Error("Missing required book properties.");
            }
        }

        return new Book(
            this.title,
            this.author,
            this.genre,
            this.format,
            this.language,
            this.publisher,
            this.specialEdition,
            this.packaging
        );
    }
}
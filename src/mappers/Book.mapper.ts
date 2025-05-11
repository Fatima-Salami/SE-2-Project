import { Book } from "../model/Book.model";
import { IMapper } from "./IMapper";
import { BookBuilder } from "../model/builders/Book.builder";

export class JSONBookMapper implements IMapper<string[], Book> {
    map(data: string[]): Book {
        return BookBuilder.newBuilder()
            .setTitle(data[1])
            .setAuthor(data[2])
            .setGenre(data[3])       
            .setFormat(data[4])
            .setLanguage(data[5])
            .setPublisher(data[6])
            .setSpecialEdition(data[7])
            .setPackaging(data[8])
            .build();
    }

    reverseMap(data: Book): string[] {
        return [
            data.getTitle(),
            data.getAuthor(),
            data.getGenre(),
            data.getFormat(),
            data.getLanguage(),
            data.getPublisher(),
            data.getSpecialEdition(),
            data.getPackaging(),
        ];
    }

}
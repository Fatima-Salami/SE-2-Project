import { readCSVFile } from './util/parsers/csvParser';
import { CSVCakeMapper } from './mappers/Cake.mapper';
import logger from "./util/logger";
import { CSVOrderMapper } from './mappers/Order.mapper';
import { JSONBookMapper } from './mappers/Book.mapper';
import { readJSONFile } from './util/parsers/jsonParser';
import { XMLToyMapper } from './mappers/Toy.mapper';
import { readXMLFile } from './util/parsers/xmlParser';

async function main() {

    const cakeData = await readCSVFile("src/data/cake orders.csv", false);
    const cakeMapper = new CSVCakeMapper();
    const CakeOrderMapper = new CSVOrderMapper(cakeMapper);
    const cakeOrders = cakeData.map(row => CakeOrderMapper.map(row));

    logger.info("List of orders: \n %o", cakeOrders)

    const reverseCake =  cakeOrders.map(cake => CakeOrderMapper.reverseMap(cake))
    logger.info("List of string book orders: \n %o", reverseCake)

    /*const bookData = await readJSONFile("src/data/book orders.json", false);
    const bookMapper = new JSONBookMapper();
    const bookOrderMapper = new CSVOrderMapper(bookMapper);
    const bookOrders = bookData.map(row => bookOrderMapper.map(row));

    logger.info("List of book orders: \n %o", bookOrders) 

    const reverseBook =  bookOrders.map(book => bookOrderMapper.reverseMap(book))
    logger.info("List of string book orders: \n %o", reverseBook)*/

    /* const toyData = await readXMLFile("src/data/toy orders.xml");
    const toyMapper = new XMLToyMapper();
    const toyOrderMapper = new CSVOrderMapper(toyMapper);
    const toyOrders = toyData.map(row => toyOrderMapper.map(row));

    logger.info("List of toy orders: \n %o", toyOrders)

    const reverseToys =  toyOrders.map(toy => toyOrderMapper.reverseMap(toy))
    logger.info("List of string toy orders: \n %o", reverseToys) */
}

main();
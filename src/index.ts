import { readCSVFile } from './util/parsers/csvParser';
import { CSVCakeMapper } from './mappers/Cake.mapper';
import logger from "./util/logger";
import { CSVOrderMapper } from './mappers/Order.mapper';

async function main() {

    const cakeData = await readCSVFile("src/data/cake orders.csv", false);
    const cakeMapper = new CSVCakeMapper();
    const CakeOrderMapper = new CSVOrderMapper(cakeMapper);
    const cakeOrders = cakeData.map(row => CakeOrderMapper.map(row));

    logger.info("List of orders: \n %o", cakeOrders)

    const reverseCake =  cakeOrders.map(cake => CakeOrderMapper.reverseMap(cake))
    logger.info("List of string book orders: \n %o", reverseCake)

   
}

main();
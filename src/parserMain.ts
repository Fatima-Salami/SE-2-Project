import path from 'path';
import {readCSVFile} from './util/parsers/csvParser'
import { readJSONFile} from './util/parsers/jsonParser'
import { readXMLFile} from './util/parsers/xmlParser'
import logger from './util/logger';

const filePath = path.resolve(__dirname, './data/toy orders.xml');

async function main() {
    try {
        //const products = await readCSVFile(filePath)
        //const products = await readJSONFile(filePath)
        const products = await readXMLFile(filePath)
        products.forEach((product) => {
            logger.info(product);
        });
    } catch(error) {
        logger.error(error)
    }
}

main();
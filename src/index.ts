import path from 'path';
import {readCSVFile} from './util/parser'
import logger from './util/logger';

const filePath = path.resolve(__dirname, './data/Cake orders.csv');

async function main() {
    try {
        const products = await readCSVFile(filePath)
        products.forEach((product) => {
            logger.info(product);
        });
    } catch(error) {
        logger.error(error)
    }
}

main();
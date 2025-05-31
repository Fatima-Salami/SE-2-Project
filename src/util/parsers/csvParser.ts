import { promises as fs } from 'fs';
import { parse as csvParse } from 'csv-parse';
import { stringify as csvStringify } from 'csv-stringify';

/**
 * Reads a CSV file and returns a Promise of a 2D array of strings.
 * @param filePath - The path to the CSV file to read.
 * @param includeHeader - Whether to include the header row in the returned data.
 * @returns Promise<string[][]> - A promise that resolves to a 2D array of strings.
 */
export async function readCSVFile(filePath: string, includeHeader: boolean = true): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8'); //file system reads the path
        return new Promise(
            (resolve, reject) => {
                csvParse(fileContent, { trim: true, skip_empty_lines: true }, (err, records: string[][]) => {
                    if (err) reject(err);
                    if (!includeHeader) records.shift(); // Remove the header row if includeHeader is true   
                    resolve(records);

                });
            });
    }
    catch (error) {
        throw new Error(`Error reading CSV file: ${error}`);
    }

}

/**
 * Writes a 2D array of strings to a CSV file.
 * @param filePath - The path to the CSV file to write.
 * @param data - The 2D array of strings to write to the file.
 */
export async function writeCSVFile(filePath: string, data: string[][]): Promise<void> {
    try {
        const csvContent = await new Promise<string>((resolve, reject) => {
            csvStringify(data, (err, output) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(output);
                }
            });
        });

        await fs.writeFile(filePath, csvContent, 'utf8');

    } catch (error) {
        throw new Error(`Error writing CSV file: ${error}`);
    }
}




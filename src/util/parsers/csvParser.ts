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


//in the video another code without parse and stringify dependencies

/* 
// src/utils/parser.ts
import fs from 'fs'; 
import logger from './logger';

export const parseCSV = (filePath: string): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const results: string[][] = []; // Store parsed CSV rows as arrays
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' }); // Create a readable stream for the file

    readStream.on('data', (chunk: string) => {
      // Process data chunks from the file
      const lines = chunk.split('\n').filter(line => line.trim() !== ''); // Split data into lines and remove empty lines
      lines.forEach((line) => {
        const columns = line.split(',').map(value => value.trim().replace(/^"(.*)"$/, '$1')); 
        // Split line into columns, trim spaces, and remove quotes
        results.push(columns); // Add parsed row to results
      });
    });

    readStream.on('end', () => {
      resolve(results); // Resolve the promise with parsed data when done
    });

    readStream.on('error', (error) => {
      logger.error("Error while reading the stream of file %s, $o", filePath, error);
      reject(error); // Reject the promise if an error occurs
    });
  });
};
 */




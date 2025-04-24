import { promises as fs } from 'fs';

function flattenObject(obj: any, parentKey = '', res: any = {}): any {
    for (const key in obj) {
        const value = obj[key];
        const propName = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Recurse into nested object
            flattenObject(value, propName, res);
        } else if (Array.isArray(value)) {
            // Flatten arrays by joining them into a comma-separated string
            res[propName] = value.map(v =>
                typeof v === 'object' && v !== null
                    ? JSON.stringify(v)
                    : String(v)
            ).join(', ');
        } else {
            // Add the flat value to the result
            res[propName] = value;
        }
    }
    return res;
}

export async function readJSONFile(filePath: string, includeHeader: boolean = false): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        const records = Array.isArray(jsonData) ? jsonData : [jsonData]; // support both arrays and single object

        // Flatten all records into a flat structure
        const flattenedRecords = records.map(record => flattenObject(record));

        // Create headers from all unique keys
        const headers = Array.from(new Set(flattenedRecords.flatMap(record => Object.keys(record))));

        // Convert each flattened record into an array that matches the header
        const rows = flattenedRecords.map(record =>
            headers.map(header => record[header] !== undefined ? record[header] : '')
        );

        // Include header if requested
        if (includeHeader) {
            rows.unshift(headers);
        }

        return rows;

    } catch (error) {
        throw new Error(`Error reading or parsing JSON file: ${error}`);
    }
}
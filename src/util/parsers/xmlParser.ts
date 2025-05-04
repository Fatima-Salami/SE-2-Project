import { XMLParser } from 'fast-xml-parser';
import { promises as fs } from 'fs';

function findFirstArrayOfObjects(obj: any): any[] | null {
    if (Array.isArray(obj) && obj.every(el => typeof el === 'object')) {
        return obj;
    }
    if (typeof obj === 'object') {
        for (const key in obj) {
            const result = findFirstArrayOfObjects(obj[key]);
            if (result) return result;
        }
    }
    return null;
}

function deepFlatten(obj: any, parentKey = '', res: any = {}): any {
    for (const key in obj) {
        const value = obj[key];
        const propName = parentKey ? `${parentKey}.${key}` : key;

        if (key === '#text') {
            res[parentKey] = value;  // Use the parent key to store the text content
        }
        else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Process attributes
            if (value['@_']) {
                for (const attrKey in value['@_']) {
                    res[`${propName}._${attrKey}`] = value['@_'][attrKey];
                }
            }
            // Process the value of the tag
            deepFlatten(value, propName, res);

        } else if (Array.isArray(value)) {
            // Join array values as comma-separated strings or process individually
            res[propName] = value.map((v) => (typeof v === 'object' ? JSON.stringify(v) : v)).join(', ');
        } else {
            // Add the value of the tag
            res[propName] = value;
        }
    }
    return res;
}

function generateResultAndHeaders(records: any[], includeHeader: boolean): { result: string[][] } {

    // collect all keys for header
    const allKeys = new Set<string>();
    records.forEach(row => {
        Object.keys(deepFlatten(row)).forEach(key => allKeys.add(key));
    });

    const headers = Array.from(allKeys);
    const result: string[][] = [];
    if (includeHeader) {
        result.push(headers);  // Add the header row if includeHeader is true
    }

    records.forEach(row => {
        const flat = deepFlatten(row);
        result.push(headers.map(key => flat[key] !== undefined ? String(flat[key]) : ''));
    });
    
    return {result };
}

export async function readXMLFile(filePath: string, includeHeader: boolean = false): Promise<string[][]> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf8');

        const parser = new XMLParser({
            ignoreAttributes: false,
            parseTagValue: true,
            allowBooleanAttributes: true
        });

        const parsed = parser.parse(fileContent);

        // Recursively find the first array of objects
        let records = findFirstArrayOfObjects(parsed);
        if (!records) {
            // try wrapping single object into an array to normalize
            const single = Object.values(parsed).find(v => typeof v === 'object');
            records = single ? [single] : null;
        }
        if (!Array.isArray(records)) {
            throw new Error("Could not find a valid array of records in XML");
        }

        const { result } = generateResultAndHeaders(records, includeHeader);

        return result;

    } catch (error) {
        throw new Error(`Error reading XML file: ${error}`);
    }
}
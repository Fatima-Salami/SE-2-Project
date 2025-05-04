jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

import { readCSVFile } from '../../src/util/parsers/csvParser'
import { promises as fs } from 'fs';



describe("readCSVFile", () => {

  let  mockCSVContent;
beforeAll(() => {
  mockCSVContent = `header1,header2,header3
value1,value2,value3
value4,value5,value6`;
});

  it("should read a CSV file correctly", async () => {

    const mockRecords = [
      ["header1", "header2", "header3"],
      ["value1", "value2", "value3"],
      ["value4", "value5", "value6"]
    ];

    // Mock fs.promises.readFile to resolve with the CSV string
    (fs.readFile as jest.Mock).mockResolvedValue(mockCSVContent);

    const result = await readCSVFile('fake/path.csv');

    expect(result).toEqual(mockRecords);
    expect(fs.readFile).toHaveBeenCalledWith('fake/path.csv', 'utf8');

  });

  it('should remove header row when includeHeader is false', async () => {

    const mockRecords = [
      ["value1", "value2", "value3"],
      ["value4", "value5", "value6"]
    ];

    (fs.readFile as jest.Mock).mockResolvedValue(mockCSVContent);

    const result = await readCSVFile('fake/path.csv', false);

    expect(result).toEqual(mockRecords);
  });
});
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

import { readXMLFile } from '../../src/util/parsers/xmlParser'
import { promises as fs } from 'fs';


describe("readXMLFile", () => {

  let mockXMLContent = "";
  beforeAll(() => {
    mockXMLContent = `<?xml version='1.0' encoding='utf-8'?>
  <data> <catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
    <availability inStock="true">Available</availability>
  </book>
  <book id="bk102">
    <author>Ralls, Kim</author>
    <title>Midnight Rain</title>
    <genre>Fantasy</genre>
    <price>5.95</price>
    <publish_date>2000-12-16</publish_date>
    <availability inStock="false">Out of Stock</availability>
  </book>
 </catalog></data>`;
  });

  it("should read an XML file correctly", async () => {

    const mockRecords = [
      [
        "author",
        "title",
        "genre",
        "price",
        "publish_date",
        "availability",
        "availability.@_inStock", // attribute notation from fast-xml-parser
        "@_id", // attribute of <book>
      ],
      [  
        "Gambardella, Matthew",
        "XML Developer's Guide",
        "Computer",
        "44.95",
        "2000-10-01",   
        "Available",
        "true",
        "bk101",
      ],
      [        
        "Ralls, Kim",
        "Midnight Rain",
        "Fantasy",
        "5.95",
        "2000-12-16",
        "Out of Stock",  
        "false",
        "bk102",
      ]
    ];

    // Mock fs.promises.readFile to resolve with the XML string
    (fs.readFile as jest.Mock).mockResolvedValue(mockXMLContent);

    const result = await readXMLFile('fake/path.xml', true);

    expect(result).toEqual(mockRecords);
    expect(fs.readFile).toHaveBeenCalledWith('fake/path.xml', 'utf8');

  });

   it('should remove header row when includeHeader is false', async () => {

    const mockRecords = [
      [  
        "Gambardella, Matthew",
        "XML Developer's Guide",
        "Computer",
        "44.95",
        "2000-10-01",   
        "Available",
        "true",
        "bk101",
      ],
      [        
        "Ralls, Kim",
        "Midnight Rain",
        "Fantasy",
        "5.95",
        "2000-12-16",
        "Out of Stock",  
        "false",
        "bk102",
      ]
    ];

    (fs.readFile as jest.Mock).mockResolvedValue(mockXMLContent);

    const result = await readXMLFile('fake/path.xml');

    expect(result).toEqual(mockRecords);
  }); 

});
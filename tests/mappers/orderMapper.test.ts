import { CSVOrderMapper } from "../../src/mappers/Order.mapper";
import { IMapper } from "../../src/mappers/IMapper";
import { Order } from "../../src/model/Order.model";
import { IItem } from "../../src/model/IItem";
import { OrderBuilder } from "../../src/model/builders/Order.builder";
import { ItemCategory } from "../../src/model/IItem"; // Import ItemCategory

describe("CSVOrderMapper", () => {
    let itemMapperMock: IMapper<string[], IItem>;
    let csvOrderMapper: CSVOrderMapper;
    
    const mockItem: IItem = {
        getCategory: () => ItemCategory.CAKE,
      };

    beforeEach(() => {
        itemMapperMock = {
            map: jest.fn().mockReturnValue(mockItem),
            reverseMap: jest.fn().mockReturnValue([
  'Birthday',         
  'Chocolate',      
  'Strawberry',       
  '12',               
  '2',              
  'Buttercream',   
  'Vanilla',          
  'Flowers',          
  'Pink',            
  'Happy Birthday!', 
  'Round',          
  'Nuts',            
  'Gold flakes',     
  'Luxury Box',      
])
        };
        csvOrderMapper = new CSVOrderMapper(itemMapperMock);
    });

    it("should map valid CSV data to an Order object", () => {
        const csvData = ["1", "Birthday",         
      "Chocolate",      
      "Strawberry",       
      "12",               
      "2",              
      "Buttercream",   
      "Vanilla",          
      "Flowers",          
      "Pink",            
      "Happy Birthday!", 
      "Round",          
      "Nuts",            
      "Gold flakes",     
      "Luxury Box",      "10", "2"];

        const result = csvOrderMapper.map(csvData);

        expect(result).toBeInstanceOf(Order);
        expect(result.getId()).toBe("1");
        expect(result.getItem()).toBe(mockItem);
        expect(result.getPrice()).toBe(10);
        expect(result.getQuantity()).toBe(2);
        expect(itemMapperMock.map).toHaveBeenCalledWith(csvData);
    });

    it("should reverse map an Order object to CSV data", () => {
        const order = OrderBuilder.newBuilder()
            .setId("1")
            .setItem(mockItem)
            .setPrice(10)
            .setQuantity(2)
            .build();

        const result = csvOrderMapper.reverseMap(order);

        expect(result).toEqual(["1", "Birthday",         
      "Chocolate",      
      "Strawberry",       
      "12",               
      "2",              
      "Buttercream",   
      "Vanilla",          
      "Flowers",          
      "Pink",            
      "Happy Birthday!", 
      "Round",          
      "Nuts",            
      "Gold flakes",     
      "Luxury Box", "10", "2"]);
        expect(itemMapperMock.reverseMap).toHaveBeenCalledWith(mockItem);
    });

    it("should throw an error if CSV data is missing fields", () => {
        const csvData = ["1", "Birthday",         
      "Chocolate",      
      "Strawberry",       
      "12",               
      "2",              
      "Buttercream",   
      "Vanilla",          
      "Flowers",          
      "Pink",            
      "Happy Birthday!", 
      "Round",          
      "Nuts",            
      "Gold flakes",     
      "Luxury Box", "10"]; // Missing quantity

        expect(() => csvOrderMapper.map(csvData)).toThrowError();
    });

    it("should throw an error if CSV data contains invalid data types", () => {
        const csvData = ["1", "Birthday",         
      "Chocolate",      
      "Strawberry",       
      "12",               
      "2",              
      "Buttercream",   
      "Vanilla",          
      "Flowers",          
      "Pink",            
      "Happy Birthday!", 
      "Round",          
      "Nuts",            
      "Gold flakes",     
      "Luxury Box", "invalidPrice", "2"]; // Invalid price

        expect(() => csvOrderMapper.map(csvData)).toThrowError();
    });

    it("should throw an error if CSV data is malformed", () => {
        const csvData : string[] = [];

        expect(() => csvOrderMapper.map(csvData)).toThrowError();
    });
});

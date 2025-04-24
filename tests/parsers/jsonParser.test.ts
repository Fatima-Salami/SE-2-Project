jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn()
  }
}));

import { readJSONFile } from '../../src/util/parsers/jsonParser'
import { promises as fs } from 'fs';

describe("read", () => {

  let mockJSONContent = {};
  beforeAll(() => {
    mockJSONContent = [{
      user: {
        id: "123",
        name: "Alice",
        contact: {
          email: "alice@example.com",
          phones: ["123-456", "789-012"]
        }
      },
      isActive: true,
      roles: ["admin", "editor"],
      preferences: {
        notifications: {
          email: true,
          sms: false
        },
        theme: "dark"
      },
      tags: [
        { id: 1, label: "new" },
        { id: 2, label: "featured" }
      ]
    }];
  });

  it("should read a JSON file correctly", async () => {

    const mockRecords = [
      ["user.id", "user.name", "user.contact.email", "user.contact.phones", "isActive", "roles", "preferences.notifications.email", "preferences.notifications.sms", "preferences.theme", "tags"],
      ["123", "Alice", "alice@example.com", "123-456, 789-012", true, "admin, editor", true, false, "dark", '{"id":1,"label":"new"}, {"id":2,"label":"featured"}']
    ];

    // Mock fs.promises.readFile to resolve with the JSON string
    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockJSONContent));

    const result = await readJSONFile('fake/path.json', true);

    expect(result).toEqual(mockRecords);
    expect(fs.readFile).toHaveBeenCalledWith('fake/path.json', 'utf8');

  });

  it('should remove header row when includeHeader is false', async () => {

    const mockRecords = [
      ["123", "Alice", "alice@example.com", "123-456, 789-012", true, "admin, editor", true, false, "dark", '{"id":1,"label":"new"}, {"id":2,"label":"featured"}']
    ];

    (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockJSONContent));

    const result = await readJSONFile('fake/path.json');

    expect(result).toEqual(mockRecords);
  });

  it('should throw an error if the file is not a valid JSON', async () => {
    (fs.readFile as jest.Mock).mockResolvedValue("invalid json string");

    await expect(readJSONFile('fake/path.json')).rejects.toThrow("Error reading or parsing JSON file: " + "SyntaxError: Unexpected token i in JSON at position 0");
  });
});
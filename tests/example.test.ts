describe('Math functions', () => {

    beforeAll(() => {
        console.log('beforeAll: Runs once before all tests');
    });

    afterAll(() => {
        console.log('afterAll: Runs once after all tests');
    });

    beforeEach(() => {
        console.log('beforeEach: Runs before each test');
    });

    afterEach(() => {
        console.log('afterEach: Runs after each test');
    });
    
    it('should return 4 when adding 2 and 2', () => {
        expect(2 + 2).toBe(4);
    });

    it('should return 0 when 2 is subtracted from 2', () =>
    {
        expect(2 - 2).toBe(0);
    });

})

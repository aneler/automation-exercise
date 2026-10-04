import { test, expect, request, APIRequestContext } from '@playwright/test';
import { getBrandsList } from '../requests/api-requests';

let apiContext: APIRequestContext;

test.describe('Brands API', () => {

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: 'https://automationexercise.com',
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('GET brandsList should return 200 and list of brands', async () => {
        const response = await getBrandsList(apiContext);

        await test.step('verify HTTP status', async () => {
            expect(response.status()).toBe(200);
        });

        const body = await response.json();

        await test.step('verify response body structure', async () => {
            expect(body.responseCode).toBe(200);
            expect(body).toHaveProperty('brands');
            expect(Array.isArray(body.brands)).toBeTruthy();
            expect(body.brands.length).toBeGreaterThan(0);
        });

        await test.step('verify brand item shape', async () => {
            expect(body.brands[0]).toHaveProperty('id');
            expect(body.brands[0]).toHaveProperty('brand');
            expect(typeof body.brands[0].id).toBe('number');
            expect(typeof body.brands[0].brand).toBe('string');
        });
    });

    test('PUT brandsList should return 405', async () => {
        const response = await apiContext.put('/api/brandsList');
        console.log(await response.text());
    
        expect(response.status()).toBe(200);
    
        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.'); 
    });

});
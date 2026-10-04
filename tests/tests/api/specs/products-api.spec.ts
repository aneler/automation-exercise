import { test, expect, request, APIRequestContext } from '@playwright/test';
import { getProductsList } from '../requests/api-requests';

let apiContext: APIRequestContext;

test.describe('Products API', () => {

    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: 'https://automationexercise.com',
        });
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    test('GET productsList should return 200 and list of products', async () => {
        const response = await getProductsList(apiContext);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('POST productsList should return 405', async () => {
        const response = await apiContext.post('/api/productsList');
        console.log(await response.text());

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.'); 
    });

});
import { test, expect } from '@playwright/test';
import { getProductsList, postProductsList } from '../requests/api-requests';

test.describe('Products API', () => {

    test('GET productsList should return 200 and list of products', async ({request}) => {
        const response = await getProductsList(request);

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(200);
        expect(body).toHaveProperty('products');
        expect(Array.isArray(body.products)).toBeTruthy();
        expect(body.products.length).toBeGreaterThan(0);
    });

    test('POST productsList should return 405', async ({request}) => {
        const response = await postProductsList(request);
        console.log(await response.text());

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.responseCode).toBe(405);
        expect(body.message).toBe('This request method is not supported.'); 
    });

});
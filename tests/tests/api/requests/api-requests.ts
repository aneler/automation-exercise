import { APIRequestContext } from '@playwright/test';

export async function getProductsList(apiContext: APIRequestContext) {
    return await apiContext.get('/api/productsList');
}

export async function getBrandsList(apiContext: APIRequestContext) {
    return await apiContext.get('/api/brandsList');    
}

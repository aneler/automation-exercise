import { APIRequestContext } from '@playwright/test';

export async function getProductsList(apiContext: APIRequestContext) {
    return await apiContext.get('/api/productsList');
}

export async function postProductsList(apiContext: APIRequestContext) {
    return await apiContext.post('/api/productsList');
}

export async function getBrandsList(apiContext: APIRequestContext) {
    return await apiContext.get('/api/brandsList');    
}

export async function putBrandsList(apiContext: APIRequestContext) {
    return await apiContext.put('/api/brandsList');    
}

export async function postCreateAccount(apiContext: APIRequestContext){
    return await apiContext.post('/api/createAccount');
}
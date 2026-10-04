import { request, expect, FullConfig } from '@playwright/test';
import { generateSingleUser } from '../utils/generateTestData';
import * as fs from 'fs';


async function globalSetup(config: FullConfig) {
    
    const apiContext = await request.newContext({
        baseURL: config.projects[0].use.baseURL,
    });
    
    const user = generateSingleUser();
    let responseBody;
    try {
        const response = await apiContext.post('api/createAccount', {
            form: {
                name: user.customerfullname, 
                email: user.email, 
                password: user.password, 
                title: user.title, 
                birth_date: user.birthDay, 
                birth_month: user.birthMonth, 
                birth_year: user.birthYear, 
                firstname: user.firstName, 
                lastname: user.lastName, 
                company: user.company, 
                address1: user.address,
                address2: user.address2, 
                country: user.country,
                zipcode: user.zipcode, 
                state: user.state, 
                city: user.city, 
                mobile_number: user.mobileNumber
            }
        });
        responseBody = await response.json();
    } finally {
        await apiContext.dispose();
    }
    expect(responseBody, 'Could not create global test user: ' + responseBody.message).toHaveProperty('responseCode', 201);

    fs.writeFileSync('tests/data/global-user.json', JSON.stringify(user, null, 2));
    console.log('Global test user saved.');

}; 

export default globalSetup;
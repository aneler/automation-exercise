import { request } from '@playwright/test';
import { generateSingleUser, generateUserData } from '../utils/generateTestData';
import * as fs from 'fs';


async function globalSetup() {
    
    const apiContext = await request.newContext({
        baseURL: 'https://automationexercise.com',
    });
    
    const user = generateSingleUser();

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
    console.log(await response.json());
    fs.writeFileSync('tests/data/global-user.json', JSON.stringify(user, null, 2));
    console.log('Global test user saved.');
    await apiContext.dispose();

}; 

export default globalSetup;
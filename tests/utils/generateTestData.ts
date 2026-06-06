import * as fs from 'fs';
import { faker } from '@faker-js/faker/locale/en';

type User = {
  //id: number;
  title: string;
  email: string;
  customerfullname: string;
  password: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  firstName: string;
  lastName: string;
  company: string; 
  address: string;
  address2: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
};

const titles = ['Mr', 'Mrs'];


export async function generateUserData(amount: number){
    const users:  User[] = [];
    const day = Math.floor(Math.random() * 30) + 1;
    const year = Math.floor(Math.random() * (1990 - 1980 + 1)) + 1980;   
    const title = titles[Math.floor(Math.random() * titles.length)];

    for (let i = 0; i < amount; i++) {
        const user = {
            title: title,
            email: faker.internet.email(),
            customerfullname: faker.person.fullName(),
            password: faker.internet.password(),
            birthDay: day.toString(),
            birthMonth: faker.date.month(),
            birthYear: year.toString(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            company: faker.company.name(),
            address: faker.location.streetAddress(),
            address2: faker.location.streetAddress(),
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            mobileNumber: faker.phone.number(),
        };
        users.push(user);
    }

    const userData = { users };
    const userDataJson = JSON.stringify(userData, null, 2);
    fs.writeFileSync(`tests/data/user-data.json`, userDataJson);
    console.log(`User data generated and saved to user-data.json file.`);
}


export function generateSingleUser(): User {
  const day = Math.floor(Math.random() * 30) + 1;
  const year = Math.floor(Math.random() * (1990 - 1980 + 1)) + 1980;
  const title = titles[Math.floor(Math.random() * titles.length)];

  return {
    title: title,
    email: faker.internet.email(),
    customerfullname: faker.person.fullName(),
    password: faker.internet.password(),
    birthDay: day.toString(),
    birthMonth: faker.date.month(),
    birthYear: year.toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.streetAddress(),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
  };
}


export async function loadUserData(){
    const userData = JSON.parse(fs.readFileSync(`tests/data/user-data.json`, 'utf8'));
    return userData
}
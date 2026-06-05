import { type Page, type Locator , expect } from '@playwright/test'; 
import { UserData } from '../../../interfaces/user';

class SignUpPage {
    readonly page: Page;
    //Account information
    readonly formHeader: Locator;
    readonly titleMr: Locator;
    readonly titleMrs: Locator; 

    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly birthDay: Locator; 
    readonly birthMonth: Locator; 
    readonly birthYear: Locator;
    readonly newsletterCheckbox: Locator; 
    readonly specialOffersCheckbox: Locator; 
    //Address information
    readonly firstName: Locator;
    readonly lastName: Locator; 
    readonly company: Locator; 
    readonly address: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator; 
    readonly zipcode: Locator;
    readonly mobileNumber: Locator; 
    readonly createAccountBtn: Locator; 


    constructor(page: Page) {
        this.page = page;

        // Account information
        this.formHeader = page.locator(`//div[@class="login-form"]/h2/b`);
        this.titleMr = page.locator(`//input[@value='Mr']`);
        this.titleMrs = page.locator(`//input[@value='Mrs']`);

        this.name = page.locator(`//input[@data-qa="name"]`);
        this.email = page.locator(`//input[@data-qa="email"]`);
        this.password = page.locator(`//input[@data-qa="password"]`);
        this.birthDay = page.locator(`//select[@data-qa="days"]`);
        this.birthMonth = page.locator(`//select[@data-qa="months"]`);
        this.birthYear = page.locator(`//select[@data-qa="years"]`);
        this.newsletterCheckbox = page.locator(`//input[@name="newsletter"]`);
        this.specialOffersCheckbox = page.locator(`//input[@name="optin"]`);

        // Address information
        this.firstName = page.locator(`//input[@data-qa="first_name"]`);
        this.lastName = page.locator(`//input[@data-qa="last_name"]`);
        this.company = page.locator(`//input[@data-qa="company"]`);
        this.address = page.locator(`//input[@data-qa="address"]`);
        this.address2 = page.locator(`//input[@data-qa="address2"]`);
        this.country = page.locator(`//select[@data-qa="country"]`);
        this.state = page.locator(`//input[@data-qa="state"]`);
        this.city = page.locator(`//input[@data-qa="city"]`);
        this.zipcode = page.locator(`//input[@data-qa="zipcode"]`);
        this.mobileNumber = page.locator(`//input[@data-qa="mobile_number"]`);

        this.createAccountBtn = page.locator(`//button[@data-qa="create-account"]`);
     }

    async getFormHeader(){
      const text = await this.formHeader.textContent();
      return text?.trim() || '';
    }    

    async selectTitleMr() {
      await this.titleMr.check();
    }
    async selectTitleMrs(){
      await this.titleMrs.check();
    }

    async fillName(value: string) {
      await this.name.fill(value);
    }

    async getName(){
      const name = await this.name.textContent();
      return name?.trim() || '';
    }

    async fillEmail(value: string) {
      await this.email.fill(value);
    }

    async getEmail(){
      const email = await this.email.textContent();
      return email?.trim() || '';
    }

    async fillPassword(value: string) {
      await this.password.fill(value);
    }

    async selectBirthDay(value: string) {
      await this.birthDay.selectOption(value);
    }

    async selectBirthMonth(value: string) {
      await this.birthMonth.selectOption(value);
    }

    async selectBirthYear(value: string) {
      await this.birthYear.selectOption(value);
    }

    async checkNewsletter() {
      await this.newsletterCheckbox.check();
    }

    async checkSpecialOffers() {
      await this.specialOffersCheckbox.check();
    }

    async fillFirstName(value: string) {
      await this.firstName.fill(value);
    }

    async fillLastName(value: string) {
      await this.lastName.fill(value);
    }

    async fillCompany(value: string) {
      await this.company.fill(value);
    }

    async fillAddress(value: string) {
      await this.address.fill(value);
    }

    async fillAddress2(value: string) {
      await this.address2.fill(value);
    }

    async selectCountry(value: string) {
      await this.country.selectOption(value);
    }

    async fillState(value: string) {
      await this.state.fill(value);
    }

    async fillCity(value: string) {
      await this.city.fill(value);
    }

    async fillZipcode(value: string) {
      await this.zipcode.fill(value);
    }

    async fillMobileNumber(value: string) {
      await this.mobileNumber.fill(value);
    }

    async clickCreateAccount() {
      await this.createAccountBtn.click();
    }
  
  
  
    async fillAndSubmitSignUpForm(title: string, password: string, 
                              birthDay: string, birthMonth: string, 
                              birthYear: string, firstName: string,
                              lastName: string, company: string,
                              address: string, address2: string, 
                              state: string, city: string,
                              zipcode: string, mobileNumber: string,
                              news: boolean, offers: boolean ) {
      if (title == 'Mr') {
        await this.titleMr.check();
      };
      if (title == 'Mrs') {
        await this.titleMrs.check();
      } 
      
      await this.password.fill(password);
      await this.birthDay.selectOption(birthDay);
      await this.birthMonth.selectOption(birthMonth);
      await this.birthYear.selectOption(birthYear);
      if (news) {
        await this.newsletterCheckbox.check();
      }
      if (offers) {
        await this.specialOffersCheckbox.check();
      }

      await this.firstName.fill(firstName);
      await this.lastName.fill(lastName);
      await this.company.fill(company);
      await this.address.fill(address);
      await this.address2.fill(address2);
      //await this.country.selectOption('Germany');
      await this.state.fill(state);
      await this.city.fill(city);
      await this.zipcode.fill(zipcode);
      await this.mobileNumber.fill(mobileNumber);
      await this.clickCreateAccount();
  }

      async fillAndSubmitSignUpForm1(user: UserData) {
      if (user.title == 'Mr') {
        await this.titleMr.check();
      };
      if (user.title == 'Mrs') {
        await this.titleMrs.check();
      } 
      
      await this.password.fill(user.password);
      await this.birthDay.selectOption(user.birthDay);
      await this.birthMonth.selectOption(user.birthMonth);
      await this.birthYear.selectOption(user.birthYear);
      if (user.news) {
        await this.newsletterCheckbox.check();
      }
      if (user.offers) {
        await this.specialOffersCheckbox.check();
      }

      await this.firstName.fill(user.firstName);
      await this.lastName.fill(user.lastName);
      await this.company.fill(user.company);
      await this.address.fill(user.address);
      await this.address2.fill(user.address2);
      //await this.country.selectOption('Germany');
      await this.state.fill(user.state);
      await this.city.fill(user.city);
      await this.zipcode.fill(user.zipcode);
      await this.mobileNumber.fill(user.mobileNumber);
      await this.page.waitForTimeout(15000);
      await this.clickCreateAccount();
  }
}

export default SignUpPage;
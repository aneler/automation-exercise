import { type Page, type Locator , expect } from '@playwright/test'; 

class Header {
    readonly page: Page;
    readonly home: Locator;
    readonly products: Locator;
    readonly cart: Locator;
    readonly login: Locator;
    readonly logout: Locator;
    readonly userName: Locator;
    readonly deleteUser: Locator;

    constructor(page: Page){
        this.page = page;

        this.home = page.locator(`//a[contains(text(),'Home')]`);
        this.products = page.locator(`//a[contains(text(),'Products')]`);
        this.cart = page.locator(`//a[contains(text(),'Cart')]`);
        this.login = page.locator(`//a[contains(text(),'Login')]`);
        this.logout = page.locator(`//a[contains(text(), 'Logout')]`);
        this.userName = page.locator(`//a[contains(text(),'Logged in as')]/b`);
        this.deleteUser = page.locator(`//a[contains(text(),'Delete Account')]`);
    }

    async clickHome(){
        await this.home.click();
    }

    async clickProducts(){
        await this.products.click();
    }

    async clickCart(){
        await this.cart.click();
    }

    async clickLogin(){
        await this.login.click();
    }

    async clickLogout(){
        await this.logout.click();
    }

    async getName(){
        const text = await this.userName.textContent();
        return text?.trim() || '';
    }

    async isDeleteUserLinkVisible(){
        const isVisible = await this.deleteUser.isVisible();
        return isVisible;
    }

    async clickDeleteUser(){
        await this.deleteUser.click();
    }

}

export default Header;
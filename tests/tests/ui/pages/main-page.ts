import { type Page, type Locator , expect } from '@playwright/test'; 

class MainPage {
    readonly page: Page;

    readonly slider: Locator; 

    constructor(page: Page){
        this.page = this.page;

        this.slider = page.locator(`//section[@id="slider"]`);
    }

    async isSliderVisible(){
        return await this.slider.isVisible();
    }

}

export default MainPage;
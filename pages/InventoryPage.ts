import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async expectLoaded() {
    // Confirm we're on the products page
    await expect(this.title).toHaveText('Products');
  }

  async addItemToCart(itemName: string) {
    // SauceDemo builds add-to-cart button ids from the product name,
    // e.g. "Sauce Labs Backpack" -> "add-to-cart-sauce-labs-backpack"
    const id = 'add-to-cart-' + itemName.toLowerCase().replace(/ /g, '-');
    await this.page.locator(`[data-test="${id}"]`).click();
  }

  async expectCartCount(count: string) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(count);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

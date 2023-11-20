import { Page } from 'playwright';

export async function addTimezoneLabel(page: Page) {
    await page.locator('text=Add timezone').click();
    await page.locator('#label').click();
    await page.locator('#label').type("Bansari");
}

export async function saveButton(page: Page) {
    const saveButton = page.locator('text=Save');
    saveButton.click();
}

export async function openWebPage(page: Page) {
    await page.goto('localhost:3000');
    await page.waitForTimeout(1000);
}

export async function waitTime(page: Page) {
    await page.waitForTimeout(2000);
}
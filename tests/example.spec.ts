import { test, expect } from '@playwright/test';

test("simple basic test", async ({ page }) => {
    await page.goto("https://example.com");
    const pageTitle = await page.locator("h1")
    await expect(pageTitle).toContainText("Example Domain");
})
test("clicking on Element", async ({ page }) => {
    await page.goto("http://zero.webappsecurity.com/index.html");
await page.click("#signin_button")
await page.click("text=Sign in")

const errorMessage = await page.locator(".alert-error")
await expect(errorMessage).toContainText("Login and/or password are wrong.");

})

test('Selectors', async ({ page }) => {
    //TEXT
    await page.click('text=some text')
    //CSS
    await page.click('button#submit')
    await page.click('.class-name')
    await page.click('#id-name')
//Only visible CSS selectors
    await page.click('button:visible')
    await page.click('.class-name:visible')
    await page.click('#id-name:visible')
    //Combinations
    
})
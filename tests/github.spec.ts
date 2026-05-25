import { test, expect } from '@playwright/test';

test.describe("github describe block", () => {
    test.beforeEach(async({ page }) => {
        await page.goto("https://www.github.com/");
    });

    test("first", async({ page }) => {
        await expect(page).toHaveTitle(/GitHub/);
    });

  
  test("Sign In Github", async({ page }) => {
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveTitle(/Sign in to GitHub/);
    await page.getByRole('textbox', { name: 'Username or email address' }).fill("QualityPepe");
    await expect(page.getByRole('textbox', { name: 'Username or email address' })).toHaveValue("QualityPepe");
    await page.getByRole('textbox', { name: 'Password' }).fill("12345");
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue("12345");
  });
});
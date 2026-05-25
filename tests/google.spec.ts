import { test, expect } from "@playwright/test";

test.describe("google describe block", () => {
  test("Type in Google Search and check results", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.getByRole("combobox", { name: "Buscar" }).fill("Playwright");
    // await page.getByRole('button', { name: 'Buscar con Google' }).click();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("link", {
        name: "Playwright: Fast and reliable end-to-end testing for modern web apps",
      }),
    ).toBeVisible();
    await page
      .getByRole("link", {
        name: "Playwright: Fast and reliable end-to-end testing for modern web apps",
      })
      .click();
    await expect(page).toHaveTitle(/Playwright/);
  });
});

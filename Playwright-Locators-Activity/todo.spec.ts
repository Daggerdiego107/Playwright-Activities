import { test, expect } from "@playwright/test";

test.describe("playwright todo app", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc");
    });

    test("Has Title", async ({ page }) => {
        expect.soft(page.getByText("todos")).toBeVisible();
        await expect(page).toHaveTitle(/TodoMVC/);
    });

    test("Add a todo item", async ({ page }) => {
        test.slow();
        await page.getByPlaceholder("What needs to be done?").fill("Make tests");
        await page.keyboard.press("Enter");
        await expect(page.getByTestId("todo-title")).toHaveText("Make tests");
        const todoCount = await page.getByTestId("todo-title").count();
        expect(todoCount).toBe(1);
    });

    test("Complete a todo item", async ({ page }) => {
        await page.getByPlaceholder("What needs to be done?").fill("Make tests");
        await page.keyboard.press("Enter");
        await page.getByLabel("Toggle Todo").check();
        await page.getByRole("link", { name: "Active" }).click();
        await expect(page.getByTestId("todo-title")).not.toBeVisible();
    });

    test.fail("Delete a todo item", async ({ page }) => {
        await page.getByPlaceholder("What needs to be done?").fill("Make tests");
        await page.keyboard.press("Enter");
        await page.getByTestId("todo-title").hover();
        await page.getByRole("button", { name: "Delete" }).click();
        await expect(page.getByTestId("todo-title")).toBeVisible();
    });

    test("Clear completed items", async ({ page }) => {
        await page.getByPlaceholder("What needs to be done?").fill("Make tests");
        await page.keyboard.press("Enter");
        await page.getByRole("checkbox", { name: "Toggle Todo" }).check();
        await page.getByRole("link", { name: "Active" }).click();
        await page.getByRole("button", { name: "Clear completed" }).click();
        await expect(page.getByTestId("todo-title")).not.toBeVisible();
    });

    test.fixme("Edit hint uses alt/title locators", async ({ page }) => {
        await page.getByPlaceholder("What needs to be done?").fill("Make tests");
        await page.keyboard.press("Enter");
        await expect(page.getByTitle("Double-click to edit a todo")).toBeVisible();
        await expect(page.getByAltText("TodoMVC logo")).toBeVisible();
    });
});
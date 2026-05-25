import { test, chromium, firefox } from "@playwright/test";

// Activity 3: Browsers & Browser Contexts
test.describe("Browser Context", () => {
  test("Browser Context", async () => {
    // Launch a Firefox browser
    const browser = await firefox.launch({ headless: false });
    // Create a new context
    const context = await browser.newContext();
    // Console log the browser contexts length
    console.log("Browser Context: ", browser.contexts().length);
    // Create a new page
    const page = await context.newPage();
    // Console log the browser contexts length
    console.log("Browser Context: ", browser.contexts().length);
    // Go to the playwright URL
    await page.goto("https://www.playwright.dev/");
    await page.screenshot({ path: "./tests/browserContext.png" });
    // Close up the context and browser
    await context.close();
    await browser.close();
  });
});

test.describe("Multiple pages", () => {
  test("should open multiple pages", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    await page1.goto("https://playwright.dev/docs/intro");
    const page2 = await context.newPage();
    await page2.goto("https://playwright.dev/docs/writing-tests");
    const pages = context.pages();
    console.log("context pages: ", pages.length);
    await browser.close();
  });
});

test.describe("Pages Methods", () => {
  test("page once", async () => {
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.playwright.dev/");
    await page.screenshot({ path: "./tests/pageOnce-act5.png" });
    page.once("load", () => console.log("Page loaded!"));
    await page.goto("https://www.github.com/");
    await page.goBack();
    await page.screenshot({ path: "./tests/pageOnce2-act5.png" });
    await context.close();
    await browser.close();
  });
});

import { test, firefox } from "@playwright/test";

// Activity 3: Browsers & Browser Contexts
test.describe("Browser Context", () => {
  test("Browser Context", async () => {
    // Launch a Firefox browser
    const browser = await firefox.launch({ headless: false });
    const page = await browser.newPage();
    // Console log the browser contexts length
    console.log("Browser Context: ", browser.contexts().length);
    // Create a new context
    const context = await browser.newContext();
    // Console log the browser contexts length
    console.log("Browser Context: ", browser.contexts().length);
    // Create a new page
    const page1 = await context.newPage();
    // Go to the playwright URL
    await page1.goto("https://www.playwright.dev/");
    await page1.screenshot({ path: "./tests/browserContext.png" });
    // Close up the context and browser
    context.close();
    browser.close();
  });

  test("should open multiple pages", async () => {
    const browser = await firefox.launch();
    console.log(browser.contexts().length);
    const page1 = await browser.newPage();
    await page1.goto("https://www.playwright.dev/");
    const page2 = await browser.newPage();
    await page2.goto("https://www.playwright.dev/docs/intro");
    console.log(
      "browser contexts: ",
      browser.contexts().length,
      browser.contexts(),
    );
    await page1.screenshot({ path: "./tests/browserContext1.png" });
    await page2.screenshot({ path: "./tests/browserContext2.png" });
    await browser.close();
  });
});

test.describe("Pages Methods", () => {
    test("page once", async() => {
        const browser = await firefox.launch();
        const page = await browser.newPage();
        await page.goto("https://www.playwright.dev/");
        await page.goto("https://www.github.com/");
        await page.screenshot({ path: "./tests/pageOnce-act5.png" });
        await page.goBack();
        await page.screenshot({ path: "./tests/pageOnce2-act5.png" });
        page.once('load', () => console.log("Page Loaded!"));
        await browser.close()
    });
});

import { test, firefox, expect } from "@playwright/test";

test.describe("Use all locator to identify the elements in Mercado Libre", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.mx/");
  });

  test("Locators", async ({ page }) => {
    page.getByRole("link", { name: "Mercado Libre México - Donde" });
    page
      .getByTestId("thb-double-container")
      .getByRole("link", { name: "FULL HASTA 50% DE DESCUENTO" });
    page.getByAltText("ENVÍO GRATIS EN TU PRIMERA COMPRA");
    page.getByText("Enviar a CP 45080Enviar a CP");
    page.getByLabel("Siguiente");
    page.getByTitle("mobile camera");
    page.getByPlaceholder("filter actions");
  });
});

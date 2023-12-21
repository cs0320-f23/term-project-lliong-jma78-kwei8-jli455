import { test, expect } from "@playwright/test";

// to be visible vs to have count?

// testing that search bar, buttons, and default creators all visible
test("on page load, i see a search bar, a submit button, and six filter buttons", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByLabel("creator search bar")).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Visual Arts" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Performing Arts" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Literary Arts" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Artisans" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Other" })).toBeVisible();
  await expect(page.getByRole("button", { name: "See All!" })).toBeVisible();
});

test("on page load, i see nine default creators", async ({ page }) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
});

// testing individual filter buttons
test("clicking on visual arts button filters for visual arts creators", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Visual Arts" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(2);
  await expect(page.getByText("Yayoi Kusama")).toBeVisible();
  await expect(page.getByText("Victo Ngai")).toBeVisible();
});

test("clicking on performing arts button filters for performing arts creators", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Performing Arts" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(2);
  await expect(page.getByText("Chun Wai Chan")).toBeVisible();
  await expect(page.getByText("Keone and Mari")).toHaveCount(2);
});

test("clicking on literary arts button filters for literary arts creators", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Literary Arts" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(1);
  await expect(page.getByText("Kazuo Ishiguro")).toHaveCount(2);
});

test("clicking on artisans button filters for artisans", async ({ page }) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Artisans" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(3);
  await expect(page.getByText("Rami Kim")).toHaveCount(2);
  await expect(page.getByText("Brightland")).toHaveCount(2);
  await expect(page.getByText("Asian American Girl Club")).toBeVisible();
});

test("clicking on other button filters for other creators", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Other" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(1);
  await expect(page.getByText("Wong Fu Productions")).toHaveCount(2);
});

test("clicking on see all button shows all creators", async ({ page }) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Other" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(1);
  await page.getByRole("button", { name: "See All!" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
});

// testing interaction between filter buttons
test("clicking on various filter buttons changes number of creators visible", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page.getByRole("button", { name: "Visual Arts" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(2);
  await expect(page.getByText("Yayoi Kusama")).toBeVisible();
  await expect(page.getByText("Victo Ngai")).toBeVisible();
  await page.getByRole("button", { name: "Literary Arts" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(1);
  await expect(page.getByText("Yayoi Kusama")).toHaveCount(0);
  await expect(page.getByText("Victo Ngai")).toHaveCount(0);
  await expect(page.getByText("Kazuo Ishiguro")).toHaveCount(2);
  await page.getByRole("button", { name: "Artisans" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(3);
  await expect(page.getByText("Rami Kim")).toHaveCount(2);
  await expect(page.getByText("Brightland")).toHaveCount(2);
  await expect(page.getByText("Asian American Girl Club")).toBeVisible();
  await expect(page.getByText("Kazuo Ishiguro")).toHaveCount(0);
});

// testing searching
test("successful search", async ({ page }) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .click();
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .fill("artist");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(2);
});

test("unsuccessful search", async ({ page }) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .click();
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("no creators found with that search term")
  ).toBeVisible();
});

test("unsuccessful search followed by successful search", async ({ page }) => {
  await page.goto("http://localhost:5173/explore_artists");
  await expect(page.getByTestId("test:single-creator")).toHaveCount(9);
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .click();
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .fill("search");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("no creators found with that search term")
  ).toBeVisible();

  await page
    .getByPlaceholder("Search for creators by name or description!")
    .click();
  await page
    .getByPlaceholder("Search for creators by name or description!")
    .fill("artist");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByTestId("test:single-creator")).toHaveCount(2);
  await expect(
    page.getByText("no creators found with that search term")
  ).toHaveCount(0);
});

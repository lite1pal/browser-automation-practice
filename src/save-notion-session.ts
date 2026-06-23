import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://www.notion.so/login");

  console.log("Log in manually, then press Enter here...");
  process.stdin.once("data", async () => {
    await context.storageState({ path: "notion-state.json" });
    await browser.close();
    console.log("Saved notion-state.json");
  });
}

main();

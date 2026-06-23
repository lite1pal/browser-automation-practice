import { Browser, BrowserContext, Page, chromium } from "playwright";
import { ProvisionResult } from "./types";

export abstract class BaseProvisioner {
  protected browser?: Browser;
  protected context?: BrowserContext;
  protected page?: Page;

  protected async start() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  protected async stop() {
    await this.context?.close();
    await this.browser?.close();
  }

  protected async safeClick(label: string) {
    if (!this.page) throw new Error("Page not initialized");

    await this.page
      .getByRole("button", { name: new RegExp(label, "i") })
      .click({ timeout: 10_000 });
  }

  protected async safeFill(label: string, value: string) {
    if (!this.page) throw new Error("Page not initialized");

    await this.page
      .getByLabel(new RegExp(label, "i"))
      .fill(value, { timeout: 10_000 });
  }

  protected async captureFailure(
    provider: string,
    error: unknown,
  ): Promise<ProvisionResult> {
    const screenshotPath = `screenshots/${provider}-${Date.now()}.png`;

    if (this.page) {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
    }

    return {
      success: false,
      provider,
      message: error instanceof Error ? error.message : "Unknown error",
      screenshotPath,
    };
  }
}

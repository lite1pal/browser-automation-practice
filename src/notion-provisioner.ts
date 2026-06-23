import { chromium } from "playwright";

type InviteUserInput = {
  email: string;
};

export class NotionProvisioner {
  async inviteUser(input: InviteUserInput) {
    const browser = await chromium.launch({ headless: false });

    const context = await browser.newContext({
      storageState: "notion-state.json",
    });

    const page = await context.newPage();

    await page.goto(
      "https://app.notion.com/p/240dae2ac8438036a4a4e0d28841a56d?v=240dae2ac84381598133000c9fe3ceac",
    );

    // Open settings
    await page.getByText(/settings/i).click();

    // Go to members section
    await page.getByText(/people|members/i).click();

    // Invite user
    await page.getByRole("button", { name: /invite/i }).click();

    await page.getByRole("textbox").fill(input.email);

    await page.getByRole("button", { name: /invite|send/i }).click();

    await page.waitForTimeout(3000);

    await page.screenshot({
      path: `screenshots/notion-invite-${Date.now()}.png`,
      fullPage: true,
    });

    await browser.close();
  }
}

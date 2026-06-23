import { BaseProvisioner } from "./base-provisioner";
import { ProvisionResult, ProvisionUserInput, UserProvisioner } from "./types";

export class MockSaasProvisioner
  extends BaseProvisioner
  implements UserProvisioner
{
  provider = "mock-saas";

  async createUser(input: ProvisionUserInput): Promise<ProvisionResult> {
    await this.start();

    try {
      if (!this.page) throw new Error("Page not initialized");

      await this.page.goto("http://localhost:3000/mock-saas.html");

      await this.page.getByRole("button", { name: /invite user/i }).click();
      await this.page.getByLabel(/email/i).fill(input.email);
      await this.page.getByLabel(/role/i).selectOption("Admin");
      await this.page.getByRole("button", { name: /send invite/i }).click();

      await this.page.getByText(/invite sent successfully/i).waitFor();

      console.log(`Would invite ${input.email} to ${this.provider}`);

      await this.stop();

      return {
        success: true,
        provider: this.provider,
        message: `User ${input.email} invited successfully`,
      };
    } catch (error) {
      const result = await this.captureFailure(this.provider, error);
      await this.stop();
      return result;
    }
  }
}

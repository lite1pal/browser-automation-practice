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

      await this.page.goto("https://example.com");

      // Placeholder for real SaaS flow:
      // 1. login
      // 2. navigate to admin/users
      // 3. click invite user
      // 4. fill email/role
      // 5. submit
      // 6. verify success state

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

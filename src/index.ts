import { MockSaasProvisioner } from "./mock-saas-provisioner";

async function main() {
  console.log("Starting automation...");

  const provisioner = new MockSaasProvisioner();

  const result = await provisioner.createUser({
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
    role: "Admin",
  });

  console.log("Result:", result);
}

main().catch((error) => {
  console.error("Automation failed:", error);
  process.exit(1);
});

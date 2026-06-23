import { NotionProvisioner } from "./notion-provisioner";

async function main() {
  const notion = new NotionProvisioner();

  await notion.inviteUser({
    email: "dev@denistarasenko.com",
  });
}

main().catch(console.error);

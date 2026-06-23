export type ProvisionUserInput = {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

export type ProvisionResult = {
  success: boolean;
  provider: string;
  message: string;
  screenshotPath?: string;
};

export interface UserProvisioner {
  provider: string;
  createUser(input: ProvisionUserInput): Promise<ProvisionResult>;
}

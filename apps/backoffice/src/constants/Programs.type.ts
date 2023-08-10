export type Program = {
  description: string;
  name: string;
  PK: string;
  SK: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  roles: string[];
  status: string;
};

export type ProgramSettings = {
  PK: string;
  SK: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  owner: string;
  secretKey: string;
  status: string;
};

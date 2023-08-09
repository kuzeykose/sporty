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

export type Plan = {
  PK: string;
  SK: string;
  createdAt: string;
  date: [string, string];
  image: string;
  owner: string;
  planDescription: string;
  planId: string;
  planName: string;
  planNote: string;
  programId: string;
  secretKey: string;
  status: string;
};

export type User = {
  PK: string;
  SK: string;
  description: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  name: string;
  roles: string[];
  status: string;
};

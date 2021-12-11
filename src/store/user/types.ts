export type User = {
  id: string;
  name: string;
  token: string;
}

export type ModuleState = {
  user: User | null;
}

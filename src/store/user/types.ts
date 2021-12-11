export type User = {
  id: string;
  name: string;
  token: string;
  photoURL?: string;
}

export type ModuleState = {
  user: User | null;
}

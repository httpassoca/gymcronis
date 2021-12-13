export type User = {
  id: string;
  name: string;
  token: string;
  photoURL?: string | null;
}

export type ModuleState = {
  user: User | null;
}

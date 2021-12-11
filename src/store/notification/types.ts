export type Notification = {
  id: number;
  text: string;
  type?: 'good' | 'bad';
}
export type ModuleState = {
  notifications: Array<Notification>;
}

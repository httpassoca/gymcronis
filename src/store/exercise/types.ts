export type Exercise = {
  id: number;
  name: string;
  custom?: boolean;
  muscle: string;
  equipament?: string;
  description?: string;
  image?: string;
}
export type ModuleState = {
  exercises: Exercise[],
}

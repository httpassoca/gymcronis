export type Exercise = {
  id: string;
  authorId: string;
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

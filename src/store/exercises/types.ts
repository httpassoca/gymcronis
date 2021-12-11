export type Exercise = {
  authorId: string;
  name: string;
  custom?: boolean;
  muscle: string;
  equipament?: string;
  description?: string;
  image?: string;
}

// Firebase store data in a object keyed by sting
export type DatabaseExercises = Record<string, Exercise>;

export type ModuleState = {
  exercises: Exercise[],
}

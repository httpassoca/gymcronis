export type Exercise = {
  id: string;
  authorId: string;
  name: string;
  custom?: boolean;
  muscles?: string[];
  description: string;
  image?: string;
}

// Firebase store data in a object keyed by sting
export type DatabaseExercises = Record<string, Exercise>;

export type ModuleState = {
  exercises: Exercise[],
  exercise: Exercise | null,
}

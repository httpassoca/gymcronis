export type Exercise = {
  id: string;
  authorId: string;
  name: string;
  muscles?: string[];
  description: string;
  image?: string;
}

// Firebase update multiple object
// export type UpdateObject = {[key: string]: Exercise}

// Firebase store data in a object keyed by sting
export type DatabaseExercises = Record<string, Exercise>;

export type ModuleState = {
  exercises: Exercise[],
  exercise: Exercise | null,
}

export type WorkoutExercise = {
  value: string
  name: string
  marked: boolean
}

export type Workout = {
  id: string;
  authorId: string;
  name: string;
  exercises: WorkoutExercise[]
  marked: boolean;
}

export type UpdateExercise = {
  id: string;
  workoutId: string;
  value: boolean;
}

// Firebase update multiple object
// export type UpdateObject = {[key: string]: Workout}

// Firebase store data in a object keyed by sting
export type DatabaseWorkouts = Record<string, Workout>;

export type ModuleState = {
  workouts: Workout[],
}

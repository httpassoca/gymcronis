import { Workout } from '../../store/workouts/types';

type Rule = {
  message: string;
  required?: boolean;
  trigger?: string;
  type?: string;
}

export type ListExercise = {
  marked: boolean;
  value: string;
  name: string;
};

type Form = {
  name: string;
  exercises: ListExercise[];
}

export type DialogDataType = {
  form: Form;
  rules: {[key:string]: Rule[]};
  list: ListExercise[];
  options: ListExercise[];
  loading: boolean;
}

export type WorkoutData = {
  workoutData: Workout;
  open: boolean;
}

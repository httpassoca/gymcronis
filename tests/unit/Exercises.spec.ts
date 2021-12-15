import { state } from '../../src/store/exercises/index';
import mutations from '../../src/store/exercises/mutations';

describe('store/events', () => {
  describe('mutations', () => {
    beforeEach(() => {
      state.exercises = [];
      state.exercise = null;
    });

    test('should set an exercise', () => {
      const payload = {
        id: 'exerciseId',
        authorId: 'authorId',
        name: 'exerciseName',
        muscles: ['muscle1', 'muscle2'],
        description: 'exerciseDesc',
        image: 'linkImg',
      };
      mutations.SET_EXERCISE(state, payload);
      expect(state.exercise).toStrictEqual(payload);
    });

    test('should set exercises', () => {
      const payload = [{
        id: 'exerciseId',
        authorId: 'authorId',
        name: 'exerciseName',
        muscles: ['muscle1', 'muscle2'],
        description: 'exerciseDesc',
        image: 'linkImg',
      }, {
        id: 'exerciseId2',
        authorId: 'authorId2',
        name: 'exerciseName2',
        muscles: ['muscle1', 'muscle2'],
        description: 'exerciseDesc2',
        image: 'linkImg2',
      }];
      mutations.SET_EXERCISES(state, payload);
      expect(state.exercises).toStrictEqual(payload);
    });

  });
});

# gymcronis 💪

An application for workouts to Acronis test. Yes, a big 💪 test!

## Stacks
The initial setup was made with [Vue CLI](https://cli.vuejs.org/):

- Vue 2
- Vuex
- Vue Router
- Typescript
- Dart Sass

Packages manually instalated:

- [x] Element
- [x] Jest
- [x] Firebase

## Application Rules
- CRUD Exercises
  - 36 default exercises
- CRUD Workout
  - 3 default workouts
- Mark exercises as complete in workout
- Mark workout as complete if all exercises are completed
## Roadmap

- [x] Add dependecies
- [x] Create routes
- [x] Create layout
  - [x] Auth page layout
  - [x] Check auth before run app
- [x] API connection
- [x] Google Auth
- [x] Protect routes
- [x] Notifications
- [x] Loading app style
- [x] Add exercises module on vuex
- [x] Add workouts module on vuex
- [x] Config firebase db rules
- [x] Create firebase db structure
- [x] Add validation!
- [x] Add exercises CRUD
- [x] Add workouts CRUD
- [x] Add workouts integration with exercises
- [ ] Add unit tests
- [ ] Add snapshot test
- [ ] Add default exercises


## Features
- [ ] Dark theme 🌙
- [x] Google Auth 🔐
- [ ] Profile page 🧔


## How to run it
The usual 👍
```
  yarn && yarn dev
```

You can test it too
```
  yarn test:unit
```

## Thanks
- All exercises are taked from [WGER](https://wger.de/). 

## Things I learned

- Element lib
  - I hadn't seen that element-ui had alerts/notifications before I made my own component 🙃
- Some Firebase Realtime functions
  - Update (with 1 or more alterations)
  - Use promises (*Realtime* is actually with ws, so isn't default to run asynchronous)
  - Definitely how to make rules
- Add ts types on Vue Refs
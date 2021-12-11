# Database explanation

I used [Firebase](https://firebase.google.com/) to maintain the application data.
It is kinda hard to understand at first time reading, but I will try to explain in a simple way

## The rules
```json
"exercises": {
  ".write": "auth != null",
  ".read": "auth != null",
  "$exercise": {
    ".read": "auth != null",
    ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id) && data.child('default').val() === false",
  }
},
"workouts": {
  ".write": "auth != null",
  ".read": "auth != null",
  "$workout": {
    ".read": "auth != null && data.child('authorId').val() == auth.id",
    ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
  }
}
```

*In a few words*: 
- You **can** see all exercises.
- You **can** see your workouts.
- You **can** edit your workouts and exercises.
- You **can't** do nothing if are not logged in.
- You **can't** edit nothing that are not yours.

---

## Well, lets understand it
That definetily is the most boring part of the project.

*And sorry for the big rules* 🙃

- `auth != null` = user logged
- `!data.exists()` = check if data doesnt exist
  - If the data doesnt exists you can create it. This is necessary because *.write* means create and update.
- `data.child('authorId').val() == auth.id` = check if the data being writed is from the same user that created it
  - That make exercises and workouts personal, no one can edit it if isn't from itself


## Firebase syntax

The only complication is in the syntax
Thanks Google for explain everything [**here**](https://firebase.google.com/docs/database/security/core-syntax)

- .read -> permission to get data
- .write -> permission to update data
- .validate -> check if data is valid 
- .indexOn -> choose a child to be the key of data
- The rules *read* and *write* are **cascade**.
- Keys with **names** are keys from data "tables"
- Key with **$** is the child
- Key with **.** is a rule
- Values are **conditions** (for the rules)

---

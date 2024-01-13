# Firestore/Firebase Storage Structure Plan

## Phase 1: Basic Structure

### Firestore Structure

#### Collections
- `lessons`
- `activities`

#### Lessons Collection
- **Document**: Each `lesson`
  - `topic`: String
  - `ageGroup`: String
  - `duration`: Number
  - `level`: String
  - `objectives`: String
  - `contentRef`: Map
    - `plan`: String (URL to Firestore Storage `plan.md`)
    - `handout`: String (URL to Firestore Storage `handout.md`)
  - `activities`: Array of DocumentReferences
  - `createdAt`: Timestamp (date and time the lesson was created)
  - `updatedAt`: Timestamp (date and time the lesson was last updated)


#### Activities Collection
- **Document**: Each `activity`
  - `title`: String
  - `description`: String
  - `contentRef`: Map
  - `createdAt`: Timestamp (date and time the activity was created)
  - `updatedAt`: Timestamp (date and time the activity was last updated)

### Firebase Storage Structure

- Directories for each `lesson` and `activity`
- Store markdown, HTML, audio, video files

## Phase 2: Incorporating Users

### Additional Firestore Collections

- `users`
- `groups` (optional)

### Users Collection
- **Document**: Each `user`
  - Fields like `name`, `email`, `groups` (Array of DocumentReferences)

### Groups Collection
- **Document**: Each `group`
  - Fields like `name`, `members` (Array of DocumentReferences)

### Updated Lessons and Activities Collections
- Add `owner`: DocumentReference
- Add `visibility`: String/Enum (`public`, `private`, `group`)
- Add `editableBy`: Array of DocumentReferences

### Security Rules Updates
- Rules to check `owner`, `visibility`, `editableBy` for access control

### Firebase Storage
- Same structure as Phase 1

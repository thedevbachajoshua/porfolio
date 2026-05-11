# Security Specification for Guestbook App

## Data Invariants
- A guestbook entry must have a non-empty `name` (max 100 chars).
- A guestbook entry must have a non-empty `message` (max 500 chars).
- `createdAt` must be set to `request.time` (server timestamp).
- Entries are public (anyone can read/list).
- Anyone can create an entry (anonymous/public access is intended here as it's a "guestbook", but I should verify if the user wants public or authenticated). 
  - *Correction*: The app currently allows `addDoc` without checking auth in the UI. I'll allow public creation but with strict validation.

## The "Dirty Dozen" Payloads (Target: /guestbook/{entryId})

1. **Identity Spoofing**: Attempt to create an entry with a spoofed `id` (handled by Firestore).
2. **Resource Poisoning**: Create an entry with a `message` that is 1MB of text.
3. **Resource Poisoning**: Create an entry with a `name` that is 1MB of text.
4. **Schema Bypass**: Create an entry with a `extraField: "hack"`.
5. **Schema Bypass**: Create an entry with missing `name`.
6. **Schema Bypass**: Create an entry with `createdAt` as a string instead of timestamp.
7. **Temporal Poisoning**: Create an entry with `createdAt` set to a date in the past.
8. **Temporal Poisoning**: Create an entry with `createdAt` set to a date in the future.
9. **Update Attack**: Attempt to update an existing entry (Guestbook entries should be immutable).
10. **Delete Attack**: Attempt to delete an existing entry (Only admin/owner should delete, but here let's say NO deletion by users).
11. **ID Poisoning**: Request a document with a 2KB long ID string.
12. **Malicious Query**: List entries where `message != ""` (Standard list, but rules should restrict).

## Test Runner (firestore.rules.test.ts)
```typescript
// (Placeholder for actual test runner if environment supports it, 
// but I will follow the instructions to describe the tests)
```

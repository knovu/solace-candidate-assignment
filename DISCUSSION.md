# Problem statement

At Solace, we aim to match patients with the advocate who is best suited to their needs. To support this goal, we have a table of all of our advocates with some information about them that the patient can search on to find the best match. For this assignment, we have an initial version of this table built in a NextJS application, however it was built by an AI chimpanzee who hadn’t had his latest update yet so it’s full of bugs, bad patterns, and performance pitfalls.

## Requirements

### 1. Project Enhancements (Code Quality & Best Practices)

#### ✅ Enforce TypeScript Best Practices

- Update tsconfig to strict mode (`noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`)
- Centralized shared resources in `lib` (`types`, `utils`, `constants`, `config`)

#### ✅ Improve Linting & Formatting

- Enforce ESLint rules (e.g. disallow console.log)
- Integrate Prettier for consistent formatting

#### ✅ Improve Environment Variable Management

- Create a `getEnv` and `getOptionalEnv` function that ensure variables are set properly
- Use `.env` for centralized config in **Docker Compose** & **Drizzle ORM**

---

### 2. Database & API Enhancements

#### ✅ Database Optimization

- Add proper indexes to improve search performance
- Use **env-based configuration** for database connection options

#### ✅ API Enhancements

- Implement lite cache service (use map maybe?) for showcasing caching knowledge
- Implement advocate service for dynamically pulling data from DB or static data
- Define a strongly-typed API interface for:
    - limit
    - offset
    - search term (supports full-text search)
- Validate max allowed limit/offset params

---

### 3. Client-Side Improvements

#### ✅ Improve UI Development Workflow / Bugs

- Migrate Tailwind to **Chakra UI** for consistent, accessible components
- Add **React Query** for caching, request states, and pagination
- Create reusable **paginated** table for displaying advocates
- Implement useGetAdvocates hook to handle paginated API calls
- Add a global **error handler** (e.g. Chakra UI toast notifications)

---

### 4. Future Improvements

1. Change phone number to be a `VARCHAR(10)` from `BIGINT`
2. Handle case sensitivity for searching
3. Make cache service a static class to only allow one instance of the cache available everywhere (mocking dependency injection)
4. Add unit test libs like next testing, and react test lib for TDD

`rubber duck :)`

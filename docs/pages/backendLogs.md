[< Home](index.md)

# Logs in the backend

I created a logger module using the [Pino](https://github.com/pinojs/pino) library.

It can be used inside all the code inside the `@/backend` folder, and it adapts automatically its behavior based on the environment (development or production).

In production it logs to JSON-line files, splitting files by day and every 10 MB.

In development it logs to the console using pino-pretty.

All debug-level messages are ignored in production.

## Usage

```typescript
import logger from '@/backend/utils/logger'

logger.debug({ some: 'data' }, 'This is an info message')
logger.info({ some: 'data' }, 'This is an info message')
logger.warn({ some: 'data' }, 'This is an info message')
logger.error({ some: 'data' }, 'This is an info message')
```

## Logs messages

### User and sessions apis - 001

- 001-001 `warn` Login attempt with unused email `{ email }`
- 001-002 `warn` Login failed `{ userId, email }`
- 001-003 `info` Login successful  `{ userId, email }`
- 001-004 `info` New user session created `{ userId, email, userSessionId }`
- 001-005 `warn` Create user attempt with mail already in use `{ userId, email}`
- 001-006 `info` New user created `{ userId, email }`
- 001-007 `info` Refresh token expired
- 001-008 `warn` No valid token provided for token refresh
- 001-009 `warn` Refresh token attempt for a non found session `{ userId, email }`
- 001-010 `warn` Refresh token attempt for disabled session `{ userId, email, userSessionId }`
- 001-011 `warn` Refresh token attempt for a disabled user `{ userId, email }`
- 001-012 `warn` Refresh token attempt for a non found user `{ userId }`
- 001-013 `info` User session refreshed `{ userId, email, userSessionId, userSessionAccessId }`
- 001-014 `info` Veryify token attempt failed
- 001-015 `info` User token verified `{ userId, email }`
- 001-016 `warn` Logout attempt with invalid token
- 001-017 `warn` Logout attempt but no session found in db
- 001-018 `warn` Logout attempt for a disabled user session `{ userId }`
- 001-019 `info` Logout successful `{ userId, email, userSessionId, userSessionAccessId }`
# Roles and Permissions

## Overview

Reacterial uses a role-based access control (RBAC) system with two roles defined in the User model (`apps/admin/src/db/models/index.js`).

## Roles

| Role    | Description                                                                                  |
| ------- | -------------------------------------------------------------------------------------------- |
| `user`  | Default role assigned to all new accounts (both credentials registration and OAuth sign-in). |
| `admin` | Elevated role with full access to user management and system operations.                     |

## Permissions Matrix

| Action                     | `user` | `admin` |
| -------------------------- | ------ | ------- |
| View own profile           | Yes    | Yes     |
| Edit own profile           | Yes    | Yes     |
| View other users' profiles | No     | Yes     |
| Edit other users' profiles | No     | Yes     |
| Change user roles          | No     | Yes     |
| Register new users         | No     | Yes     |
| Delete users               | No     | Yes     |

## How Roles Are Assigned

- **Credentials registration** (`POST /api/users/register`): Role is always set to `user`. The role field from the request body is ignored to prevent privilege escalation.
- **Google OAuth sign-in** (`[...nextauth].ts` JWT callback): New OAuth users are created with `role: 'user'`.
- **Role changes**: Only an `admin` can change another user's role via `PUT /api/users/[id]`.

## Default Admin Account

The database seed provides one admin account:

- **Email**: `admin@reacterial.com`
- **Password**: `admin123`

## API Route Enforcement

| Route                 | Method | Access                                               |
| --------------------- | ------ | ---------------------------------------------------- |
| `/api/users/register` | POST   | `admin` only                                         |
| `/api/users/[id]`     | GET    | Own profile or `admin`                               |
| `/api/users/[id]`     | PUT    | Own profile or `admin` (role field requires `admin`) |
| `/api/users/[id]`     | DELETE | `admin` only                                         |

## Session Structure

After authentication, the session object contains the user's role:

```typescript
session.user.role; // 'user' | 'admin'
```

This is populated through the NextAuth JWT and session callbacks in `pages/api/auth/[...nextauth].ts`.

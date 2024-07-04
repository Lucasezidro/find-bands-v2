import { ActionsSubjectAbility } from './ability'

export type UserPermissions = 'ADMIN' | 'FINDER' | 'MEMBER'

export function getAbilitiesByUser(user: UserPermissions) {
  const abilities: Record<UserPermissions, ActionsSubjectAbility[]> = {
    ADMIN: [
      { action: 'create', subject: 'member' },
      { action: 'delete', subject: 'member' },
      { action: 'update', subject: 'member' },

      { action: 'create', subject: 'user' },

      { action: 'create', subject: 'band' },
      { action: 'update', subject: 'band' },
      { action: 'delete', subject: 'band' },
    ],
    MEMBER: [
      { action: 'update', subject: 'member' },
      { action: 'create', subject: 'user' },
    ],
    FINDER: [{ action: 'create', subject: 'user' }],
  }

  return abilities[user]
}

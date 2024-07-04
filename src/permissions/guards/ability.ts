import { createMongoAbility } from '@casl/ability'

export type Action = 'create' | 'update' | 'delete' | 'get'
export type Subject = 'band' | 'user' | 'member'

export type ActionsSubjectAbility = {
  action: Action
  subject: Subject
}

export function buildAbility(abilities: ActionsSubjectAbility[]) {
  const ability = createMongoAbility<[Action, Subject]>()
  ability.update(abilities)

  return ability
}

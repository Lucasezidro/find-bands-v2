import { api } from './api-client'

interface CreateMemberRequest {
  name: string
  email: string
  office: string
  avatar: string
  bandRoleId: string
}
type CreateMemberResponse = void

export async function createMember({
  name,
  email,
  office,
  avatar,
  bandRoleId,
}: CreateMemberRequest): Promise<CreateMemberResponse> {
  await api.post('create-member', {
    json: {
      name,
      email,
      office,
      avatar,
      bandRoleId,
    },
  })
}

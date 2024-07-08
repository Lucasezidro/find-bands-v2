import { api } from './api-client'

interface GetProfileUserResponse {
  member: {
    id: string
    name: string
    role: 'ADMIN' | 'MEMBER' | 'FINDER'
    bandRoleId: string
    office: string
    avatar?: string
    email: string
    createdAt: Date
    updatedAt: Date
  }
}

export async function getMember(memberId: string) {
  const response = await api
    .get(`member/${memberId}`)
    .json<GetProfileUserResponse>()

  return response
}

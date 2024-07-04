import { api } from './api-client'

export interface GetMembersByBandId {
  members: {
    id: string
    name: string
    email: string
    office: string
    avatar?: string
    createdAt: Date
    updatedAt: Date
    bandRoleId: string
  }[]
}

export async function getMembersByBandId(bandId: string | null) {
  const response = await api
    .get(`get-members/${bandId}`)
    .json<GetMembersByBandId>()

  return response
}

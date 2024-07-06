import { api } from './api-client'

export interface GetBandsResponse {
  band: {
    bandId?: string
    bandName: string
    style: string
    description: string
    createdAt?: Date
    updatedAt?: Date
    userAdminId: string
  }
}

export async function getBands(userId: string) {
  const response = await api.get(`band/${userId}`).json<GetBandsResponse>()

  return response
}

import { api } from './api-client'

export interface GetBandsResponse {
  bands: {
    bandId?: string
    bandName: string
    style: string
    description: string
    createdAt?: Date
    updatedAt?: Date
    userAdminId: string
  }[]
}

export async function getBands(userId: string) {
  const response = await api.get(`bands/${userId}`).json<GetBandsResponse>()

  return response
}

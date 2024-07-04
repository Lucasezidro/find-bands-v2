import { api } from './api-client'

export interface GetBandsResponse {
  band: {
    bandId: string
    bandName: string
    style: string
    description: string
    createdAt: Date
    updatedAt: Date
    userAdminId: string
    member: {
      name: string
      email: string
      avatar: string
    }
  }
}

export async function getBandById(bandId: string | null) {
  const response = await api.get(`list-band/${bandId}`).json<GetBandsResponse>()

  return response
}

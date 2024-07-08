import { api } from './api-client'

export interface ListBandsResponse {
  bands: {
    bandId: string
    bandName: string
    style: string
    favoritCount: number
    isFavorit: boolean
    messages: string
    description: string
    createdAt: Date
    updatedAt: Date
    userAdminId: string
  }[]
}

export async function listBands() {
  const response = await api.get('list-bands').json<ListBandsResponse>()

  return response
}

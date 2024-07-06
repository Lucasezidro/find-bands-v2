import { api } from './api-client'

export async function deleteMemberHTTP(id: string) {
  await api.delete(`member/${id}`)
}

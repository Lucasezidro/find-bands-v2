import { api } from './api-client'

interface GetProfileUserResponse {
  user: {
    userId: string
    name: string
    role: 'ADMIN' | 'MEMBER' | 'FINDER'
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
  }
}

export async function getProfile() {
  const response = await api.get('profile').json<GetProfileUserResponse>()

  return response
}

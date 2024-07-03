import { api } from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}
type SignUpResponse = void

export async function signUpHTTP({
  name,
  email,
  password,
}: SignUpRequest): Promise<SignUpResponse> {
  await api.post('create-account', {
    json: {
      name,
      email,
      password,
    },
  })
}

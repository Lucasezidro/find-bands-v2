import { api } from './api-client'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  token: string
}

export async function signInHTTP({ email, password }: SignInRequest) {
  const response = await api
    .post('auth/sign-in', {
      json: {
        email,
        password,
      },
    })
    .json<SignInResponse>()

  return response
}

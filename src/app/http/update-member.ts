import { api } from './api-client'

interface GetProfileUserResponse {
  id: string
  name: string
  bandRoleId: string
  office: string
  avatar?: string
  email: string
}

export async function updateMemberHTTP({
  id,
  name,
  email,
  bandRoleId,
  office,
  avatar,
}: GetProfileUserResponse) {
  const response = await api
    .put(`member/save/${id}`, {
      json: {
        id,
        name,
        email,
        bandRoleId,
        office,
        avatar,
      },
    })
    .json<GetProfileUserResponse>()

  return response
}

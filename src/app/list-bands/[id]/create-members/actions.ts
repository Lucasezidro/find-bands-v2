'use server'

import { createMember } from '@/app/http/create-member'
import { HTTPError } from 'ky'
import { z } from 'zod'

const createMemberSchema = z.object({
  name: z.string().refine((value) => value.split(' ').length > 1, {
    message: 'Por favor, digite nome e sobrenome!',
  }),
  email: z.string().email({ message: 'Por favor, digite um e-mail válido' }),
  office: z.string().min(1, { message: 'A função do membro e obrigatoria' }),
  avatar: z.string().optional(),
  bandRoleId: z.string().uuid(),
})

export async function createMemberAction(data: FormData) {
  const response = createMemberSchema.safeParse(Object.fromEntries(data))

  if (!response.success) {
    const errors = response.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, bandRoleId, office, avatar } = response.data

  try {
    await createMember({
      name,
      email,
      office,
      avatar: avatar ?? '',
      bandRoleId,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message:
        'Um erro inexperado aconteceu, tente novamente em alguns minutos.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}

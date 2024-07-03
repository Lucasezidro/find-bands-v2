'use server'

import { signUpHTTP } from '@/app/http/sign-up'
import { HTTPError } from 'ky'
import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, digite nome e sobrenome!',
    }),
    email: z.string().email({ message: 'Por favor, digite um e-mail válido' }),
    password: z
      .string()
      .min(6, { message: 'A senha precisa conter no mínimo 6 caracteres' }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas precisam ser iguais',
    path: ['password_confirmation'],
  })

export async function signUp(data: FormData) {
  const response = signUpSchema.safeParse(Object.fromEntries(data))

  if (!response.success) {
    const errors = response.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, email, password } = response.data

  try {
    await signUpHTTP({
      name,
      email,
      password,
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

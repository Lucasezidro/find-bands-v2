'use server'

import { signInHTTP } from '@/app/http/sign-in'
import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

const signInSchema = z.object({
  email: z.string().email({ message: 'O e-mail não é válido!' }),
  password: z
    .string()
    .min(1, { message: 'Por favor, forneça uma senha válida!' }),
})

export async function signIn(data: FormData) {
  const response = signInSchema.safeParse(Object.fromEntries(data))

  if (!response.success) {
    const errors = response.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = response.data

  try {
    const { token } = await signInHTTP({
      email,
      password,
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
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

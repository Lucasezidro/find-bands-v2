import { getBands } from '@/app/http/get-bands'
import { getProfile } from '@/app/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfile()

    return { user }
  } catch (err) {
    console.error(err)
  }

  redirect('/api/auth/sign-out')
}

export async function getBandByuserId() {
  const { user } = await auth()

  console.log(user.userId)

  if (!user) {
    return null
  }

  const bands = await getBands(user.userId)

  return bands
}

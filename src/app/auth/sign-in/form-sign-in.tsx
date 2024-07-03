'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/navigation'
import { signIn } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export function FormSignIn() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signIn,
    () => router.push('/'),
  )

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-300 dark:bg-zinc-900 p-8 w-[30rem] rounded-lg space-y-6 flex flex-col"
    >
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <Label htmlFor="email">E-mail</Label>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="exemple@email.com"
      />

      {errors?.email && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors.email[0]}
        </p>
      )}

      <Label htmlFor="password">Senha</Label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="min. 6 caractéres"
      />

      {errors?.password && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors.password[0]}
        </p>
      )}

      <Button disabled={isPending} type="submit">
        Entrar
      </Button>

      <Button
        variant="ghost"
        type="button"
        onClick={() => router.push('/list-bands')}
      >
        Ver bandas sem fazer login
      </Button>
    </form>
  )
}

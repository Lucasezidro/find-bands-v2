'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signUp } from './actions'
import { useFormState } from '@/hooks/use-form-state'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export function FormSignUp() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUp,
    () => {
      router.push('/auth/sign-in')
    },
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

      <Label htmlFor="name">Nome de usuário</Label>
      <Input type="text" id="name" name="name" placeholder="John Doe" />

      {errors?.name && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors.name[0]}
        </p>
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

      <Label htmlFor="password_confirmation">Confirme a Senha</Label>
      <Input
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        placeholder="min. 6 caractéres"
      />

      {errors?.password_confirmation && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {errors.password_confirmation[0]}
        </p>
      )}

      <Button type="submit" disabled={isPending}>
        Cadastrar
      </Button>
    </form>
  )
}

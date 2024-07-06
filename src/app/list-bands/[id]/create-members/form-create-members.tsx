'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { createMemberAction } from './actions'

interface FormCreateMembersProps {
  bandId: string
}

export function FormCreateMembers({ bandId }: FormCreateMembersProps) {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(createMemberAction)

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Cadastrar membros</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-300 dark:bg-zinc-900 p-8 w-[30rem] rounded-lg space-y-6 flex flex-col"
      >
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro ao criar o membro</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        {success === true && message && (
          <Alert variant="success">
            <AlertTriangle className="size-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <Label htmlFor="name">Nome de Membro</Label>
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

        <Label htmlFor="office">Função</Label>
        <Input
          type="text"
          id="office"
          name="office"
          placeholder="Ex: Guitarrista"
        />

        {errors?.office && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.office[0]}
          </p>
        )}

        <Label htmlFor="avatar">Imagem de perfil</Label>
        <Input type="text" id="avatar" name="avatar" />

        {errors?.avatar && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.avatar[0]}
          </p>
        )}

        <Label htmlFor="bandRoleId">Confirme a Senha</Label>
        <Input type="text" id="bandRoleId" name="bandRoleId" value={bandId} />

        {errors?.bandRoleId && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.bandRoleId[0]}
          </p>
        )}

        <Button type="submit" disabled={isPending}>
          Cadastrar Membro
        </Button>
      </form>
    </>
  )
}

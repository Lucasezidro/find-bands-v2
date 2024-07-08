'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { updateMemberAction } from './actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface FormEditMemberProps {
  member: {
    id: string
    name: string
    role: 'ADMIN' | 'MEMBER' | 'FINDER'
    bandRoleId: string
    office: string
    avatar?: string | undefined
    email: string
    createdAt: Date
    updatedAt: Date
  }
  bandId: string
}

export function FormEditMember({ member, bandId }: FormEditMemberProps) {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(updateMemberAction)

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

        <Label htmlFor="name">Nome de Membro</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={member.name}
        />

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
          defaultValue={member.email}
        />

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}

        <Label htmlFor="office">Função</Label>
        <Input
          type="text"
          id="office"
          name="office"
          placeholder="Ex: Guitarrista"
          defaultValue={member.office}
        />

        {errors?.office && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.office[0]}
          </p>
        )}

        <Label htmlFor="avatar">Imagem de perfil</Label>
        <Input
          type="text"
          id="avatar"
          name="avatar"
          defaultValue={member.avatar}
        />

        <Label htmlFor="id">Id do membro</Label>
        <Input type="text" id="id" name="id" defaultValue={member.id} />

        {errors?.bandRoleId && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.bandRoleId[0]}
          </p>
        )}

        <Label htmlFor="bandRoleId">Id da banda</Label>
        <Input
          type="text"
          id="bandRoleId"
          name="bandRoleId"
          defaultValue={bandId}
        />

        {errors?.bandRoleId && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.bandRoleId[0]}
          </p>
        )}

        <Button disabled={isPending} type="submit">
          Editar Membro
        </Button>
      </form>
    </>
  )
}

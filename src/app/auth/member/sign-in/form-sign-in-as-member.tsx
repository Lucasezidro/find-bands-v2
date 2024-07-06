'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function FormSignInAsMember() {
  return (
    <form className="bg-zinc-300 dark:bg-zinc-900 p-8 w-[30rem] rounded-lg space-y-6 flex flex-col">
      <Label htmlFor="email">E-mail</Label>
      <Input
        type="email"
        id="email"
        name="email"
        placeholder="exemple@email.com"
      />

      <Label htmlFor="password">Senha</Label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="min. 6 caractéres"
      />

      <Button
        className="text-muted-foreground hover:text-primary-foreground dark:hover:text-secondary-foreground"
        variant="link"
      >
        Ainda nao cadastrei uma senha
      </Button>

      <Button type="submit">Entrar</Button>
    </form>
  )
}

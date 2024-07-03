import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { FormSignUp } from './form-sign-up'

export default function SignIn() {
  return (
    <div className="space-y-4 flex flex-col w-[30rem] items-center">
      <div className="absolute right-16 top-7 space-x-4">
        <Link
          className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
          href="/auth/sign-in"
        >
          Acessar minha conta
        </Link>
      </div>
      <h1 className="text-xl font-bold">Criar minha conta</h1>

      <Separator />

      <FormSignUp />
    </div>
  )
}

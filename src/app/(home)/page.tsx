import { FinderUser } from '@/components/finder-user'
import { HighLightedBands } from '@/components/highlighted-bands'
import { auth } from '@/permissions/permissions'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const { user } = await auth()

  return (
    <>
      <div className="flex items-center gap-4 absolute right-16 top-7">
        <a
          className="text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-2"
          href="/api/auth/sign-out"
        >
          <LogOut className="size-4" />
          Sair
        </a>
      </div>
      <main className="flex flex-col space-y-24 items-center justify-center">
        <h1 className="mt-10 text-2xl font-bold">Bem vindo {user.name}</h1>

        <div className="text-center">
          <h2 className="mb-6 text-xl font-bold">
            Aqui voce encontra os dados de sua banda
          </h2>

          <span className="text-muted-foreground">
            Quer ver a listagem de outras bandas ?{' '}
            <Link
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
              href="/list-bands"
            >
              Clique aqui
            </Link>
          </span>
        </div>

        {user.role === 'ADMIN' && <HighLightedBands />}
        {user.role === 'FINDER' && <FinderUser />}
      </main>
    </>
  )
}

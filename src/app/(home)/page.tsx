import { HighLightedBands } from '@/components/highlighted-bands'
import { auth } from '@/permissions/permissions'
import Link from 'next/link'

export default async function Home() {
  const { user } = await auth()

  return (
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
            href="/register-band"
          >
            Clique aqui
          </Link>
        </span>
      </div>

      <div>
        <HighLightedBands />
      </div>
    </main>
  )
}

import Link from 'next/link'
import { SearchBands } from './search-bands-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Music } from 'lucide-react'
import { listBands } from '../http/list-bands'
import { ButtonBandPageRedirect } from './button-band-page-redirect'

export default async function FindBands() {
  const { bands } = await listBands()

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="absolute right-16 top-7 space-x-4">
        <Link
          className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
          href="/auth/sign-up"
        >
          Criar uma conta
        </Link>
        <Link
          className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
          href="/auth/sign-in"
        >
          Acessar minha conta
        </Link>
      </div>

      <div className="flex flex-col items-center gap-8 w-[35rem] text-center mt-8">
        <h1 className="text-2xl font-bold">
          Encontre a banda ideal para o seu evento!
        </h1>

        <span className="text-sm text-muted-foreground">
          Buque pelas bandas para entrar em contato com a banda ideal para o seu
          evento!
        </span>

        <SearchBands />

        <div className="grid grid-cols-3 w-[80rem] h-[20rem] gap-4 mt-10 relative">
          {bands.map((band) => {
            return (
              <Card key={band.bandId}>
                <CardHeader>
                  <CardTitle>{band.bandName}</CardTitle>

                  <CardDescription>{band.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-bold flex items-center justify-center gap-2">
                      Sobre a banda:
                      <Music />
                    </h2>
                    <span className="text-sm text-muted-foreground font-semibold">
                      uma banda de: {band.style}
                    </span>
                  </div>

                  <ButtonBandPageRedirect bandId={band.bandId} />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}

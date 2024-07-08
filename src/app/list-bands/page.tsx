import Link from 'next/link'
import { SearchBands } from './search-bands-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Heart, Music } from 'lucide-react'
import { listBands } from '../http/list-bands'
import { ButtonBandPageRedirect } from './button-band-page-redirect'
import { cookies } from 'next/headers'
import { auth } from '@/permissions/permissions'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default async function FindBands() {
  const { user } = await auth()
  const { bands } = await listBands()
  const isUserLoogedIn = !!cookies().get('token')?.value

  const sortedBands = [...bands].sort((a, b) => {
    if (a.userAdminId === user.userId) return -1
    if (b.userAdminId === user.userId) return 1
    return 0
  })

  return (
    <main className="flex flex-col items-center justify-center">
      {isUserLoogedIn ? (
        <div className="absolute right-16 top-7 space-x-4">
          <Link
            className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
            href="/"
          >
            Voltar para pagina principal
          </Link>
        </div>
      ) : (
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
      )}

      <div className="flex flex-col items-center gap-8 w-[35rem] text-center mt-8">
        <h1 className="text-2xl font-bold">
          Encontre a banda ideal para o seu evento!
        </h1>

        <span className="text-sm text-muted-foreground">
          Buque pelas bandas para entrar em contato com a banda ideal para o seu
          evento!
        </span>

        <SearchBands />

        <div className="grid grid-cols-3 w-[80rem] h-[20rem] gap-4 mt-10">
          {sortedBands.map((band) => {
            return (
              <Card
                key={band.bandId}
                data-admin={user.userId === band.userAdminId}
                className="flex flex-col justify-between gap-4 data-[admin=true]:border-emerald-700"
              >
                <CardHeader>
                  <div>
                    <div className="space-y-4">
                      <CardTitle className="flex items-center gap-20 relative">
                        {band.bandName}

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="flex items-center gap-2 text-sm absolute right-0 top-0 text-red-600 dark:text-red-500">
                                <Heart className="size-3" />
                                {band.favoritCount}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              Quantidade de usuarios que marcaram essa banda
                              como favorita
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </CardTitle>

                      <CardDescription>{band.description}</CardDescription>
                    </div>
                    {user.userId === band.userAdminId && (
                      <>
                        <Separator className="mt-4" />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <div className="mt-4">
                                <Badge variant="success">Admin</Badge>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              Você é administrador desta banda.
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </>
                    )}
                  </div>
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

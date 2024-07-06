'use client'

import { deleteMemberHTTP } from '@/app/http/delete-member'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/helpers/format-date'
import { buildAbility } from '@/permissions/guards/ability'
import { Can, GuardContext } from '@/permissions/guards/guards-context'
import { getAbilitiesByUser } from '@/permissions/guards/user-abilities'
import { AlertCircle, Check, FileMusic, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface BandPageProps {
  members: {
    id: string
    name: string
    email: string
    office: string
    avatar?: string
    createdAt: Date
    updatedAt: Date
    bandRoleId: string
  }[]
  band: {
    bandId: string
    bandName: string
    style: string
    description: string
    createdAt: Date
    updatedAt: Date
    userAdminId: string
  }
  role: 'ADMIN' | 'MEMBER' | 'FINDER'
  isUserBandAdmin: boolean
}

export function BandPageById({
  members,
  band,
  role,
  isUserBandAdmin,
}: BandPageProps) {
  const router = useRouter()

  const userAbilities = getAbilitiesByUser(role)
  const ability = buildAbility(userAbilities)

  async function deleteMember(memberId: string) {
    await deleteMemberHTTP(memberId).then(() =>
      toast.success('Membro removido com sucesso!'),
    )
  }

  return (
    <GuardContext.Provider value={ability}>
      <>
        <div className="flex items-center gap-4 absolute right-16 top-7">
          <Link
            className="text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
            href="/list-bands"
          >
            Voltar para lista
          </Link>
          <Link
            className="text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
            href="/"
          >
            Voltar para minha pagina
          </Link>
        </div>
        <main className="flex flex-col items-center mt-10">
          <h1 className="text-2xl font-bold flex gap-2 truncate">
            <span className="text-2xl font-normal">Banda</span> {band.bandName}
          </h1>

          <div className="grid grid-cols-8 w-[100rem] h-[45rem] mt-10">
            <div className="col-span-2 flex flex-col gap-4 p-8 border-r border-muted-foreground items-center">
              <h1 className="font bold truncate">
                Alguns dos eventos da{' '}
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                  {band.bandName}
                </span>{' '}
                :
              </h1>

              <div className="mt-56">
                <span className="flex flex-col items-center gap-4 justify-center text-muted-foreground">
                  <FileMusic className="size-10" />
                  Ainda não ha eventos para serem exibidos.
                </span>
              </div>
            </div>

            <div className="col-span-4 p-8 flex flex-col items-center gap-4 border-r border-muted-foreground">
              <h1 className="text-xl font-bold">
                Conheça os membros da {band.bandName}
              </h1>

              {members.length === 0 && (
                <div className="flex flex-col items-center gap-4 mt-24">
                  <h1 className="text-xl font-bold">
                    Ainda não ha Membros cadastrados.
                  </h1>

                  <span className="text-sm text-muted-foreground">
                    Cadastre agora mesmo!
                  </span>

                  <Button
                    onClick={() =>
                      router.push(`/list-bands/${band.bandId}/create-members`)
                    }
                    className="mt-10"
                  >
                    Cadstrar Membro
                  </Button>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {members.map((member) => {
                  return (
                    <Card key={member.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-4 items-center">
                            <Avatar>
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback />
                            </Avatar>
                            <CardTitle>{member.name}</CardTitle>
                          </div>

                          <div>
                            <Can I="delete" a="member">
                              {isUserBandAdmin && (
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost">
                                      <Trash2 className="size-5 text-red-700 dark:text-red-500" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Tem certeza que deseja excluir o membro{' '}
                                        {member.name} da banda ?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription className="flex items-center gap-2">
                                        <AlertCircle className="text-red-500" />
                                        Apos exluir o membro não podera ser
                                        desfeito
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => deleteMember(member.id)}
                                      >
                                        Sim, desejo excluir
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              )}
                            </Can>
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {member.email}
                        </span>
                      </CardHeader>

                      <CardContent>
                        <span className="text-sm">
                          O(a) {member.name} é integrante da{' '}
                          <span className="font-bold">{band.bandName}</span>{' '}
                          desde{' '}
                          <span className="font-bold">
                            {formatDate(member.createdAt.toString())}
                          </span>{' '}
                          e faz parte da banda como{' '}
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                            {member.office}
                          </span>
                        </span>

                        <Can I="update" a="member">
                          {isUserBandAdmin && (
                            <div className="mt-4">
                              <Button
                                onClick={() =>
                                  router.push(`/member/${member.id}`)
                                }
                                variant="secondary"
                              >
                                Editar dados
                              </Button>
                            </div>
                          )}
                        </Can>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="col-span-2 p-8 flex flex-col items-center gap-10">
              <span className="text-sm font-bold">
                Nós somos uma banda focada no estilo{' '}
                <span className="text-emerald-700 dark:text-emerald-400">
                  {band.style}
                </span>
              </span>

              {isUserBandAdmin && (
                <span className="text-emerald-700 dark:text-emerald-400 text-sm flex gap-2 items-center">
                  Você é administrador desta banda!
                  <Check className="size-5" />
                </span>
              )}

              <div className="text-center flex flex-col gap-2">
                <span className="text-sm mb-4">
                  Aqui segue uma breve descrição da {band.bandName}:
                </span>

                <p className="text-sm text-muted-foreground">
                  {band.description}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {isUserBandAdmin ? (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <Button
                      onClick={() =>
                        router.push(`/list-bands/${band.bandId}/create-members`)
                      }
                      variant="ghost"
                    >
                      Adicionar um novo membro
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="text-muted-foreground text-sm">
                      Se interssou ?
                    </span>
                    <Button>Clique aqui para entrar em contato</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </>
    </GuardContext.Provider>
  )
}

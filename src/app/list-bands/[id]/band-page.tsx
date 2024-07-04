'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/helpers/format-date'
import { buildAbility } from '@/permissions/guards/ability'
import { Can, GuardContext } from '@/permissions/guards/guards-context'
import { getAbilitiesByUser } from '@/permissions/guards/user-abilities'
import { FileMusic, Trash2 } from 'lucide-react'

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
}

export function BandPageById({ members, band, role }: BandPageProps) {
  const userAbilities = getAbilitiesByUser(role)
  const ability = buildAbility(userAbilities)

  return (
    <GuardContext.Provider value={ability}>
      <main className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold flex gap-2">
          <span className="text-2xl font-normal">Banda</span> {band.bandName}
        </h1>

        <div className="grid grid-cols-8 w-[100rem] h-[45rem] mt-10">
          <div className="col-span-2 flex flex-col gap-4 p-8 border-r border-muted-foreground items-center">
            <h1 className="font bold">
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
                            <Button variant="ghost">
                              <Trash2 className="size-5 text-red-700 dark:text-red-500" />
                            </Button>
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
                        <span className="font-bold">{band.bandName}</span> desde{' '}
                        <span className="font-bold">
                          {formatDate(member.createdAt.toString())}
                        </span>{' '}
                        e faz parte da banda como{' '}
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                          {member.office}
                        </span>
                      </span>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="col-span-2 p-8 flex flex-col items-center justify-between gap-10">
            <span className="text-sm font-bold">
              Nós somos uma banda focada no estilo{' '}
              <span className="text-emerald-700 dark:text-emerald-400">
                {band.style}
              </span>
            </span>

            <div className="text-center flex flex-col gap-2">
              <span className="text-sm mb-4">
                Aqui segue uma breve descrição da {band.bandName}:
              </span>

              <p className="text-sm text-muted-foreground">
                {band.description}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-muted-foreground text-sm">
                Se interssou ?
              </span>

              <Button>Clique aqui para entrar em contato</Button>
            </div>
          </div>
        </div>
      </main>
    </GuardContext.Provider>
  )
}

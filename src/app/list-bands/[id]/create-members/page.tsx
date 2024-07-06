import { getMembersByBandId } from '@/app/http/get-members-by-band-id'
import { FormCreateMembers } from './form-create-members'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

interface CreateMembersParams {
  params: {
    id: string
  }
}

export default async function CreateMembers(props: CreateMembersParams) {
  const { id } = props.params

  const { members } = await getMembersByBandId(id)

  return (
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
          href={`/list-bands/${id}`}
        >
          Voltar minha banda
        </Link>
      </div>
      <main>
        <div className="w-[60rem] absolute right-96 top-36 grid grid-cols-10 gap-8">
          <div className="col-span-4">
            <h1 className="text-xl font-bold truncate">Membros cadastrados:</h1>

            <div>
              {members.length === 0 ? (
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground truncate">
                    Ainda nao ha membros para serem exibidos.
                  </span>
                </div>
              ) : (
                <ul className="mt-4">
                  {members.map((member) => (
                    <div key={member.id}>
                      <li className="text-lg">{member.name}</li>
                      <li className="mt-2 text-sm text-muted-foreground">
                        {member.office}
                      </li>
                      <Separator className="mt-4 mb-4" />
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="col-span-6">
            <FormCreateMembers bandId={id} />
          </div>
        </div>
      </main>
    </>
  )
}

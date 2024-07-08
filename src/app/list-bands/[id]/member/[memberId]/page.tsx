import { getMember } from '@/app/http/get-member'
import { FormEditMember } from './form-edit-member'
import Link from 'next/link'

interface MemberParams {
  params: {
    memberId: string
    id: string
  }
}

export default async function Member(props: MemberParams) {
  const { memberId, id } = props.params

  const { member } = await getMember(memberId)

  return (
    <>
      <div className="flex items-center gap-4 absolute right-16 top-7">
        <Link
          className="text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
          href={`/list-bands/${id}`}
        >
          Voltar
        </Link>
      </div>
      <main className="flex flex-col gap-10 items-center justify-center">
        <div className="mt-7 w-max">
          <h1 className="text-2xl font-bold truncate">
            Editar dados do(a) membro(a) {member.name}
          </h1>
        </div>

        <div>
          <FormEditMember member={member} bandId={id} />
        </div>
      </main>
    </>
  )
}

import { getBandById } from '@/app/http/get-band-by-id'
import { getMembersByBandId } from '@/app/http/get-members-by-band-id'
import Link from 'next/link'
import { BandPageById } from './band-page'
import { auth } from '@/permissions/permissions'

interface BandParams {
  params: {
    id: string
  }
}

export default async function BandPage(props: BandParams) {
  const { user } = await auth()

  const { id } = props.params
  const { band } = await getBandById(id)
  const { members } = await getMembersByBandId(id)

  return (
    <>
      <Link
        className="absolute top-7 right-16 text-muted-foreground hover:text-emerald-700 dark:hover:text-emerald-400"
        href="/list-bands"
      >
        Voltar para lista
      </Link>
      <BandPageById band={band} members={members} role={user.role} />
    </>
  )
}

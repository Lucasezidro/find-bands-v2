import { getBandById } from '@/app/http/get-band-by-id'
import { getMembersByBandId } from '@/app/http/get-members-by-band-id'
import { BandPageById } from './band-page'
import { auth } from '@/permissions/permissions'
import { getEvents } from '@/app/http/get-events'

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

  const { events } = await getEvents(id)

  const isUserBandAdmin = user.userId === band.userAdminId

  return (
    <BandPageById
      band={band}
      members={members}
      events={events}
      role={user.role}
      isUserBandAdmin={isUserBandAdmin}
    />
  )
}

export interface BandPageProps {
  events: {
    eventId: string
    eventDate: Date
    location: string
    isEventHasPast: boolean | null
    eventImages: string | null
    eventSize: 'SMALL' | 'MEDIUM' | 'BIG'
    description: string | null
    createdAt: Date
    updatedAt: Date
    bandEventId: string
  }[]
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
    favoritCount: number
    isFavorit: boolean
    messages: string
    createdAt: Date
    updatedAt: Date
    userAdminId: string
  }
  role: 'ADMIN' | 'MEMBER' | 'FINDER'
  isUserBandAdmin: boolean
}

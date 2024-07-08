import { api } from './api-client'

interface GetEventsResponse {
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
}

export async function getEvents(bandId: string) {
  const response = await api.get(`events/${bandId}`).json<GetEventsResponse>()

  return response
}

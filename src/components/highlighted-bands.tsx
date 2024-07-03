import 'dayjs/locale/pt-br'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { auth } from '@/permissions/permissions'
import { ButtonRedirectToBandPage } from './button-redirect-to-bands-page'
import { getBands } from '@/app/http/get-bands'
import dayjs from 'dayjs'

export async function HighLightedBands() {
  dayjs.locale('pt-br')
  const { user } = await auth()

  const bands = await getBands(user.userId)

  function formatDate(date?: string) {
    return dayjs(date).format('DD[ de ]MMMM[ de ]YYYY')
  }

  return (
    <div className="max-w-[50rem] flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-8">Minha banda</h1>
      {bands &&
        bands?.bands.map((band) => {
          return (
            <Card key={band.bandId}>
              <CardHeader>
                <CardTitle>{band.bandName}</CardTitle>
                <CardDescription>{band.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div>
                  <span>
                    Cadastrado em {formatDate(band?.createdAt?.toString())}
                  </span>
                </div>

                <span className="flex items-center justify-center gap-1 mt-4">
                  A{' '}
                  <p className="text-emerald-700 dark:text-emerald-400">
                    {band.bandName}
                  </p>{' '}
                  tem como principal estilo o{' '}
                  <p className="text-emerald-700 dark:text-emerald-400">
                    {band.style}
                  </p>
                </span>

                <ButtonRedirectToBandPage bandId={band.bandId ?? ''} />
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}
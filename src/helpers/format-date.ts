import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'

export function formatDate(date?: string) {
  dayjs.locale('pt-br')

  return dayjs(date).format('DD[ de ]MMMM[ de ]YYYY')
}

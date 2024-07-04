import { Input } from '@/components/ui/input'

export function SearchBands() {
  return (
    <form className="max-w-[60rem] w-full" action="">
      <Input placeholder="Buque pelo nome da banda, ou por estilo." />
    </form>
  )
}

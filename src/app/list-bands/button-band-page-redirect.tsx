'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ButtonBandPageRedirectProps {
  bandId: string
}

export function ButtonBandPageRedirect({
  bandId,
}: ButtonBandPageRedirectProps) {
  const router = useRouter()

  function redirectToBandPage() {
    router.push(`/list-bands/${bandId}`)
  }

  return (
    <div className="max-w-[22rem] w-full absolute bottom-4">
      <Button onClick={redirectToBandPage} className="w-full">
        Ver detalhes
      </Button>
    </div>
  )
}

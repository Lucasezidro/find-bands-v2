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
    <Button onClick={redirectToBandPage} className="w-full mt-4">
      Ver detalhes
    </Button>
  )
}

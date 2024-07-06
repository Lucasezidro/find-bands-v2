'use client'

import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

interface ButtonRedirectToBandPageProps {
  bandId: string
}

export function ButtonRedirectToBandPage({
  bandId,
}: ButtonRedirectToBandPageProps) {
  const router = useRouter()

  function goToBandPage(bandId: string) {
    router.push(`/list-bands/${bandId}`)
  }

  return (
    <Button variant="link" onClick={() => goToBandPage(bandId)}>
      Ver detalhes
    </Button>
  )
}

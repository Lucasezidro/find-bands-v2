import { Button } from './ui/button'

export function FinderUser() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">
          Seja muito bem vindo a mais completa plataforma de bandas do Brasil.
        </h1>
        <span className="text-muted-foreground">
          Voce pode acessar a lista de bandas para encontrar a banda perfeita
          para o seu evento, ou entao clicar no botao abaixo para cadastrar a
          sua banda e receber convites!
        </span>
      </div>

      <div className="mt-10">
        <Button>Cadastrar minha banda</Button>
      </div>
    </main>
  )
}

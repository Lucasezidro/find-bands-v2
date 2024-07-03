import { SkipBack, SkipForward } from 'lucide-react'
import { ThemeSwitcher } from './theme/theme-switcher'

export function Logo() {
  return (
    <div className="flex justify-between p-5 absolute w-full">
      <div className="flex gap-3">
        <SkipBack className="text-muted-foreground" />
        <span className="text-emerald-600 dark:text-emerald-400">
          Find Bands
        </span>
        <SkipForward className="text-muted-foreground" />
      </div>

      <ThemeSwitcher />
    </div>
  )
}

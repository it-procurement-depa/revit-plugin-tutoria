import { MagnifyingGlass } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { DepaLogo } from '@/components/DepaLogo'

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <DepaLogo className="w-12 h-12 shadow-lg" />
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-wide font-audiowide">One Click Plugin</h1>
              <p className="text-xs text-muted-foreground font-medium">Revit Plugin Documentation</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tutorials, panels, or tools..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">Plugin Documentation</div>
            <div className="text-xs text-muted-foreground">Version 2023.1</div>
          </div>
        </div>
      </div>
    </header>
  )
}
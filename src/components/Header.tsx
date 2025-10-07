import { MagnifyingGlass, Video, FileText } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DepaLogo } from '@/components/DepaLogo'

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  showVideoGrid?: boolean
  onToggleView?: () => void
}

export function Header({ searchQuery = '', onSearchChange, showVideoGrid = false, onToggleView }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <DepaLogo />
          <h1 className="text-xl font-bold text-foreground tracking-wide font-audiowide">One Click Documentation</h1>
        </div>
        
        {onSearchChange && (
          <div className="relative flex-1 max-w-md mx-8">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search panels, videos, or documentation..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        )}
        
        {onToggleView && (
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onToggleView}
              className="flex items-center space-x-2"
            >
              {showVideoGrid ? <FileText className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{showVideoGrid ? 'List View' : 'Grid View'}</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
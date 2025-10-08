import { MagnifyingGlass, Video, FileText } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DepaLogo } from '@/components/DepaLogo'

interface HeaderProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
  showVideoGrid?: boolean
  onToggleView?: () => void
}

export function Header({ 
  searchQuery = '', 
  onSearchChange,
  showVideoGrid = false,
  onToggleView 
}: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-3">
      <div className="flex items-center justify-between max-w-full">
        <div className="flex items-center space-x-4">
          <DepaLogo />
          <h1 className="text-xl font-bold text-foreground tracking-wide font-audiowide">One Click Documentation</h1>
        </div>
        
        <div className="relative flex-1 max-w-md mx-8">
          <Input
            placeholder="Search panels, videos, or documentation..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-10"
          />
          <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleView}
          >
            {showVideoGrid ? <FileText className="w-4 h-4" /> : <Video className="w-4 h-4" />}
            <span className="ml-2">
              {showVideoGrid ? 'Documentation' : 'Video Grid'}
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
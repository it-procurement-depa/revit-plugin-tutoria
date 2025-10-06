import React, { useState, useRef, useCallback } from 'react'
import { 
  Info, 
  Certificate, 
  Wrench, 
  Ruler, 
  NumberTwo, 
  Heart,
  Toolbox,
  ArrowRight,
  GridFour,
  DotsSixVertical
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Panel } from '@/App'

interface PanelNavigationProps {
  selectedPanel: string
  onPanelSelect: (panelId: string) => void
}

const panels: Panel[] = [
  {
    id: 'all',
    name: 'All Documentation',
    icon: 'GridFour',
    description: 'Browse all available documentation',
    videoCount: 0
  },
  {
    id: 'about',
    name: 'About',
    icon: 'Info',
    description: 'Plugin overview and introduction',
    videoCount: 0
  },
  {
    id: 'licenses',
    name: 'Licenses Manager',
    icon: 'Certificate',
    description: 'License management and activation',
    videoCount: 0
  },
  {
    id: 'openings',
    name: 'Openings Tools',
    icon: 'Wrench',
    description: 'Opening creation and modification tools',
    videoCount: 0
  },
  {
    id: 'standards',
    name: 'Standards Tools',
    icon: 'Ruler',
    description: 'Standard compliance and setup tools',
    videoCount: 0
  },
  {
    id: 'step2',
    name: 'Step 2 Tools',
    icon: 'NumberTwo',
    description: 'Advanced workflow step 2 tools',
    videoCount: 0
  },
  {
    id: 'model-health',
    name: 'Model Health Tools',
    icon: 'Heart',
    description: 'Model validation and health checks',
    videoCount: 0
  },
  {
    id: 'utilities',
    name: 'Utilities Tools',
    icon: 'Toolbox',
    description: 'General utility and helper tools',
    videoCount: 0
  },
  {
    id: 'up-next',
    name: 'Up Next',
    icon: 'ArrowRight',
    description: 'Upcoming features and tutorials',
    videoCount: 0
  }
]

const iconMap = {
  GridFour,
  Info,
  Certificate,
  Wrench,
  Ruler,
  NumberTwo,
  Heart,
  Toolbox,
  ArrowRight
}

export function PanelNavigation({ selectedPanel, onPanelSelect }: PanelNavigationProps) {
  const [width, setWidth] = useState(320) // Default width of 320px (w-80)
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const newWidth = e.clientX
    const minWidth = 250
    const maxWidth = 600
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth)
    }
  }, [isResizing])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Add global mouse move and mouse up listeners
  React.useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'col-resize'
      document.body.style.userSelect = 'none'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const actualWidth = isCollapsed ? 64 : width

  return (
    <aside 
      ref={sidebarRef}
      className="relative border-r border-border bg-secondary/50 min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out"
      style={{ width: `${actualWidth}px` }}
    >
      {/* Collapse/Expand Toggle */}
      <button
        onClick={toggleCollapse}
        className={cn(
          "absolute top-4 z-10 p-1.5 rounded-md hover:bg-secondary transition-all duration-200 border border-border/50",
          isCollapsed ? "right-2 bg-card/80" : "right-2 bg-card/60"
        )}
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <DotsSixVertical 
          className={cn(
            "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
            isCollapsed && "rotate-90"
          )} 
        />
      </button>

      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <div className={cn(
          "transition-all duration-300",
          isCollapsed ? "p-2 pt-14" : "p-6"
        )}>
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground mb-4">Documentation</h2>
          )}
          
          <div className={cn(
            "transition-all duration-300",
            isCollapsed ? "space-y-2" : "space-y-2"
          )}>
            {panels.map((panel) => {
              const IconComponent = iconMap[panel.icon as keyof typeof iconMap] || GridFour
              const isSelected = selectedPanel === panel.id
              
              return (
                <button
                  key={panel.id}
                  onClick={() => onPanelSelect(panel.id)}
                  className={cn(
                    "w-full rounded-lg transition-all duration-200 group relative",
                    isCollapsed ? "p-3 flex items-center justify-center" : "p-4 text-left",
                    isSelected 
                      ? "bg-primary text-primary-foreground shadow-sm" 
                      : "hover:bg-secondary text-foreground hover:shadow-sm"
                  )}
                  title={isCollapsed ? panel.name : undefined}
                >
                  {isCollapsed ? (
                    <div className="relative group">
                      <IconComponent 
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isSelected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )} 
                      />
                      {/* Tooltip for collapsed state */}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-card border border-border rounded-md text-sm text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                        {panel.name}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3">
                      <IconComponent 
                        className={cn(
                          "w-5 h-5 mt-0.5 transition-colors flex-shrink-0",
                          isSelected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                        )} 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className={cn(
                            "font-medium transition-colors truncate",
                            isSelected ? "text-primary-foreground" : "text-foreground"
                          )}>
                            {panel.name}
                          </h3>
                        </div>
                        <p className={cn(
                          "text-sm mt-1 transition-colors line-clamp-2",
                          isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                          {panel.description}
                        </p>
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          onMouseDown={handleMouseDown}
          className={cn(
            "absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-primary/20 transition-colors",
            isResizing && "bg-primary/30"
          )}
        >
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1 h-8 bg-border rounded-l" />
        </div>
      )}
    </aside>
  )
}
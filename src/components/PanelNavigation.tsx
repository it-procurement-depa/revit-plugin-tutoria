import React, { useState, useRef, useCallback } from 'react'
import { 
  Certificate,
  Ruler, 
  Heart,
  ArrowRight,
  DotsSixVertical,
  Toolbox,
  GridFour,
  Info,
  Wrench,
  NumberTwo,
  CaretLeft,
  CaretRight,
  BookOpen,
  FileText
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Panel } from '@/App'

const panels: Panel[] = [
  {
    id: 'all',
    name: 'All Panels',
    icon: 'GridFour',
    description: 'Overview of all available plugin panels and tools',
    videoCount: 8
  },
  {
    id: 'about',
    name: 'About',
    icon: 'Info',
    description: 'Plugin overview and introduction',
    videoCount: 1
  },
  {
    id: 'licenses',
    name: 'Licenses',
    icon: 'Certificate',
    description: 'License management and activation',
    videoCount: 1
  },
  {
    id: 'openings',
    name: 'Openings',
    icon: 'Wrench',
    description: 'Opening creation and modification tools',
    videoCount: 1
  },
  {
    id: 'standards',
    name: 'Standards',
    icon: 'Ruler',
    description: 'Standards configuration and compliance',
    videoCount: 1
  },
  {
    id: 'step2',
    name: 'Step 2',
    icon: 'NumberTwo',
    description: 'Advanced workflow automation tools',
    videoCount: 1
  },
  {
    id: 'model-health',
    name: 'Model Health',
    icon: 'Heart',
    description: 'Model diagnostics and health validation',
    videoCount: 1
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'Toolbox',
    description: 'Utility tools and productivity enhancers',
    videoCount: 1
  },
  {
    id: 'up-next',
    name: 'Up Next',
    icon: 'ArrowRight',
    description: 'Upcoming features and development roadmap',
    videoCount: 1
  }
]

const iconMap = {
  Info,
  Certificate,
  Wrench,
  Ruler,
  NumberTwo,
  Heart,
  Toolbox,
  ArrowRight,
  GridFour
}

interface PanelNavigationProps {
  selectedPanel: string
  onPanelSelect: (panelId: string) => void
}

export function PanelNavigation({ selectedPanel, onPanelSelect }: PanelNavigationProps) {
  const [isResizing, setIsResizing] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return
    
    const newWidth = e.clientX
    const minWidth = 200
    const maxWidth = 400
    
    setSidebarWidth(Math.min(Math.max(newWidth, minWidth), maxWidth))
  }, [isResizing])

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

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

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        "relative bg-card border-r border-border flex-shrink-0 transition-all duration-300",
        isCollapsed ? "w-16" : ""
      )}
      style={{ width: isCollapsed ? '64px' : `${sidebarWidth}px` }}
    >
      {/* Collapse/Expand Toggle */}
      <button
        onClick={toggleCollapse}
        className="absolute -right-3 top-6 z-10 bg-card border border-border rounded-full p-1 hover:bg-accent transition-colors shadow-sm"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <CaretRight className="w-4 h-4 text-muted-foreground" />
        ) : (
          <CaretLeft className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <div className="p-4 space-y-2">
          {isCollapsed && (
            <div className="mb-6 flex justify-center" title="Documentation">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          )}
          
          {!isCollapsed && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground mb-1">Documentation</h2>
              <p className="text-xs text-muted-foreground">Navigate through plugin panels</p>
            </div>
          )}

          {panels.map((panel) => {
            const isSelected = selectedPanel === panel.id
            const IconComponent = iconMap[panel.icon as keyof typeof iconMap]
            
            return (
              <div key={panel.id}>
                <button
                  onClick={() => onPanelSelect(panel.id)}
                  className={cn(
                    "w-full text-left rounded-lg transition-all duration-200 group relative",
                    "hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    isSelected && "bg-primary/10 border border-primary/20 hover:bg-primary/15"
                  )}
                  title={isCollapsed ? panel.name : undefined}
                >
                  {isCollapsed ? (
                    <div className="p-3 flex items-center justify-center text-4xl">
                      <IconComponent 
                        className={cn(
                          "w-6 h-6 transition-colors",
                          isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />
                    </div>
                  ) : (
                    <div className="p-3">
                      <div className="flex items-start space-x-3">
                        <IconComponent 
                          className={cn(
                            "w-6 h-6 mt-0.5 flex-shrink-0 transition-colors",
                            isSelected ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className={cn(
                            "font-medium text-sm leading-tight transition-colors",
                            isSelected ? "text-primary" : "text-foreground group-hover:text-foreground"
                          )}>
                            {panel.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 leading-tight">
                            {panel.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-muted-foreground">
                              {panel.videoCount} {panel.videoCount === 1 ? 'tutorial' : 'tutorials'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      {/* Resize Handle */}
      {!isCollapsed && (
        <div
          className={cn(
            "absolute top-0 right-0 w-1 h-full cursor-col-resize bg-border/50 hover:bg-border transition-colors",
            isResizing && "bg-primary/30"
          )}
          onMouseDown={handleMouseDown}
        />
      )}
    </aside>
  );
}
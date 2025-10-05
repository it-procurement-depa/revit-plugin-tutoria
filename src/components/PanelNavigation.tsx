import { useState } from 'react'
import { 
  Info, 
  Certificate, 
  Wrench, 
  Ruler, 
  NumberTwo, 
  Heart,
  Toolbox,
  ArrowRight,
  GridFour
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
  return (
    <aside className="w-80 border-r border-border bg-secondary/50 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Documentation</h2>
        <div className="space-y-2">
          {panels.map((panel) => {
            const IconComponent = iconMap[panel.icon as keyof typeof iconMap] || GridFour
            const isSelected = selectedPanel === panel.id
            
            return (
              <button
                key={panel.id}
                onClick={() => onPanelSelect(panel.id)}
                className={cn(
                  "w-full text-left p-4 rounded-lg transition-all duration-200 group",
                  isSelected 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-secondary text-foreground hover:shadow-sm"
                )}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent 
                    className={cn(
                      "w-5 h-5 mt-0.5 transition-colors",
                      isSelected ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )} 
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={cn(
                        "font-medium transition-colors",
                        isSelected ? "text-primary-foreground" : "text-foreground"
                      )}>
                        {panel.name}
                      </h3>
                    </div>
                    <p className={cn(
                      "text-sm mt-1 transition-colors",
                      isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}>
                      {panel.description}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
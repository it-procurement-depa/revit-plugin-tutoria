import { useState } from 'react'
import { 
  House, 
  Buildings, 
  Wrench, 
  Hammer, 
  Lightbulb,
  Palette,
  Eye,
  UserFocus,
  Gear,
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
    name: 'All Tutorials',
    icon: 'GridFour',
    description: 'Browse all available tutorials',
    videoCount: 24
  },
  {
    id: 'architecture',
    name: 'Architecture',
    icon: 'House',
    description: 'Architectural design tools and workflows',
    videoCount: 8
  },
  {
    id: 'structure',
    name: 'Structure',
    icon: 'Buildings',
    description: 'Structural engineering and framing tools',
    videoCount: 6
  },
  {
    id: 'steel',
    name: 'Steel',
    icon: 'Wrench',
    description: 'Steel detailing and connection tools',
    videoCount: 4
  },
  {
    id: 'precast',
    name: 'Precast',
    icon: 'Hammer',
    description: 'Precast concrete elements and connections',
    videoCount: 3
  },
  {
    id: 'systems',
    name: 'Systems',
    icon: 'Lightbulb',
    description: 'MEP systems and utilities',
    videoCount: 2
  },
  {
    id: 'collaborate',
    name: 'Collaborate',
    icon: 'UserFocus',
    description: 'Collaboration and coordination tools',
    videoCount: 1
  }
]

const iconMap = {
  GridFour,
  House,
  Buildings,
  Wrench,
  Hammer,
  Lightbulb,
  Palette,
  Eye,
  UserFocus,
  Gear
}

export function PanelNavigation({ selectedPanel, onPanelSelect }: PanelNavigationProps) {
  return (
    <aside className="w-80 border-r border-border bg-secondary/50 min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Plugin Panels</h2>
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
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full transition-colors",
                        isSelected 
                          ? "bg-primary-foreground/20 text-primary-foreground" 
                          : "bg-muted text-muted-foreground group-hover:bg-background"
                      )}>
                        {panel.videoCount}
                      </span>
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
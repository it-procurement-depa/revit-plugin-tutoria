import { useState } from 'react'
import { Header } from '@/components/Header'
import { PanelNavigation } from '@/components/PanelNavigation'
import { PanelDetail } from '@/components/PanelDetail'

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  panel: string
  tool: string
  duration: string
  screenshots: string[]
  steps: string[]
  watched?: boolean
}

export interface Panel {
  id: string
  name: string
  icon: string
  description: string
  videoCount: number
}

function App() {
  const [selectedPanel, setSelectedPanel] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex overflow-hidden">
        <PanelNavigation 
          selectedPanel={selectedPanel}
          onPanelSelect={setSelectedPanel}
        />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <PanelDetail 
            panelId={selectedPanel}
            onPanelSelect={setSelectedPanel}
          />
        </main>
      </div>
    </div>
  )
}

export default App
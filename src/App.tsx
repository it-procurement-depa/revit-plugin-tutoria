import { useState } from 'react'
import { Header } from '@/components/Header'
import { PanelNavigation } from '@/components/PanelNavigation'
import { PanelDetail } from '@/components/PanelDetail'
import { useKV } from '@github/spark/hooks'

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
    <div className="min-h-screen bg-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <div className="flex">
        <PanelNavigation 
          selectedPanel={selectedPanel}
          onPanelSelect={setSelectedPanel}
        />
        
        <main className="flex-1 p-6">
          <PanelDetail 
            panelId={selectedPanel}
          />
        </main>
      </div>
    </div>
  )
}

export default App
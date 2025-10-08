import { useState } from 'react'
import { Header } from '@/components/Header'
import { PanelNavigation } from '@/components/PanelNavigation'
import { PanelDetail } from '@/components/PanelDetail'

function App() {
  const [selectedPanel, setSelectedPanel] = useState<string>('all')

  const handlePanelSelect = (panelId: string) => {
    setSelectedPanel(panelId)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="flex overflow-hidden h-[calc(100vh-4rem)]">
        <PanelNavigation 
          selectedPanel={selectedPanel}
          onPanelSelect={handlePanelSelect}
        />
        
        <main className="flex-1 p-6 overflow-y-auto h-full">
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
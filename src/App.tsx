import { useState } from 'react'
import { Header } from '@/components/Header'
import { PanelNavigation } from '@/components/PanelNavigation'
import { VideoGrid } from '@/components/VideoGrid'
import { VideoModal } from '@/components/VideoModal'
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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [watchedVideos, setWatchedVideos] = useKV<string[]>('watched-videos', [])

  const markVideoAsWatched = (videoId: string) => {
    setWatchedVideos(current => {
      const currentArray = current || []
      if (currentArray.includes(videoId)) return currentArray
      return [...currentArray, videoId]
    })
  }

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
          <VideoGrid 
            selectedPanel={selectedPanel}
            searchQuery={searchQuery}
            watchedVideos={watchedVideos || []}
            onVideoSelect={setSelectedVideo}
          />
        </main>
      </div>

      {selectedVideo && (
        <VideoModal 
          video={selectedVideo}
          isWatched={(watchedVideos || []).includes(selectedVideo.id)}
          onClose={() => setSelectedVideo(null)}
          onMarkWatched={() => markVideoAsWatched(selectedVideo.id)}
        />
      )}
    </div>
  )
}

export default App
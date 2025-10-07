import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Header } from '@/components/Header'
import { PanelNavigation } from '@/components/PanelNavigation'
import { PanelDetail } from '@/components/PanelDetail'
import { VideoGrid } from '@/components/VideoGrid'
import { VideoModal } from '@/components/VideoModal'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'

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
  const [showVideoGrid, setShowVideoGrid] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  
  // Persistent state using KV store
  const [watchedVideos, setWatchedVideos] = useKV<string[]>('watched-videos', [])
  const [userPreferences, setUserPreferences] = useKV<{
    autoPlayVideos: boolean
    defaultPanel: string
    showCompletedVideos: boolean
  }>('user-preferences', {
    autoPlayVideos: false,
    defaultPanel: 'about',
    showCompletedVideos: true
  })

  const handlePanelSelect = (panelId: string) => {
    setSelectedPanel(panelId)
    setShowVideoGrid(false)
    setSearchQuery('')
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
    setIsVideoModalOpen(true)
  }

  const handleMarkVideoWatched = (videoId: string) => {
    setWatchedVideos((currentWatched) => {
      const watched = currentWatched || []
      const isCurrentlyWatched = watched.includes(videoId)
      if (isCurrentlyWatched) {
        toast.success('Video marked as unwatched')
        return watched.filter(id => id !== videoId)
      } else {
        toast.success('Video marked as completed!')
        return [...watched, videoId]
      }
    })
  }

  const handleVideoModalClose = () => {
    setIsVideoModalOpen(false)
    setSelectedVideo(null)
  }

  const handleVideoNavigation = (video: Video) => {
    setSelectedVideo(video)
  }

  const toggleVideoGrid = () => {
    setShowVideoGrid(!showVideoGrid)
  }

  const isVideoWatched = selectedVideo ? (watchedVideos || []).includes(selectedVideo.id) : false

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showVideoGrid={showVideoGrid}
        onToggleView={toggleVideoGrid}
      />
      
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

      <VideoModal
        video={selectedVideo}
        isOpen={isVideoModalOpen}
        onClose={handleVideoModalClose}
        onMarkWatched={handleMarkVideoWatched}
        isWatched={isVideoWatched}
        onNavigate={handleVideoNavigation}
      />

      <Toaster />
    </div>
  )
}

export default App
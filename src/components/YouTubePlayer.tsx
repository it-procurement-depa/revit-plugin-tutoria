import { useState } from 'react'
import { Play, ArrowSquareOut } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface YouTubePlayerProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubePlayer({ videoId, title, className }: YouTubePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const openInYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Loading video...</p>
            </div>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="flex flex-col items-center space-y-3 text-center px-4">
              <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Video unavailable</p>
                <p className="text-xs text-muted-foreground">Click below to watch on YouTube</p>
              </div>
              <Button variant="outline" size="sm" onClick={openInYouTube}>
                Watch on YouTube
              </Button>
            </div>
          </div>
        )}

        <iframe
          className={cn("w-full h-full", isLoading && "opacity-0")}
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="text-xs">
            Tutorial Video
          </Badge>
          <Badge variant="outline" className="text-xs">
            HD Quality
          </Badge>
          {!hasError && (
            <Badge variant="outline" className="text-xs text-green-600">
              Embedded Player
            </Badge>
          )}
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-2"
          onClick={openInYouTube}
        >
          <ArrowSquareOut className="w-4 h-4" />
          <span>Watch on YouTube</span>
        </Button>
      </div>
    </div>
  )
}
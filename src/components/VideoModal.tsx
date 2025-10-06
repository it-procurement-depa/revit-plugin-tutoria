import { useState } from 'react'
import { X, Play, CheckCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Video } from '@/App'

interface VideoModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onMarkWatched?: (videoId: string) => void
  isWatched?: boolean
  allVideos?: Video[]
  onNavigate?: (video: Video) => void
}

export function VideoModal({ 
  video, 
  isOpen, 
  onClose, 
  onMarkWatched, 
  isWatched = false,
  allVideos = [],
  onNavigate
}: VideoModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!video) return null

  const currentIndex = allVideos.findIndex(v => v.id === video.id)
  const previousVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null

  const handleNavigation = (targetVideo: Video) => {
    if (onNavigate) {
      onNavigate(targetVideo)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-6">
              <DialogTitle className="text-xl font-bold text-foreground leading-tight">
                {video.title}
              </DialogTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {video.tool}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {video.panel}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {video.duration}
                </Badge>
                {isWatched && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Video Player Section */}
          <div className="space-y-4">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-primary/90 text-primary-foreground rounded-full p-4">
                  <Play className="w-8 h-8" weight="fill" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded flex items-center space-x-2">
                <span>{video.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground leading-relaxed flex-1">
                {video.description}
              </p>
              {onMarkWatched && (
                <Button
                  variant={isWatched ? "secondary" : "default"}
                  size="sm"
                  onClick={() => onMarkWatched(video.id)}
                  className="ml-4"
                >
                  {isWatched ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>Mark as Watched</>
                  )}
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Steps Section */}
          {video.steps && video.steps.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Tutorial Steps</h3>
              <div className="space-y-3">
                {video.steps.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer",
                      currentStep === index 
                        ? "bg-primary/10 border border-primary/20" 
                        : "bg-muted/50 hover:bg-muted"
                    )}
                    onClick={() => setCurrentStep(index)}
                  >
                    <div 
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5",
                        currentStep === index 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted-foreground/20 text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </div>
                    <p className={cn(
                      "text-sm leading-relaxed",
                      currentStep === index ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots Section */}
          {video.screenshots && video.screenshots.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {video.screenshots.map((screenshot, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <img 
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full aspect-video object-cover"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Separator />

          {/* Navigation Section */}
          {(previousVideo || nextVideo) && (
            <div className="flex items-center justify-between">
              {previousVideo ? (
                <Button
                  variant="outline"
                  onClick={() => handleNavigation(previousVideo)}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="text-sm font-medium truncate max-w-32">
                      {previousVideo.title}
                    </div>
                  </div>
                </Button>
              ) : (
                <div />
              )}

              {nextVideo ? (
                <Button
                  variant="outline"
                  onClick={() => handleNavigation(nextVideo)}
                  className="flex items-center space-x-2"
                >
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="text-sm font-medium truncate max-w-32">
                      {nextVideo.title}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <div />
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
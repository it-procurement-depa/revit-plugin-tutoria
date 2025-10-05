import { useState } from 'react'
import { X, CheckCircle, List, Images } from '@phosphor-icons/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Video } from '@/App'

interface VideoModalProps {
  video: Video
  isWatched: boolean
  onClose: () => void
  onMarkWatched: () => void
}

export function VideoModal({ video, isWatched, onClose, onMarkWatched }: VideoModalProps) {
  const [activeTab, setActiveTab] = useState('video')

  const handleMarkWatched = () => {
    onMarkWatched()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold leading-tight mb-2">
                {video.title}
              </DialogTitle>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{video.tool}</Badge>
                <Badge variant="secondary">{video.panel}</Badge>
                <span className="text-sm text-muted-foreground">Duration: {video.duration}</span>
              </div>
              {isWatched && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-4 h-4" weight="fill" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="steps">
              <List className="w-4 h-4 mr-2" />
              Steps
            </TabsTrigger>
            <TabsTrigger value="screenshots">
              <Images className="w-4 h-4 mr-2" />
              Screenshots
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="mt-4 flex-1">
            <div className="space-y-4">
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-foreground text-2xl">▶</span>
                    </div>
                    <p className="text-muted-foreground">Video Player Placeholder</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      In a real implementation, this would show the actual video
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.description}
                  </p>
                </div>
                
                {!isWatched && (
                  <Button onClick={handleMarkWatched} className="ml-4">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Watched
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="steps" className="mt-4">
            <div>
              <h3 className="font-medium mb-4">Step-by-Step Guide</h3>
              <div className="space-y-3">
                {video.steps.map((step, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-relaxed">{step}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="screenshots" className="mt-4">
            <div>
              <h3 className="font-medium mb-4">Screenshots</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {video.screenshots.map((screenshot, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Click on any screenshot to view in full size
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
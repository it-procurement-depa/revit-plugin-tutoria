import { useState } from 'react'
import { X, Play, CheckCircle, ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Video } from '@/App'
import { cn } from '@/lib/utils'

// Video data (should ideally be in a shared data file)
const allVideos: Video[] = [
  {
    id: '1',
    title: 'Getting Started with One Click Plugin',
    description: 'Learn the basics of installing and setting up the One Click Plugin for maximum efficiency in your Revit workflow.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/getting-started.mp4',
    panel: 'about',
    tool: 'Setup',
    duration: '5:30',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Download the plugin from the official repository',
      'Install using the Revit Add-ins manager',
      'Configure your license and preferences',
      'Verify installation with a test project'
    ]
  },
  {
    id: '2',
    title: 'License Activation Guide',
    description: 'Step-by-step guide to activate and manage your plugin licenses effectively.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/license-activation.mp4',
    panel: 'licenses',
    tool: 'License Manager',
    duration: '3:45',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Access the License Manager from the main panel',
      'Enter your license key and user information',
      'Verify license activation status',
      'Configure license sharing settings'
    ]
  },
  {
    id: '3',
    title: 'Opening Creation Tools',
    description: 'Automatically create and modify openings in walls, floors, and ceilings with precision.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/opening-tools.mp4',
    panel: 'openings',
    tool: 'Opening Tools',
    duration: '7:20',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Select elements to create openings in',
      'Define opening dimensions and placement',
      'Set opening types and properties',
      'Generate openings and review placement'
    ]
  },
  {
    id: '4',
    title: 'Standards Configuration',
    description: 'Configure project standards and templates for consistent modeling practices.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/standards-config.mp4',
    panel: 'standards',
    tool: 'Standards Setup',
    duration: '6:15',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Access standards tools from the main panel',
      'Load or create standard templates',
      'Configure naming conventions and parameters',
      'Apply standards to current project'
    ]
  },
  {
    id: '5',
    title: 'Advanced Workflow Step 2',
    description: 'Master the second phase of the advanced modeling workflow with Step 2 tools.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/step2-workflow.mp4',
    panel: 'step2',
    tool: 'Step 2 Workflow',
    duration: '9:10',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Complete Step 1 prerequisites',
      'Initialize Step 2 tools and parameters',
      'Execute automated workflow processes',
      'Review and validate Step 2 results'
    ]
  },
  {
    id: '6',
    title: 'Model Health Validation',
    description: 'Check and validate your model health with comprehensive diagnostic tools.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/model-health.mp4',
    panel: 'model-health',
    tool: 'Health Check',
    duration: '8:30',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Run comprehensive model health scan',
      'Review diagnostic results and warnings',
      'Fix identified issues automatically',
      'Generate health report for documentation'
    ]
  },
  {
    id: '7',
    title: 'Utility Tools Overview',
    description: 'Explore various utility tools for enhanced productivity and workflow optimization.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/utilities.mp4',
    panel: 'utilities',
    tool: 'Utility Suite',
    duration: '5:45',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Access utility tools from the main panel',
      'Learn about each utility function',
      'Apply utilities to common tasks',
      'Optimize workflow with utility combinations'
    ]
  },
  {
    id: '8',
    title: 'Upcoming Features Preview',
    description: 'Get a sneak peek at upcoming features and planned improvements.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/upcoming-features.mp4',
    panel: 'up-next',
    tool: 'Feature Preview',
    duration: '4:20',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Preview upcoming tool enhancements',
      'Learn about new workflow capabilities',
      'Understand planned UI improvements',
      'Provide feedback on development priorities'
    ]
  }
]

interface VideoModalProps {
  video: Video | null
  isOpen: boolean
  onClose: () => void
  onMarkWatched?: (videoId: string) => void
  isWatched?: boolean
  onNavigate?: (video: Video) => void
}

export function VideoModal({ 
  video, 
  isOpen,
  onClose, 
  onMarkWatched,
  isWatched = false,
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
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
                {video.duration}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-muted-foreground leading-relaxed flex-1">
                {video.description}
              </p>
              {onMarkWatched && (
                <Button
                  variant={isWatched ? "default" : "outline"}
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

          {/* Tutorial Steps Section */}
          {video.steps && video.steps.length > 0 && (
            <div className="space-y-4">
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
            <div className="space-y-4">
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
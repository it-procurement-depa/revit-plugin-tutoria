import { useMemo } from 'react'
import { Play, Clock, CheckCircle } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Video } from '@/App'

interface VideoGridProps {
  selectedPanel: string
  searchQuery: string
  watchedVideos: string[]
  onVideoSelect: (video: Video) => void
}

const sampleVideos: Video[] = [
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

export function VideoGrid({ selectedPanel, searchQuery, watchedVideos, onVideoSelect }: VideoGridProps) {
  const filteredVideos = useMemo(() => {
    let videos = sampleVideos

    if (selectedPanel !== 'all') {
      videos = videos.filter(video => video.panel === selectedPanel)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      videos = videos.filter(video => 
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.tool.toLowerCase().includes(query) ||
        video.panel.toLowerCase().includes(query)
      )
    }

    return videos
  }, [selectedPanel, searchQuery])

  if (filteredVideos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">No tutorials found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'No tutorials available for this panel yet'}
          </p>
          {searchQuery && (
            <Badge variant="secondary" className="text-xs">
              Searched for: "{searchQuery}"
            </Badge>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {selectedPanel === 'all' ? 'All Tutorials' : `${selectedPanel.charAt(0).toUpperCase() + selectedPanel.slice(1)} Panel`}
          </h2>
          <p className="text-muted-foreground">
            {filteredVideos.length} tutorial{filteredVideos.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        {watchedVideos.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4" />
            <span>{watchedVideos.length} completed</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const isWatched = watchedVideos.includes(video.id)
          
          return (
            <Card 
              key={video.id}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group",
                isWatched && "ring-2 ring-green-500/20"
              )}
              onClick={() => onVideoSelect(video)}
            >
              <div className="relative">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary/90 text-primary-foreground rounded-full p-3">
                      <Play className="w-6 h-6" weight="fill" />
                    </div>
                  </div>
                </div>
                
                {isWatched && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="w-4 h-4" weight="fill" />
                  </div>
                )}
                
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium leading-tight group-hover:text-primary transition-colors">
                    {video.title}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {video.tool}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {video.panel}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <CardDescription className="text-xs leading-relaxed">
                  {video.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
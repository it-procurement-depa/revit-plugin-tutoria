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
    panel: 'all',
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
    title: 'Delete Frames Tool',
    description: 'Efficiently remove multiple frame elements from your model using the automated Delete Frames functionality.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/delete-frames.mp4',
    panel: 'architecture',
    tool: 'Delete Frames',
    duration: '3:45',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Select the Delete Frames tool from the Architecture panel',
      'Choose selection criteria (by type, level, or custom filter)',
      'Preview elements to be deleted',
      'Execute the deletion and review results'
    ]
  },
  {
    id: '3',
    title: 'Wall Framing Automation',
    description: 'Automatically generate wall framing with precise spacing and member sizing using intelligent algorithms.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/wall-framing.mp4',
    panel: 'architecture',
    tool: 'Wall Framing',
    duration: '7:20',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Select walls to frame',
      'Configure framing parameters (spacing, member sizes)',
      'Set opening and corner conditions',
      'Generate framing and review placement'
    ]
  },
  {
    id: '4',
    title: 'Ceiling Tools Overview',
    description: 'Master the ceiling creation and modification tools for efficient overhead element management.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/ceiling-tools.mp4',
    panel: 'architecture',
    tool: 'Ceiling Tools',
    duration: '6:15',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Access ceiling tools from the main panel',
      'Define ceiling boundaries and levels',
      'Apply materials and finish properties',
      'Handle complex ceiling geometries'
    ]
  },
  {
    id: '5',
    title: 'Structural Steel Connections',
    description: 'Create parametric steel connections with automated detailing and shop drawing generation.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/steel-connections.mp4',
    panel: 'steel',
    tool: 'Steel Connections',
    duration: '9:10',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Select structural members for connection',
      'Choose connection type and parameters',
      'Configure bolt patterns and weld details',
      'Generate 3D connection geometry'
    ]
  },
  {
    id: '6',
    title: 'Floor Frame Generation',
    description: 'Automatically generate floor framing systems with joists, beams, and support structures.',
    thumbnail: '/api/placeholder/320/180',
    videoUrl: '/videos/floor-framing.mp4',
    panel: 'structure',
    tool: 'Floor Framing',
    duration: '8:30',
    screenshots: ['/api/placeholder/800/450', '/api/placeholder/800/450'],
    steps: [
      'Define floor boundaries and levels',
      'Set joist spacing and beam layout',
      'Configure support conditions',
      'Generate complete framing system'
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
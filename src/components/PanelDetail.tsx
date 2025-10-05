import { useState } from 'react'
import { Play, ArrowSquareOut, Book, Video, Target, Wrench, ChatCircle, CheckCircle, Plus } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { YouTubePlayer } from '@/components/YouTubePlayer'
import { cn } from '@/lib/utils'

interface PanelDetailProps {
  panelId: string
}

interface PanelInfo {
  id: string
  name: string
  brief: string
  youtubeVideoId: string
  description: {
    overview: string
    features: string[]
    benefits: string[]
    usage: string
  }
}

interface UpcomingTool {
  id: string
  name: string
  description: string
  icon: typeof Wrench
  category: string
  status: 'planned' | 'in-development' | 'testing'
  estimatedRelease: string
}

const upcomingTools: UpcomingTool[] = [
  {
    id: 'wall-fixation',
    name: 'Wall Fixation Tools',
    description: 'Create comprehensive fixation systems for walls with automated placement and sizing.',
    icon: Wrench,
    category: 'Fixation Systems',
    status: 'in-development',
    estimatedRelease: 'Q2 2024'
  },
  {
    id: 'ceiling-fixation',
    name: 'Ceiling Fixation Tools',
    description: 'Complete fixation system for standard ceilings with intelligent anchor placement.',
    icon: Wrench,
    category: 'Fixation Systems',
    status: 'planned',
    estimatedRelease: 'Q3 2024'
  },
  {
    id: 'ceiling-curved-fixation',
    name: 'Ceiling Curved Fixation Tools',
    description: 'Specialized tools for creating fixation systems on curved ceiling surfaces.',
    icon: Wrench,
    category: 'Fixation Systems',
    status: 'planned',
    estimatedRelease: 'Q3 2024'
  },
  {
    id: 'floor-fixation',
    name: 'Floor Fixation Tools',
    description: 'Comprehensive floor fixation system with support for various flooring types.',
    icon: Wrench,
    category: 'Fixation Systems',
    status: 'planned',
    estimatedRelease: 'Q4 2024'
  },
  {
    id: 'parts-tools',
    name: 'Parts Tools',
    description: 'Advanced parts creation with automatic grooves for tiles and enhanced detailing.',
    icon: Plus,
    category: 'Modeling Tools',
    status: 'testing',
    estimatedRelease: 'Q1 2024'
  },
  {
    id: 'shop-drawings',
    name: 'Shop Drawings',
    description: 'Automated shop drawing generation with intelligent dimensions and tags.',
    icon: Book,
    category: 'Documentation',
    status: 'in-development',
    estimatedRelease: 'Q2 2024'
  },
  {
    id: 'depa-chatbot',
    name: 'Depa Chat Bot Tool',
    description: 'ChatGPT integration directly inside Revit for intelligent assistance and guidance.',
    icon: ChatCircle,
    category: 'AI Assistant',
    status: 'planned',
    estimatedRelease: 'Q3 2024'
  },
  {
    id: 'qa-qc',
    name: 'QA/QC Tools',
    description: 'Advanced quality assurance and control tools for comprehensive model validation.',
    icon: CheckCircle,
    category: 'Quality Control',
    status: 'in-development',
    estimatedRelease: 'Q2 2024'
  }
]

const panelDetails: Record<string, PanelInfo> = {
  about: {
    id: 'about',
    name: 'About',
    brief: 'Learn about the One Click Plugin and discover how it revolutionizes your Revit workflow with powerful automation tools.',
    youtubeVideoId: 'dQw4w9WgXcQ', // Placeholder - replace with actual video ID
    description: {
      overview: 'The One Click Plugin is a comprehensive toolkit designed to streamline your Revit workflow. With intuitive automation and smart tools, it reduces manual tasks and increases productivity across all phases of your project.',
      features: [
        'Automated opening creation and modification',
        'Intelligent model health diagnostics',
        'Standards compliance verification',
        'License management system',
        'Workflow optimization tools'
      ],
      benefits: [
        'Reduce project delivery time by up to 40%',
        'Minimize human errors in modeling',
        'Ensure consistent standards across teams',
        'Streamline repetitive tasks',
        'Improve model quality and reliability'
      ],
      usage: 'Perfect for architects, engineers, and BIM coordinators working on projects of any scale. The plugin integrates seamlessly with existing Revit workflows and requires minimal training to get started.'
    }
  },
  licenses: {
    id: 'licenses',
    name: 'Licenses Manager',
    brief: 'Manage your plugin licenses efficiently with our comprehensive licensing system that supports individual and team deployments.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    description: {
      overview: 'The License Manager provides a centralized system for activating, managing, and monitoring plugin licenses across your organization. It supports both individual and enterprise licensing models.',
      features: [
        'Single-click license activation',
        'Multi-user license sharing',
        'Offline license validation',
        'Usage analytics and reporting',
        'Automatic license renewal notifications'
      ],
      benefits: [
        'Simplified license deployment',
        'Real-time license status monitoring',
        'Flexible licensing options',
        'Reduced administrative overhead',
        'Compliance tracking and reporting'
      ],
      usage: 'Essential for organizations managing multiple licenses. Administrators can easily track usage, manage renewals, and ensure compliance across all team members.'
    }
  },
  openings: {
    id: 'openings',
    name: 'Openings Tools',
    brief: 'Automate the creation and modification of openings in walls, floors, and ceilings with precision and speed.',
    youtubeVideoId: 'fZ77VuZboBU',
    description: {
      overview: 'The Openings Tools provide intelligent automation for creating precise openings in building elements. Using advanced algorithms, it ensures accurate placement and sizing while maintaining structural integrity.',
      features: [
        'Automated opening detection and creation',
        'Smart sizing based on MEP requirements',
        'Conflict detection and resolution',
        'Batch processing capabilities',
        'Custom opening family support'
      ],
      benefits: [
        'Eliminate manual opening placement errors',
        'Ensure MEP coordination accuracy',
        'Save hours of repetitive work',
        'Maintain consistent opening standards',
        'Reduce coordination conflicts'
      ],
      usage: 'Ideal for MEP engineers, architects, and BIM coordinators who need to create accurate openings for mechanical, electrical, and plumbing systems.'
    }
  },
  standards: {
    id: 'standards',
    name: 'Standards Tools',
    brief: 'Ensure project consistency and compliance with comprehensive standards management and validation tools.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    description: {
      overview: 'Standards Tools help maintain consistency across projects by automating the application and validation of modeling standards, naming conventions, and project requirements.',
      features: [
        'Automated standards validation',
        'Custom standard template creation',
        'Naming convention enforcement',
        'Parameter standardization',
        'Quality assurance reporting'
      ],
      benefits: [
        'Ensure project-wide consistency',
        'Reduce quality control time',
        'Minimize rework and corrections',
        'Improve team collaboration',
        'Meet client and industry standards'
      ],
      usage: 'Perfect for project managers, BIM managers, and quality control teams who need to maintain high standards across large projects and multiple team members.'
    }
  },
  step2: {
    id: 'step2',
    name: 'Step 2 Tools',
    brief: 'Advanced workflow automation for the second phase of your modeling process with intelligent decision-making capabilities.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    description: {
      overview: 'Step 2 Tools represent the advanced phase of workflow automation, building upon initial model setup with sophisticated analysis and optimization capabilities.',
      features: [
        'Advanced workflow orchestration',
        'Intelligent parameter optimization',
        'Cross-discipline coordination',
        'Performance analysis integration',
        'Automated report generation'
      ],
      benefits: [
        'Streamline complex workflows',
        'Optimize model performance',
        'Improve cross-team collaboration',
        'Reduce project delivery time',
        'Enhance decision-making accuracy'
      ],
      usage: 'Designed for experienced users and teams working on complex projects that require advanced automation and optimization beyond basic modeling tasks.'
    }
  },
  'model-health': {
    id: 'model-health',
    name: 'Model Health Tools',
    brief: 'Comprehensive model diagnostics and health monitoring to ensure optimal performance and reliability.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    description: {
      overview: 'Model Health Tools provide comprehensive diagnostics and monitoring capabilities to ensure your Revit models maintain optimal performance, accuracy, and reliability throughout the project lifecycle.',
      features: [
        'Comprehensive model scanning',
        'Performance bottleneck detection',
        'Warning and error analysis',
        'Automated cleanup suggestions',
        'Health score calculation'
      ],
      benefits: [
        'Prevent model corruption',
        'Optimize file performance',
        'Identify issues before they escalate',
        'Maintain model integrity',
        'Reduce troubleshooting time'
      ],
      usage: 'Essential for all team members working with Revit models, especially useful for large projects where model health directly impacts team productivity and project success.'
    }
  },
  utilities: {
    id: 'utilities',
    name: 'Utilities Tools',
    brief: 'A collection of powerful utility tools designed to enhance productivity and streamline common Revit tasks.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    description: {
      overview: 'Utilities Tools offer a comprehensive suite of helper functions and productivity enhancers that address common challenges and repetitive tasks in Revit workflows.',
      features: [
        'Batch processing capabilities',
        'File management utilities',
        'View management tools',
        'Element manipulation helpers',
        'Export and import assistants'
      ],
      benefits: [
        'Increase daily productivity',
        'Reduce repetitive manual tasks',
        'Improve file organization',
        'Streamline common operations',
        'Enhance team efficiency'
      ],
      usage: 'Valuable for all Revit users, from beginners to experts, who want to optimize their daily workflows and reduce time spent on routine tasks.'
    }
  },
  'up-next': {
    id: 'up-next',
    name: 'Up Next',
    brief: 'Discover the exciting new tools and features coming to the One Click Plugin in future releases.',
    youtubeVideoId: 'dQw4w9WgXcQ',
    description: {
      overview: 'Our development roadmap is packed with innovative tools designed to further streamline your Revit workflow. From advanced fixation systems to AI-powered assistance, these upcoming features will revolutionize how you work with building models.',
      features: [
        'Wall Fixation Tools - Complete fixation system for walls',
        'Ceiling Fixation Tools - Full fixation system for standard ceilings',
        'Ceiling Curved Fixation Tools - Specialized tools for curved ceiling fixation',
        'Floor Fixation Tools - Comprehensive floor fixation system',
        'Parts Tools - Advanced tools with grooves for tiles'
      ],
      benefits: [
        'Comprehensive fixation solutions for all building elements',
        'Automated shop drawings with dimensions and tags',
        'AI-powered ChatGPT integration within Revit',
        'Advanced quality assurance and control tools',
        'Enhanced productivity across all project phases'
      ],
      usage: 'These upcoming tools will serve all aspects of your workflow, from structural fixation systems to AI-assisted design validation and automated documentation generation.'
    }
  }
}

export function PanelDetail({ panelId }: PanelDetailProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  
  // Show all panels overview if 'all' is selected
  if (panelId === 'all') {
    return (
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">One Click Plugin Documentation</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive documentation for all plugin panels and tools. Select a specific panel from the navigation 
            to view detailed information, instructional videos, and usage guidelines.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(panelDetails).map((panel) => (
            <Card key={panel.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <CardTitle className="text-lg">{panel.name}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {panel.brief}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {panel.description.features.length} Features
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Video Guide
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  
  const panel = panelDetails[panelId]
  
  if (!panel) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">Panel not found</h3>
          <p className="text-muted-foreground">The requested panel documentation is not available.</p>
        </div>
      </div>
    )
  }

  // Special rendering for Up Next panel
  if (panelId === 'up-next') {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{panel.name}</h1>
              <p className="text-muted-foreground">Upcoming Features & Tools</p>
            </div>
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {panel.brief}
          </p>
        </div>

        {/* Overview Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span>Development Roadmap</span>
            </CardTitle>
            <CardDescription>
              Our commitment to continuous innovation and workflow enhancement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {panel.description.overview}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">8+ New Tools</Badge>
              <Badge variant="outline">AI Integration</Badge>
              <Badge variant="outline">Quality Control</Badge>
              <Badge variant="outline">Automation</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tools Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingTools.map((tool) => {
              const IconComponent = tool.icon
              const statusColors = {
                'planned': 'bg-blue-500/10 text-blue-600 border-blue-200',
                'in-development': 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
                'testing': 'bg-green-500/10 text-green-600 border-green-200'
              }
              
              return (
                <Card key={tool.id} className="hover:shadow-lg transition-all duration-200 relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {tool.description}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${statusColors[tool.status]}`}
                      >
                        {tool.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {tool.estimatedRelease}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* More Coming Card */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Much More...</h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                We're constantly innovating and developing new tools based on user feedback and industry needs. 
                Stay tuned for even more exciting features that will continue to revolutionize your Revit workflow.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Book className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{panel.name}</h1>
            <p className="text-muted-foreground">Plugin Panel Documentation</p>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed">
          {panel.brief}
        </p>
      </div>

      {/* Video Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Video className="w-5 h-5 text-primary" />
            <CardTitle>Instructional Video</CardTitle>
          </div>
          <CardDescription>
            Watch this comprehensive tutorial to learn how to use the {panel.name} effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <YouTubePlayer 
            videoId={panel.youtubeVideoId}
            title={`${panel.name} Tutorial`}
          />
        </CardContent>
      </Card>

      {/* Detailed Description */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Detailed Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-3">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {panel.description.overview}
            </p>
          </div>
          
          <Separator />
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
              <ul className="space-y-2">
                {panel.description.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Benefits</h3>
              <ul className="space-y-2">
                {panel.description.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold text-foreground mb-3">Usage Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed">
              {panel.description.usage}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
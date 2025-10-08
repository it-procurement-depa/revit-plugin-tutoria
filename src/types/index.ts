export interface Panel {
  id: string
  name: string
  icon: string
  description: string
  videoCount: number
}

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
}
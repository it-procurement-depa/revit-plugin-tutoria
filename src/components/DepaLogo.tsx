interface DepaLogoProps {
  className?: string
}

export function DepaLogo({ className }: DepaLogoProps) {
  return (
    <div className={`bg-primary rounded-md flex items-center justify-center ${className}`}>
      <span className="text-primary-foreground font-bold text-base tracking-tight">depa</span>
    </div>
  )
}
interface DepaLogoProps {
  className?: string
}

export function DepaLogo({ className = "" }: DepaLogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">D</span>
      </div>
      <span
        className="text-white font-bold tracking-tight"
        style={{ fontSize: '21px' }}
      >
        depa
      </span>
    </div>
  );
}
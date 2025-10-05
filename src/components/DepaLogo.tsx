interface DepaLogoProps {
  className?: string
}

export function DepaLogo({ className }: DepaLogoProps) {
  return (
    <div
      className={`bg-red-600 flex items-center justify-center px-4 py-2 ${className}`}
    >
      <span
        className="text-white font-bold tracking-tight"
        style={{ fontSize: '21px' }}
      >
        depa
      </span>
    </div>
  )
}

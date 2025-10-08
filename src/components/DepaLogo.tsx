interface DepaLogoProps {
  className?: string
}

export function DepaLogo({ className }: DepaLogoProps) {
  return (
    <div
      className={`bg-red-600 flex items-center justify-center w-16 h-16 ${className || ''}`}
    >
      <span
        className="text-white font-bold tracking-tight"
        style={{ fontSize: '21px' }}
      >depa</span>
    </div>
  );
}

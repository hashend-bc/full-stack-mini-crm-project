interface LogoProps {
  light?: boolean
  size?: 'sm' | 'md'
}

export default function Logo({ light = false, size = 'md' }: LogoProps) {
  const textColor = light ? 'text-white' : 'text-gray-900'
  const iconSize = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8'
  const textSize = size === 'sm' ? 'text-base' : 'text-xl'

  return (
    <div className="flex items-center gap-2">
      <svg className={iconSize} viewBox="0 0 32 32" fill="none">
        <path d="M8 6L16 2L24 6L28 14L16 30L4 14L8 6Z" fill={light ? 'white' : '#0A0F2C'} />
        <path d="M12 10L16 8L20 10L22 14L16 24L10 14L12 10Z" fill={light ? '#0A0F2C' : 'white'} />
      </svg>
      <span className={`font-semibold ${textSize} ${textColor}`}>Venture</span>
    </div>
  )
}

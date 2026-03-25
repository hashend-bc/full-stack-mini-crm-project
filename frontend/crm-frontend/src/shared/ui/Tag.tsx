type TagColor = 'weekly' | 'monthly' | 'personal' | 'product' | 'business' | 'default'

interface TagProps {
  label: string
  color?: TagColor
}

const colorMap: Record<TagColor, string> = {
  weekly: 'bg-tag-weekly text-tag-weekly-text',
  monthly: 'bg-tag-monthly text-tag-monthly-text',
  personal: 'bg-tag-personal text-tag-personal-text',
  product: 'bg-tag-product text-tag-product-text',
  business: 'bg-tag-business text-tag-business-text',
  default: 'bg-gray-100 text-gray-600',
}

function inferColor(label: string): TagColor {
  const l = label.toLowerCase()
  if (l === 'weekly') return 'weekly'
  if (l === 'monthly') return 'monthly'
  if (l === 'personal') return 'personal'
  if (l === 'product') return 'product'
  if (l === 'business') return 'business'
  return 'default'
}

export default function Tag({ label, color }: TagProps) {
  const c = color ?? inferColor(label)
  return (
    <span className={`tag ${colorMap[c]}`}>{label}</span>
  )
}

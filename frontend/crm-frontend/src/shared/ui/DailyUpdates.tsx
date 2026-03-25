import { Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react'

interface UpdateItem {
  id: string
  type: 'note' | 'task' | 'alert'
  title: string
  time: string
  status?: string
}

interface DailyUpdatesProps {
  updates: UpdateItem[]
}

export function DailyUpdates({ updates }: DailyUpdatesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'note':
        return FileText
      case 'task':
        return CheckCircle
      case 'alert':
        return AlertCircle
      default:
        return Clock
    }
  }

  const getColor = (type: string) => {
    switch (type) {
      case 'note':
        return 'text-blue-600'
      case 'task':
        return 'text-green-600'
      case 'alert':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-card">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-gray-600" />
        Daily Updates
      </h3>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {updates.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent updates</p>
        ) : (
          updates.map((update) => {
            const Icon = getIcon(update.type)
            return (
              <div key={update.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full bg-gray-100 ${getColor(update.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{update.title}</p>
                  <p className="text-xs text-gray-500">{update.time}</p>
                  {update.status && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                      {update.status}
                    </span>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
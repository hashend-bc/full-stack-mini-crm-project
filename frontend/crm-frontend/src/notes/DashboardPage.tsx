import { useEffect, useState } from 'react'
import { FileText, Users, Mail, CheckSquare } from 'lucide-react'
import AppLayout from '@/shared/layout/AppLayout'
import { StatCard } from '@/shared/ui/StatCard'
import { BarChartComponent, PieChartComponent, LineChartComponent } from '@/shared/ui/ChartComponents'
import { DailyUpdates } from '@/shared/ui/DailyUpdates'
import { notesApi, NoteStats } from '@/notes/notesApi'

interface UpdateItem {
  id: string
  type: 'note' | 'task' | 'alert'
  title: string
  time: string
  status?: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<NoteStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock daily updates - in a real app, this would come from an API
  const dailyUpdates: UpdateItem[] = [
    {
      id: '1',
      type: 'note',
      title: 'New note created: "Project Planning"',
      time: '2 hours ago',
      status: 'Weekly'
    },
    {
      id: '2',
      type: 'task',
      title: 'Task completed: "Review documentation"',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Due date approaching for "Client Meeting"',
      time: '6 hours ago'
    },
    {
      id: '4',
      type: 'note',
      title: 'Updated note: "Team Retrospective"',
      time: '1 day ago',
      status: 'Monthly'
    }
  ]

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await notesApi.getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </AppLayout>
    )
  }

  // Mock data for demonstration - replace with real data
  const statusData = stats?.statusStats.map(item => ({
    name: item._id || 'Unknown',
    value: item.count
  })) || []

  const timeData = stats?.timeStats.map(item => ({
    name: item._id,
    value: item.count
  })) || []

  const productivityData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 6 },
    { name: 'Wed', value: 8 },
    { name: 'Thu', value: 5 },
    { name: 'Fri', value: 9 },
    { name: 'Sat', value: 3 },
    { name: 'Sun', value: 2 }
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Notes"
            value={stats?.totalNotes || 0}
            icon={FileText}
            color="blue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Tasks"
            value="5"
            icon={CheckSquare}
            color="green"
            trend={{ value: 8, isPositive: false }}
          />
          <StatCard
            title="Emails Sent"
            value="1,251"
            icon={Mail}
            color="yellow"
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Team Members"
            value="12"
            icon={Users}
            color="purple"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChartComponent
            data={productivityData}
            title="Weekly Productivity"
            color="#00C49F"
          />
          <PieChartComponent
            data={statusData}
            title="Notes by Status"
          />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LineChartComponent
              data={timeData}
              title="Notes Created Over Time"
              color="#FF8042"
            />
          </div>
          <div>
            <DailyUpdates updates={dailyUpdates} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-shadow">
              <FileText className="w-8 h-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium">New Note</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-shadow">
              <CheckSquare className="w-8 h-8 text-green-600 mb-2" />
              <span className="text-sm font-medium">Add Task</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-shadow">
              <Mail className="w-8 h-8 text-yellow-600 mb-2" />
              <span className="text-sm font-medium">Send Email</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-border hover:shadow-md transition-shadow">
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium">View Team</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

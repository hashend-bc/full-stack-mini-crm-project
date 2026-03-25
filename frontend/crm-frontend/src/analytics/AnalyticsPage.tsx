import { useEffect, useState } from 'react'
import AppLayout from '@/shared/layout/AppLayout'
import { StatCard } from '@/shared/ui/StatCard'
import { BarChartComponent, PieChartComponent, LineChartComponent } from '@/shared/ui/ChartComponents'
import { notesApi, NoteStats } from '@/notes/notesApi'
import { FileText, TrendingUp } from 'lucide-react'

export default function AnalyticsPage() {
  const [stats, setStats] = useState<NoteStats | null>(null)
  const [loading, setLoading] = useState(true)

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
          <div className="text-gray-500">Loading analytics...</div>
        </div>
      </AppLayout>
    )
  }

  if (!stats) {
    return (
      <AppLayout>
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics</h1>
        <div className="text-red-500">Failed to load analytics data.</div>
      </AppLayout>
    )
  }

  const statusData = stats.statusStats.map(item => ({
    name: item._id || 'Unknown',
    value: item.count
  }))

  const timeData = stats.timeStats.map(item => ({
    name: item._id,
    value: item.count
  }))

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <div className="text-sm text-gray-500">
            Data from the last 30 days
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Notes"
            value={stats.totalNotes}
            icon={FileText}
            color="blue"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Active Statuses"
            value={stats.statusStats.length}
            icon={TrendingUp}
            color="green"
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Avg Daily Notes"
            value={(stats.totalNotes / 30).toFixed(1)}
            icon={TrendingUp}
            color="purple"
            trend={{ value: 8, isPositive: false }}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartComponent
            data={statusData}
            title="Notes Distribution by Status"
          />
          <BarChartComponent
            data={statusData}
            title="Notes Count by Status"
            color="#FF8042"
          />
        </div>

        <LineChartComponent
          data={timeData}
          title="Notes Creation Trend (Last 30 Days)"
          color="#00C49F"
        />

        {/* Insights */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Most Active Status</h4>
              <p className="text-gray-600">
                {statusData.length > 0 ? statusData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name : 'No data'}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Peak Day</h4>
              <p className="text-gray-600">
                {timeData.length > 0 ? timeData.reduce((prev, current) => (prev.value > current.value) ? prev : current).name : 'No data'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
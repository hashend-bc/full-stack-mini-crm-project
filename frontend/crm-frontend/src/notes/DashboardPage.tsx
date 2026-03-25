import AppLayout from '@/shared/layout/AppLayout'

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Email Sent', value: '1,251 Mail' },
          { label: 'Active Company', value: '43 Company' },
          { label: 'Total Contact', value: '162 Contact' },
          { label: 'Ongoing Task', value: '5 Task' },
        ].map((item) => (
          <div key={item.label} className="bg-white rounded-lg border border-border p-4 shadow-card">
            <p className="text-xs text-gray-400 mb-1">{item.label}</p>
            <p className="text-xl font-semibold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </AppLayout>
  )
}

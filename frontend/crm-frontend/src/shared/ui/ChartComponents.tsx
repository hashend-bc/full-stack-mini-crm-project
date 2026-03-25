import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

interface BarChartComponentProps {
  data: { name: string; value: number }[]
  title?: string
  color?: string
}

export function BarChartComponent({ data, title, color = '#8884d8' }: BarChartComponentProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 shadow-card">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface PieChartComponentProps {
  data: { name: string; value: number }[]
  title?: string
  colors?: string[]
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function PieChartComponent({ data, title, colors = DEFAULT_COLORS }: PieChartComponentProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 shadow-card">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

interface LineChartComponentProps {
  data: { name: string; value: number }[]
  title?: string
  color?: string
}

export function LineChartComponent({ data, title, color = '#8884d8' }: LineChartComponentProps) {
  return (
    <div className="bg-white rounded-lg border border-border p-4 shadow-card">
      {title && <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
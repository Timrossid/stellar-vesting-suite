interface StatCardProps {
  title: string
  value: string
  icon: string
  trend?: 'up' | 'down'
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 sm:p-6 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-lg sm:text-2xl font-bold text-white">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      {trend && (
        <div className={`mt-3 text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? '↑' : '↓'} 12% from last month
        </div>
      )}
    </div>
  )
}

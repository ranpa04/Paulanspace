export default function StatsBar({ products }) {
  const totalProducts = products.length
  const totalItems = products.reduce((sum, p) => sum + p.quantity, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
  const lowStock = products.filter(p => p.quantity > 0 && p.quantity < 20).length
  const outOfStock = products.filter(p => p.quantity === 0).length

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: '📦', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Items', value: totalItems.toLocaleString(), icon: '🗃️', color: 'text-violet-600', bg: 'bg-violet-50' },
    {
      label: 'Total Value',
      value: `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: '💰',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    { label: 'Low Stock', value: lowStock, icon: '⚠️', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Out of Stock', value: outOfStock, icon: '🚫', color: 'text-red-600', bg: 'bg-red-50' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(s => (
        <div key={s.label} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 border border-slate-100">
          <div className={`${s.bg} rounded-lg p-2 text-xl`}>{s.icon}</div>
          <div>
            <p className="text-xs text-slate-500 font-medium leading-tight">{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

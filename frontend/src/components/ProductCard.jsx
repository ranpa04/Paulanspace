const CATEGORY_STYLES = {
  'Electronics': 'bg-blue-100 text-blue-700',
  'Clothing': 'bg-purple-100 text-purple-700',
  'Food': 'bg-green-100 text-green-700',
  'Home & Garden': 'bg-orange-100 text-orange-700',
  'Sports': 'bg-red-100 text-red-700',
}

const CATEGORY_ICONS = {
  'Electronics': '💻',
  'Clothing': '👕',
  'Food': '🛒',
  'Home & Garden': '🌿',
  'Sports': '🏃',
}

function StockBadge({ quantity }) {
  if (quantity === 0) {
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">Out of Stock</span>
  }
  if (quantity < 20) {
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-600">Low Stock</span>
  }
  return <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600">In Stock</span>
}

export default function ProductCard({ product, onDelete, onQuantityChange }) {
  const catStyle = CATEGORY_STYLES[product.category] || 'bg-slate-100 text-slate-600'
  const catIcon = CATEGORY_ICONS[product.category] || '📦'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${catStyle}`}>
            {catIcon} {product.category}
          </span>
          <button
            onClick={() => onDelete(product)}
            title="Delete product"
            className="text-slate-300 hover:text-red-500 transition-colors p-0.5 rounded"
          >
            🗑️
          </button>
        </div>

        <h3 className="font-semibold text-slate-800 text-sm leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-slate-400 font-mono mb-2">SKU: {product.sku}</p>

        {product.description && (
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{product.description}</p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-slate-800">
            ${product.price.toFixed(2)}
          </span>
          <StockBadge quantity={product.quantity} />
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="border-t border-slate-100 px-4 py-3 flex items-center justify-between bg-slate-50">
        <span className="text-xs text-slate-500 font-medium">Quantity</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQuantityChange(product, -1)}
            disabled={product.quantity === 0}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-lg leading-none flex items-center justify-center shadow-sm"
          >
            −
          </button>
          <span className="w-10 text-center font-bold text-slate-800 text-sm">{product.quantity}</span>
          <button
            onClick={() => onQuantityChange(product, +1)}
            className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors font-bold text-lg leading-none flex items-center justify-center shadow-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

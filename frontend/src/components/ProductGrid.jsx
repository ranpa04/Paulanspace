import ProductCard from './ProductCard'

export default function ProductGrid({ products, onDelete, onQuantityChange }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-lg font-medium text-slate-500">No products found</p>
        <p className="text-sm mt-1">Try adjusting your search or filter.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onQuantityChange={onQuantityChange}
        />
      ))}
    </div>
  )
}

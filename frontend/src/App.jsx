import { useState, useEffect, useCallback } from 'react'
import StatsBar from './components/StatsBar'
import ProductGrid from './components/ProductGrid'
import AddProductModal from './components/AddProductModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'

const CATEGORIES = ['All', 'Snowboards', 'Bindings', 'Boots', 'Helmets & Goggles', 'Outerwear', 'Accessories']

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null) // product to delete
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (selectedCategory !== 'All') params.set('category', selectedCategory)
      const res = await fetch(`/api/products?${params}`)
      if (!res.ok) throw new Error('Failed to fetch products')
      const data = await res.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [search, selectedCategory])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(fetchProducts, 200)
    return () => clearTimeout(timer)
  }, [fetchProducts])

  const handleAddProduct = async (formData) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to add product')
    await fetchProducts()
    showToast(`"${data.name}" added successfully! 🎉`)
    setShowAddModal(false)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return
    const res = await fetch(`/api/products/${deleteTarget.id}`, { method: 'DELETE' })
    if (!res.ok) {
      const data = await res.json()
      showToast(data.error || 'Failed to delete product', 'error')
    } else {
      await fetchProducts()
      showToast(`"${deleteTarget.name}" deleted.`, 'info')
    }
    setDeleteTarget(null)
  }

  const handleQuantityChange = async (product, delta) => {
    const newQty = Math.max(0, product.quantity + delta)
    const res = await fetch(`/api/products/${product.id}/quantity`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: newQty }),
    })
    if (res.ok) {
      setProducts(prev =>
        prev.map(p => p.id === product.id ? { ...p, quantity: newQty } : p)
      )
    } else {
      const data = await res.json()
      showToast(data.error || 'Failed to update quantity', 'error')
    }
  }

  // Stats computed from ALL products (not filtered) - fetch separately
  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setAllProducts)
      .catch(() => {})
  }, [products]) // refresh stats whenever products change

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏂</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SnowBoard Co. — Inventory</h1>
              <p className="text-slate-400 text-xs">Manage your snowboard shop stock</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white px-4 py-2 rounded-lg font-medium text-sm shadow"
          >
            <span className="text-lg leading-none">+</span>
            Add Product
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <StatsBar products={allProducts} />

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input
              type="text"
              placeholder="Search products by name, SKU or description..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="sm:w-48 px-3 py-2.5 rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-slate-700"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat === 'All' ? '🏷️ All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Results summary */}
        {!loading && (
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{products.length}</span> product{products.length !== 1 ? 's' : ''}
            {(search || selectedCategory !== 'All') && (
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All') }}
                className="ml-2 text-blue-500 hover:underline"
              >
                Clear filters
              </button>
            )}
          </p>
        )}

        {/* Product Grid */}
        {error ? (
          <div className="text-center py-16 text-red-500">
            <p className="text-4xl mb-3">⚠️</p>
            <p className="font-medium">{error}</p>
            <p className="text-sm text-slate-500 mt-1">Make sure the backend server is running on port 3001.</p>
          </div>
        ) : loading ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-4xl mb-3 animate-spin inline-block">⟳</p>
            <p>Loading products...</p>
          </div>
        ) : (
          <ProductGrid
            products={products}
            onDelete={setDeleteTarget}
            onQuantityChange={handleQuantityChange}
          />
        )}
      </main>

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddProduct}
          categories={CATEGORIES.filter(c => c !== 'All')}
        />
      )}
      {deleteTarget && (
        <DeleteConfirmModal
          product={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all
          ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'info' ? 'bg-slate-600' : 'bg-emerald-500'}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

// Comparable offers share a product ID and pack size across shop catalogues.
export const searchSamples = [
  { id: 'butter-100', name: 'Dairy', dish: 'Amul Butter', emoji: '🧈', unit: '100 g', group: 'Dairy', price: 60 },
  { id: 'milk-500', name: 'Dairy', dish: 'Amul Taaza Milk', emoji: '🥛', unit: '500 ml', group: 'Dairy', price: 28 },
  { id: 'bread-400', name: 'Bakery', dish: 'Harvest Gold Bread', emoji: '🍞', unit: '400 g', group: 'Bakery', price: 45 },
]

export function findComparisons(shops, query) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const groups = new Map()
  for (const shop of shops) for (const product of shop.products) {
    if (!words.every(word => `${product.dish} ${product.name} ${product.group || ''}`.toLowerCase().includes(word))) continue
    const key = `${product.id}:${product.unit || '1 serving'}`
    if (!groups.has(key)) groups.set(key, { product, offers: [] })
    groups.get(key).offers.push({ shop, product, total: product.price + shop.deliveryFee })
  }
  return [...groups.values()].map(({ product, offers }) => {
    const cheapest = [...offers].sort((a,b) => a.total-b.total || a.shop.time-b.shop.time)[0]
    const fastest = [...offers].sort((a,b) => a.shop.time-b.shop.time || a.total-b.total)[0]
    const rated = [...offers].sort((a,b) => Number(b.shop.rating)-Number(a.shop.rating) || a.total-b.total)[0]
    const rank = (offer) => [cheapest.total / offer.total, fastest.shop.time / offer.shop.time, Number(offer.shop.rating) / Number(rated.shop.rating)].reduce((sum,n) => sum+n,0)
    const ranked = [...offers].sort((a,b) => rank(b)-rank(a) || a.shop.id.localeCompare(b.shop.id))
    const selected = [...new Set([cheapest, fastest, rated, ...ranked])].slice(0,3)
    return { product, count: offers.length, offers: selected.map(offer => ({ ...offer, badges: [offer.total === cheapest.total && 'Best price', offer.shop.time === fastest.shop.time && 'Fastest', Number(offer.shop.rating) === Number(rated.shop.rating) && 'Top rated'].filter(Boolean) })) }
  })
}

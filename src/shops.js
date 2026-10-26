import { searchSamples } from './searchOffers.js'

export function makeShops(products, restaurants) {
  const specs = [
    ['local', 'Neighbourhood Market', 'Your everyday, freshly picked.', 'store', ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Pantry']],
    ['value', 'Everyday Mart', 'Little essentials. Lovely prices.', 'fresh', ['Vegetables', 'Fruits', 'Pantry', 'Dairy', 'Bakery', 'Home care']],
    ['express', 'City Express', 'Everyday essentials, delivered quickly.', 'store', ['Dairy', 'Bakery', 'Pantry']],
    ['fresh', 'Fresh Basket', 'Fresh picks for your kitchen.', 'fresh', ['Dairy', 'Bakery', 'Fruits']],
    ['tech', 'The Gadget Corner', 'Smart finds for everyday life.', 'headphones', ['Electronics']],
    ['home', 'Home & More', 'Make yourself at home.', 'home', ['Home care', 'Decor', 'Bedding']],
    ['health', 'Neighbourhood Wellness', 'Care, close to home.', 'store', ['Health care']],
  ]
  const grocery = { local: { time: 20, rating: '4.9', deliveryFee: 20, adjustment: 0 }, value: { time: 28, rating: '4.5', deliveryFee: 10, adjustment: -5 }, express: { time: 10, rating: '4.7', deliveryFee: 25, adjustment: 5 }, fresh: { time: 25, rating: '4.6', deliveryFee: 20, adjustment: 2 } }
  return [...specs.map(([id, name, description, image, groups], index) => ({ id, name, description, image: `/images/marketplace/${image}.jpg`, groups, rating: (4.8 - index * .1).toFixed(1), time: 15 + index * 5, deliveryFee: 20, products: products.filter(p => groups.includes(p.group)) })), ...restaurants.map(r => ({ id: `food-${r.id}`, name: r.name, description: r.cuisine, image: `/images/${r.image}.jpg`, groups: ['Food'], rating: r.rating, time: r.time, deliveryFee: 20, products: [r] }))].map(shop => grocery[shop.id] ? { ...shop, ...grocery[shop.id], products: [...shop.products, ...searchSamples.map(p => ({ ...p, price: p.price + grocery[shop.id].adjustment }))] } : shop)
}


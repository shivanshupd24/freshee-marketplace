import ProductArt from './ProductArt'

const collections = [
  { title: 'Snacks & drinks', subtitle: 'For snack breaks, tea time and everything in between.', theme: 'snacks', items: [
    ['Chips & namkeen', 'Chips & Namkeen', 0], ['Sweets & chocolates', 'Sweets & Chocolates', 1], ['Juices & drinks', 'Drinks & Juices', 2], ['Tea & coffee', 'Tea, Coffee & Milk Drinks', 3],
  ] },
  { title: 'Beauty & personal care', subtitle: 'Your everyday care routine, all in one place.', theme: 'beauty', items: [
    ['Skin care', 'Skin Care', 4], ['Hair care', 'Hair Care', 5], ['Bath & body', 'Personal Care', 6], ['Grooming', 'Fragrances & Grooming', 7],
  ] },
  { title: 'Household essentials', subtitle: 'Keep your home stocked, clean and comfortable.', theme: 'household', items: [
    ['Cleaning supplies', 'Cleaning & Laundry', 8], ['Laundry care', 'Cleaning & Laundry', 9], ['Kitchen essentials', 'Kitchenware & Appliances', 10], ['Tissues & paper', 'Home & Kitchen', 11],
  ] },
  { title: 'Sacred celebrations', subtitle: 'Flowers, torans & more for moments of devotion.', theme: 'sacred', items: [
    ['Puja flowers', 'Flowers & Bouquets', 12], ['Torans & garlands', 'Party & Decoration', 13], ['Diyas & puja decor', 'Decor & Lighting', 14], ['Incense & dhoop', 'Sacred Celebrations', 15],
  ] },
]

export default function EssentialCollections({ openCategory, products, openProduct }) {
  const sections = [...collections]
  sections.splice(3, 0, { title: 'Price drop zone', theme: 'value', products: products.filter(item => item.price < 150) })
  return <div className="essential-collections">{sections.map(section =>
    <section key={section.theme} className="market-section" aria-labelledby={`collection-${section.theme}`}>
      <div className="market-section-heading"><h2 id={`collection-${section.theme}`}>{section.title}</h2></div>
      <div className="market-shortcuts">{section.products ? section.products.map(product => <button key={product.id} onClick={() => openProduct(product)}>
        <span className="market-shortcut-art" aria-hidden="true"><ProductArt product={product} /></span><span className="market-shortcut-label">{product.dish}</span>
      </button>) : section.items.map(([label, category, cell]) => <button key={label} onClick={() => openCategory(category)}>
        <span className="market-shortcut-art" aria-hidden="true"><svg viewBox={`${cell % 4 * 256 + 2} ${Math.floor(cell / 4) * 256 + 2} 252 252`} focusable="false"><image href="/images/marketplace/essential-collections.png" width="1024" height="1024" /></svg></span>
        <span className="market-shortcut-label">{label}</span>
      </button>)}</div>
    </section>
  )}</div>
}

import { useState } from 'react'
import './ShopPages.css'

import ProductArt from './ProductArt'

export default function ShopPages({ shops, shop, title, query, onSearch, onBack, onOpen, onAdd, cart, onQuantity, onBag }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sort, setSort] = useState('Recommended')
  const [category, setCategory] = useState('All')
  const groups = [...new Set(shop?.products.map(p => p.group || 'Food') || [])]
  const items = shop?.products.filter(p => `${p.dish} ${p.name} ${p.group || ''}`.toLowerCase().includes(query.toLowerCase()) && (category === 'All' || (p.group || 'Food') === category)) || []
  const visible = shops.filter(s => `${s.name} ${s.description}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === 'Fastest delivery' ? a.time-b.time : Number(b.rating)-Number(a.rating))
  const count = cart.reduce((sum,p) => sum + p.quantity, 0)
  return <section className={`shop-page ${shop ? 'shop-detail' : ''}`}>
    <header className={shop ? 'shop-cover' : undefined}>
    {shop && <img className="shop-cover-image" src={shop.image} alt={`${shop.name} storefront illustration`} />}
    <div className={`shop-title-row ${shop ? 'shop-store-heading' : ''}`}>
      <button className="shop-back" aria-label={shop ? 'Back to shops' : 'Back to categories'} onClick={onBack}>←</button>

      <div className="shop-title"><h1>{shop ? shop.name : title}</h1></div>
      <button className="shop-search-toggle" aria-label="Search" aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); onSearch('') }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg></button>
    </div>
    {shop && <div className="shop-cover-info"><p>{shop.description}</p><div className="shop-cover-facts"><span>★ {shop.rating} rating</span><span>{shop.time}–{shop.time + 5} min</span><span>₹{shop.deliveryFee} delivery</span></div></div>}
    </header>
    {shop && <div className="shop-hours"><span>Opening hours not provided</span><span className="shop-demo-label">Demo store & catalogue</span></div>}
    {searchOpen && <input className="shop-search" aria-label={shop ? 'Search shop items' : 'Search shops'} placeholder={shop ? 'Search items…' : 'Search shops…'} value={query} onChange={e => onSearch(e.target.value)} />}
    {shop ? <>
      <nav className="shop-categories" aria-label="Store product categories">{['All', ...groups].map(group => {
        const products = group === 'All' ? shop.products : shop.products.filter(p => (p.group || 'Food') === group)
        return <button key={group} aria-pressed={category === group} aria-label={`${group}, ${products.length} products`} onClick={() => setCategory(group)}>
          <span className="shop-category-art" aria-hidden="true">{group === 'All' ? <img src={shop.image} alt="" /> : products[0] && <ProductArt product={products[0]} />}</span>
          <span className="shop-category-name">{group}</span>
        </button>
      })}</nav>
      <div className="shop-list-heading"><h2>{category === 'All' ? 'Shop all essentials' : category}</h2><span>{items.length} products</span></div>
      <div className="shop-products">{items.map(p => {
        const id = `${shop.id}:${p.id}`
        const quantity = cart.find(c => c.id === id)?.quantity || 0
        return <article className="shop-product" key={p.id}>
          <div className="shop-product-art"><ProductArt product={p} /></div>
          <span className="shop-product-category">{p.group || 'Freshly prepared'}</span>
          <h3>{p.dish}</h3><p>{p.unit || '1 serving'}</p>
          <div className="shop-product-bottom"><strong>₹{p.price}</strong>{quantity ? <div className="shop-stepper"><button aria-label={`Remove one ${p.dish}`} onClick={() => onQuantity(id,-1)}>−</button><span aria-live="polite">{quantity}</span><button aria-label={`Add one ${p.dish}`} onClick={() => onQuantity(id,1)}>+</button></div> : <button className="shop-add" aria-label={`Add ${p.dish} to cart`} onClick={() => onAdd({...p, id, sellerId: shop.id, sellerName: shop.name, deliveryFee: shop.deliveryFee})}>ADD +</button>}</div>
        </article>
      })}</div>
      {!items.length && <div className="empty-state"><h3>No items found</h3><p>Try another category or search.</p><button className="primary-button" onClick={() => {setCategory('All'); onSearch('')}}>Show all products</button></div>}

    </> : <><div className="shop-list-heading"><h2>{visible.length} {visible.length === 1 ? 'shop' : 'shops'} <small className="shop-demo-label">Demo</small></h2><select aria-label="Sort shops" value={sort} onChange={e => setSort(e.target.value)}><option>Recommended</option><option>Fastest delivery</option></select></div><div className="shop-grid">{visible.map(s => <button className="shop-card" key={s.id} onClick={() => onOpen(s)}><div className="shop-card-photo"><img src={s.image} alt="" /><span>★ {s.rating}</span></div><div className="shop-card-copy"><h2>{s.name}</h2><div className="shop-card-meta"><span>{s.time}–{s.time+5} min</span><span>₹{s.deliveryFee} delivery</span></div></div></button>)}</div>{!visible.length && <div className="empty-state"><h3>No shops listed yet</h3><p>{query ? 'Try another shop name.' : 'Try another category.'}</p><button className="primary-button" onClick={onBack}>Explore categories</button></div>}</>}
    {count > 0 && <button className="shop-bag" onClick={onBag}><span><strong>{count} {count === 1 ? 'item' : 'items'} · ₹{cart.reduce((sum,p) => sum+p.price*p.quantity,0)}</strong><small>{cart[0].sellerName}</small></span><b>View cart →</b></button>}
  </section>
}

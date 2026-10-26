import { useEffect, useRef } from 'react'
import { findComparisons } from './searchOffers'
import './SearchPage.css'

export default function SearchPage({ shops, query, onSearch, onBack, onOpen, onAdd, cart, onQuantity, onBag }) {
  const input = useRef(null)
  useEffect(() => { input.current?.focus() }, [])
  const results = findComparisons(shops, query)
  return <section className="comparison-search-page">
    <div className="comparison-search-bar">
      <button aria-label="Back to home" onClick={onBack}>←</button>
      <input ref={input} type="search" aria-label="Search products across shops" placeholder="Search butter, milk, bread…" value={query} onChange={e => onSearch(e.target.value)} />
      {query && <button aria-label="Clear search" onClick={() => { onSearch(''); input.current?.focus() }}>×</button>}
    </div>
    {!query.trim() ? <div className="search-suggestions"><p>Try a search <small>Demo products</small></p><div>{[['🧈', 'Butter'], ['🥛', 'Milk'], ['🍞', 'Bread']].map(([emoji,name]) => <button key={name} onClick={() => onSearch(name)}><span>{emoji}</span>{name}</button>)}</div></div> : <>
      <div className="search-results-count" role="status">{results.length ? `${results.length} ${results.length === 1 ? 'product' : 'products'} · Top shop matches` : 'No products found'}<small>Demo offers</small></div>
      {!results.length && <div className="empty-state"><span aria-hidden="true">⌕</span><p>Try butter, milk or bread.</p></div>}
      {results.map(({product, offers, count}) => <section className="search-product-result" key={`${product.id}:${product.unit}`} aria-label={product.dish}>
        <div className="search-product-heading"><div className="search-product-image">{product.emoji || <img src={`/images/${product.image}.jpg`} alt="" />}</div><div><h1>{product.dish}</h1><p>{product.unit || '1 serving'} · {count} {count === 1 ? 'shop' : 'shops'}</p></div></div>
        <div className="search-offers">{offers.map(({shop, product: item, total, badges}) => {
          const id = `${shop.id}:${item.id}`
          const quantity = cart.find(p => p.id === id)?.quantity || 0
          return <article className="search-offer" key={shop.id}>
            <div className="search-offer-badges">{badges.map(b => <span key={b}>{b}</span>)}</div>
            <button className="search-shop-link" onClick={() => onOpen(shop)}><img src={shop.image} alt="" /><strong>{shop.name} <span>↗</span></strong></button>
            <div className="search-offer-metrics"><span>◷ {shop.time} min</span><span>★ {shop.rating}</span></div>
            <div className="search-offer-price"><div><strong>₹{total}</strong><small>₹{item.price} + ₹{shop.deliveryFee} delivery</small></div>{quantity ? <div className="shop-stepper"><button aria-label={`Remove one ${item.dish} from ${shop.name}`} onClick={() => onQuantity(id,-1)}>−</button><span>{quantity}</span><button aria-label={`Add one ${item.dish} from ${shop.name}`} onClick={() => onQuantity(id,1)}>+</button></div> : <button className="shop-add" aria-label={`Add ${item.dish} from ${shop.name}`} onClick={() => onAdd({...item, id, sellerId: shop.id, sellerName: shop.name, deliveryFee: shop.deliveryFee})}>Add +</button>}</div>
          </article>
        })}</div>
      </section>)}
      {!!results.length && <p className="search-price-note">Prices include one delivery fee. Delivery is charged once per order.</p>}
    </>}
    {!!cart.length && <button className="shop-bag search-bag" onClick={onBag}><span><strong>{cart.reduce((sum,p) => sum+p.quantity,0)} items · ₹{cart.reduce((sum,p) => sum+p.price*p.quantity,0)}</strong><small>{cart[0].sellerName}</small></span><b>View bag →</b></button>}
  </section>
}

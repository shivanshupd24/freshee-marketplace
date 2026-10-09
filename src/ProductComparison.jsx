import { useState } from 'react'
import './ProductComparison.css'

export default function ProductComparison({ product, onAdd }) {
  const [sort, setSort] = useState('Recommended')
  const [selected, setSelected] = useState(null)
  const offers = [
    { id: 'local', name: 'Neighbourhood Market', price: product.price, delivery: 20, minutes: 16, rating: '4.7' },
    { id: 'value', name: 'Everyday Mart', price: Math.max(1, product.price - 6), delivery: 15, minutes: 28, rating: '4.5' },
    { id: 'express', name: 'City Express', price: product.price + 4, delivery: 25, minutes: 12, rating: '4.8' },
  ]
  const sorted = [...offers].sort((a, b) => sort === 'Lowest total' ? a.price + a.delivery - b.price - b.delivery : sort === 'Fastest' ? a.minutes - b.minutes : 0)
  const offer = offers.find((item) => item.id === selected)
  return <>
    <span className="compare-eyebrow">FIND YOUR BEST BUY</span>
    <div className="compare-product"><span className="compare-product-art" aria-hidden="true">{product.emoji}</span><div><h2 id="modal-title">{product.dish}</h2><p>{product.unit} · {product.name}</p><strong>Compare 3 seller offers</strong></div></div>
    <p className="compare-demo">Demo offers · Prices, ratings and delivery estimates are illustrative.</p>
    <div className="compare-heading"><h3>Compare nearby sellers</h3><span>Delivery included in totals</span></div>
    <div className="compare-sort" role="group" aria-label="Sort sellers">{['Recommended', 'Lowest total', 'Fastest'].map((label) => <button key={label} aria-pressed={sort === label} className={sort === label ? 'active' : ''} onClick={() => setSort(label)}>{label}</button>)}</div>
    <fieldset className="compare-offers"><legend className="compare-sr-only">Choose a seller</legend>{sorted.map((item) => <label className={`compare-offer ${selected === item.id ? 'selected' : ''}`} key={item.id}>
      <input type="radio" name="seller" value={item.id} checked={selected === item.id} onChange={() => setSelected(item.id)} />
      <span className="compare-seller"><strong>{item.name}</strong><small>★ {item.rating} · {item.minutes} min estimated</small><b>Total ₹{item.price + item.delivery}</b></span>
      <span className="compare-cost"><strong>₹{item.price}</strong><small>+ ₹{item.delivery} delivery</small><em>{item.id === 'value' ? 'Lowest total' : item.id === 'express' ? 'Fastest' : 'Top match'}</em></span>
    </label>)}</fieldset>
    <div className="compare-action"><button disabled={!offer} className="primary-button" onClick={() => onAdd({ ...product, id: `${product.id}-${offer.id}`, productId: product.id, sellerId: offer.id, sellerName: offer.name, deliveryFee: offer.delivery, price: offer.price })}>{offer ? <>Add from {offer.name}<span>₹{offer.price + offer.delivery}</span></> : 'Select a seller to add'}</button><p>Delivery is charged once per seller in your bag.</p></div>
  </>
}

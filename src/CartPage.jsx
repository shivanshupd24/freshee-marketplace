import ProductArt from './ProductArt'
import './CartPage.css'

export default function CartPage({ cart, onQuantity, onBrowse, deliveryFee }) {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return <section className="cart-page" aria-labelledby="cart-heading">
    <header className="cart-page-heading"><button className="shop-back" onClick={onBrowse} aria-label="Back to shopping">←</button><div><h1 id="cart-heading">Your cart</h1><p>{count} {count === 1 ? 'item' : 'items'}</p></div></header>
    {cart.length ? <div className="cart-page-layout"><div className="cart-page-items"><h2>{cart[0].sellerName || 'Your items'}</h2><p className="cart-page-caption">One store, one delivery</p>
      {cart.map(item => <article className="cart-page-item" key={item.id}>
        <div className="cart-page-art"><ProductArt product={{ ...item, id: String(item.id).split(':').slice(1).join(':') || item.id }} /></div>
        <div className="cart-page-item-copy"><h3>{item.dish}</h3><p>{item.unit || '1 serving'} · ₹{item.price} each</p><div className="shop-stepper"><button aria-label={`Remove one ${item.dish}`} onClick={() => onQuantity(item.id, -1)}>−</button><span aria-live="polite">{item.quantity}</span><button aria-label={`Add one ${item.dish}`} onClick={() => onQuantity(item.id, 1)}>+</button></div></div>
        <strong>₹{item.price * item.quantity}</strong>
      </article>)}
      <button className="cart-continue" onClick={onBrowse}>Continue shopping →</button>
    </div><aside className="cart-page-summary" aria-label="Bill details"><h2>Bill details</h2><dl><div><dt>Item total</dt><dd>₹{subtotal}</dd></div><div><dt>Delivery fee</dt><dd>₹{deliveryFee}</dd></div><div className="cart-pay-total"><dt>Total</dt><dd>₹{subtotal + deliveryFee}</dd></div></dl><p className="cart-preview-note">Preview cart · Checkout and delivery aren’t connected yet.</p></aside></div> : <div className="cart-page-empty"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M2 3h3l3 12h11l3-9H6M8 15l-1 3h13" /><circle cx="9" cy="21" r="1" /><circle cx="19" cy="21" r="1" /></svg><h2>Your cart is empty</h2><p>Discover everyday essentials from stores near you.</p><button className="primary-button" onClick={onBrowse}>Start shopping</button></div>}
  </section>
}

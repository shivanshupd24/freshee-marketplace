import { useRef, useState } from 'react'
import './MarketplaceHome.css'

const photo = (name) => `/images/marketplace/${name}.jpg`
const shortcuts = [
  ['Fashion', 'fashion', 'Women’s Clothing'], ['Electronics', 'headphones', 'Audio & Headphones'],
  ['Home & living', 'home', 'Decor & Lighting'], ['Fresh & grocery', 'fresh', 'Vegetables & Fruits'],
]
const promotions = [
  { title: 'Small upgrades.\nBig everyday joy.', eyebrow: 'THE TECH EDIT', copy: 'Discover your next favourite gadget.', image: 'headphones', category: 'Audio & Headphones', theme: 'gold' },
  { title: 'A little refresh\nfor your home.', eyebrow: 'MAKE ROOM FOR COMFORT', copy: 'Thoughtful finds for every corner.', image: 'home', category: 'Decor & Lighting', theme: 'peach' },
  { title: 'Fresh finds.\nFeel-good days.', eyebrow: 'FRESH FROM THE MARKET', copy: 'Bring a little colour to your everyday.', image: 'fresh', category: 'Vegetables & Fruits', theme: 'mint' },
]
const stores = [
  { name: 'Neighbourhood Market', image: 'store', type: 'Groceries & daily needs', ids: [101, 102, 103, 104, 105], distance: '0.8 km' },
  { name: 'The Gadget Corner', image: 'headphones', type: 'Electronics & accessories', ids: [109, 110], distance: '1.2 km' },
  { name: 'Home & More', image: 'home', type: 'Home care & living', ids: [106, 111, 112, 113], distance: '1.6 km' },
]

export default function MarketplaceHome({ products, addItem, openProduct, saved, toggleSaved, openCategory, viewAll, address, openShop }) {
  const [slide, setSlide] = useState(0)
  const carousel = useRef(null)
  function goToSlide(index) {
    const track = carousel.current
    track?.children[index]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })
  }
  function productRail(title, items, className = '') {
    return <section className={`market-section product-shelf ${className}`} aria-label={title}>
      <div className="market-section-heading"><h2>{title}</h2><span>{items.length} finds</span></div>
      <div className="market-product-track">
        {items.map((item) => <article className="market-product" key={item.id}>
          <div className="market-product-art">
            <button className="market-product-open" aria-label={`Find shops selling ${item.dish}`} onClick={() => openProduct(item)}><span aria-hidden="true">{item.emoji}</span></button>
            <button className={`market-save ${saved.includes(item.id) ? 'is-saved' : ''}`} aria-label={`${saved.includes(item.id) ? 'Unsave' : 'Save'} ${item.dish}`} aria-pressed={saved.includes(item.id)} onClick={() => toggleSaved(item.id)}>♥</button>
            <button className="market-add" aria-label={`Find a shop for ${item.dish}`} onClick={() => addItem(item)}>+</button>
          </div>
          <strong className="market-price">₹{item.price}</strong>
          <p>{item.name}</p><button className="market-product-title" onClick={() => openProduct(item)}><h3>{item.dish}</h3></button><small>{item.unit}</small>
        </article>)}
      </div>
    </section>
  }
  return <div className="market-home">
    <section className="market-section" aria-labelledby="shopping-heading">
      <div className="market-section-heading"><h2 id="shopping-heading">What are you shopping for?</h2><button onClick={viewAll}>View all <span aria-hidden="true">↗</span></button></div>
      <div className="market-shortcuts">{shortcuts.map(([name, image, category]) => <button key={name} onClick={() => openCategory(category)}><img src={photo(image)} alt="" /><span>{name}</span></button>)}</div>
    </section>

    <section className="market-section" aria-labelledby="stores-heading">
      <div className="market-section-heading"><h2 id="stores-heading">Popular stores near you</h2><span className="market-demo">Demo stores</span></div>
      <p className="market-section-description">Around {address} · Sample distances and catalogues</p>
      <div className="market-store-track">{stores.map((item) => <button key={item.name} className="market-store" onClick={() => openShop(item.name)}>
        <div className="market-store-photo"><img src={photo(item.image)} alt="" loading="lazy" /><span>{item.distance} away</span></div>
        <h3>{item.name}</h3><p>{item.type}</p><span className="store-explore">Explore store <span aria-hidden="true">→</span></span>
      </button>)}</div>
    </section>

    <section className="market-carousel" aria-label="Featured collections" aria-roledescription="carousel">
      <div className="market-banner-track" ref={carousel} onScroll={(event) => {
        const track = event.currentTarget
        const width = track.children[0]?.getBoundingClientRect().width + 16
        if (width) setSlide(Math.max(0, Math.min(promotions.length - 1, Math.round(track.scrollLeft / width))))
      }}>
        {promotions.map((item, index) => <article className={`market-banner ${item.theme}`} key={item.title} aria-label={`${index + 1} of ${promotions.length}`} aria-roledescription="slide">
          <img src={photo(item.image)} alt="" loading="lazy" />
          <div className="market-banner-copy"><span>{item.eyebrow}</span><h2>{item.title}</h2><p>{item.copy}</p><button onClick={() => openCategory(item.category)}>Shop now <span aria-hidden="true">→</span></button></div>
        </article>)}
      </div>
      <div className="market-carousel-controls"><button aria-label="Previous collection" disabled={slide === 0} onClick={() => goToSlide(slide - 1)}>←</button><div>{promotions.map((item, index) => <button key={item.title} className={index === slide ? 'active' : ''} aria-label={`Show ${item.eyebrow.toLowerCase()}`} aria-current={index === slide ? 'true' : undefined} onClick={() => goToSlide(index)} />)}</div><button aria-label="Next collection" disabled={slide === promotions.length - 1} onClick={() => goToSlide(slide + 1)}>→</button></div>
    </section>

    {productRail('Top picks for your everyday', products.filter((item) => [109, 102, 106, 104, 111].includes(item.id)), 'green-shelf')}
    <section className="market-section" aria-label="Weekly highlights">
      <div className="market-section-heading"><h2>Weekly highlights</h2></div>
      <div className="market-highlights">{[['Your next outfit', 'fashion', 'Women’s Clothing'], ['Little home refreshes', 'home', 'Decor & Lighting'], ['Fresh starts here', 'fresh', 'Vegetables & Fruits']].map(([title, image, category]) => <button key={title} onClick={() => openCategory(category)}><img src={photo(image)} alt="" loading="lazy" /><span>{title} <b aria-hidden="true">↗</b></span></button>)}</div>
    </section>
    <button className="market-tech-banner" onClick={() => openCategory('Audio & Headphones')}><span><small>PLUG INTO SOMETHING GOOD</small><strong>Everyday gadgets,<br />everyday happiness.</strong><span>Explore electronics →</span></span><img src={photo('headphones')} alt="Headphones on a golden background" loading="lazy" /></button>
    {productRail('Electronics you’ll love', products.filter((item) => item.group === 'Electronics'))}
    {productRail('Little things your home needs', products.filter((item) => ['Home care', 'Decor', 'Bedding'].includes(item.group)), 'peach-shelf')}
  </div>
}

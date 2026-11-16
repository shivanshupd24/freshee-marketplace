import { useRef, useState } from 'react'
import './MarketplaceHome.css'
import OccasionBanner from './OccasionBanner'
import ProductArt from './ProductArt'
import EssentialCollections from './EssentialCollections'

const photo = (name) => `/images/marketplace/${name}.jpg`
const shortcuts = [
  { name: 'Cleaners & Repellents', category: 'Cleaning & Laundry', art: [36, 20, 244, 244] },
  { name: 'Home & Lifestyle', category: 'Home & Kitchen', art: [307, 20, 244, 244] },
  { name: 'Toys, Games & Sports', category: 'Toys & Games', art: [578, 20, 244, 244] },
  { name: 'Stationery & Books', category: 'Books & Stationery', art: [36, 370, 244, 244] },
  { name: 'Travel & Automotive', category: 'Automotive', art: [307, 370, 244, 244] },
  { name: 'Pet Supplies', category: 'Pet Supplies', art: [578, 370, 244, 244] },
]
const promotions = [
  { title: 'Small upgrades.\nBig everyday joy.', eyebrow: 'THE TECH EDIT', copy: 'Discover your next favourite gadget.', image: 'headphones', category: 'Audio & Headphones', theme: 'gold' },
  { title: 'A little refresh\nfor your home.', eyebrow: 'MAKE ROOM FOR COMFORT', copy: 'Thoughtful finds for every corner.', image: 'home', category: 'Decor & Lighting', theme: 'peach' },
  { title: 'Fresh finds.\nFeel-good days.', eyebrow: 'FRESH FROM THE MARKET', copy: 'Bring a little colour to your everyday.', image: 'fresh', category: 'Vegetables & Fruits', theme: 'mint' },
]
const stores = [
  { name: 'Neighbourhood Market', image: 'indian-kirana', type: 'Groceries & daily needs', ids: [101, 102, 103, 104, 105], distance: '0.8 km' },
  { name: 'The Gadget Corner', image: 'indian-electronics', type: 'Electronics & accessories', ids: [109, 110], distance: '1.2 km' },
  { name: 'Home & More', image: 'indian-homewares', type: 'Home care & living', ids: [106, 111, 112, 113], distance: '1.6 km' },
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
            <button className="market-product-open" aria-label={`Find shops selling ${item.dish}`} onClick={() => openProduct(item)}><ProductArt product={item} /></button>
            <button className={`market-save ${saved.includes(item.id) ? 'is-saved' : ''}`} aria-label={`${saved.includes(item.id) ? 'Unsave' : 'Save'} ${item.dish}`} aria-pressed={saved.includes(item.id)} onClick={() => toggleSaved(item.id)}><svg width="17" height="17" viewBox="0 0 24 24" fill={saved.includes(item.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg></button>
          </div>
          <p>{item.name}</p><button className="market-product-title" onClick={() => openProduct(item)}><h3>{item.dish}</h3></button><small>{item.unit}</small>
          <div className="market-product-purchase"><strong className="market-price">₹{item.price}</strong><button className="market-add" aria-label={`Find a shop for ${item.dish}`} onClick={() => addItem(item)}>SHOP <span aria-hidden="true">+</span></button></div>
        </article>)}
      </div>
    </section>
  }
  return <div className="market-home">
    <OccasionBanner />
    <section className="market-section" aria-labelledby="shopping-heading">
      <div className="market-section-heading"><h2 id="shopping-heading">What are you shopping for?</h2><button className="market-view-all" onClick={viewAll} aria-label="View all categories"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button></div>
      <div className="market-shortcuts">{shortcuts.map(({ name, category, art }) => <button key={name} onClick={() => openCategory(category)}>
        <span className="market-shortcut-art" aria-hidden="true"><svg viewBox={art.join(' ')} focusable="false"><image href="/images/marketplace/shopping-categories-reference.jpeg" width="858" height="1600" /></svg></span>
        <span className="market-shortcut-label">{name}</span>
      </button>)}</div>
    </section>

    <section className="market-section" aria-labelledby="stores-heading">
      <div className="market-section-heading"><h2 id="stores-heading">Popular stores near you</h2></div>
      <p className="market-section-description">Around {address} · Sample distances and catalogues</p>
      <div className="market-store-track">{stores.map((item) => <button key={item.name} className="market-store" onClick={() => openShop(item.name)}>
        <div className="market-store-photo"><img src={`/images/marketplace/${item.image}.png`} alt={`Illustrative Indian storefront for ${item.name}`} loading="lazy" /><span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{item.distance} away</span></div>
        <div className="market-store-details"><h3>{item.name}</h3><p>{item.type}</p><span className="store-explore">Explore store <span className="store-chevron" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg></span></span></div>
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
    <EssentialCollections openCategory={openCategory} products={products} openProduct={openProduct} />
    <button className="market-tech-banner" onClick={() => openCategory('Audio & Headphones')}><span><small>PLUG INTO SOMETHING GOOD</small><strong>Everyday gadgets,<br />everyday happiness.</strong><span>Explore electronics →</span></span><img src={photo('headphones')} alt="Headphones on a golden background" loading="lazy" /></button>
    {productRail('Electronics you’ll love', products.filter((item) => item.group === 'Electronics'))}
    {productRail('Little things your home needs', products.filter((item) => ['Home care', 'Decor', 'Bedding'].includes(item.group)), 'peach-shelf')}
  </div>
}

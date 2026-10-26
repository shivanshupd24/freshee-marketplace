import { useEffect, useRef, useState } from 'react'
import './App.css'
import MarketplaceHome from './MarketplaceHome'
import ShopPages from './ShopPages'
import SearchPage from './SearchPage'
import { makeShops } from './shops'

function Icon({ name, size = 22, ...props }) {
  const paths = {
    pharma: <><rect x="4" y="4" width="16" height="17" rx="4" /><path d="M9 4V2h6v2M12 9v7M8.5 12.5h7" /></>,
    headphones: <><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><rect x="3" y="12" width="5" height="9" rx="2" /><rect x="16" y="12" width="5" height="9" rx="2" /></>,
    home: <path d="m3 10 9-7 9 7v11h-6v-7H9v7H3V10Z" />,
    pin: (
      <>
        <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    bolt: <path d="m13 2-9 12h7l-1 8 10-13h-8l1-7Z" />,
    grid: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="2" />
        <rect x="15" y="3" width="6" height="6" rx="2" />
        <rect x="3" y="15" width="6" height="6" rx="2" />
        <rect x="15" y="15" width="6" height="6" rx="2" />
      </>
    ),
    tag: (
      <>
        <path d="m3 3 10 .5 8 8a2 2 0 0 1 0 3l-6.5 6.5a2 2 0 0 1-3 0l-8-8L3 3Z" />
        <circle cx="8" cy="8" r="1" />
      </>
    ),
    bag: (
      <>
        <path d="M5 7h14l2 14H3L5 7Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </>
    ),
    food: (
      <>
        <path d="M3 17h18M5 14a7 7 0 0 1 14 0H5ZM7 21h10M12 4V2" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C7 2 2 8 5 16s17 3 15-13Z" />
        <path d="m3 22 12-13" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: (
      <>
        <path d="M10 6h11M10 12h11M10 18h11" />
        <circle cx="4" cy="6" r=".5" />
        <circle cx="4" cy="12" r=".5" />
        <circle cx="4" cy="18" r=".5" />
      </>
    ),
    star: <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.food}
    </svg>
  )
}

const restaurants = [
  {
    id: 1,
    name: 'The Burger Club',
    cuisine: 'Burgers · American · Fast food',
    image: 'burger',
    rating: '4.6',
    time: 15,
    price: 99,
    offer: '50% OFF',
    subtitle: 'UP TO ₹120',
    veg: false,
    dish: 'Signature cheeseburger',
  },
  {
    id: 2,
    name: 'Oven Story Pizza',
    cuisine: 'Pizza · Italian · Comfort food',
    image: 'pizza',
    rating: '4.5',
    time: 25,
    price: 149,
    offer: 'BUY 1 GET 1',
    subtitle: 'ON YOUR FAVOURITES',
    veg: true,
    dish: 'Margherita pizza',
  },
  {
    id: 3,
    name: 'The Green Bowl',
    cuisine: 'Healthy · Salads · Bowls',
    image: 'bowl',
    rating: '4.8',
    time: 15,
    price: 129,
    offer: '30% OFF',
    subtitle: 'FRESH FEELS GOOD',
    veg: true,
    dish: 'Rainbow harvest bowl',
  },
  {
    id: 4,
    name: 'Sweet Little Things',
    cuisine: 'Desserts · Bakery · Ice cream',
    image: 'dessert',
    rating: '4.7',
    time: 20,
    price: 89,
    offer: 'FROM ₹89',
    subtitle: 'A LITTLE SWEET TREAT',
    veg: true,
    dish: 'Berry cheesecake cup',
  },
]
const categories = [
  { name: 'All', icon: 'grid' },
  { name: '₹99 Store', text: '99' },
  { name: 'Offers', icon: 'tag' },
  { name: 'Quick bites', icon: 'bolt' },
  { name: 'Healthy', icon: 'leaf' },
]
const essentialDepartments = [
  { name: 'All', icon: 'bag', groups: [] },
  { name: 'Pharma', icon: 'pharma', groups: ['Health care'] },
  { name: 'Fresh', icon: 'leaf', groups: ['Vegetables', 'Fruits', 'Dairy', 'Bakery'] },
  { name: 'Electronics', icon: 'headphones', groups: ['Electronics'] },
  { name: 'Pantry', icon: 'bag', groups: ['Pantry'] },
  { name: 'Home care', icon: 'home', groups: ['Home care'] },
]
const moods = [
  { name: 'Burgers', image: 'burger' },
  { name: 'Pizza', image: 'pizza' },
  { name: 'Healthy', image: 'bowl' },
  { name: 'Desserts', image: 'dessert' },
]

const essentials = [
  { id: 111, name: 'Home accents', dish: 'Ceramic table vase', emoji: '🏺', price: 249, unit: '1 piece', group: 'Decor' },
  { id: 112, name: 'Soft furnishings', dish: 'Cotton cushion cover', emoji: '🛋️', price: 199, unit: '1 cover', group: 'Bedding' },
  { id: 113, name: 'Cleaning essentials', dish: 'Cleaning brush set', emoji: '🧹', price: 89, unit: '2 pieces', group: 'Home care' },

  { id: 101, name: 'Fresh vegetables', dish: 'Seasonal vegetable basket', emoji: '🥬', price: 99, unit: '1 basket', group: 'Vegetables' },
  { id: 102, name: 'Fresh fruits', dish: 'Fresh fruit basket', emoji: '🍎', price: 149, unit: '1 basket', group: 'Fruits' },
  { id: 103, name: 'Milk & dairy', dish: 'Fresh milk', emoji: '🥛', price: 32, unit: '500 ml', group: 'Dairy' },
  { id: 104, name: 'Bakery', dish: 'Whole wheat bread', emoji: '🍞', price: 45, unit: '400 g', group: 'Bakery' },
  { id: 105, name: 'Pantry staples', dish: 'Basmati rice', emoji: '🌾', price: 129, unit: '1 kg', group: 'Pantry' },
  { id: 107, name: 'First aid', dish: 'Adhesive bandages', emoji: '🩹', price: 49, unit: '20 pieces', group: 'Health care' },
  { id: 108, name: 'Health essentials', dish: 'Digital thermometer', emoji: '🌡️', price: 199, unit: '1 piece', group: 'Health care' },
  { id: 109, name: 'Everyday electronics', dish: 'Wireless headphones', emoji: '🎧', price: 799, unit: '1 pair', group: 'Electronics' },
  { id: 110, name: 'Charging essentials', dish: 'USB-C charging cable', emoji: '🔌', price: 199, unit: '1 metre', group: 'Electronics' },
  { id: 106, name: 'Home care', dish: 'Laundry detergent', emoji: '🧴', price: 119, unit: '500 g', group: 'Home care' },
]

// Tile coordinates in the supplied 738 × 1600 category artwork.
const categorySections = [
  { title: "Fashion & Accessories", items: [
    {"name": "Women’s Clothing", "emoji": "👗", "groups": ["Women’s Clothing"]},
    {"name": "Men’s Clothing", "emoji": "👕", "groups": ["Men’s Clothing"]},
    {"name": "Footwear", "emoji": "👟", "groups": ["Footwear"]},
    {"name": "Bags & Accessories", "emoji": "👜", "groups": ["Accessories"]},
  ] },
  { title: "Electronics & Gadgets", items: [
    {"name": "Mobiles & Tablets", "emoji": "📱", "groups": ["Mobiles"]},
    {"name": "Audio & Headphones", "emoji": "🎧", "groups": ["Electronics"]},
    {"name": "Computers & Laptops", "emoji": "💻", "groups": ["Computers"]},
    {"name": "Chargers & Cables", "emoji": "🔌", "groups": ["Electronics"]},
  ] },
  { title: "Beauty & Personal Care", items: [
    {"name": "Skin Care", "emoji": "🧴", "groups": ["Skin Care"]},
    {"name": "Makeup", "emoji": "💄", "groups": ["Makeup"]},
    {"name": "Hair Care", "emoji": "🧖‍♀️", "groups": ["Hair Care"]},
    {"name": "Fragrances & Grooming", "emoji": "🪒", "groups": ["Grooming"]},
  ] },
  { title: "Home & Living", items: [
    {"name": "Furniture", "emoji": "🛋️", "groups": ["Furniture"]},
    {"name": "Decor & Lighting", "emoji": "💡", "groups": ["Decor"]},
    {"name": "Bedding & Bath", "emoji": "🛏️", "groups": ["Bedding"]},
    {"name": "Cleaning & Laundry", "emoji": "🧺", "groups": ["Home care"]},
  ] },
  { title: "Health & Wellness", items: [
    {"name": "Medicines & First Aid", "emoji": "🩹", "groups": ["Health care"]},
    {"name": "Vitamins & Nutrition", "emoji": "💊", "groups": ["Nutrition"]},
    {"name": "Fitness & Sports", "emoji": "🏋️", "groups": ["Sports"]},
    {"name": "Health Devices", "emoji": "🌡️", "groups": ["Health care"]},
  ] },
  { title: "Kids, Toys & Baby", items: [
    {"name": "Baby Care", "emoji": "🍼", "groups": ["Baby Care"]},
    {"name": "Toys & Games", "emoji": "🧸", "groups": ["Toys"]},
    {"name": "Kids’ Clothing", "emoji": "👶", "groups": ["Kids’ Clothing"]},
    {"name": "School Supplies", "emoji": "🎒", "groups": ["School Supplies"]},
  ] },
  { title: "Books, Hobbies & More", items: [
    {"name": "Books & Stationery", "emoji": "📚", "groups": ["Books"]},
    {"name": "Art & Craft", "emoji": "🎨", "groups": ["Art & Craft"]},
    {"name": "Pet Supplies", "emoji": "🐾", "groups": ["Pet Supplies"]},
    {"name": "Automotive", "emoji": "🛵", "groups": ["Automotive"]},
  ] },
  { title: 'Grocery & Kitchen', items: [
    { name: 'Vegetables & Fruits', groups: ['Vegetables', 'Fruits'], x: 24, y: 469 },
    { name: 'Atta, Rice & Dal', groups: ['Pantry'], x: 201, y: 469 },
    { name: 'Oil, Ghee & Masala', groups: ['Spices'], x: 378, y: 469 },
    { name: 'Dairy, Bread & Eggs', groups: ['Dairy', 'Bakery'], x: 555, y: 469 },
    { name: 'Bakery & Biscuits', groups: ['Bakery'], x: 24, y: 737 },
    { name: 'Dry Fruits & Cereals', groups: ['Cereals'], x: 201, y: 737 },
    { name: 'Chicken, Meat & Fish', groups: ['Meat'], x: 378, y: 737 },
    { name: 'Kitchenware & Appliances', groups: ['Kitchenware'], x: 555, y: 737 },
  ] },
  { title: 'Snacks & Drinks', items: [
    { name: 'Chips & Namkeen', groups: ['Snacks'], x: 24, y: 1092 },
    { name: 'Sweets & Chocolates', groups: ['Sweets'], x: 201, y: 1092 },
    { name: 'Drinks & Juices', groups: ['Drinks'], x: 378, y: 1092 },
    { name: 'Tea, Coffee & Milk Drinks', groups: ['Tea & Coffee'], x: 555, y: 1092 },
  ] },
]
const browseCategories = categorySections.flatMap((section) => section.items)
const matchesCategorySearch = (item, section, query) =>
  `${section.title} ${item.name} ${item.groups.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase())

const shops = makeShops(essentials, restaurants)

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeShop, setActiveShop] = useState(null)
  const [mode, setMode] = useState('Daily Essentials')
  const [department, setDepartment] = useState('All')
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [veg, setVeg] = useState(false)
  const [sort, setSort] = useState('Top rated')
  const [nav, setNav] = useState('Home')
  const [saved, setSaved] = useState([])
  const [cart, setCart] = useState([])
  const [modal, setModal] = useState(null)
  const [address, setAddress] = useState('Sukh Sagar Valley')
  const [addressDraft, setAddressDraft] = useState(address)
  const [toast, setToast] = useState('')
  const closeRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 3000)
    return () => clearTimeout(timer)
  }, [toast])
  useEffect(() => {
    if (!modal) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    function onKey(event) {
      if (event.key === 'Escape') setModal(null)
      if (event.key === 'Tab') {
        const items = modalRef.current?.querySelectorAll(
          'button:not([disabled]), input:not([disabled]), [tabindex="0"]',
        )
        if (!items?.length) return
        const first = items[0],
          last = items[items.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [modal])

  const isSearchPage = nav === 'Search' && !activeShop
  const isFood = mode === 'Food'
  const isMarketplaceHome = !activeShop && !isFood && nav === 'Home' && department === 'All' && category === 'All' && !query.trim()
  const isCategoryPage = !isFood && nav === 'Categories'
  const isShopPage = !!activeShop || (!isFood && nav === 'Category results')
  const isCategoryView = !!activeShop || (!isFood && ['Categories', 'Category results'].includes(nav))
  const selectedBrowseCategory = browseCategories.find((item) => item.name === category)
  const activeDepartment = essentialDepartments.find((item) => item.name === department)
  const departmentItems = essentials.filter((item) => department === 'All' || activeDepartment.groups.includes(item.group))
  const visibleEssentials = departmentItems.filter((item) =>
    `${item.name} ${item.dish}`.toLowerCase().includes(query.toLowerCase()) &&
    (category === 'All' || category === 'Offers' || category === item.group || selectedBrowseCategory?.groups.includes(item.group) ||
      (category === '₹99 Store' && item.price <= 99) ||
      (category === 'Quick bites' && ['Dairy', 'Bakery', 'Fruits'].includes(item.group)) ||
      (category === 'Healthy' && ['Vegetables', 'Fruits', 'Dairy'].includes(item.group))) &&
    (nav !== 'Saved' || saved.includes(item.id)),
  )
  function switchMode(next) {
    setActiveShop(null)
    setMode(next)
    setDepartment('All')
    setQuery('')
    setCategory('All')
    setVeg(false)
    setSort('Top rated')
    setNav('Home')
  }
  const visible = restaurants
    .filter(
      (r) =>
        (!veg || r.veg) &&
        (category !== '₹99 Store' || r.price <= 99) &&
        (category !== 'Quick bites' || r.time <= 15) &&
        (category !== 'Healthy' || r.image === 'bowl') &&
        (sort !== 'Food in 15 mins' || r.time <= 15) &&
        (nav !== 'Saved' || saved.includes(r.id)) &&
        `${r.name} ${r.cuisine} ${r.dish}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .sort((a, b) => Number(b.rating) - Number(a.rating))
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const deliveryTotal = [...new Map(cart.filter((item) => item.sellerId).map((item) => [item.sellerId, item.deliveryFee])).values()].reduce((sum, fee) => sum + fee, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  function openSearch() {
    setSearchQuery(query)
    setQuery('')
    setNav('Search')
    window.scrollTo({ top: 0 })
  }
  function openCategory(name) {
    setActiveShop(null)
    setCategory(name)
    setDepartment('All')
    setQuery('')
    setNav('Category results')
    setModal(null)
    window.scrollTo({ top: 0 })
  }
  function openShop(shop) {
    setActiveShop(shop)
    setQuery('')
    setModal(null)
    window.scrollTo({ top: 0 })
  }
  function browseProduct(item) {
    openCategory(browseCategories.find(c => c.groups.includes(item.group))?.name || item.group)
  }
  function addItem(item) {
    if (!item.sellerId) {
      const shop = shops.find(s => s.products.some(p => p.id === item.id))
      if (!shop) return
      item = { ...item, id: `${shop.id}:${item.id}`, sellerId: shop.id, sellerName: shop.name, deliveryFee: shop.deliveryFee }
    }
    if (cart.length && cart[0].sellerId !== item.sellerId) {
      setModal({ switchShop: item })
      return
    }
    setCart((items) =>
      items.some((i) => i.id === item.id)
        ? items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...items, { ...item, quantity: 1 }],
    )
    setToast(`${item.dish} added to your bag`)
    setModal(null)
  }
  function changeQuantity(id, delta) {
    setCart((items) =>
      items
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    )
  }
  function navigate(item) {
    if (item === 'Bag') {
      setModal('cart')
      return
    }
    setActiveShop(null)
    setNav(item)
    setDepartment('All')
    setCategory(item === 'Offers' ? 'Offers' : 'All')
    setQuery('')
    setSort('Top rated')
    if (item === 'Categories' && !isFood) window.scrollTo({ top: 0, behavior: 'smooth' })
    else if (item === 'Categories')
      document
        .getElementById('shopping-categories')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else if (item === 'Saved')
      document
        .getElementById('restaurants')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app-shell ${isFood ? 'food-mode' : 'essentials-mode'} ${isCategoryView ? 'category-view' : ''}`}>
      {!isSearchPage && !isShopPage && !isCategoryPage && <section className="festival-zone">
        <div className="service-tabs" role="tablist" aria-label="Service">
          {['Daily Essentials', 'Food'].map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={mode === item}
              id={`service-${item === 'Food' ? 'food' : 'essentials'}`}
              aria-controls="service-panel"
              tabIndex={mode === item ? 0 : -1}
              onKeyDown={(event) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault()
                  const next = event.key === 'Home' ? 'Daily Essentials' : event.key === 'End' ? 'Food' : isFood ? 'Daily Essentials' : 'Food'
                  switchMode(next)
                  document.getElementById(`service-${next === 'Food' ? 'food' : 'essentials'}`)?.focus()
                }
              }}
              className={`service-tab ${mode === item ? 'active' : ''}`}
              onClick={() => switchMode(item)}
            >
              <span className="service-emoji">
                {item === 'Food' ? '🍔' : '🛒'}
              </span>
              <span>
                {item}
                <small>
                  {item === 'Food'
                    ? 'Delivered with love'
                    : 'Fresh for your everyday'}
                </small>
              </span>
            </button>
          ))}
        </div>

        <header className="header">
          <a className="brand" href="#" aria-label="Freshee home">
            Fresh<span>ee</span>
          </a>
          <button
            className="location"
            aria-label={`Change delivery address: ${address}, Polipather, Jabalpur`}
            onClick={() => {
              setAddressDraft(address)
              setModal('location')
            }}
          >
            <Icon name="home" size={13} />
            <span className="location-label">HOME</span>
            <span className="location-address">{address}, Polipather, Jabalpur</span>
            <Icon name="chevron" size={13} className="location-chevron" />
          </button>
          <button
            className="profile-button"
            aria-label="Open account menu"
            onClick={() => setModal('account')}
          >
            <span>S</span>
            <Icon name="menu" size={20} />
          </button>
        </header>

        <div id="service-panel" role="tabpanel" aria-labelledby={`service-${isFood ? 'food' : 'essentials'}`} className="service-panel">
        <div className="search-row">
          <div className="search-box">
            <button aria-label="Search products" onClick={openSearch}><Icon name="search" size={23} /></button>
            <input
              onFocus={openSearch}
              aria-label={activeShop ? 'Search this shop’s items' : nav === 'Category results' ? 'Search shops in this category' : isCategoryView ? 'Search marketplace categories' : isFood ? 'Search food or restaurants' : 'Search daily essentials'}
              placeholder={
                activeShop ? `Search in ${activeShop.name}…` : nav === 'Category results' ? 'Search shops in this category…' : isCategoryView ? 'Search fashion, electronics, beauty…' : mode === 'Food'
                  ? 'Search for “pizza”'
                  : 'Search for milk, fruits, essentials…'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query ? (
              <button
                className="clear-search"
                aria-label="Clear search"
                onClick={() => setQuery('')}
              >
                <Icon name="close" size={18} />
              </button>
            ) : (
              <span className="search-spark">✦</span>
            )}
          </div>
          {isFood && <button
            className={`veg-toggle ${veg ? 'enabled' : ''}`}
            aria-pressed={veg}
            onClick={() => setVeg(!veg)}
          >
            <span>VEG</span>
            <span className="toggle-track">
              <i />
            </span>
          </button>}
        </div>

        {!isCategoryView && <nav className={`category-tabs ${isFood ? '' : 'department-tabs'}`} aria-label={`${mode} categories`}>
          {(isFood ? categories : essentialDepartments).map((item) => (
            <button
              key={item.name}
              className={(isFood ? category : department) === item.name ? 'active' : ''}
              aria-pressed={(isFood ? category : department) === item.name}
              onClick={() => {
                if (isFood) setCategory(item.name)
                else {
                  if (item.name !== 'All') { openCategory(item.name); return }
                  setActiveShop(null)
                  setDepartment('All')
                  setCategory('All')
                  setQuery('')
                }
                setNav('Home')
              }}
            >
              {item.text ? (
                <span className="ninety-nine">{item.text}</span>
              ) : (
                <Icon name={item.icon} size={25} />
              )}
              <span>{item.name}</span>
              {isFood && item.name === 'Quick bites' && <small>15 MIN</small>}
            </button>
          ))}
        </nav>}

        {!isCategoryView && !isMarketplaceHome && (isFood || department === 'All') && <section className="festival" aria-label={isFood ? 'Flavour fest offers' : 'Fresh fest offers'}>
          <div className="festival-heading">
            <span className="festival-food left">
              {isFood ? '🍟' : '🥬'}<i>✧</i>
            </span>
            <div>
              <p>{isFood ? 'A LITTLE CRAVING. A LOT OF JOY.' : 'EVERYDAY ESSENTIALS. A LOT OF JOY.'}</p>
              <h1>
                {isFood ? 'FLAVOUR' : 'FRESH'}<span>FEST</span>
                <i>✦</i>
              </h1>
              <div className="festival-subtitle">
                <span />
                {isFood ? 'Big flavours. Bigger savings.' : 'Fresh finds. Bigger savings.'}
                <span />
              </div>
            </div>
            <span className="festival-food right">
              {isFood ? '🍔' : '🛒'}<i>✦</i>
            </span>
          </div>
          <div className="offer-track">
            <button
              className="offer-card offer-pink"
              onClick={() => setModal('discount')}
            >
              <span className="offer-eyebrow">YOUR FAVOURITES, FOR LESS</span>
              <strong>
                Up to <b>60% OFF</b>
              </strong>
              <span className="offer-art tickets">
                <i>%</i>
                <i>%</i>
              </span>
              <span className="offer-bottom">
                A little less to pay <Icon name="chevron" size={14} />
              </span>
            </button>
            <button
              className="offer-card offer-orange"
              onClick={() => {
                setCategory('₹99 Store')
                setNav('Home')
                setQuery('')
                setSort('Top rated')
                document
                  .getElementById('restaurants')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="offer-eyebrow">SMALL PRICE. BIG HAPPINESS.</span>
              <strong>
                Shop under <b>₹99</b>
              </strong>
              <span className="offer-art burger-art">{isFood ? '🍔' : '🍎'}</span>
              <span className="offer-bottom">
                {isFood ? 'Meet your next bite' : 'Stock up for less'} <Icon name="chevron" size={14} />
              </span>
            </button>
            <button
              className="offer-card offer-purple"
              onClick={() => setModal('treat')}
            >
              <span className="offer-eyebrow">SOMETHING SWEET FOR YOU</span>
              <strong>
                A little <b>FREE TREAT</b>
              </strong>
              <span className="offer-art cupcake-art">🧁</span>
              <span className="offer-bottom">
                Happiness, on us <Icon name="chevron" size={14} />
              </span>
            </button>
          </div>
          <p className="festival-footnote">
            <span>✦</span> {isFood ? 'Good food. Great mood. Every single day.' : 'Fresh essentials. Happy homes. Every single day.'}{' '}
            <span>✦</span>
          </p>
        </section>}
        </div>
      </section>}

      <main>
        {isSearchPage ? <SearchPage shops={shops} query={searchQuery} onSearch={setSearchQuery}
          onBack={() => navigate('Home')} onOpen={openShop} onAdd={addItem}
          cart={cart} onQuantity={changeQuantity} onBag={() => setModal('cart')} /> : isShopPage ? <ShopPages
          key={activeShop?.id || category}
          shops={shops.filter(s => s.groups.some(g => (selectedBrowseCategory?.groups || essentialDepartments.find(d => d.name === category)?.groups || [category]).includes(g)))}
          shop={activeShop} title={category} query={query} onSearch={setQuery} cart={cart}
          onOpen={openShop} onAdd={addItem} onQuantity={changeQuantity} onBag={() => setModal('cart')}
          onBack={() => { if (activeShop) { setActiveShop(null); setQuery('') } else navigate('Categories') }}
        /> : isMarketplaceHome ? <MarketplaceHome
          products={essentials}
          addItem={browseProduct}
          openShop={(name) => openShop(shops.find(s => s.name === name))}
          openProduct={browseProduct}
          saved={saved}
          address={address}
          toggleSaved={(id) => setSaved((ids) => ids.includes(id) ? ids.filter((value) => value !== id) : [...ids, id])}
          viewAll={() => navigate('Categories')}
          openCategory={openCategory}
        /> : isCategoryPage ? (
          <div className="category-directory" aria-label="Shop by category">
            <div className="category-directory-heading"><h1>Explore all categories</h1><p>Everyday needs and your next favourite find.</p></div>
            {categorySections.map((section) => {
              const items = section.items.filter((item) => matchesCategorySearch(item, section, query))
              return items.length > 0 && (
                <section className="category-group" key={section.title} aria-label={section.title}>
                  <h2>{section.title}</h2>
                  <div className="category-tile-grid">
                    {items.map((item) => (
                      <button className="category-tile" key={item.name} onClick={() => {
                        setCategory(item.name)
                        setQuery('')
                        setNav('Category results')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}>
                        {item.emoji ? (
                          <span className="category-tile-art marketplace-category-art" aria-hidden="true"><span>{item.emoji}</span></span>
                        ) : (
                          <span className="category-tile-art" aria-hidden="true" style={{ backgroundPosition: `${item.x / 578 * 100}% ${item.y / 1432 * 100}%` }} />
                        )}
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </section>
              )
            })}
            {!categorySections.some((section) => section.items.some((item) => matchesCategorySearch(item, section, query))) && (
              <div className="empty-state"><h2>No categories found</h2><p>Try searching for fashion, electronics, beauty or groceries.</p><button className="primary-button" onClick={() => setQuery('')}>Show all categories</button></div>
            )}
          </div>
        ) : isFood ? <>
        <section id="shopping-categories" className="moods">
          <div className="section-heading">
            <h2>What’s on your mind?</h2>
            <span>A bite of happiness</span>
          </div>
          <div className="mood-list">
            {moods.map((item) => (
              <button
                key={item.name}
                className={query === item.name ? 'selected' : ''}
                onClick={() => {
                  setQuery(query === item.name ? '' : item.name)
                  setCategory('All')
                  setNav('Home')
                }}
              >
                <img src={`/images/${item.image}.jpg`} alt="" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </section>
        <section id="restaurants" className="restaurants">
          <div className="sort-tabs" aria-label="Restaurant filters">
            {['Top rated', 'Food in 15 mins'].map((item) => (
              <button
                key={item}
                className={sort === item ? 'active' : ''}
                aria-pressed={sort === item}
                onClick={() => setSort(item)}
              >
                <Icon name={item === 'Top rated' ? 'star' : 'bolt'} size={16} />
                {item}
              </button>
            ))}
          </div>
          <div className="section-heading restaurant-heading">
            <div>
              <p className="eyebrow">HANDPICKED FOR YOUR CRAVINGS</p>
              <h2>
                {nav === 'Saved'
                  ? 'Your saved favourites'
                  : !isFood
                    ? 'Fresh essentials near you'
                    : category === 'Offers'
                      ? 'Delicious deals near you'
                      : 'Good food, close to you'}
              </h2>
            </div>
            <span className="result-count">{visible.length} places</span>
          </div>
          <div className="restaurant-grid">
            {visible.map((r) => (
              <article className="restaurant-card" key={r.id}>
                <div className="restaurant-photo">
                  <button
                    className="photo-link"
                    aria-label={`View ${r.name}`}
                    onClick={() => openShop(shops.find(s => s.id === `food-${r.id}`))}
                  >
                    <img src={`/images/${r.image}.jpg`} alt={r.dish} />
                    <span className="photo-shade" />
                    <span className="restaurant-offer">
                      <strong>{r.offer}</strong>
                      <small>{r.subtitle}</small>
                    </span>
                  </button>
                  <span className="freshee-pick">
                    freshee <b>picks</b>
                  </span>
                  <button
                    className={`save-button ${saved.includes(r.id) ? 'saved' : ''}`}
                    aria-label={`${saved.includes(r.id) ? 'Unsave' : 'Save'} ${r.name}`}
                    aria-pressed={saved.includes(r.id)}
                    onClick={() =>
                      setSaved((ids) =>
                        ids.includes(r.id)
                          ? ids.filter((id) => id !== r.id)
                          : [...ids, r.id],
                      )
                    }
                  >
                    <Icon name="heart" size={23} />
                  </button>
                </div>
                <button className="restaurant-info" onClick={() => openShop(shops.find(s => s.id === `food-${r.id}`))}>
                  <div className="restaurant-title">
                    <h3>{r.name}</h3>
                    <span className="rating">★ {r.rating}</span>
                  </div>
                  <p>{r.cuisine}</p>
                  <div className="restaurant-meta">
                    <span>
                      <Icon name="clock" size={13} />
                      {!isFood
                        ? 'Daily essentials'
                        : `${r.time}–${r.time + 5} mins`}
                    </span>
                    <i>·</i>
                    <span>₹{r.price} for one</span>
                    {r.veg && (
                      <span className="veg-mark" aria-label="Vegetarian">
                        ●
                      </span>
                    )}
                  </div>
                </button>
              </article>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <Icon name={nav === 'Saved' ? 'heart' : 'search'} size={34} />
              <h3>
                {nav === 'Saved'
                  ? 'Your favourites belong here'
                  : 'No bites found just yet'}
              </h3>
              <p>
                {nav === 'Saved'
                  ? 'Tap the heart on a restaurant to save it for later.'
                  : 'Try another search or clear your filters.'}
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                  setVeg(false)
                  setSort('Top rated')
                  setNav('Home')
                }}
              >
                Explore all food
              </button>
            </div>
          )}
        </section>
        </> : (
          <section id="restaurants" className="essentials-catalog">
            {nav === 'Category results' && <button className="back-to-categories" onClick={() => navigate('Categories')}>← All categories</button>}
            <div className="section-heading"><h2>{selectedBrowseCategory ? category : department === 'All' ? 'Shop your everyday' : `Shop ${department}`}</h2><span>{department === 'All' ? 'Fresh finds, all in one place' : 'Your everyday favourites, in one place'}</span></div>
            {nav !== 'Category results' && <div id="shopping-categories" className="essentials-categories" aria-label="Essential categories">
              {['All', ...new Set(departmentItems.map((item) => item.group))].map((group) => <button key={group} aria-pressed={category === group} className={category === group ? 'active' : ''} onClick={() => openCategory(group)}>{group}</button>)}
            </div>}
            <div className="section-heading"><h2>{nav === 'Saved' ? 'Your saved essentials' : selectedBrowseCategory ? 'Products' : 'Everyday favourites'}</h2><span>{visibleEssentials.length} items</span></div>
            <div className="essentials-grid">
              {visibleEssentials.map((item) => <article className="essential-card" key={item.id}>
                <div className="essential-art"><button className="essential-product-open" aria-label={`Find shops selling ${item.dish}`} onClick={() => browseProduct(item)}><span aria-hidden="true">{item.emoji}</span></button><button className={`save-button ${saved.includes(item.id) ? 'saved' : ''}`} aria-label={`${saved.includes(item.id) ? 'Unsave' : 'Save'} ${item.dish}`} aria-pressed={saved.includes(item.id)} onClick={() => setSaved((ids) => ids.includes(item.id) ? ids.filter((id) => id !== item.id) : [...ids, item.id])}><Icon name="heart" size={20} /></button></div>
                <p>{item.name}</p><button className="essential-product-title" onClick={() => browseProduct(item)}><h3>{item.dish}</h3></button><small>{item.unit}</small>
                <div className="essential-price"><strong>₹{item.price}</strong><button onClick={() => browseProduct(item)} aria-label={`Find shops selling ${item.dish} before adding`}>ADD +</button></div>
              </article>)}
            </div>
            {!visibleEssentials.length && <div className="empty-state"><h3>{nav === 'Saved' ? 'Your saved essentials belong here' : 'No products found'}</h3><p>{nav === 'Saved' ? 'Tap a heart to save an everyday favourite.' : selectedBrowseCategory ? 'No products are listed in this category yet. Explore another category.' : 'Try another search or category.'}</p></div>}
          </section>
        )}
        {!isSearchPage && !isCategoryView && <footer className="page-footer">
          <span>Made for your</span>
          <strong>
            {isFood ? 'happy cravings' : 'everyday discoveries'}<span>✳</span>
          </strong>
          <p>Fresh finds. Local favourites. A little everyday joy.</p>
          <small>FRESHEE · JABALPUR</small>
        </footer>}
      </main>
      {!isSearchPage && <nav className="bottom-nav" aria-label="Main navigation">
        {[
          { name: 'Home', icon: 'home' },
          { name: 'Categories', icon: 'grid' },
          { name: 'Bag', icon: 'bag' },
        ].map((item) => (
          <button
            key={item.name}
            className={(nav === item.name || (item.name === 'Categories' && nav === 'Category results')) ? 'active' : ''}
            aria-current={(nav === item.name || (item.name === 'Categories' && nav === 'Category results')) ? 'page' : undefined}
            onClick={() => navigate(item.name)}
          >
            <span className="nav-icon">
              <Icon name={item.icon} size={20} />
              {item.name === 'Bag' && cartCount > 0 && (
                <b className="cart-badge">{cartCount}</b>
              )}
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>}
      {toast && (
        <div className="toast" role="status">
          ✓ {toast}
        </div>
      )}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section
            ref={modalRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              className="modal-close"
              aria-label="Close dialog"
              onClick={() => setModal(null)}
            >
              <Icon name="close" />
            </button>
            {modal.switchShop ? <>
              <span className="modal-symbol">🛍️</span>
              <h2 id="modal-title">Start a new bag?</h2>
              <p>Your bag contains items from <strong>{cart[0]?.sellerName}</strong>. To shop from <strong>{modal.switchShop.sellerName}</strong>, we’ll replace those items with {modal.switchShop.dish}.</p>
              <p>One shop per order keeps your delivery simple.</p>
              <button className="primary-button" onClick={() => { setCart([{ ...modal.switchShop, quantity: 1 }]); setModal(null); setToast('New shop, new bag. Your item has been added.') }}>Replace bag & add item</button>
              <button className="account-link" onClick={() => setModal(null)}>Keep my current bag</button>
            </> : modal === 'location' ? (
              <>
                <span className="modal-symbol">📍</span>
                <h2 id="modal-title">Where’s the good food going?</h2>
                <p>Set your delivery address in Jabalpur.</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (addressDraft.trim()) {
                      setAddress(addressDraft.trim())
                      setModal(null)
                      setToast('Delivery location updated')
                    }
                  }}
                >
                  <label htmlFor="address">
                    Building, neighbourhood or address
                  </label>
                  <input
                    id="address"
                    required
                    maxLength={100}
                    value={addressDraft}
                    onChange={(e) => setAddressDraft(e.target.value)}
                  />
                  <button className="primary-button">Save address</button>
                </form>
              </>
            ) : modal === 'cart' ? (
              <>
                <span className="modal-symbol">🛍️</span>
                <h2 id="modal-title">Your happy little bag</h2>
                {cart.length ? (
                  <>
                    <p className="shop-notice">Shopping from <strong>{cart[0].sellerName}</strong> · One shop, one delivery</p>
                    <div className="cart-list">
                      {cart.map((item) => (
                        <div className="cart-item" key={item.id}>
                          <span className="cart-item-art">{item.emoji || <img src={`/images/${item.image}.jpg`} alt="" />}</span>
                          <div>
                            <strong>{item.dish}</strong>
                            <small>₹{item.price} each{item.sellerName ? ` · ${item.sellerName}` : ''}</small>
                            <div className="quantity">
                              <button
                                aria-label={`Remove one ${item.dish}`}
                                onClick={() => changeQuantity(item.id, -1)}
                              >
                                −
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                aria-label={`Add one ${item.dish}`}
                                onClick={() => changeQuantity(item.id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <b>₹{item.quantity * item.price}</b>
                        </div>
                      ))}
                    </div>
                    <div className="cart-total">
                      <strong>Item total</strong>
                      <strong>₹{total}</strong>
                    </div>
                    {deliveryTotal > 0 && <><div className="cart-total"><span>Delivery</span><b>₹{deliveryTotal}</b></div><div className="cart-total"><strong>Total including delivery</strong><strong>₹{total + deliveryTotal}</strong></div></>}
                    <p className="demo-note">
                      This is a preview bag. Checkout and delivery aren’t
                      connected yet.
                    </p>
                  </>
                ) : (
                  <p>
                    Your next favourite meal is waiting. Explore the menu and
                    add a little happiness.
                  </p>
                )}
              </>
            ) : modal === 'account' ? (
              <>
                <span className="modal-symbol">✳</span>
                <h2 id="modal-title">Hello, food lover.</h2>
                <p>Welcome to your neighbourhood’s freshest finds.</p>
                <button
                  className="account-link"
                  onClick={() => {
                    setModal(null)
                    navigate('Saved')
                  }}
                >
                  <Icon name="heart" />
                  Saved favourites <span>{saved.length}</span>
                </button>
                <button
                  className="account-link"
                  onClick={() => setModal('cart')}
                >
                  <Icon name="bag" />
                  Your bag <span>{cartCount}</span>
                </button>
                <p className="demo-note">
                  You’re exploring the Freshee demo. No sign-in required.
                </p>
              </>
            ) : modal === 'discount' || modal === 'treat' ? (
              <>
                <span className="modal-symbol">
                  {modal === 'discount' ? '🎟️' : '🧁'}
                </span>
                <h2 id="modal-title">
                  {modal === 'discount'
                    ? 'Big flavours. Little prices.'
                    : 'There’s always room for a treat.'}
                </h2>
                <p>
                  {modal === 'discount'
                    ? isFood ? 'Flavour Fest brings you up to 60% off selected meals. Browse the restaurant cards for individual offers.' : 'Explore Fresh Fest savings on your everyday essentials.'
                    : `Get a free sweet treat on selected orders over ₹299 during ${isFood ? 'Flavour' : 'Fresh'} Fest.`}
                </p>
                <p className="demo-note">
                  Illustrative offers for this home screen preview.
                </p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setModal(null)
                    setNav('Offers')
                    setCategory('Offers')
                    setQuery('')
                    setVeg(false)
                    setSort('Top rated')
                    document
                      .getElementById('restaurants')
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Explore the offers
                </button>
              </>
            ) : (
              <>
                <img
                  className="modal-food"
                  src={`/images/${modal.image}.jpg`}
                  alt={modal.dish}
                />
                <p className="eyebrow">{modal.name}</p>
                <h2 id="modal-title">{modal.dish}</h2>
                <p>
                  {modal.cuisine} · ★ {modal.rating}
                </p>
                <div className="dish-details">
                  <span>
                    {modal.veg ? '🟢 Vegetarian' : 'Freshly prepared'}
                  </span>
                  <span>
                    {modal.time}–{modal.time + 5} min
                  </span>
                </div>
                <button
                  className="primary-button"
                  onClick={() => addItem(modal)}
                >
                  Add to bag <span>₹{modal.price}</span>
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  )
}
export default App

const productCells = { 111: 0, 112: 1, 113: 2, 101: 3, 102: 4, 103: 5, 104: 6, 105: 7, 107: 8, 108: 9, 109: 10, 110: 11, 106: 12, 'butter-100': 13, 'milk-500': 14, 'bread-400': 15 }
export default function ProductArt({ product }) {
  const cell = productCells[product.id]
  return cell !== undefined ? <svg viewBox={`${(cell % 4) * 256} ${Math.floor(cell / 4) * 256} 256 256`} aria-hidden="true" focusable="false"><image href="/images/marketplace/product-catalogue.png" width="1024" height="1024" /></svg> : product.image ? <img src={`/images/${product.image}.jpg`} alt="" /> : <span aria-hidden="true">{product.emoji}</span>
}


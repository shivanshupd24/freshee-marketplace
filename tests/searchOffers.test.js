import test from 'node:test'
import assert from 'node:assert/strict'
import { makeShops } from '../src/shops.js'
import { findComparisons } from '../src/searchOffers.js'

const shops = makeShops([], [])
test('shared demo products return three distinct metric winners from four shops', () => {
  for (const query of ['butter', 'milk', 'bread']) {
    const [result] = findComparisons(shops, query)
    assert.equal(result.count, 4)
    assert.equal(result.offers.length, 3)
    assert.equal(new Set(result.offers.map(o => o.shop.id)).size, 3)
    assert.equal(result.offers.find(o => o.badges.includes('Best price')).shop.id, 'value')
    assert.equal(result.offers.find(o => o.badges.includes('Fastest')).shop.id, 'express')
    assert.equal(result.offers.find(o => o.badges.includes('Top rated')).shop.id, 'local')
    for (const offer of result.offers) {
      assert.equal(offer.total, offer.product.price + offer.shop.deliveryFee)
      assert.equal(offer.product.unit, result.product.unit)
      assert.equal(offer.product.id, result.product.id)
    }
  }
})
test('search handles whitespace, case, multiple words and empty results', () => {
  assert.equal(findComparisons(shops, '  AMUL   butter  ').length, 1)
  assert.equal(findComparisons(shops, 'amul').length, 2)
  assert.deepEqual(findComparisons(shops, '   '), [])
  assert.deepEqual(findComparisons(shops, 'not-a-product'), [])
})
test('one or two shops do not create duplicate or invented offers', () => {
  assert.equal(findComparisons(shops.slice(0,1), 'butter')[0].offers.length, 1)
  assert.equal(findComparisons(shops.slice(0,2), 'butter')[0].offers.length, 2)
})
test('price winner includes delivery and different pack sizes remain separate', () => {
  const product = { id: 'butter', dish: 'Butter', name: 'Dairy', unit: '100 g', price: 10 }
  const fixtures = [
    { id: 'a', time: 10, rating: '4.5', deliveryFee: 50, products: [product] },
    { id: 'b', time: 20, rating: '4.9', deliveryFee: 5, products: [{...product, price: 20}] },
    { id: 'c', time: 15, rating: '4.7', deliveryFee: 5, products: [{...product, unit: '500 g', price: 90}] },
  ]
  const results = findComparisons(fixtures, 'butter')
  assert.equal(results.length, 2)
  assert.equal(results[0].offers.find(o => o.badges.includes('Best price')).shop.id, 'b')
  assert.equal(results[1].offers.length, 1)
})

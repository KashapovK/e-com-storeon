import { createAppStore } from '../src/store';
import { expect } from 'vitest';

describe('Функционал стора', () => {
  let store: ReturnType<typeof createAppStore>;

  beforeEach(() => {
    store = createAppStore();
  });

  test('cart/add добавляет товар в корзину', () => {
    const product = { id: '1', name: 'Test Product', price: 100 };
    store.dispatch('cart/add', product);
    const state = store.get();
    const item = state.cart.find((i) => i.id === product.id);
    expect(item).toBeDefined();
    expect(item?.quantity).toBe(1);
  });

  test('cart/increase увеличивает количество товара', () => {
    const product = { id: '1', name: 'Test Product', price: 100 };
    store.dispatch('cart/add', product);
    store.dispatch('cart/increase', product.id);
    const state = store.get();
    const item = state.cart.find((i) => i.id === product.id);
    expect(item?.quantity).toBe(2);
  });

  test('cart/decrease уменьшает количество товара', () => {
    const product = { id: '1', name: 'Test Product', price: 100 };
    store.dispatch('cart/add', product);
    store.dispatch('cart/add', product);
    store.dispatch('cart/decrease', product.id);
    const state = store.get();
    const item = state.cart.find((i) => i.id === product.id);
    expect(item?.quantity).toBe(1);
  });

  test('cart/remove удаляет товар из корзины', () => {
    const product = { id: '1', name: 'Test Product', price: 100 };
    store.dispatch('cart/add', product);
    store.dispatch('cart/remove', product.id);
    const state = store.get();
    expect(state.cart.length).toBe(0);
  });

  test('products/set устанавливает список продуктов', () => {
    const products = [
      { id: '1', name: 'Product 1', price: 100 },
      { id: '2', name: 'Product 2', price: 200 },
    ];
    store.dispatch('products/set', products);
    const state = store.get();
    expect(state.products).toEqual(products);
  });

  test('cart/add увеличивает quantity при повторном добавлении', () => {
    const product = { id: '1', name: 'Test Product', price: 100 };
    store.dispatch('cart/add', product);
    store.dispatch('cart/add', product);
    const state = store.get();
    const item = state.cart.find((i) => i.id === product.id);
    expect(item?.quantity).toBe(2);
  });
});

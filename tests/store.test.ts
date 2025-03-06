import { createAppStore } from '../src/store';

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
});

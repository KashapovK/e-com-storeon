import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/app';
import { StoreContext } from 'storeon/react';
import { createAppStore } from '../src/store';
import { expect } from 'vitest';

describe('App Component', () => {
  test('рендерит карточки продуктов после загрузки продуктов', async () => {
    const store = createAppStore();
    render(
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>,
    );

    expect(screen.getByText(/Интернет-магазин/i)).toBeDefined();

    await waitFor(() => {
      const buttons = screen.getAllByText(/Добавить в корзину/i);
      expect(buttons.length).toBeGreaterThan(0);
    });
  });
});

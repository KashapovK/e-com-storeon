import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/app';
import { StoreContext } from 'storeon/react';
import { createAppStore } from '../src/store';

describe('App Component', () => {
  test('рендерит карточки продуктов после загрузки продуктов', async () => {
    const store = createAppStore();
    render(
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>,
    );

    expect(screen.getByText(/Интернет-магазин/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText(/Добавить в корзину/i).length).greaterThan(0);
    });
  });
});

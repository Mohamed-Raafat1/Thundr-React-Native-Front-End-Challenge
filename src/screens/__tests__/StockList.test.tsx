import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { StockTicker } from '../../api/polygon.ts/types';
import { useNavigation } from '@react-navigation/native';
import StockList from '@/components/ExploreScreen/StockGrid';

// Mock react-navigation hooks
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useFocusEffect: jest.fn(() => ({})), // Mock useFocusEffect here
    useNavigation: jest.fn(), // Mock useNavigation here
  };
});

// Mock the API hook
jest.mock('../../api/polygon.ts/api.ts', () => ({
  useGetTickerDetailsQuery: jest.fn(),
}));

describe('StockList', () => {
  const mockOnEndReached = jest.fn();

  const renderStockList = (props = {}) => {
    return render(
      <StockList
        stockTickers={[]}
        onEndReached={mockOnEndReached}
        loadingMoreTickers={false}
        {...props}
      />
    );
  };

//   it('renders correctly with no stock tickers', () => {
//     const { getByText } = renderStockList();
//     expect(getByText('No stock tickers available.')).toBeTruthy(); // Adjust this line if you have a message for empty state
//   });

  it('renders stock items correctly', () => {
    const stockTickers: StockTicker[] = [
      {
          ticker: 'AAPL', name: 'Apple Inc.',
          active: false,
          currency_name: '',
          last_updated_utc: '',
          locale: '',
          market: '',
          primary_exchange: '',
          type: ''
      },
      {
          ticker: 'GOOGL', name: 'Alphabet Inc.',
          active: false,
          currency_name: '',
          last_updated_utc: '',
          locale: '',
          market: '',
          primary_exchange: '',
          type: ''
      },
    ];

    const { getByText } = renderStockList({ stockTickers });
    expect(getByText('Apple Inc.')).toBeTruthy();
    expect(getByText('Alphabet Inc.')).toBeTruthy();
  });

  it('shows loading indicator when loadingMoreTickers is true', () => {
    const { getByTestId } = renderStockList({ loadingMoreTickers: true });
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('calls onEndReached when the end of the list is reached', () => {
    const { getByTestId } = renderStockList({ stockTickers: [{ ticker: 'AAPL', name: 'Apple Inc.' }] });
    const flatList = getByTestId('stock-list');
    fireEvent(flatList, 'onEndReached');
    expect(mockOnEndReached).toHaveBeenCalled();
  });
});

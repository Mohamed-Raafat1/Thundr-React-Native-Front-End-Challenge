import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import TickerDetailsScreen from '../TickerDetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/navigation';
import { useGetTickerDetailsQuery } from '../../api/polygon.ts/api';

// Mock the react-navigation hooks
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(),
    useFocusEffect: jest.fn(() => ({})), // Mock useFocusEffect here
  };
});

// Mock the API hook
jest.mock('../../api/polygon.ts/api.ts', () => ({
  useGetTickerDetailsQuery: jest.fn(),
}));

describe('TickerDetailsScreen', () => {
  const mockRoute: Partial<RouteProp<RootStackParamList, 'TickerDetailsScreen'>> = {
    params: {
      stockTicker: {
        ticker: 'AAPL',
        active: false,
        currency_name: '',
        last_updated_utc: '',
        locale: '',
        market: '',
        name: '',
        primary_exchange: '',
        type: '',
      },
    },
  };

  beforeEach(() => {
    (useGetTickerDetailsQuery as jest.Mock).mockClear();
    (useRoute as jest.Mock).mockReturnValue(mockRoute);
  });

  const renderWithNavigation = (component: React.ReactNode) => {
    return render(
      <NavigationContainer>
        {component}
      </NavigationContainer>
    );
  };

  it('renders loading state', () => {
    (useGetTickerDetailsQuery as jest.Mock).mockReturnValue({ isLoading: true });

    const { getByTestId } = renderWithNavigation(<TickerDetailsScreen />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('renders error state', async () => {
    (useGetTickerDetailsQuery as jest.Mock).mockReturnValue({ error: new Error('Test error') });

    const { getByText } = renderWithNavigation(<TickerDetailsScreen />);
    await waitFor(() => {
      expect(getByText('Oops! Rate limit has been reached.')).toBeTruthy();
    });
  });

  it('renders no details available state', async () => {
    (useGetTickerDetailsQuery as jest.Mock).mockReturnValue({ data: null });

    const { getByText } = renderWithNavigation(<TickerDetailsScreen />);
    await waitFor(() => {
      expect(getByText('No details available for this ticker.')).toBeTruthy();
    });
  });

  it('renders ticker details correctly', async () => {
    const mockData = {
      results: {
        ticker: 'AAPL',
        name: 'Apple Inc.',
        market_cap: 2000000000000,
        address: {
          address1: '1 Apple Park Way',
          city: 'Cupertino',
          state: 'CA',
          postal_code: '95014',
        },
        phone_number: '1-408-996-1010',
        description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
      },
    };

    (useGetTickerDetailsQuery as jest.Mock).mockReturnValue({ data: mockData });

    const { getByText } = renderWithNavigation(<TickerDetailsScreen />);

    await waitFor(() => {
      expect(getByText('AAPL')).toBeTruthy();
      expect(getByText('Apple Inc.')).toBeTruthy();
      expect(getByText('Market Cap: $2,000,000,000,000')).toBeTruthy();
      expect(getByText('1 Apple Park Way, Cupertino, CA 95014')).toBeTruthy();
      expect(getByText('1-408-996-1010')).toBeTruthy();
      expect(getByText('Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.')).toBeTruthy();
    });
  });
});

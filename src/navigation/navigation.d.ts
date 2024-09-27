import { StackNavigationProp } from '@react-navigation/native-stack';
import { StockTicker } from '../api/polygon.ts/types';

export type RootStackParamList = {
  Explore: undefined; // No parameters
  TickerDetailsScreen: { stockTicker: StockTicker }; // Pass the stockTicker object
};

export type ExploreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Explore'>;
export type StockDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StockDetails'>;
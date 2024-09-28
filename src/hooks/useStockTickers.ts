import { useEffect, useState } from 'react';
import { useGetStockTickersQuery, useLazyLoadMoreTickersQuery } from '../api/polygon.ts/api';
import { StockTicker } from '../api/polygon.ts/types';

const RATE_LIMIT_DELAY = 60000; // 60 seconds delay for rate limit handling

const useStockTickers = (searchTerm: string) => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [data, setData] = useState<StockTicker[]>([]);
  const [isLoadingMoreTickers, setIsLoadingMoreTickers] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false); // Track rate limit state
  const [fetchMoreTickers] = useLazyLoadMoreTickersQuery();

  // State for debounced search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const { data: initialData, error, isLoading, refetch } = useGetStockTickersQuery({
    market: 'stocks',
    limit: 20,
    searchTerm: debouncedSearchTerm,
  });

  useEffect(() => {
    if (error) {
     
        setIsRateLimited(true); // Set rate limit flag
        setTimeout(() => {
          refetch(); // Attempt to refetch data after the delay
          setIsRateLimited(false); // Reset rate limit flag after delay
        }, RATE_LIMIT_DELAY);
  
  
      
    }
  }, [error, refetch]);
  // Debounce search term updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Update data and cursor when initialData changes
  useEffect(() => {
    if (initialData) {
      setData(initialData.results);
      setCursor(getCursor(initialData.next_url));
    }
  }, [initialData]);

  // Extract cursor from URL
  const getCursor = (url: string | undefined) => (url ? url.split('cursor=')[1] : null);

  // Handle errors and check for rate limit
  const handleError = (error: any) => {
    if (error?.data?.error?.includes('exceeded the maximum requests')) {
      setIsRateLimited(true); // Set rate limit flag
      setTimeout(() => {
        setIsRateLimited(false); // Reset rate limit flag after delay
      }, RATE_LIMIT_DELAY);
    } else {
      console.log('Error fetching data:', error);
    }
  };

  // Load more data with rate limit handling
  const loadMore = async () => {
    if (!cursor || isLoadingMoreTickers || isRateLimited) return;

    setIsLoadingMoreTickers(true);
    try {
      const result = await fetchMoreTickers({ cursor }).unwrap();
      setData((prevData) => [...prevData, ...result.results]);
      setCursor(getCursor(result.next_url));
    } catch (fetchError) {
      handleError(fetchError);
    } finally {
      setIsLoadingMoreTickers(false);
    }
  };

  return { data, isLoading, error, loadMore, isLoadingMoreTickers };
};

export default useStockTickers;

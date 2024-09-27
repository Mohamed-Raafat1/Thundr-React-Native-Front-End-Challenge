// hooks/useStockTickers.ts
import { useEffect, useState } from 'react';
import { useGetStockTickersQuery, useLazyLoadMoreTickersQuery } from '../api/polygon.ts/api';
import { StockTicker } from '../api/polygon.ts/types';

const useStockTickers = (searchTerm: string) => {
    const [cursor, setCursor] = useState<string | null>(null);
    const [data, setData] = useState<StockTicker[]>([]);
    const [isLoadingMoreTickers, setIsLoadingMoreTickers] = useState(false);
    const [fetchMoreTickers] = useLazyLoadMoreTickersQuery();

    // State for debounced search term
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const { data: initialData, error, isLoading, refetch } = useGetStockTickersQuery({
        market: 'stocks',
        limit: 20,
        searchTerm: debouncedSearchTerm,
    });

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // Adjust the debounce delay as needed

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (initialData) {
            setData(initialData.results);
            const nextUrl = initialData.next_url;
            const cursorParam = nextUrl ? nextUrl.split('cursor=')[1] : null;
            setCursor(cursorParam);
        }
    }, [initialData]);

    const loadMore = async () => {
        if (cursor && !isLoadingMoreTickers) {
            setIsLoadingMoreTickers(true);
            try {
                const result = await fetchMoreTickers({ cursor }).unwrap();
                setData((prevData) => [...prevData, ...result.results]);
                const nextUrl = result.next_url;
                const newCursor = nextUrl ? nextUrl.split('cursor=')[1] : null;
                setCursor(newCursor);
            } finally {
                setIsLoadingMoreTickers(false);
            }
        }
    };

    return { data, isLoading, error, loadMore, isLoadingMoreTickers };
};

export default useStockTickers;

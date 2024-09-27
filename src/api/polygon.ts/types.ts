// Define the structure of a single stock ticker
export interface StockTicker {
    active: boolean;
    cik?: string;
    composite_figi?: string;
    currency_name: string;
    last_updated_utc: string;
    locale: string;
    market: string;
    name: string;
    primary_exchange: string;
    share_class_figi?: string;
    ticker: string;
    type: string;
  }
  
  // Define the response structure for the stock tickers API
  export interface StockTickersResponse {
    count: number;
    next_url?: string;
    request_id: string;
    results: StockTicker[];
    status: string;
  }

export  interface Address {
    address1: string;
    city: string;
    state: string;
    postal_code: string;
  }
  
 export interface Branding {
    logo_url?: string; // Making it optional
    icon_url?: string; // Making it optional
  }
  
 export  interface TickerDetails {
    name: string;
    ticker: string;
    currency_name: string;
    description: string;
    address: Address;
    phone_number: string;
    branding?: Branding; // Optional since it can be undefined
  }
  
 export interface TickerDetailsResponse {
    request_id: string;
    results: TickerDetails;
    status: string;
  }
  
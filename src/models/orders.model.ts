export interface OrdersResponse {
  total_items?: number;
  total_pages?: number;
  items?: ItemShopify[];
}

export interface ItemShopify {
  id?: string;
  order_id?: number;
  cancelled_at?: string | null;
  closed_at?: string | null;
  confirmed?: boolean;
  created_at: string;
  updated_at?: string | null;
  currency?: string;
  current_total_price?: number;
  current_subtotal_price?: number;
  current_total_discounts?: number;
  total_shhipping_price_set?: number | null;
  name: string;
  phone?: null | string;
  tags?: string | string[];
  financial_status?: string;
  fulfillment_status?: null | string;
  payment_gateway_names?: null | string;
  processed_at?: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_email?: null | string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_province?: string;
  shipping_country?: string;
  shipping_latitude?: string;
  shipping_longitude?: string;
  company?: Company;
  shopify_item: ShopifyItem[];
  shopify_fulfillment?: any[];
}

export interface Company {
  name?: string;
}

export interface ShopifyItem {
  id?: string;
  product_id?: number;
  name: string;
  quantity?: number;
  price?: number;
  grams?: number;
  sku?: string;
  requires_shipping?: boolean;
  fulfillment_status?: null | string;
  fulfillment_service?: FulfillmentService;
}

export enum FulfillmentService {
  Manual = "manual",
}

interface Company {
  name: string;
}

interface ProductVariant {
  id: string;
  variant_id: number;
  title: string;
  price: number;
  sku: string;
  grams: number;
  weight: number;
  weight_unit: string;
  height: number;
  width: number;
  depth: number;
  inventory_item_id: number;
  inventory_quantity: number;
  requires_shipping: boolean;
  taxable: boolean;
  barcode: string;
}

interface ProductImage {
  id: string;
  image_id: number;
  src: string;
}

interface Product {
  id: string;
  product_id: number;
  title: string;
  handle: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  company: Company;
  product_variant: ProductVariant[];
  product_image: ProductImage[];
}

export type { Company, ProductVariant, ProductImage, Product };

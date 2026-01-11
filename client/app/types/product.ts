// Extended Product interface for detail page
export interface ProductDetail {
  id: number;
  title: string;
  slug: string;
  part_number: string;
  price: number;
  stock_count: number;
  image_url: string;
  attributes: {
    brand?: string;
    warranty?: string;
    weight?: string;
    dimensions?: string;
    material?: string;
    color?: string;
    manufacturer?: string;
    country_of_origin?: string;
    [key: string]: any;
  };
  category_id: number;
  category_name?: string;
  category_slug?: string;
  compatible_vehicles?: CompatibleVehicle[];
  created_at: string;
  updated_at: string;
}

export interface CompatibleVehicle {
  variant_id: number;
  make_name: string;
  model_name: string;
  year_from: number;
  year_to: number;
  submodel?: string;
}

// Existing Product interface for listing
export interface Product {
  id: number;
  title: string;
  price: number;
  part_number: string;
  image_url: null | string;
  category: string;
  slug: string;
  rating: number;
  rating_count: number;
}

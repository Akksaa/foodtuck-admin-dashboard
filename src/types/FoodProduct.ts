
type ImageAsset = {
    _id: string;
    url: string;
  };
  
export type Images = {
asset: ImageAsset;
};

type DescriptionItem = {
  _type:string;
  children: Array<{
    text: string;
  }>;
}; 
export interface FoodProduct {
  _id:string
  name: string; // Name of the food product
  slug: {
    current: string; // Slug for URL
  };
  description:DescriptionItem[];
  price: number; // Original price of the product
  discountPrice?: number; // Discounted price (optional)
  isDiscounted: boolean; // Whether the product has a discount
  category: string; // Category of the product (optional)
  images: Images[];
  tags: string[]; // Array of tags (optional)
  ingredients: string[]; // Unique ingredients
  inventory: number; // Inventory count
  nutritionalInfo: {
    calories: number; // Calories in the product
    protein: number; // Protein in grams
    fat: number; 
    carbs: number;
  };
  available: boolean; // Availability status of the product
}

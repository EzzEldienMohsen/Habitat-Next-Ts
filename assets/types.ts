// Types for the Database Tables

// Type for the `products` table
export type Products = {
  id: number;
  img: string;
  name: string;
  type: string;
  price: number;
  cat: string;
}[];

// Type for the `clientUser` table
export type ClientUser = {
  id: number;
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  main_address: string;
  password: string;
};

// Type for the `cart` table
export type Cart = {
  id: number;
  client_id: number;
  total_price: number;
  taxes: number;
  sub_total: number;
};

// Type for the `cart_products` table
export type CartProduct = {
  id: number;
  img: string;
  name: string;
  type: string;
  price: number;
  cat: string;
  cart_id: number;
  product_id: number;
  amount: number;
};

// Type for the `wish_list` table
export type WishList = {
  id: number;
  client_id: number;
  product_id: number;
};

// Type for the `client_address` table
export type ClientAddress = {
  id: number;
  address_name: string;
  address_details: string;
  client_id: number;
};

// Type for the `profile` table
export type Profile = {
  id: number;
  client_id: number;
  gender: string;
  date_of_birth: string; // Use `Date` in your app logic if you're converting this field
  nationality: string;
  avatar_url?: string;
  bio?: string;
};

// Type for the `adminUser` table
export type AdminUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

// Type for the `orders` table
export type Order = {
  id: number;
  client_id: number;
  cart_products_id: number;
  status: string;
  address: string;
  total_price: number;
};

// Type for the `branchAddress` table
export type BranchAddress = {
  id: number;
  address_name: string;
  address_details: string;
  working_hours: string;
  holidays: string;
  admin_id: number;
};

// HeaderLinks
export type HeaderLinks = string[];
// Footer column

export type FooterColumn = {
  title: string;
  list: string[];
};

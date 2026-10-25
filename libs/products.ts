
export type Product = {
   id: number,
   title: string,
   price: number, 
   category: string,
   thumbnail: string 
}
export type ProductDetail = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand?: string;
  thumbnail: string;
  images: string[];
};

export default async function getProducts() : Promise<Product[]> {
      const res = await fetch(`https://dummyjson.com/products`)
      if(!res.ok) throw new Error(`Failed to fetch products`)
      const data : {products : Product[]} = await res.json()
      return data.products

}
export async function getProductDetails(id:number) : Promise<ProductDetail> {
    const res = await fetch(`https://dummyjson.com/products/${id}`)  
    if(!res.ok) throw new Error('Failed to fecth details')
    return res.json()
}

export async function  searchProducts(q:string) : Promise<Product[]>{
    const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`)  
    if(!res.ok) throw new Error('Failed to fecth Product')
    const data : {products : Product[]} = await res.json()
      return data.products
      
}
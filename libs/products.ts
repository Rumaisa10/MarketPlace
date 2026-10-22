
export type Product = {
   id: number,
   title: string,
   price: number, 
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
    console.log(res)
    if(!res.ok) throw new Error('Failed to fecth details')
    return res.json()
}
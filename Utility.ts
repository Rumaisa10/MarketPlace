
type Product = {
   id: number,
   title: string,
   price: number, 
   thumbnail: string 
}

export default async function getProducts() : Promise<Product[]> {
      const res = await fetch(`https://dummyjson.com/products`)
      if(!res.ok) throw new Error(`Failed to fetch products`)
      const data : {products : Product[]} = await res.json()
      return data.products

}

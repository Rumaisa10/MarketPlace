export async function saveFavourite(id:number , on: boolean) : Promise <void> {

    await new Promise((resolve) => setTimeout(resolve,1000))
    if(Math.random () < 0.3) throw new Error('server error')    
}
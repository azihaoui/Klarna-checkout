import fetch from 'node-fetch'

// Hämtar alla produkter från din egna Fake store api som vi byggde förra veckan
// OBS! Se till att ge FAKE_STORE_API_URL url:en till din egna Fake store api
export async function getProducts() {
    const res = await fetch(`${process.env.FAKE_STORE_API_URL}/products`)
    const data = await res.json()
    return data
}

// Hämtar en produkt från din egna Fake store api som vi byggde förra veckan
// OBS! Se till att ge FAKE_STORE_API_URL url:en till din egna Fake store api
export async function getProduct(id) {
    const res = await fetch(`${process.env.FAKE_STORE_API_URL}/products/${id}`)
    const data = await res.json()
    return data
}

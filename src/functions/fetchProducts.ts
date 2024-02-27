import { Product } from '../components/Products'

const URL = 'http://localhost:4000/api'

// Function to perform the getProducts request using fetch
export const getProducts = async (token: string): Promise<Product[]> => {
  const response = await fetch(`${URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

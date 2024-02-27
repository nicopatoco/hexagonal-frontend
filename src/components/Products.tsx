import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../functions/fetchProducts'

export interface Product {
  productId: string
  name: string
}

const Products = () => {
  // Assuming the token is stored in localStorage or comes from some auth context/provider
  const token = localStorage.getItem('token') || ''

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getProducts(token),
    queryKey: ['products'],
  })

  if (isLoading) return <div>Loading...</div>
  if (error instanceof Error) return <div>An error occurred: {error.message}</div>

  return (
    <div>
      <h2 className="text-xl">PRODUCTS</h2>
      <ul>
        {products?.map((product, i) => (
          <li key={`product-${i}`}>
            {product.productId} - {product.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Products

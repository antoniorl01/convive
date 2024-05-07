import Products from '@/components/Products'
import * as products from '@/data/products.json'

const Page = () => {
  return (
    <Products products={products.products}/>
  )
}

export default Page
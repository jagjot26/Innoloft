import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, fetchTRLs } from '../productSlice'

function useFetchProduct(shouldFetchTRLs = false) {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)

  useEffect(() => {
    if (Object.keys(product.data).length === 0) dispatch(fetchProductById(6781))
    if (shouldFetchTRLs && product.trls.length === 0) dispatch(fetchTRLs())
  }, [dispatch, shouldFetchTRLs, product.data, product.trls])
}

export default useFetchProduct

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import { changeUpdateStatus } from '../productSlice'

function useEditSuccess() {
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product)
  useEffect(() => {
    if (product.status.update === 'successful') {
      toast.success('Product updated successfully.', {
        position: 'top-center',
      })
      dispatch(changeUpdateStatus())
    }
  }, [dispatch, product.status.update])
}

export default useEditSuccess

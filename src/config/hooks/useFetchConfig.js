import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConfigById } from '../configSlice'

function useFetchConfig() {
  const dispatch = useDispatch()
  const config = useSelector((state) => state.config)
  useEffect(() => {
    if (Object.keys(config.data).length === 0) {
      dispatch(fetchConfigById(process.env.REACT_APP_APP_ID))
    }
  }, [dispatch, config.data])
}

export default useFetchConfig

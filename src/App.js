import Base from './Components/Layout/Base'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import ViewProduct from './Components/Product/ViewProduct'
import EditProduct from './Components/Product/EditProduct'
import { Toaster } from 'react-hot-toast'
import useFetchConfig from './config/hooks/useFetchConfig'

function App() {
  useFetchConfig()
  return (
    <Router>
      <Base>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ViewProduct />} />
          <Route path="/product/edit" element={<EditProduct />} />
          <Route element={<></>} />
        </Routes>
      </Base>
      <Toaster />
    </Router>
  )
}

export default App

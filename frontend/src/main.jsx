import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/features/store.js'
import Login from './pages/Auth/Login.jsx'

//private route 
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import UserList from './pages/Admin/UserList.jsx'
import Register from './pages/Auth/Register.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import ProductUpdate from './pages/Admin/productUpdate.jsx'
import AllProducts from './pages/Admin/AllProducts.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/cart.jsx'
import Shop from './pages/User/Shop.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App />}>
     <Route path='/login' element={<Login/>} />
     <Route path='/register' element={<Register/>}/>
      <Route index={true} element={<Home/>} />
      <Route path='/favorite' element={<Favorites/>}/>
      <Route path='/product/:id' element={<ProductDetails />} />
      <Route path='cart' element={<Cart/>} />
      <Route path='/shop' element={<Shop/>} />

    <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>} />
    </Route>
   {/* Admin route  */}
   <Route path='/' element={<AdminRoute/>} >
   <Route path='userlist' element={<UserList/>} />
   <Route path='categorylist' element={<CategoryList/>} />
   <Route path='productlist' element={<ProductList/>} />
   <Route path='allproducts' element={<AllProducts/>}/>
   <Route path='/product/update/:_id' element={<ProductUpdate/>} />
   </Route>
  </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={ router } />
  </Provider>
 
)

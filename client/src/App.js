import React from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/Pages/Home'
import AllProducts from './components/Pages/AllProducts'
import About from './components/Pages/About'
import Contact from './components/Pages/Contact'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import Cart from './components/Pages/Cart'
import ProductDetails from './components/Pages/ProductDetails'
import AdminAccount from './components/Pages/adminAccount/AdminAccount'
import AdminProfile from './components/Pages/adminAccount/AdminProfile'
import CreateCategory from './components/Pages/adminAccount/CreateCategory'
import CreateProduct from './components/Pages/adminAccount/CreateProduct'
import UpdateProduct from './components/Pages/adminAccount/UpdateProduct'
import Orders from './components/Pages/adminAccount/Orders'
import AdminProducts from './components/Pages/adminAccount/AdminProducts'
import UserAccount from './components/Pages/userAccount/UserAccount'
import UserProfile from './components/Pages/userAccount/UserProfile'
import UserOrders from './components/Pages/userAccount/UserOrders'
import CategoryProducts from './components/Pages/CategoryProducts'
import Products from './components/Pages/Products'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts />}>
            <Route path='' element={<Products/>} />
            <Route path=':cid' element={<CategoryProducts/>}/>
          </Route>
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/:pid' element={<ProductDetails />} />
          <Route path='/admin-account' element={<AdminAccount />}>
            <Route path='admin-profile' element={<AdminProfile />} />
            <Route path='create-category' element={<CreateCategory />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='update-product/:pid' element={<UpdateProduct />} />
            <Route path='admin-products' element={<AdminProducts />} />
            <Route path='admin-orders' element={<Orders />} />
          </Route>
          <Route path='/user-account' element={<UserAccount />}>
            <Route path='user-profile' element={<UserProfile />} />
            <Route path='user-orders' element={<UserOrders />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
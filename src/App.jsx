import './App.css'
import {BrowserRouter,Navigate,Route,Routes, useNavigate} from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import Home from './components/Home'
import Shop from './components/shop'
import Navbar from './components/navbar'
import Cart from './components/cart'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './components/profile'
import Checkout from './components/checkout'
import Susscess from './components/susscess'
import Detailsproducts from './components/detailsproducts'
import { useLocation } from 'react-router-dom'
import Notfound from './components/notfound'
import Whislist from './components/whislist'
import Myorders from './components/myorders'
import About from './components/about'
import {CartProvider} from './component/cartcouter'


function App() {

  
  const ConditonNavbar=()=>{
    const location=useLocation()
    if(location.pathname === '/login' || location.pathname === '/signup'){
      return null
    }else{
      return <Navbar/>
    }
  }

  return (
    <>
     
     <CartProvider>
     <BrowserRouter>
     <ConditonNavbar/>
     <ToastContainer
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     <Routes>
      
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={!localStorage.getItem('id')?<Login/>:<Navigate to={'/'}/>} />
      <Route path='/signup' element={!localStorage.getItem('id')?<Signup/>:<Navigate to={'/'}/>} />
      <Route path='/shop' element={<Shop/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/checkout' element={<Checkout/>} />
      <Route path='/success' element={<Susscess/>} />
      <Route path='/:id' element={<Detailsproducts/>} />
      <Route path='/whishlist' element={<Whislist/>} />
      <Route path='/myorders' element={<Myorders/>} />
      <Route path='/about' element={<About/>} />


      <Route path='*' element={<Notfound/>}/>
     </Routes>
     </BrowserRouter>
     </CartProvider>
    </>
  )
}

export default App

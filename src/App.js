import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import About from './Pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Privateroute from './Components/Privateroute';
import UserDashboard from './Pages/user-routes/UserDashboard';
import Profileinfo from './Pages/user-routes/Profileinfo';
import PostPage from './Pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './Pages/Categories';
import UpdatePost from './Pages/UpdatePost';
import HomePage from './Pages/HomePage';
import EditProfile from './Pages/EditProfile';
import ForgotPassword from './Pages/ForgotPassword';
import ChangePassword from './Pages/ChangePassword';
import AdminDashboard from './ADMIN/AdminDashboard';
import CategoriesDashboard from './ADMIN/CategoriesDashboard';
import UpdateCategory from './ADMIN/UpdateCategory';
import NotFound from './Pages/NotFound';
function App() {
  return (
    <div className="App">
    <UserProvider>
      <BrowserRouter>
        <ToastContainer position='bottom-center' />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/posts' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/posts/:postId' element={<PostPage />}></Route>
          <Route path='/categories/:categoryId' element={<Categories />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/user' element={<Privateroute />}>
            <Route path='dashboard' element={<UserDashboard />}></Route>
            <Route path='profile-info/:userId' element={<Profileinfo />}></Route>
            <Route path='update-post/:blogId' element={<UpdatePost />}></Route>
            <Route path='edit-profile/:userId' element={<EditProfile />}></Route>
            <Route path='change-password' element={<ChangePassword />}></Route>
            <Route path='admin-dashboard' element={<AdminDashboard />}></Route>
            <Route path='category-dashboard' element={<CategoriesDashboard />}></Route>
            <Route path='update-category/:categoryId' element={<UpdateCategory />}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;

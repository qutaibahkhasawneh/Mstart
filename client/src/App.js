import Login from "./components/Login";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import UserProfile from "./components/UserProfile";
import Register from "./components/Register";
import Admin from "./components/Admin";
import UserTable from "./components/ViewUser";




function App(){

  return(
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/user_profile" element={<UserProfile />} />
   <Route path="/register" element={<Register/>} />
   <Route path="/admin-panel" element={<Admin/>} />
   <Route path="/all-user" element={<UserTable/>} />
    </Routes>
    </BrowserRouter>
  )
}
export default App;
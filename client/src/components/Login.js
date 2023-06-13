
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios';
function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      if (response.data.registered) {
        console.log('Login successful');
      } else {
        console.log('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  
    return(
        <>
        
        

    <section className="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Login</h2>

              <form onSubmit={handleSubmit} > 

                <div className="form-outline mb-4">
                  <input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example4cg">Password</label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="submit" 
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">login</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have not account? <NavLink to="/register"
                    className="fw-bold text-body"><u>signup here</u></NavLink></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
        </>
    
    )
}
export default Login ;

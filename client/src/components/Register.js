import React, { useState } from 'react';
import './App.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  // const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/signup', {
        name,
        email,
        phone,
        // status,
        gender,
        dateOfBirth
      });

      console.log('Signup successful');
      console.log(response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    
    

    <section class="vh-100 bg-image">
  <div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius: "15px"}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <form onSubmit={handleSubmit}>

                <div className="form-outline mb-4">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example1cg">Your Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example4cg">Password</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="number"  value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example4cdg">Phone</label>
                </div>
                <div className="form-outline mb-4">
                  <input type="date"  value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} className="form-control form-control-lg" />
                  <label className="form-label" for="form3Example4cg">Date Of Birth</label>
                </div>
                <label className="form-label"  for="form3Example4cdg">Gender</label><br/>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" value={gender} onChange={(e) => setGender(e.target.value)}/>
                <label className="form-check-label" for="inlineRadio1">Male</label>
              </div>

              <div className="form-check form-check-inline">
              
                <input className="form-check-input" type="radio" value={gender} onChange={(e) => setGender(e.target.value)}/>
                <label className="form-check-label" for="inlineRadio2">Female</label>
              </div>
                

                <div className="d-flex justify-content-center">
                  <button type="submit"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                    className="fw-bold text-body"><u>Login here</u></Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  

  );
};

export default Register;



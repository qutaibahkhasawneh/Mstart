import React, { useState } from 'react';
import './App.css'; 


const Register = () => {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object to be sent to the server
    const data = {
      name,
      email,
      phone,
      status,
      gender,
      dateOfBirth
    };

    try {
      // Send the data to the server using an HTTP POST request
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        // Signup successful
        const result = await response.json();
        console.log(result);
      } else {
        // Signup failed
        console.error('Signup failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={name} name='name' onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label>
        Phone:
        <input type="tel" value={phone} name='phone' onChange={(e) => setPhone(e.target.value)} />
      </label>
      <label>
        Status:
        <input type="number" value={status} name='status' onChange={(e) => setStatus(e.target.value)} />
      </label>
      <label>
        Gender:
        <input type="number" value={gender} name='gender' onChange={(e) => setGender(e.target.value)} />
      </label>
      <label>
        Date of Birth:
        <input type="date" value={dateOfBirth} name='dateOfBirth' onChange={(e) => setDateOfBirth(e.target.value)} />
      </label>
      <button type="submit">Sign Up</button>
    </form>
    

    <section class="vh-100 bg-image">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style={{borderRadius: "15px"}}>
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Create an account</h2>

              <form>

                <div class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example1cg">Your Name</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <div class="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" class="form-control form-control-lg" />
                  <label class="form-label" for="form3Example4cdg">Repeat your password</label>
                </div>

                <div class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </div>

  );
};

export default Register;



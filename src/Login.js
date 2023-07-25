import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { config } from './config';
import './login.css';


function Login() {
  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      email:"",
      password: ""
    },
    onSubmit: async (values) => {
      {/*try {
        const login = await axios.post('https://markble-backendcode.onrender.com/login', values);
        alert(login.data.message);
        window.localStorage.setItem("token",JSON.stringify(login.data.token))
        window.localStorage.setItem("profile",JSON.stringify(login.data.profile))
        if(login.data.message=="successfully logged in"){
        navigate("/portal/dashboard");
        }else{
          navigate("/register");
        }
      } catch (error) {
        console.log("login error")
        
      } */}
      try{
        const login = await axios.post("https://markble-backendcode.onrender.com/login",values) 
        window.localStorage.setItem("token",JSON.stringify(login.data.token))
        console.log(login.data.token);
        navigate("/portal/dashboard")
    }catch(error){
        alert("Login Failed");
        console.log(error);
    }
    }
  });
  return (
    <>

    <div className='container-fluid  qw'>
    
      <div className='row pt-3'>
        <div className='col-lg-4 '></div>
        <div className='col-lg-4 mt-4'>
        <div className='heading'>Welcome to Normatha Hospital<i class="bi bi-piggy-bank-fill"></i></div>

          <form onSubmit={formik.handleSubmit} autoComplete="off" className='login'>
            <h1>Login</h1>
            
            <div className="form-group mt-2">
              <label for="exampleInputemail1">Email</label>
              <input type="password" className="form-control" id="exampleInputemil1" placeholder="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
            </div>
            <div className="form-group mt-2">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
            </div>
           
            <input type="submit" value='Login' className="btn btn-success  mt-2 " />
            

            <div className="form-group mt-1">
              <label>Don't have an account?<Link style={{ color: "red" }} to='/register'> Signup</Link></label>

            </div>
            <div className="form-group mt-1">
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
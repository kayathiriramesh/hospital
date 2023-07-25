import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Paticent() {
    const navigate=useNavigate(); 
    const [currentPaticent,serCurrentPaticent]=useState({});
    const [isEdit,setEdit]=useState(false);
    const [paticentList,setPaticentList] = useState([]);
    const formik= useFormik({
      initialValues :{
        paticentno : "",
        regdate:"",
        paticentname : "",
        disease: "",
        doctorname:"",
        phoneno:"",

      },
      validate : (values) =>{
        let error ={};
        if(values.paticentno === ""){
          error.paticentno= "Please Enter paticentno"
        }
        if(values.regdate === ""){
          error.regdate= "Please Enter registered date"
        }
        if(values.paticentname === ""){
          error.paticentname= "Please Enter paticent name"
        }
        if(values.disease === ""){
          error.disease= "Please Enter disease "
        }
        if(values.doctorname === ""){
          error.doctorname= "Please Enter doctor name "
        }
        if(values.phoneno === ""){
          error.phoneno= "Please Enter registered phoneno"
        }
        return error;
      },
      onSubmit : async(values) =>{
        try {
          if(!isEdit)
          {
          await axios.post("https://markble-backendcode.onrender.com/paticent",values,{
            headers :{
              Authorization :`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
            }
        })
          getPaticents();
          alert('Paticent Inserted')
          }else
          {
          await axios.put(`https://markble-backendcode.onrender.com/paticent/${currentPaticent._id}`,values,{
            headers :{
              Authorization :`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
            }
        })
          getPaticents();
          setEdit(false)
          }
          formik.resetForm()
        }  catch (error) {
          console.log(error);
          navigate("/portal/dashboard")
        }
      }
    });
    useEffect(
      ()=> {
        getPaticents();
      },[]);
  
    const getPaticents = async () =>{
      try {
        const paticent= await axios.get("https://markble-backendcode.onrender.com/paticents",{
            headers :{
                Authorization :`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
                
            }
        });
        setPaticentList(paticent.data)
      } catch (error) {
        navigate("/portal/dashboard")
      }
    };
  
      const handleEdit= async (id) => {
      try {
        const paticent = await axios.get(`https://markble-backendcode.onrender.com/paticents/${id}`,{
          headers :{
            Authorization :`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
          }
      })
        serCurrentPaticent(paticent.data)
        setEdit(true)
        formik.setValues({
          paticentno: paticent.data.paticentno,
          paticentname:paticent.data.paticentname,
          regdate : paticent.data.regdate,
          disease : paticent.data.disease,
          doctorname :paticent.data.doctorname,
          phoneno : paticent.data.phoneno,
        });
        setEdit(true);
      
      } catch (error) {
        navigate("/portal/dashboard")
      }
    };
    const handleDelete= async (id) =>{
      try {
        await axios.delete(`https://markble-backendcode.onrender.com/paticent/${id}`,{
          headers :{
            Authorization :`Bearer ${JSON.parse(window.localStorage.getItem("token"))}`
          }
      })
        getPaticents();
      } catch (error) {
        navigate("/portal/dashboard")
      }
    };
    return (
    <div className="container">
      <div className='row'>
        <div className='col-lg-6'>
            <form onSubmit={formik.handleSubmit}>
            <div className='row'>
               <div className='col-lg-6'>
                  <label>Paticent no</label>
                  <input 
                  onChange={formik.handleChange}
                  value={formik.values.paticentno}
                  name="paticentno"
                  type={"number"} className="form-control"></input>
               </div>
               <div className='col-lg-6'>
                  <label>Registered Date</label>
                  <input
                  onChange={formik.handleChange}
                  value={formik.values.regdate}
                  name="regdate"
                  type={"date"} className="form-control"></input>
               </div>
               <div className='col-lg-6'>
                  <label>PatientName</label>
                  <input 
                  onChange={formik.handleChange}
                  value={formik.values.paticentname}
                  name="paticentname"
                  type={"text"} className="form-control"></input>
               </div>
               <div className='col-lg-6'>
                  <label>Disease</label>
                  <input
                  onChange={formik.handleChange}
                  value={formik.values.disease}
                  name="disease"
                  type={"text"} className="form-control"></input>
               </div>
               <div className='col-lg-12'>
                  <label>DoctorName</label>
                  <input
                  onChange={formik.handleChange}
                  value={formik.values.doctorname}
                  name="doctorname"
                  type={"text"} className="form-control"></input>
               </div>
               <div className='col-lg-12'>
                  <label>Phone Number</label>
                  <input
                  onChange={formik.handleChange}
                  value={formik.values.phoneno}
                  name="phoneno"
                  type={"number"} className="form-control"></input>
               </div>
               
               <div className='col-lg-12'>
                  <input type={"submit"} values={isEdit ? 'Update' : "Submit" } className="btn btn-primary mt-2"></input>
               </div>
            </div>
            </form>
        </div>
        <div className='col-lg-6'>
        <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Paticent No</th>
                <th scope="col">Registered Date</th>
                <th scope="col">PatientName</th> 
                <th scope="col">Disease</th>
                <th scope="col">DoctorName</th>
                <th scope="col">Phoneno</th>
                  
              </tr>
            </thead>
            <tbody>
              {
                paticentList.map((paticent,index)=>
                {
                  return <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{paticent.paticentno}</td>
                    <td>{paticent.regdate}</td>
                    <td>{paticent.paticentname}</td>
                    <td>{paticent.disease}</td>
                    <td>{paticent.doctorname}</td>
                    <td>{paticent.phoneno}</td>
                    <td>
                      <button className="btn btn-info btn-sm" onClick= {() => handleEdit(paticent._id)} >Edit</button>
                      <button  className="btn btn-danger btn-sm" onClick={ () => handleDelete(paticent._id)}>Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Paticent
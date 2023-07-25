import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Doctor() {
    const navigate=useNavigate(); 
    //const [currentPaticent,serCurrentPaticent]=useState({});
    //const [isEdit,setEdit]=useState(false);
    const [paticentList,setPaticentList] = useState([])
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
        navigate("/doctor")
      }
    };
    
    return (
      <div className="container">
        <div className='row'>
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


  
export default Doctor
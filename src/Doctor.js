import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {Line} from "react-chartjs-2";
  /* react-chartjs-2package install*/
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    ArcElement,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  


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
      <>
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
          <div className="col-lg-8">
                <Line 
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                position: 'top',
                                },
                                title: {
                                display: true,
                                text: 'Chart.js Line Chart',
                                },
                            },
                            }} 
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [{
                                label: 'My First Dataset',
                                data: [65, 59, 80, 81, 56, 55, 40],
                                fill: false,
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            },],
                        }}
                    />
            </div>    
                </div>
      </div>
      </>
    );
  }


  
export default Doctor
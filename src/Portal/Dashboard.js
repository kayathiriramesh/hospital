import React from 'react'
import { Link } from 'react-router-dom'; 
function Dashboard() {
  return (
    <div className="portal">
      <div className="col-2">
        <h4>Portal for Receptionist</h4>
        <img src="https://thumbs.dreamstime.com/b/portrait-cheerful-asain-receptionist-smiling-looking-camera-pretty-receptionist-114776093.jpg" /> 
        <Link to="/reception"> Receptionist click here</Link>
      </div>
      <div className="col-2">
        <h3>Portal for Doctor</h3>
        <img src="https://cdn.pixabay.com/photo/2014/12/10/20/56/medical-563427_1280.jpg" /> 
        <Link to="/doctor">  Dear Doctor's click here</Link>
      </div>
    </div>
  )
}

export default Dashboard
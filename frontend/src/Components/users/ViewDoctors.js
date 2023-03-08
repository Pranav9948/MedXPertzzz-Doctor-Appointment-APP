import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Rows from "react-bootstrap/Row";
import Cols from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import "../../styles/componentStyles/user/viewourdoctors.css";
import { useDispatch } from "react-redux";
import { ViewAllApprovedDoctors } from "../../Redux/actions/UserAction";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";



function ViewDoctors() {

  const [viewAllDoctors, setViewAllDoctors] = useState([]);

  const Doctors = useSelector(
    (state) => state.viewAllDoctors?.Doctors
  );
  

  const getApprovedDoctors = Doctors?.getApprovedDoctors;

  console.log("45555",getApprovedDoctors)

  const dispatch = useDispatch();

  useEffect(() => {
    getAllApprovedDoctor();
  }, []);

  const getAllApprovedDoctor = () => {
    dispatch(ViewAllApprovedDoctors());
  };

  console.log("22444", getApprovedDoctors);










  return (
    <>
      <div className="bannerImagez"></div>
      <div className="bannerz">
        <div className="bannerContentz">
          <h1 className="text-center fw-bold fs-1">SEE OUR TOP QUALITY DOCTOR TEAM</h1>



<Container>
      <Row>
        {

getApprovedDoctors?.map((doctor)=>{
    return (
      <Col md={4}>
        <Card className="m-5">
          <Card.Img
            variant="top"
            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            style={{ height: "250px" }}
          />
          <Card.Body className="text-center">
            <ListGroup>
              <ListGroup.Item>
                <Card.Title>
                  {doctor.firstName} {doctor.lastName}
                </Card.Title>
              </ListGroup.Item>{" "}
              <ListGroup.Item>{doctor.specialization}</ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Fee : Rs: {doctor.feePerCunsultation}
              </ListGroup.Item>
              <ListGroup.Item> Experience : {doctor.experience}</ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Timings: {doctor.timings[0]} {" : "}
                {doctor.timings[1]}
              </ListGroup.Item>
              <Link to={`/bookDoctorAppointment/${doctor._id}`}>
                <Button variant="primary" className="mt-4">Book Now</Button>
              </Link>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    );
})



   
     
      
   

        
     
}
      </Row>
    </Container>





        </div>

        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffff"
            fill-opacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,149.3C672,171,768,245,864,272C960,299,1056,277,1152,229.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
}

export default ViewDoctors;

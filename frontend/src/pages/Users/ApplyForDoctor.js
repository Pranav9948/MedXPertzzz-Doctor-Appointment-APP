import React from "react";
import Navbars from "../../Components/Navbars";
import "../../styles/componentStyles/userapplyasdoctor.css";
import { Button, Col, Form, Input, Row } from "antd";
import { TimePicker } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, HideLoading } from "../../Redux/actions/generalActions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import Cardz from "../../Components/users/applyForDoctor.js/Cardz";
import Container from "react-bootstrap/esm/Container";
import DoctorForm from "../../Components/users/applyForDoctor.js/DoctorForm";
import axiosConfig from "../../axiosConfig";
import Footers from "../../Components/userHomePage/Footer9/Footers";

function ApplyForDoctor() {
  const userInfo = useSelector((state) => state.userlogin?.userInfo);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/users/apply-doctor-account",
        {
          ...values,
          userId: userInfo._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/successapplyfordoctor");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Navbars />
      <Cardz />

      <Container>
        <DoctorForm onFinish={onFinish} />
      </Container>
      <Footers/>
    </>
  );
}

export default ApplyForDoctor;

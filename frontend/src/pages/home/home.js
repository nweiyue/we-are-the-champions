import { Component } from "react";
import {
  Button,
  Card,
  Container,
  Col,
  Row,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import "./home.css"
import { NavBar } from "../../components/navbar/navbar";

const Home = () => {
  return (
    <>
    <NavBar></NavBar>
      <div className="center">
        <h1 className="title">We are the Champions!</h1>
        <h3 className="description">
          It’s the time of the year again when Govtech holds its annual football
          championship where 12 teams will compete for the grand prize of honour
          and glory. Register your team now and see you at the pitch!
        </h3>
      </div>
    </>
  );
};

export default Home;

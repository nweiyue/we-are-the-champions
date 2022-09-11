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
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { useEffect } from "react";
import { Key, PersonCircle } from "react-bootstrap-icons";
import "./register.css";
import { API_URL, API_HEADERS } from "../../api";
import { FailureAlert } from "../../components/failure_alert/failure_alert";
import { NavBar } from "../../components/navbar/navbar";

const Register = () => {
  const [spin, setSpin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object({
    teamName: yup.string().required("Required"),
    registrationDate: yup.string().required("Required"),
    groupNumber: yup.string().required("Required"),
  });

  const register = async (e) => {
    setSpin(true);

    await fetch(API_URL + "/register", {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        teamName: e.teamName,
        registrationDate: e.registrationDate,
        groupNumber: e.groupNumber,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          setErrorMsg("");
          return result;
        } else {
          setErrorMsg(result.message);
          return result.message;
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });

    setSpin(false);
  };

  return (
    <>
    <NavBar></NavBar>
      <Container className="mt-5">
        <Row className="v-center">
          <Col>
            <Card>
              <Card.Body>
                <h1 className="text-center">Register</h1>
                <Formik
                  validationSchema={schema}
                  onSubmit={(e) => register(e)}
                  initialValues={{
                    teamName: "",
                    registrationDate: "",
                    groupNumber: "",
                    validateOnMount: true,
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    isValid,
                    errors,
                    dirty,
                  }) => (
                    <Form className="form" onSubmit={handleSubmit} noValidate>
                      {!spin ? (
                        <div>
                          <Form.Group
                            className="mb-2 pb-2"
                            controlId="formTeamName"
                          >
                            <Form.Label>Team Name</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <PersonCircle />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="teamname"
                                aria-describedby="inputGroupPrepend"
                                name="teamName"
                                value={values.teamName}
                                onChange={handleChange}
                                isValid={touched.teamName && !errors.teamName}
                                isInvalid={!!errors.teamName}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.teamName}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group
                            className="mb-2 pb-2"
                            controlId="formRegistrationDate"
                          >
                            <Form.Label>Registration Date (DD/MM)</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <Key />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="12/09"
                                aria-describedby="inputGroupPrepend"
                                name="registrationDate"
                                onChange={handleChange}
                                value={values.registrationDate}
                                isValid={
                                  touched.registrationDate &&
                                  !errors.registrationDate
                                }
                                isInvalid={!!errors.registrationDate}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.registrationDate}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group
                            className="mb-3 pb-3"
                            controlId="formGroupNumber"
                          >
                            <Form.Label>Group Number</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <Key />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="1"
                                aria-describedby="inputGroupPrepend"
                                name="groupNumber"
                                onChange={handleChange}
                                value={values.groupNumber}
                                isValid={
                                  touched.groupNumber && !errors.groupNumber
                                }
                                isInvalid={!!errors.groupNumber}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.groupNumber}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          {errorMsg !== "" ? (
                            <FailureAlert errorMsg={errorMsg} />
                          ) : (
                            <> </>
                          )}
                        </div>
                      ) : (
                        <div>
                          <Spinner
                            className="p-4 mb-5 top"
                            variant="primary"
                            animation={"border"}
                          />
                        </div>
                      )}
                      <Button
                        className="me-2"
                        variant="primary"
                        type="submit"
                        disabled={!isValid || !dirty}
                      >
                        Register
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;

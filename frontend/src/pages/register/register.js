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
import { PeopleFill } from "react-bootstrap-icons";
import { API_URL, API_HEADERS } from "../../api";
import { FailureAlert } from "../../components/failure_alert/failure_alert";
import { NavBar } from "../../components/navbar/navbar";

const Register = () => {
  const [spin, setSpin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object({
    teams: yup.string().required("Required"),
  });

  const register = async (e) => {
    setSpin(true);

    await fetch(API_URL + "/register", {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        teams: e.teams,
      }),
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          setErrorMsg("");
          window.location.reload();
          return result;
        } else {
          setErrorMsg(result.message);
          return result.message;
        }
      })
      .catch((err) => {
        console.error(err);
      });
      
    setSpin(false);
  };

  return (
    <>
      <NavBar></NavBar>
      <Container className="mt-5">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h1 className="text-center">Register</h1>
                <Formik
                  validationSchema={schema}
                  onSubmit={(e) => register(e)}
                  initialValues={{
                    teams: "",
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
                            controlId="formTeams"
                          >
                            <Form.Label>Teams</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <PeopleFill />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="<Team A name> <Team A registration date in DD/MM> <Team A group number>"
                                aria-describedby="inputGroupPrepend"
                                name="teams"
                                value={values.teams}
                                onChange={handleChange}
                                isValid={touched.teams && !errors.teams}
                                isInvalid={!!errors.v}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.teams}
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

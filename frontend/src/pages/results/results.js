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
import { Key, PersonCircle } from "react-bootstrap-icons";
import "./results.css";
import { API_URL, API_HEADERS } from "../../api";
import { FailureAlert } from "../../components/failure_alert/failure_alert";
import { NavBar } from "../../components/navbar/navbar";

const Results = () => {
  const [spin, setSpin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object({
    team1: yup.string().required("Required"),
    team2: yup.string().required("Required"),
    goals1: yup.string().required("Required"),
    goals2: yup.string().required("Required"),
  });

  const register = async (e) => {
    setSpin(true);

    await fetch(API_URL + "/results", {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        team1: e.team1,
        team2: e.team2,
        goals1: e.goals1,
        goals2: e.goals2
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
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h1 className="text-center">Upload Results</h1>
                <Formik
                  validationSchema={schema}
                  onSubmit={(e) => register(e)}
                  initialValues={{
                    team1: "",
                    team2: "",
                    goals1: "",
                    goals2: "",
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
                            controlId="formTeam1"
                          >
                            <Form.Label>Team 1's Name</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <PersonCircle />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="teamname1"
                                aria-describedby="inputGroupPrepend"
                                name="team1"
                                value={values.team1}
                                onChange={handleChange}
                                isValid={touched.team1 && !errors.team1}
                                isInvalid={!!errors.team1}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.team1}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group
                            className="mb-2 pb-2"
                            controlId="formTeam2"
                          >
                            <Form.Label>Team 2's Name</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <PersonCircle />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="teamname2"
                                aria-describedby="inputGroupPrepend"
                                name="team2"
                                value={values.team2}
                                onChange={handleChange}
                                isValid={touched.team2 && !errors.team2}
                                isInvalid={!!errors.team2}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.team2}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group
                            className="mb-2 pb-2"
                            controlId="formGoals1"
                          >
                            <Form.Label>Team 1's Goals</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <PersonCircle />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="2"
                                aria-describedby="inputGroupPrepend"
                                name="goals1"
                                value={values.goals1}
                                onChange={handleChange}
                                isValid={touched.goals1 && !errors.goals1}
                                isInvalid={!!errors.goals1}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.goals1}
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Form.Group>

                          <Form.Group
                            className="mb-3 pb-3"
                            controlId="formGoals2"
                          >
                            <Form.Label>Team 2's Goals</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <PersonCircle />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                placeholder="2"
                                aria-describedby="inputGroupPrepend"
                                name="goals2"
                                value={values.goals2}
                                onChange={handleChange}
                                isValid={touched.goals2 && !errors.goals2}
                                isInvalid={!!errors.goals2}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.goals2}
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
                        Upload
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

export default Results;

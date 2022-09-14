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
import { BarChartFill } from "react-bootstrap-icons";
import { API_URL, API_HEADERS } from "../../api";
import { FailureAlert } from "../../components/failure_alert/failure_alert";
import { NavBar } from "../../components/navbar/navbar";

const Results = () => {
  const [spin, setSpin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const schema = yup.object({
    results: yup.string().required("Required"),
  });

  const register = async (e) => {
    setSpin(true);

    await fetch(API_URL + "/results", {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify({
        results: e.results,
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
                <h1 className="text-center">Upload Results</h1>
                <Formik
                  validationSchema={schema}
                  onSubmit={(e) => register(e)}
                  initialValues={{
                    results: "",
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
                            controlId="formResults"
                          >
                            <Form.Label>Results</Form.Label>
                            <InputGroup hasValidation>
                              <InputGroup.Text id="inputGroupPrepend">
                                <BarChartFill />
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                as="textarea"
                                placeholder="<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>"
                                aria-describedby="inputGroupPrepend"
                                name="results"
                                value={values.results}
                                onChange={handleChange}
                                isValid={touched.results && !errors.results}
                                isInvalid={!!errors.results}
                              />
                              <Form.Control.Feedback type="invalid">
                                {errors.results}
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

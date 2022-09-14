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
import { useState } from "react";
import "./rank.css";
import { API_URL, API_HEADERS } from "../../api";
import { FailureAlert } from "../../components/failure_alert/failure_alert";
import { NavBar } from "../../components/navbar/navbar";

const Rank = () => {
  const [spin, setSpin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [team1Rankings, setTeam1Rankings] = useState([]);
  const [team2Rankings, setTeam2Rankings] = useState([]);

  const get_rank = async (e) => {
    await fetch(API_URL + "/rank", {
      method: "GET",
      headers: API_HEADERS,
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          setTeam1Rankings(result.data[1]);
          setTeam2Rankings(result.data[2]);
          return result;
        } else {
          return result.message;
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const clear_data = async (e) => {
    await fetch(API_URL + "/clear", {
      method: "DELETE",
      headers: API_HEADERS,
    })
      .then(async (res) => {
        var result = await res.json();
        if (res.status === 200) {
          setTeam1Rankings([]);
          setTeam2Rankings([]);
          return result;
        } else {
          return result.message;
        }
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar></NavBar>
      <Container className="mt-5">
        <Row className="pb-5">
          <Col>
            <Button
              className="me-2"
              variant="primary"
              type="submit"
              onClick={get_rank}
            >
              Get Rankings!
            </Button>
            <Button
              className="me-2"
              variant="primary"
              type="submit"
              onClick={clear_data}
            >
              Clear Data!
            </Button>
          </Col>
        </Row>
        <h3 className="pt-3 pb-3 align-left">Rankings:</h3>
        <Row>
          <Col>
            <h4 className="align-left">Group 1</h4>
            {team1Rankings.length !== 0 ? (
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Team Name</th>
                </tr>
                {team1Rankings.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <> </>
            )}
          </Col>
          <Col>
            <h4 className="align-left">Group 2</h4>
            {team2Rankings.length !== 0 ? (
              <tbody>
                <tr>
                  <th>Rank</th>
                  <th>Team Name</th>
                </tr>
                {team2Rankings.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <> </>
            )}
          </Col>
        </Row>
        <h3 className="pt-5 pb-3 align-left">
          Teams that qualify for next round:
        </h3>
        <Row>
          <Col>
            <h4 className="align-left">Group 1</h4>
            {team1Rankings.length !== 0 ? (
              <tbody>
                <tr>
                  <th>Team Name</th>
                </tr>
                {team1Rankings
                  .slice(0, Math.min(team1Rankings.length, 4))
                  .map((item, i) => (
                    <tr key={i}>
                      <td>{item}</td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <> </>
            )}
          </Col>
          <Col>
            <h4 className="align-left">Group 2</h4>
            {team2Rankings.length !== 0 ? (
              <tbody>
                <tr>
                  <th>Team Name</th>
                </tr>
                {team2Rankings
                  .slice(0, Math.min(team1Rankings.length, 4))
                  .map((item, i) => (
                    <tr key={i}>
                      <td>{item}</td>
                    </tr>
                  ))}
              </tbody>
            ) : (
              <> </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rank;

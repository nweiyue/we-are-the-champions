import { Button, Container, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { API_URL, API_HEADERS } from "../../api";
import { NavBar } from "../../components/navbar/navbar";
import "./rank.css";

const Rank = () => {
  const [team1Rankings, setTeam1Rankings] = useState([]);
  const [team2Rankings, setTeam2Rankings] = useState([]);

  const getRank = async (e) => {
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
      .catch((err) => {
        console.error(err);
      });
  };

  const clearData = async (e) => {
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
      .catch((err) => {
        console.error(err);
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
              onClick={getRank}
            >
              Get Rankings!
            </Button>
            <Button
              className="me-2"
              variant="primary"
              type="submit"
              onClick={clearData}
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

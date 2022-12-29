import React, { useState, useNavigate } from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import * as bd from "react-basic-design";
import "./styles.scss";
import {db} from '../../firebase.js'

export default function Feedback() {
  const [rtl, setRTL] = useState(bd.helper.getRTL());
  const [darkMode, setDarkMode] = useState(bd.helper.isDarkMode());
  //const navigate  = useNavigate();
  function changeRTL(value) {
    setRTL(value);
    bd.helper.setRTL(value);
  }

  function changeDarMode(value) {
    setDarkMode(value);
    bd.helper.setTheme(value ? "mui-dark" : "mui-light");
  }
  //   const changeToThankPage = () =>{
  //     navigate\("/thanks");
  // }
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const feedback = {
      place: event.target.place.value,
      severity: event.target.severity.value,
      message: event.target.message.value
    };
  
    db.ref('feedback').push(feedback);
  };

  return (
    <>
      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">GoSafe</p>
      <bd.Paper className="p-3 my-3 mx-auto" style={{ maxWidth: 600 }}>
        <Form autoComplete="off" className="">
          <div className="text-primary text-center mb-4">
            {/* <bd.icons.Email style={{ fontSize: 50 }} /> */}
            <h3 className="mt-3">Feedback for your journey</h3>
            <bd.Toggle
              label="RTL"
              color="primary"
              model={rtl}
              setModel={changeRTL}
            />

            {/* <bd.Switch
              dense
              label="Dark"
              color="primary"
              model={darkMode}
              setModel={changeDarMode}
              labelClassName="d-inline-flex"
            /> */}
          </div>

          {/* <FloatingLabel label="Email address" className="dense has-icon mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="yourName@gmail.com"
            />
            <bd.icons.PersonOutline />
          </FloatingLabel> */}
          <Row>
            <Col md>
              <FloatingLabel label="Where did you face problems?" className="dense mb-3">
                <Form.Control as="textarea" name="place" placeholder="Separate by comma if you have multiple" style={{ height: 100 }}
                />
              </FloatingLabel>
            </Col>

          </Row>
          <Row>
            <Col md>
              <FloatingLabel label="Rate the Severity of the problem" className="dense mb-3">
                <Form.Select name="severity" placeholder="Severity">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>


          <FloatingLabel label="Message" className="dense mb-3">
            <Form.Control
              as="textarea"
              name="message"
              placeholder="Message"
              style={{ height: 100 }}
            />
          </FloatingLabel>

          <bd.Button color="primary" size="lg" type="button" className="d-block m-auto w-100" onClick={handleSubmit()}>
            Give Feedback
          </bd.Button>
          <bd.Button color="primary" size="lg" type="button" className="d-block m-auto w-100">
            Go Home
          </bd.Button>
        </Form>
      </bd.Paper>
    </>
  );
}

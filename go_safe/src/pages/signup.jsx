import React, { useState, useEffect } from 'react';
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBInput, MDBIcon } from 'mdb-react-ui-kit';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [RegistrationInformation, setRegistrationInformation] = useState({
    name:"",
    email: "",
    password: "",
    confirmpassword: "",
    gender:"",
    dob:""
  })
  const [isRegistering, setRegistering] = useState(false);
  const handleRegister = () => {
    if (
      RegistrationInformation.password !== RegistrationInformation.confirmpassword
    ) {
      alert("Please confirm that password are the same");
      return;
    }
    createUserWithEmailAndPassword(
      auth,
      RegistrationInformation.email,
      RegistrationInformation.password
    )
      .then(() => {
        navigate("/logout");
      })
      .catch((err) => alert(err.message));
  };
  
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Your Name' id='form1' type='text' className='w-100' value={RegistrationInformation.name}
                onChange={(e) =>
                  setRegistrationInformation({
                    ...RegistrationInformation,
                    name: e.target.value
                  })
                }/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Your Email' id='form2' type='email' value={RegistrationInformation.email}
                onChange={(e) =>
                  setRegistrationInformation({
                    ...RegistrationInformation,
                    email: e.target.value
                  })
                }/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' id='form3' type='password' value={RegistrationInformation.password}
                onChange={(e) =>
                  setRegistrationInformation({
                    ...RegistrationInformation,
                    password: e.target.value
                  })
                }/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Repeat your password' id='form4' type='password' value={RegistrationInformation.confirmpassword}
                onChange={(e) =>
                  setRegistrationInformation({
                    ...RegistrationInformation,
                    confirmpassword: e.target.value
                  })
                }/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Date of Birth' id='form4' type='date' value={RegistrationInformation.dob}
                onChange={(e) =>
                  setRegistrationInformation({
                    ...RegistrationInformation,
                    dob: e.target.value
                  })
                }/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBDropdown>
                  <MDBDropdownToggle color='light'>Gender</MDBDropdownToggle>
                  <MDBDropdownMenu >
                    <MDBDropdownItem link childTag='button'>Male</MDBDropdownItem>
                    <MDBDropdownItem link childTag='button'>Female</MDBDropdownItem>
                    <MDBDropdownItem link childTag='button'>Prefer Not To Say</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </div>
<br />
              <MDBBtn className='btn btn-warning' size='lg' onClick={handleRegister}>Register</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account?
                <a href="/login" className="link-danger" onClick={() => setRegistering(false)}>Login</a></p>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://png.pngtree.com/png-vector/20190810/ourmid/pngtree-location-map-navigation-pin-minus-abstract-flat-color-icon-t-png-image_1653751.jpg' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default SignUp;
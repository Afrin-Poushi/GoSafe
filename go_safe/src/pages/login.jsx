import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase.js";
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBCard } from 'mdb-react-ui-kit';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/logout"); //signin redirects to testjs
      }
    });
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleLogIn = () => {
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/logout");
    }).catch((err) =>
      alert(err.message));
  }

  return (
    <div><p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">GoSafe</p>
    <MDBCard>
    <MDBContainer fluid className="p-3 my-5 h-custom">

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://png.pngtree.com/png-vector/20190810/ourmid/pngtree-location-map-navigation-pin-minus-abstract-flat-color-icon-t-png-image_1653751.jpg" className="img-fluid" alt="Map" />
        </MDBCol>

        <MDBCol col='4' md='6'>

          <div className="d-flex flex-row align-items-center justify-content-center">

            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

          </div>

          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLgEmail' type='email' size="lg" onChange={handleEmailChange} value={email} />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLgPassword' type='password' size="lg" onChange={handlePasswordChange} value={password} />

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="btn btn-warning" size='lg' onClick={handleLogIn}>Login</MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
          </div>

        </MDBCol>

      </MDBRow>


      <div>

        <MDBBtn tag='a' color='none' className='mx-3' style={{ backgroundColor: '#3b5998' }} href='#'>
          <MDBIcon fab icon='facebook-f' size="md" />
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
          <MDBIcon fab icon='twitter' size="md" />
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
          <MDBIcon fab icon='google' size="md" />
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
          <MDBIcon fab icon='linkedin-in' size="md" />
        </MDBBtn>


      </div>

    </MDBContainer>
    </MDBCard>
    </div>
  );
}

export default Login;
import React, { useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate("/login")
            }
        })
    }, [])
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/login")
        })
            .catch(err => { alert(err.message) })
    }
    const handlenotSignOut=()=>{
        navigate('/')
    }
    return (
        <div><p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">GoSafe</p>
        <div>
            <p className="text-start fw-bold mt-2 pt-1 mb-2">Do you want to logout?</p>
            <MDBBtn className="btn btn-warning" size='lg' onClick={handleSignOut}>Logout</MDBBtn>
            <br />
            <p className="small fw-bold mt-2 pt-1 mb-2">Don't want to logout? <a href="/" className="link-danger">No</a></p>
        </div>
        </div>
    )
}
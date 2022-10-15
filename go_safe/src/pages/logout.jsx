import React, {useEffect} from "react";
import { signOut,onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase";
import { useNavigate } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Logout(){
    const navigate = useNavigate();
    useEffect(()=>
    {
        auth.onAuthStateChanged(user=>{
            if(!user){
                navigate("/login")
            }
        })
    },[])
    const handleSignOut = () =>{
        signOut(auth).then(() =>{
            navigate("/login")
        })
        .catch(err => {alert(err.message)})
    }
    return(
        <div>
            <MDBBtn className="btn btn-warning" size='lg' onClick={handleSignOut}>Logout</MDBBtn>
        </div>
    )
}
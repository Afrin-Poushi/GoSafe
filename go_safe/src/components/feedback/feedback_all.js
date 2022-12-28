import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBCard } from 'mdb-react-ui-kit';
function Feedback_all() {
    const navigate = useNavigate();
    const changeToFeedback = () =>{
        navigate("/feedback-form");
    }
    const changeToThankPage = () =>{
        navigate("/thanks");
    }
    const[FeedBackInformation,setFeedbackInformation] = useState({
        location:"",
        severity_point:""
    })
    return (
        <div>
            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">GoSafe</p>
            <h1>How was your trip?</h1>
            <div>
                <MDBContainer>
                    <MDBBtn onClick={changeToThankPage}>Very Good</MDBBtn>
                    <MDBBtn onClick={changeToThankPage}>Okay</MDBBtn>
                    <MDBBtn onClick={changeToFeedback}>Bad</MDBBtn>
                </MDBContainer>
            </div>
        </div>
    );
}
export default Feedback_all;
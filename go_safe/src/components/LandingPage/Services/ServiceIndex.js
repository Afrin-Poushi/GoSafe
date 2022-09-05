import React from 'react';
import Icon1 from '../../../images/bike_ride.svg';
import Icon2 from '../../../images/location.svg';
import Icon3 from '../../../images/feedback.svg';
import { ServicesCard, ServicesContainer, ServicesIcon, ServicesWrapper, ServicesH2, ServicesP , ServicesH1} from './ServiceElements';

const Services = () => {
    return (
        <>
        <ServicesContainer id='services'>
            <ServicesH1> Our services </ServicesH1>
                <ServicesWrapper>
                    <ServicesCard>
                        <ServicesIcon src={Icon1}/>
                        <ServicesH2>Choose safest road</ServicesH2>
                        <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </ServicesP>
                    </ServicesCard>
                    <ServicesCard>
                        <ServicesIcon src={Icon2}/>
                        <ServicesH2>Share Location</ServicesH2>
                        <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </ServicesP>
                    </ServicesCard>
                    <ServicesCard>
                        <ServicesIcon src={Icon3}/>
                        <ServicesH2>User Feedback</ServicesH2>
                        <ServicesP>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </ServicesP>
                    </ServicesCard>
                </ServicesWrapper>
            
        </ServicesContainer>
            
        </>
    )
}

export default Services

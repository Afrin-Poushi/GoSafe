import styled from 'styled-components';

export const ServicesContainer = styled.div`
   height: 800px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background: #010606;

   @media screen and (max-width: 768px){
        height: 1100px;
    }
    @media screen and (max-width: 480px){
        height: 1300px;
    }
`;

export const ServicesWrapper = styled.div`
    margin: 0 auto;
    max-width: 1000px;
    padding: 0 50px;
    align-items: center;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
   
    @media screen and (max-width: 1100px){
        grid-template-columns: 1fr 1fr ;
    }
    @media screen and (max-width: 768px){
        grid-template-columns: 1fr ;
        padding: 0 20px;
    }

`;


export const ServicesCard = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 340px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,2);
    transition: all 0.2s ease-in-out;
    &:hover{
        transition: all 0.2s ease-in-out;
        transform: scale(1.02);
        cursor: pointer;
        
    }
    
`


export const ServicesIcon = styled.img`
    height: 160px;
    width: 160px;
    margin-bottom: 10px;
`
export const ServicesH1 = styled.h1`
    margin-bottom: 64px;
    font-size: 2.5rem;
    color: #fff;
    @media screen and (max-width: 480px){
        font-size: 2rem;
    }
`;

export const ServicesH2 = styled.h2`
    margin-bottom: 10px;
    font-size: 1rem;
    
`;

export const ServicesP = styled.p`
    text-align: center;
    font-size: 1rem;
    
`;
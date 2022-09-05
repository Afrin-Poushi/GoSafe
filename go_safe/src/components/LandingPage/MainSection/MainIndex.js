import React, {useState} from 'react';

import { MainContainer, MainBg, VideoBg, MainContent, MainBtnWrapper, MainH1, MainP,ArrowForward, ArrowRight, ImageBg } from './MainElements';
import { MyButton, MyButton2 } from '../../ButtonElement';
import logo from '../../../images/navigator.svg';

const MainSection = () => {
    const [hover, setHover] = useState(false)
    const onHover = () => {
        setHover(!hover);
    }
    return (
        <MainContainer>
            <MainBg>
                <ImageBg src={logo} alt="loading..."/>
               
                {/* <VideoBg autoplay loop muted src={Video} type='video/mp4'/> */}
                
            </MainBg>
            <MainContent>
                <MainH1>
                    GOSAFE
                </MainH1>
                <MainP>
               Here is where your safe trip begins
                </MainP>
                <MainBtnWrapper>
                    <MyButton2 to='/signup' onMouseEnter={onHover} onMouseLeave={onHover}  >
                        Go to Map 
                         {/* {(hover ? <ArrowForward /> : ArrowRight />)}; */}
                    </MyButton2>
                </MainBtnWrapper>
            </MainContent>
        </MainContainer>
    )
}

export default MainSection

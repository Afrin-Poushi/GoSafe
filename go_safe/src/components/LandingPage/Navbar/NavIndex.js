import React, { useEffect, useState } from 'react';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavLink, NavBtn, NavBtnLink } from './NavbarElements';
import { FaBars } from 'react-icons/fa';
import { auth } from "../../../firebase"
import { Navigate, useNavigate } from 'react-router-dom';
const Navbar = ({ toggle }) => {
    const navigate = useNavigate()
    const handleRegister = () =>
    {
        console.log(auth.currentUser.uid)
        if(auth.currentUser.uid)
        {
           
            navigate("/logout");
        }
        else{
            navigate("/signup")
        }
    }
    
    // const [scrollNav, setScrollNav] = useState(true)
    // const changeNav = ()=> {
    //     if(window.scrollY >= 80) setScrollNav(false)
    //     else setScrollNav(false)
    // }
    // useEffect (() => {
    //     window.addEventListener('scroll', changeNav)
    // }, [])
    return (
        <>
            <Nav >
                <NavbarContainer>
                    <NavLogo to='/'>
                        GoSafe
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="about"
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}>About</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="discover" smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}>Policies</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="services" smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}>Services</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="start" smooth={true}
                                duration={500}
                                spy={true}
                                exact='true'
                                offset={-80}>Sign In</NavLinks>
                        </NavItem>
                    </NavMenu>
                    
                    
                        <NavBtn>
                            <NavBtnLink to='/signup' onClick={handleRegister}> Sign Up</NavBtnLink>
                        </NavBtn>
                    
                </NavbarContainer>
            </Nav>
        </>
    );
};

export default Navbar;

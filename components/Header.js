import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import Image from 'next/image'
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import CartIcon from "./icons/CartIcon";
import BarIcon from "./icons/BarIcon";


const StyledHeader = styled.header`
  background: linear-gradient(to bottom right, #4B0082, #54038f, #7c0acf);
  &:hover {
    background: linear-gradient(to bottom, #4B0082, #54038f, #7c0acf);
  }
  border-style: solid;
  border-width: 0 0 1px 0;
  border-color: gray;
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
`;
const Logo = styled(Link)`
  color: white;
 
  text-decoration: none;
  font-size: large;
  display: flex;
  align-items: center;
  svg {
    height: 25px;
    margin-right: 5px;
  }
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;     
  ` : `
    display: none;  
  `} 
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 65px 20px 20px 25px;
  background: linear-gradient(to bottom right, #4B0082, #54038f, #7c0acf);
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    background: transparent;
    padding: 20px 0;
    gap: 10px; 
  }
`;

const LogoTag = styled.div`
  margin: 5px 0 0 0; 
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(to bottom right, white, green, yellow, red);
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
  @media screen and (min-width: 768px) {
    font-size: 30px;
    margin: 5px 30px 0 5px; 
  }
`;

const CartHolder = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const CartNumberSpacing = styled.div`
  padding-top: 1px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: silver;
  &:hover {
    color: white;
  }
  &:active {
    color: silver;
  }
  svg {
    height: 20px;
  }
  white-space: nowrap;
  display: block;
  gap: 5px;
  align-items: center;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    margin-bottom: 0;
  }
  font-size: large;
`;

const NavButton = styled.button`
  background-color: transparent;
  color: white;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
  position: relative;
  z-index: 3;
`;


const SearchLink = styled(Link)`
  text-decoration: none;
  color: silver;
  &:hover {
    color: white;
  }
  &:active {
    color: silver;
  }
  svg {
    height: 20px;
  }
  img {
    max-width: 26px;
    max-height: 26px;
    border-radius: 10px;
  }
  img:hover {
    opacity: 0.8;
  }
  white-space: nowrap;
  display: flex;
  gap: 5px;
  align-items: center;
  @media screen and (min-width: 768px) {
    margin-bottom: 0;
  }
  font-size: 20px;
  background: linear-gradient(to bottom right, yellow, white);
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
  font-weight: bold;
  margin: 5px 0 0 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  gap: 5px;
  padding-left: 5px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    font-size: small;
  }
`;


const LogoSearchWrapper = styled.div`
  display: flex;
  gap: 45px;
  justify-content: space-between;
`;

export default function Header() {
  const {cartProducts} = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
 
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>
            <Image 
              src="/apple.png"
              width={30}
              height={30}
              alt="Logo"
              priority={true}
            />
            <LogoWrapper>
              <LogoSearchWrapper>
                <LogoTag>
                  Welcome
                </LogoTag>        
              </LogoSearchWrapper>
            </LogoWrapper>
                 
          </Logo>
          <SearchLink href={'/search'}>
            <img src="/search.png" alt="search" />
          </SearchLink>
          
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={'/'} >Home</NavLink>
            <NavLink href={'/categories'} >Categories</NavLink>
            <NavLink href={'/inquiries'}>Inquiries</NavLink>
            <NavLink href={'/updates'}>Updates</NavLink>
            <NavLink href={'/about'}>About us</NavLink>
            <NavLink href={'/cart'}> 
              <CartHolder>
                <div>Cart</div>                        
                <CartIcon />        
                <CartNumberSpacing>({cartProducts.length})</CartNumberSpacing>
              </CartHolder>
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}

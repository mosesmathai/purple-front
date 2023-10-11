import Header from "@/components/Header"
import Center from "@/components/Center"
import styled from "styled-components"
import Link from "next/link"

const SocialsBtn = styled(Link)`
  display: flex;
  img {
    max-width: 26px;
    max-height: 26px;
    border-radius: 10px;
  }
  img:hover {
    opacity: 0.8;
  }
`;

const SocialsWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 0 20px 0;
`;

export const AboutWrapper = styled.div`
  padding: 0 10px;
  border-radius: 10px;
  background: white;
  margin: 15px;
`;

export const AboutTitle = styled.h1`
  color: black;
  font-family: Verdana;
  margin: 10px 0 5px 0;
  font-size: 20px;
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`;


export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutWrapper>
        <Center> 
          <AboutTitle>Contacts</AboutTitle>
          <div>0748-33-93-75</div>
          <AboutTitle>Location</AboutTitle>
          <div>Greenfields, Juja, Kenya</div>
          <div>Opposite Carnation House</div>
          <AboutTitle>Social Media Accounts</AboutTitle>
          <SocialsWrapper>
            <SocialsBtn href={'https://wa.me/254748339375'} rel="noopener noreferrer" target="_blank">  
              <img src="/whatsapp.png" alt="whatsapp" />
            </SocialsBtn> 
            <SocialsBtn href="https://www.tiktok.com/@softwareprotips" target="_blank">
              <img src="/tiktok.png" />
            </SocialsBtn>
            <SocialsBtn href="https://www.facebook.com/profile.php?id=100086557698260" target="_blank">
              <img src="/facebook.png" />
            </SocialsBtn>
          </SocialsWrapper> 
        </Center>
      </AboutWrapper>
      
    </>
  )
}

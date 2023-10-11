'use client'

import React, { useRef } from 'react';

import Header from "@/components/Header";
import Input from "@/components/Input";
import { useState } from "react";
import Center from "@/components/Center";
import { PaymentBtn } from "./cart";
import styled from "styled-components";
import { StyledPHolder } from "./cart";
import { StyledSelect } from "./cart";
import axios from "axios";
import Link from "next/link";
import { Box } from "./cart";
import { ColumnsWrapper } from "./cart";
import emailjs from '@emailjs/browser';
import { CatTitle } from './categories';

const FormWrapper = styled.div`
  width: 90%;
  border: 3px solid #aaa;
  border-radius: 10px;
  margin-top: 10px;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

const NewStyledLabel = styled.label`
  font-family: Verdana;
  font-size: medium;
  display: block;
  color: black;
`;

const StyledTextarea = styled.textarea`
    resize: none;
    width: 100%;
    height: 100px;
    overflow: hidden;
    outline: none;  
    border-radius: 5px;
    margin: 5px 0;
  `; 

export const StyledHeading = styled.h1`
  margin: 0 0 10px 0;
  color: #4B0082;
  font-family: Verdana;
`;

export const MessageWrapper = styled.div`
  
  font-family: Verdana;
  font-size: medium;
  background: linear-gradient(to bottom right, #4B0082, #54038f, #7c0acf);
  &:hover {
    background: linear-gradient(to bottom, #4B0082, #54038f, #7c0acf);
  }
  color: white;
  padding: 20px 10px;
`;

export const TransparentBtn = styled(Link)`
  background: transparent;
  padding: 5px 10px;
  border-radius: 5px;
  border: 3px outset white;
  color: white;
  cursor: pointer;
  text-decoration: none;
`;



export default function Inquiries() {
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [goToSuccess, setGoToSuccess] = useState(false);
  const [communication, setCommunication] = useState('');
  const [buttonText, setButtonText] = useState('Send Message')
  
  const form = useRef(); 

  async function submitMessage(ev) {
    ev.preventDefault();
    setButtonText('processing...')
    const data = {
      fullName,phone,communication,message
    };  
    await axios.post('/api/message', data);
    emailjs.sendForm('service_wfb1qby', 'template_x98uq6h', form.current, 'G1vccmuK_P_2nr7Hv')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
    setGoToSuccess(true);
  }

  if (goToSuccess) {
    return (
      <>
        <Header />
        <Center>
          <FormWrapper>
            <MessageWrapper>
              <div>
                Your Message was delivered successfully.<br /> <br /> An administrator will contact you shortly. <br /><br /> Have a great day!<br /><br />
              </div>
              <TransparentBtn href={'/'}>Return to home Page</TransparentBtn>
            </MessageWrapper>
          </FormWrapper>
        </Center>
      </>
    )
  }

  return (
    <>
      <Header />
      <CatTitle>Inquiries</CatTitle>   
        <Center>        
          <ColumnsWrapper>
            <Box>     
              <form ref={form} onSubmit={submitMessage}>
                <NewStyledLabel htmlFor="fullName">Name &#42;</NewStyledLabel>
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Name"
                  value={fullName}
                  name='fullName' 
                  id='fullName' 
                />

                <NewStyledLabel>How should we contact you? &#42;</NewStyledLabel>
                <StyledSelect value={communication} onChange={e => setCommunication(e.target.value)}>
                  <option value="" hidden>Select</option>
                  <option>Phone Call</option>
                  <option>Text Message</option>
                  <option>Whatsapp</option>
                </StyledSelect>

                <NewStyledLabel htmlFor="phone">Enter your contact number &#42;</NewStyledLabel>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0xxx xxx xxx"
                  value={phone}
                  name='phone'
                  id='phone' 
                />

                
                <NewStyledLabel htmlFor="message">Message</NewStyledLabel>
                <StyledTextarea
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  value={message}
                  name='message' 
                  id='message' 
                />
                <PaymentBtn
                  type="submit"           
                >
                  {buttonText}
                </PaymentBtn>
              </form>
            </Box>
            <div>
            </div>
          </ColumnsWrapper>
        </Center> 
    </>
  )
}

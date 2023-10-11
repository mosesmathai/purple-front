
import styled from "styled-components"

const StyledHeader = styled.h1`
  font-size: 20px;
  margin: 0 0 5px 0;
  border-style: solid;
  border-width: 0 0 2px 0;
  border-color: #ccc;
`;

const StyledText = styled.p`
  margin: 0;
`;



export default function UpdateBox({title,message}) {
  return (
    <div>    
      <StyledHeader>{title}</StyledHeader>
      {/* <StyledText>{(new Date(message.createdAt)).toLocaleString()}</StyledText> */}
      <StyledText>{message}</StyledText>     
    </div>
  )
}

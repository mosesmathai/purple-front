import styled from "styled-components"

const StyledButtonC = styled.button`
  background-color: #FCE8F3;
  border: 3px solid #FCE8F3;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  svg {
    height: 15px;
    margin-right: 5px;
  }
`;

export default function CremeBtn({children, onClick}) {
  return (
    <StyledButtonC onClick={onClick}>{children}</StyledButtonC>
  )
}

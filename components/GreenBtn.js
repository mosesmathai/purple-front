import styled from "styled-components"

const StyledButtonG = styled.button`
  background-color: #03543F;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  svg {
    height: 15px;
  }
  white-space: nowrap;
  display: flex;
  gap: 5px;
  width: 110px;
  &:hover {
    background-color: #166534;
  }
  &:active {
    background-color: #16a34a;
  }
  
`;

export default function GreenBtn({children, onClick}) {
  return (
    <StyledButtonG onClick={onClick}>{children}</StyledButtonG>
  )
}

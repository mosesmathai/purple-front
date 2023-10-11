import styled from "styled-components"
import css from "styled-jsx/css";

export const ButtonStyle = css`
  background-color: transparent;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-decoration: none;
`;

const StyledButtonT = styled.button`
  ${ButtonStyle}
`;

export default function TransparentBtn({children}) {
  return (
    <StyledButtonT>{children}</StyledButtonT>
  )
}

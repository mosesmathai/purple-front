import styled from "styled-components"

const StyledInput = styled.input`
  padding: 5px;
  width: 100%;
  border: 1px solid #aaa;
  border-radius: 5px;
  box-sizing: border-box;
  margin-bottom: 5px;
`;

export default function Input(props) {
  return <StyledInput {...props} />
}

import styled from "styled-components"

const StyledDiv = styled.div`
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 15px;
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}

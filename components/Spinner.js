import { BeatLoader } from "react-spinners";
import styled from "styled-components";

const Wrapper = styled.div`
  ${props => props.fullWidth ? `
    display: flex;
    justify-content: center;
    margin-top: 100px;
  ` : `
    border: none;
  `}
`;

export default function Spinner({fullWidth}) {
  return (
    <Wrapper fullWidth={fullWidth}>
      <BeatLoader speedMultiplier={3} color={'#FFBF00'} />
    </Wrapper>
  )
}

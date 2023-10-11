import styled from "styled-components";
import UpdateBox from "./UpdateBox";

const StyledUpdatesGrid = styled.div`
  gap: 5px;
  padding: 5px;
  margin-bottom: 15px;
  background: white;
  border-radius: 10px;
  overflow: auto;
`;

export default function UpdatesGrid({updates}) {
  return (
    <StyledUpdatesGrid>
       {updates?.length > 0 && updates.map(update => (
          <UpdateBox key={update._id} {...update} />
        ))}
    </StyledUpdatesGrid>
  )
}

import styled from "styled-components"
import Center from "./Center";
import UpdatesGrid from "./UpdatesGrid";

export const SectionHeader = styled.h2`
  margin: 5px 0 9px 0;
  font-family: Verdana;
  color: white;
  font-weight: 600;
`;

export default function NewUpdates({updates}) {
  return (
    <Center>
      <SectionHeader>Updates</SectionHeader>
      <UpdatesGrid updates={updates} />
    </Center>
  )
}
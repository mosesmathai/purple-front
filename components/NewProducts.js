import styled from "styled-components"
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

export const SectionHeader = styled.h2`
  margin: 5px 0 9px 0;
  font-family: Verdana;
  color: white;
  font-weight: 600;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <SectionHeader>New Arrivals</SectionHeader>
      <ProductsGrid products={products} />
    </Center>
  )
}

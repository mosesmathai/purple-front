import styled from "styled-components";
import ProductBox from "./ProductBox";


export const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  padding: 5px 5px;
  margin-bottom: 15px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
  }
  background: white;
  border-radius: 10px;
  overflow: auto;
`;

export default function ProductsGrid({products}) {
  return (
    <StyledProductsGrid>
       {products?.length > 0 && products.map(product => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductsGrid>
  )
}

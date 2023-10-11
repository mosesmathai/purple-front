import Center from "@/components/Center";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import { Box } from "../cart";
import ProductImages from "@/components/ProductImages";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from 'react-flying-item'
import { FlyingButtonWrapper } from "@/components/ProductBox";

export const ContentHolder = styled.div`
  padding: 10px 0 20px 0;
  
  @media screen and (min-width: 768px) {
    padding: 10px 0 20px 0;
  }
`;

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
    margin-top: 20px;
    gap: 40px;
  }
  gap: 10px;

`;

export const StyledMaroonBtn = styled.button`
  padding: 5px 10px;
  background: #4B0082;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  svg {
    height: 15px;
  }
  white-space: nowrap;
  display: flex;
  gap: 5px;
  &:hover {
    background: #581845;
  }
  &:active {
    background: linear-gradient(to bottom right, purple, #581845);
  }
`;

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4B0082;
`;

export const Price = styled.span`
  font-size: 20px;
  font-family: san-serif;
`;

const StyledTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-weight: 600;
  color: #4B0082;
`;

const StyledP = styled.p`
  color: black;
`;

export default function ProductPage({product}) {
  const {addProduct} = useContext(CartContext);
  return (
    <>
      <Header />
      <ContentHolder>
        <Center>
          <ColWrapper>
            <Box>
              <ProductImages images={product.images} />
            </Box>
            <Box>
              <StyledTitle>{product.title}</StyledTitle>
              <StyledP>{product.description}</StyledP>
              <PriceRow>
                <Price>Ksh{product.price}</Price>
                <FlyingButtonWrapper 
                  onClick={() => addProduct(product._id)}
                >
                  <FlyingButton
                    src={product.images[0]} 
                    targetTop={'5%'} 
                    targetLeft={'95%'}
                    flyingItemStyling={{
                      maxWidth: '80px',
                      maxWidth: '80px',
                      width: 'auto',
                      height: 'auto',
                    }}
                  >
                    <CartIcon />
                    Add to cart
                  </FlyingButton>
                </FlyingButtonWrapper>   
              </PriceRow>
            </Box>           
          </ColWrapper>      
        </Center>
      </ContentHolder>
      
    </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}

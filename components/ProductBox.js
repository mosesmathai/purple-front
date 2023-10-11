import styled from "styled-components"
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from 'react-flying-item'

const ProductWrapper = styled.div`
  border-style: outset;
  border-width: 5px;
  padding: 5px;
  background-color: #ccc;
  width: auto;
  overflow: auto;
`;

const WhiteBox = styled(Link)`
  background-color: transparent;
  height: 120px;
  width: auto;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5%;
  margin-bottom: 5px;
  img {
    max-width: auto;
    max-height: 110px;
    border-radius: 10%;
  }
`;

const Title = styled(Link)`
  font-weight: 900;
  font-size: 14px;
  margin: 0;
  text-decoration: none;
  color: inherit;
  white-space: nowrap;
  font-family: Verdana;
  border-style: solid;
  border-width: 0 0 2px 0;
  border-color: #aaa;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  flex-direction: column;
  font-size: medium;
  margin-top: 5px;
`;

export const FlyingButtonWrapper = styled.div`
  button {
    background: linear-gradient(to bottom right, #4B0082, #54038f, #BF40BF);
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
      background: linear-gradient(to bottom, #4B0082, #54038f, #BF40BF);
    }
    &:active {
      background: linear-gradient(to bottom right, #4B0082, #54038f, #BF40BF);
    }
  }
`;

export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt="product image" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <div>
          <Title href={url}>{title}</Title>
          <PriceRow>
            Ksh{price}  
          </PriceRow> 
        </div>
        <FlyingButtonWrapper onClick={() => addProduct(_id)}>
          <FlyingButton 
            src={images[0]} 
            targetTop={'5%'} 
            targetLeft={'95%'}
            flyingItemStyling={{
              maxWidth: '40px',
              maxWidth: '40px',
              width: 'auto',
              height: 'auto',
            }}
          >
            <CartIcon />
            Add to cart  
          </FlyingButton>
        </FlyingButtonWrapper>
       
       
      </ProductInfoBox> 
            
    </ProductWrapper>
  )
}

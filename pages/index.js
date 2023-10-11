
import FeaturedComp from "@/components/FeaturedComp";
import Header from "@/components/Header";
import NewProduct from "@/components/NewProducts";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import { Featured } from "@/models/Featured";


const ProductWrapper = styled.div`
  background: linear-gradient(to bottom right, #4B0082, #54038f, #7c0acf);
`;

export default function HomePage({featuredProduct,newProducts}) {
  
  return (
    <div> 
      <Header />
      <FeaturedComp product={featuredProduct} />  
      <ProductWrapper>
        <NewProduct products={newProducts} />
      </ProductWrapper>
    </div>
  )
}


export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProductSetting = await Featured.findOne({name:'featuredProductId'});
  const featuredProductId = featuredProductSetting.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id':-1}});
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}

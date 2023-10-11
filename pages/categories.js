
import Header from "@/components/Header";
import { AboutWrapper } from "./about";
import { Category } from "@/models/Category";
import styled from "styled-components";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import Link from "next/link";

const StyledCat = styled.div`
  background-color: white;
  padding: 5px 5px;
  border-radius: 10px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  
  display: flex;
  align-items: center;
  gap: 20px;
  a {
    color: #555;
  }
`;

const CategoryWrapper = styled.div`
  margin-bottom: 20px;
`;

const ShowAllTile = styled(Link)`
  background-color: #eee;
  border-radius: 10px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 15px;
  cursor: pointer;
  font-weight: 800;
`;

const StyledHeading = styled.h2`
  margin: 5px 0;
`;

export const CatTitle = styled.h1`
  font-family: Verdana;
  color: white;
  margin: 5px 0 0 19px;
  font-size: 26px;
`;

export default function CategoriesPage({mainCategories,categoriesProducts}) {
  return (
    <>
      <Header />
      <CatTitle>All Categories</CatTitle>
      <AboutWrapper>  
        <StyledCat>
          {mainCategories.map(cat => (
            <CategoryWrapper key={cat._id}>
              <CategoryTitle>
                <StyledHeading>{cat.name}</StyledHeading>
                <Link href={'/category/'+cat._id}>Show all</Link>
              </CategoryTitle>
              
              <CategoryGrid>
                {categoriesProducts[cat._id].map(p => (
                  <ProductBox key={p._id} {...p} />
                ))}
                <ShowAllTile href={'/category/'+cat._id}>Show all &#8594;</ShowAllTile>
              </CategoryGrid>
            </CategoryWrapper>
          ))}
        </StyledCat> 
      </AboutWrapper>     
    </>
  )
}

export async function getServerSideProps() {
  const categories = await Category.find();
  const mainCategories = categories.filter(c => !c.parent)
  const categoriesProducts = {};
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories.filter(c => c?.parent?.toString() === mainCatId).map(
      c => c._id.toString());
    
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({category: categoriesIds}, null, {limit:3,sort:{'_id':-1}})
    categoriesProducts[mainCat._id] = products;
  }
  return {
    props: {
      mainCategories: JSON.parse(
        JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
    },
  };
}

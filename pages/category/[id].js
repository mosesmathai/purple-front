
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CatTitle } from "../categories";

const CatHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 15px 0 0 0;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CatSubHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: white;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    gap: 10px;
    color: white;
    padding-left: 12px;
  }
`;

const Filter = styled.div`
  background-color: #7c0acf;
  padding: 5px 8px;
  border-radius: 10px;
  display: flex;
  gap: 10px;
  select {
    border-radius: 5px;
    outline: none;
  }

`;

const ErrText = styled.div`
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const CatWrapperSingle = styled.div`
  border-radius: 10px;
  background: white;
  margin: 10px 10px;
  @media screen and (min-width: 768px) {
    margin: 10px 15px;
  }
`;

export default function CategoryPage({category,subCategories,products:originalProducts}) {
  const defaultSorting = '_id-desc';
  const defaultFilterValues = category.properties.map(p => ({name:p.name,value:'all'}))

  const [products, setProducts] = useState(originalProducts);
  const [filtersValues, setFilterValues] = useState(defaultFilterValues);
  const [sort, setSort] = useState(defaultSorting);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFilterValues(prev => {
      return prev.map(p => ({
        name:p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }

  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
    const params = new URLSearchParams;
    params.set('categories', catIds.join(','))
    params.set('sort', sort);
    filtersValues.forEach(f => {
      if (f.value !== 'all') {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/products?` + params.toString();
    axios.get(url).then(res => {
      setProducts(res.data); 
      setLoadingProducts(false);    
    })
  }, [filtersValues, sort, filtersChanged]);
  
  return (
    <>
      <Header />
      <CatTitle>{category.name}</CatTitle>
      <CatWrapperSingle> 
        <CatHeader>
          <CatSubHeader>
            {category.properties.map(prop => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select 
                  onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                  value={filtersValues.find(f => f.name === prop.name).value}
                >
                  <option value="all">All</option>
                  {prop.values.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Filter:</span>
              <select value={sort} onChange={
                ev => {setSort(ev.target.value); setFiltersChanged(true);}}
              >
                <option value='price-asc'>price, lowest first</option>
                <option value='price-desc'>price, highest first</option>
                <option value='_id-desc'>latest post first</option>
                <option value='_id-asc'>earliest post first</option>
              </select>
            </Filter>
          </CatSubHeader>
        </CatHeader>
        {loadingProducts && (
          <Spinner fullWidth />
        )}
        {!loadingProducts && (
          <div>
            {products.length > 0 && (
              <ProductsGrid products={products} />
            )}
            {products.length === 0 && (
              <ErrText>Sorry, no products found</ErrText>
            )}
          </div>
        )}       
      </CatWrapperSingle>
    </>
  )
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({parent:category._id});
  const catIds = [category._id, ...subCategories.map(c => c._id)];
  const products = await Product.find({category:catIds});

  return {
    props:{
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(products)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
    }
  }
}
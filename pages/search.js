import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import axios from "axios";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SectionHeader } from "@/components/NewProducts";
import Spinner from "@/components/Spinner";

const SearchInput = styled.input`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  margin: 20px 0 30px;
  width: 90%;
  outline: none;
  @media screen and (min-width: 768px) {
    width: 50%;
  }
`;

export default function SearchPage() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce(searchProducts, 500), []);
  
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase])

  function searchProducts(phrase) {
    axios.get('/api/products?phrase='+encodeURIComponent(phrase))
    .then(response => {
      setProducts(response.data); 
      setIsLoading(false);
    });
  }
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          value={phrase}
          onChange={ev => setPhrase(ev.target.value)} 
          autoFocus
          placeholder='Search...' 
        />
        {!isLoading && phrase !== '' && products.length === 0 && (
          <SectionHeader>No products found for query &apos;{phrase}&apos;</SectionHeader>
        )}
        {isLoading && (
          <Spinner fullWidth={true} />
        )}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}        
      </Center>
      
    </>
  )
}

import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e0e0e0;
  border-radius: 0.375rem;
  border: solid 2px black;
  box-shadow: black 5px 5px;
  width: 75%;
`;

const SearchIcon = styled.div`
  color: black;
  width: 40px;
  text-align: center;
  font-size: 24px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  flex: 1 1 auto;
  background: transparent;
  border: 0;
`;

const Search = () => {
  return (
    <SearchWrapper>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      <SearchInput placeholder="Restaurants, cuisines, dishes" />
    </SearchWrapper>
  );
};

export default Search;

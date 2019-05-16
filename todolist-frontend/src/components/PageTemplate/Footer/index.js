import React from 'react';
import FilterContainer from 'containers/FilterContainer';
import * as visibilityFilter from 'store/modules/visibilityFilter';

const Footer = () => (
  <div>
    <span>Show: </span>
    <FilterContainer filter={visibilityFilter.SHOW_ALL}>All</FilterContainer>
    <FilterContainer filter={visibilityFilter.SHOW_ACTIVE}>
      Active
    </FilterContainer>
    <FilterContainer filter={visibilityFilter.SHOW_COMPLETED}>
      Completed
    </FilterContainer>
    <FilterContainer filter={visibilityFilter.SHOW_EXPIRED}>
      Expired
    </FilterContainer>
  </div>
);

export default Footer;

import React from 'react';
import FilterContainer from 'containers/FilterContainer';
import * as visibilityFilter from 'store/modules/visibilityFilter';
import './styles.scss';

const Nav = () => (
  <div className="nav">
    <div className="link">
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
  </div>
);

export default Nav;

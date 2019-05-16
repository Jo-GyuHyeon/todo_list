import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as visibilityFilter from 'store/modules/visibilityFilter';
import Link from '../components/Todo/Link';

const FilterContainer = ({
  prevStateFilter,
  VisibilityFilter,
  filter,
  children
}) => {
  const setFilter = () => {
    VisibilityFilter.setVisibilityFilter(filter);
  };
  const active = filter === prevStateFilter;

  return <Link active={active} onClick={setFilter} value={children} />;
};

export default connect(
  state => ({
    prevStateFilter: state.visibilityFilter.filter
  }),
  dispatch => ({
    VisibilityFilter: bindActionCreators(visibilityFilter, dispatch)
  })
)(FilterContainer);

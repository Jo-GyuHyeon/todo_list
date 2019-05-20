import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as visibilityFilter from 'store/modules/visibilityFilter';
import Link from '../components/Todo/Link';
import ErrorBoundary from '../components/ErrorBoundary';

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

  return (
    <ErrorBoundary>
      <Link active={active} onClick={setFilter} value={children} />
    </ErrorBoundary>
  );
};

export default connect(
  state => ({
    prevStateFilter: state.visibilityFilter.filter
  }),
  dispatch => ({
    VisibilityFilter: bindActionCreators(visibilityFilter, dispatch)
  })
)(FilterContainer);

import PropTypes from 'prop-types';
import React from 'react';
import ValueRow from './ValueRow';
import fetchData from '../util/fetchData';
import SortingRow from '../containers/SortingRow';
import Pagination from '../containers/Pagination';
import {
  contentTable as contentTableStyling
} from '../styles/contentTable.scss';
import shortId from 'shortid';

class ContentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: []
    };
  }
  componentDidMount() {
    this.fetchRenderData();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.visibleContent !== this.props.visibleContent ) {
      // TODO: Check if data is already there, and don't fetch if it's not necessary
      this.fetchRenderData();
    }
  }
  fetchRenderData() {
    fetchData(`https://jsonplaceholder.typicode.com/${this.props.visibleContent}`)
      .then(data => {
      this.setState({
        fetchedData: data,
        wasSuccessful: true,
      });
    })
    .catch(err => {
      this.setState({
        wasSuccessful: false,
        fetchError: err.toString(),
        fetchedData: []
      });
    });
  }
  filterData(data) {
    const filter = this.props.filter;
    if (!filter.length) {
      return data;
    }

    return data.filter((el) => {
      // Iterate over each element in the data to check. If any fits, then it passes.
      for (let i = 0, keys = Object.keys(el); i < keys.length; i++) {
        if (String(el[keys[i]]).indexOf(filter) >= 0) {
          return true;
        }
      }
      return false;
    });
  }
  sortData(data) {
    const sortBy = this.props.sortBy;

    let sorted = data.sort((a, b) => {
      if(a[sortBy.key] < b[sortBy.key]) return -1;
      if(a[sortBy.key] > b[sortBy.key]) return 1;
      return 0;
    });

    if (sortBy.order === 'DESC') {
      sorted = sorted.reverse();
    }

    return sorted;
  }
  limitDisplayedRows() {
    let fetchedData = this.state.fetchedData;
    const page = this.props.pagination;
    const elPerPage = this.props.elPerPage;
    let rows = [];

    // TODO: Dont mutate
    fetchedData = this.filterData(fetchedData);

    if (!fetchedData.length) {
      return false;
    }

    fetchedData = this.sortData(fetchedData);

    fetchedData.forEach(data => {
      rows.push(
        <ValueRow data={data} filter={this.props.filter} key={shortId.generate()}/>
      );
    });

    function between(x, min, max) {
      return x >= min && x < max;
    }

    rows = rows.filter((el, index) => {
      return between(index, elPerPage * page, elPerPage * page + elPerPage);
    });

    rows.unshift(<SortingRow key={shortId.generate()} keys={Object.keys(fetchedData[0])}/>);
    return rows;
  }
  render() {
    const fetchedData = this.state.fetchedData;
    if (!this.state.wasSuccessful) {
      return (<div>{this.state.fetchError}</div>);
    }
    if (!fetchedData.length) {
      return (<div>Waiting for data...</div>);
    }
    const content = this.limitDisplayedRows();
    return (
      <div>
        <table className={contentTableStyling}>
          <tbody>
            {content}
          </tbody>
        </table>
        <Pagination fetchedDataLength={this.filterData(this.state.fetchedData).length}/>
      </div>
    );
  }
}

ContentTable.propTypes = {
  visibleContent: PropTypes.string,
  elPerPage: PropTypes.number,
  pagination: PropTypes.number,
  filter: PropTypes.string,
  sortBy: PropTypes.object
};

export default ContentTable;


import PropTypes from 'prop-types';
import React from 'react';
import ValueRow from './ValueRow';
import SortingRow from './SortingRow';
import fetchData from '../util/fetchData';
import Pagination from '../containers/Pagination';


class ProductTable extends React.Component {
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
      // Dont fetch data if its already there
//      if (!this.state.fetchedData[this.props.visibleContent]) {
        this.fetchRenderData();
//      }
    }
  }
  fetchRenderData() {
    fetchData(`http://jsonplaceholder.typicode.com/${this.props.visibleContent}`)
      .then(data => {
//      const fetchedData = this.state.fetchedData;
//      fetchedData[this.props.visibleContent] = data;
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
  limitDisplayedRows() {
    let fetchedData = this.state.fetchedData;
    const page = this.props.pagination;
    const elPerPage = this.props.elPerPage;

    // Dont mutate
    fetchedData = this.filterData(fetchedData);
    // Display nested table.
    let rows = [];

    const sortBy = this.props.sortBy;
    fetchedData = fetchedData.sort((a, b) => {
      if(a[sortBy] < b[sortBy]) return -1;
      if(a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

    fetchedData.forEach(data => {
      rows.push(
        <ValueRow data={data} />
      );
    });
    function between(x, min, max) {
      return x >= min && x < max;
    }
    rows = rows.filter((el, index) => {
      return between(index, elPerPage * page, elPerPage * page + elPerPage);
    });
    rows.unshift(<SortingRow keys={Object.keys(fetchedData[0])}/>);
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
        <table>
          <tbody>
            {content}
          </tbody>
        </table>
        <Pagination fetchedDataLength={this.filterData(this.state.fetchedData).length}/>
      </div>
    );
  }
}

ProductTable.propTypes = {
  visibleContent: PropTypes.string,
  elPerPage: PropTypes.number,
  pagination: PropTypes.number,
  filter: PropTypes.string,
  sortBy: PropTypes.string
};

export default ProductTable;


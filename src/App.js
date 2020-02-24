import React from 'react';
import './App.css';

/**
 * Author: DIAO 
 * Date : 2/11/2020
 * Version : 6 (based on v5)
 * Description : 
 *  
 *  What's new in this version ? 
 *  
 *  1. Fetch API 
 *  2. Server-Side search
 *  3. Paginated search 
 */


const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '5';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

// output: https://hn.algolia.com/api/v1/search?=redux
//const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;




class App extends React.Component {
  /**
   * 
   * Calling super(props) is required. This enables this.props to be accessibile in constructor
   */
  constructor(props) {
    
    super(props);
    /** Setup state  */
    this.state = {
        result: null, 
        searchTerm: DEFAULT_QUERY,
    };

  }//END Constructor 

  /** Returns an updated list without item with objectID === id */
  /** This function gets invoked when button is hit which after generating updated list then call setState() to render this component */
  onDismiss = (id) => {
    const updatedHits = this.state.result.hits.filter((item) => item.objectID !== id);  
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    }); 
  }

  onSearchChange = (e) => {
    this.setState({searchTerm: e.target.value});
  } 

  setSearchTopStories = result => {
    const { hits , page } = result;

    const oldHits = page !== 0
      ? this.state.result.hits 
      : [];

    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      result : { hits : updatedHits , page }
    });
  }

  /** This runs after first render() is complete */
  componentDidMount() {
    this.fetchSearchTopStories(this.state.searchTerm)
  }

  fetchSearchTopStories = (searchTerm , page = 0) => {
      const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`;
      fetch(url)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);  
  }

  onSearchSubmit = (e) => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault(); //Prevent submit refresh
  }

  render(){

      const { searchTerm, result } = this.state;
      const page = (result && result.page) || 0;
      return(
        <div className="page"> 
          <div className="interactions">
            <Search 
              value={searchTerm} 
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              Search   
            </Search>
            { result &&
            <Table 
              list={result.hits} 
              onDismiss={this.onDismiss}/>
            }
            <div className="interactions">
              <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}> More </Button>
            </div>
          </div>
        </div>   
      )
  }//END RENDER() 
}//END CLASS APP




const Search = ({value, onChange, onSubmit, children}) => 
    <form onSubmit={onSubmit}>
      <input
          type="text"
          value={value}
          onChange={onChange} />
      <button type="submit">
        {children}
      </button>
    </form>



const Table = ({list,onDismiss}) => 
    <div className="table">
      {
        list.map((item) =>      
          <div key={item.objectID} className="table-row">
            <span style={{width: '40%'}}> 
              <a href={item.url}>{item.title}</a>
            </span>
            <span style={{width: '30%'}}>
              {item.author}
            </span>
            <span style={{width: '10%'}}>
              {item.num_comments} 
            </span>
            <span style={{width: '10%'}}>
              {item.points} 
            </span>
            <span style={{width: '10%'}}>
              <Button onClick={()=> onDismiss(item.objectID) }
                      className="button-inline"
              >
                Dismiss 
              </Button>
            </span>
          </div>
        )     
      }
    </div>


const Button = (props) => {
    const {
      onClick, 
      className = '',
      children,
    } = props;

    return(
      <button
        onClick = {onClick}
        className = {className}
        type="button"
      >
        {children}
      </button>
    )
}


export default App;

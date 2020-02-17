import React from 'react';
import './App.css';

/**
 * Author: DIAO 
 * Date : 2/11/2020
 * Version : 3 (based on v2)
 * Description : 
 *  
 *  What's new in this version ? 
 *  
 *  1. Split into components 
 */


/**
 * Array of Objects 
 */
const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

//Returns true if the item === searchTerm 
// the include function does the pattern matching , if pattern matched then item gets to stay
const isSearched = searchTerm => item => 
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends React.Component {
  /**
   * 
   * Calling super(props) is required. This enables this.props to be accessibile in constructor
   */
  constructor(props) {
    
    super(props);
    /** Setup state  */
    this.state = {
        list, /** ES 6 Feature ,   list : list  can be just list if property and variable share same name */
        searchTerm : '',
    };

  }//END Constructor 

  /** Returns an updated list without item with objectID === id */
  /** This function gets invoked when button is hit which after generating updated list then call setState() to render this component */
  onDismiss = (id) => {
    const updatedList = this.state.list.filter((item) => item.objectID !== id);  
    this.setState({list: updatedList}); 
  }

  onSearchChange = (e) => {
    this.setState({searchTerm: e.target.value});
  } 

  render(){
      //Destructing 
      const {searchTerm , list} = this.state;
      return(
        <div className="App"> 
          <Search 
            value={searchTerm} 
            onChange={this.onSearchChange}
          >
            Search   
          </Search>
          <Table 
            list={list} 
            pattern={searchTerm} 
            onDismiss={this.onDismiss}/>
        </div>   
      )
  }//END RENDER() 
}//END CLASS APP


class Search extends React.Component {
  render() {
    const {value, onChange , children} = this.props;
    return (
      <form>
      {children} 
      <input
          type="text"
          value={value}
          onChange={onChange} />
      </form>
    );
  }
}

class Table extends React.Component {
  render() {
    const {list, pattern, onDismiss} = this.props;
    return (
      <div>
        {
          list.filter(isSearched(pattern)).map((item) =>      
            <div key={item.objectID}>
              <span> <a href={item.url}>{item.title} </a></span>
              <span>{item.author} </span>
              <span>{item.num_comments} </span>
              <span>{item.points} </span>
              <span>
                <button
                  onClick={()=> onDismiss(item.objectID) }
                  type="button"
                >
                  Dismiss 
                </button>
              </span>
            </div>
          )     
        }
      </div>
    );
  }
}



export default App;

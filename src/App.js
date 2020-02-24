import React from 'react';
import './App.css';

/**
 * Author: DIAO 
 * Date : 2/11/2020
 * Version : 5 (based on v4)
 * Description : 
 *  
 *  What's new in this version ? 
 *  
 *  1. Split into functional components 
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
        <div className="page"> 
          <div className="interactions">
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
        </div>   
      )
  }//END RENDER() 
}//END CLASS APP




const Search = ({value, onChange, children}) => 
    <form>
      {children} 
      <input
          type="text"
          value={value}
          onChange={onChange} />
    </form>



const Table = ({list,pattern,onDismiss}) => 
    <div className="table">
      {
        list.filter(isSearched(pattern)).map((item) =>      
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

import React from 'react';
import './App.css';

/**
 * Author: DIAO 
 * Date : 2/11/2020
 * Version : 2 (based on v1)
 * Description : 
 *  Previous version the App component will render a list outside of class. 
 *  What's new in this version ? 
 * 
 *  1. In render()  mapping list within App's list instead of list outside of class 
 *  2. Add onDismiss to dismiss items on click (also binded the function in constructor)
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
    };

    /** Bind class member function: onDismiss() to make it a class method so "this" is accessible to onDimiss()  */
    this.onDismiss = this.onDismiss.bind(this);   

  }//END Constructor 

  /** Returns an updated list without item with objectID === id */
  /** This function gets invoked when button is hit which after generating updated list then call setState() to render this component */
  onDismiss(id) {
    console.log("onDimiss Clicked");
    const updatedList = this.state.list.filter((item) => item.objectID !== id);  
    this.setState({list: updatedList});
  }

  /**
   * Map each element in list and display its content 
   */
  render(){
      return(
        <div className="App">
           {
             //Mapping App's list , NOT the list outside of class ! 
             this.state.list.map((item) =>      
                 <div key={item.objectID}>
                   <span> <a href={item.url}>{item.title} </a></span>
                   <span>{item.author} </span>
                   <span>{item.num_comments} </span>
                   <span>{item.points} </span>
                   <span>
                     <button
                        onClick={ ()=> this.onDismiss(item.objectID) }
                        type="button"
                     >
                       Dismiss 
                     </button>
                   </span>
                  </div>
             )
           }
        </div>
      )
  }//END RENDER() 
}//END CLASS APP

export default App;

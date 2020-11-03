import React, {useState, useEffect, Component } from "react";
import SearchBox from "../components/SearchBox"
import CardList from "../components/CardList";
import Scroll from "../components/Scroll";
import './App.css';
import { connect } from "react-redux";
import { setSearchField } from "../actions";

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
    return {
        searchField : state.searchField
    }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from reducers.
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange : (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            robots : []
        }
    }



    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
            .then(users => this.setState({robots: users}));
    }

    render(){
       const {robots} = this.state;
       const {searchField, onSearchChange} =  this.props;
       const filteredRobots = robots.filter(robot => {
           return robot.name.toLowerCase().includes(searchField.toLowerCase());
       })

       return !robots.length ?
           <h1>Loading</h1> : 
           (
               <div className="tc">
                   <h1 className="f1">Robo Friends</h1>
                   <SearchBox searchChange={onSearchChange}/>
                   <Scroll>
                       <CardList robots = {filteredRobots}/>
                   </Scroll>
               </div>
           );
   }

}


// Below I have demonstrated how to use state in functional components using react hooks.

/* function App() {
    const [robots, setRobots] = useState([]);
    const [searchField, setSearchField] = useState('');


    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
            .then(users => setRobots(users));
     },[]); // it behaves as componentDidMount now ,  if it was [searchField] then it means that only run useEffect() when searchField changes


    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    console.log(robots);
    return !robots.length ?
        <h1>Loading</h1> : 
        (
            <div className="tc">
                <h1 className="f1">Robo Friends</h1>
                <SearchBox searchChange={(event) => setSearchField(event.target.value)}/>
                <Scroll>
                    <CardList robots = {filteredRobots}/>
                </Scroll>
            </div>
        );

} */

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App);
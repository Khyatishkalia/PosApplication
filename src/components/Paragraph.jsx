import React, { Component } from 'react'

export default class Paragraph extends Component {
    /* person = { id: 12, name: "hello", location: "Moh" }; */
    state = {
        name: "Mohit",
    };
    nameChange = (e) => {
         // state chnage ho rhii h
        this.setState({name: e.target.value})
    }
    render() {
        return (
            <div>
              {/*   <h1> id ={this.person.id}</h1> */}
                <h1> name ={this.state.name}</h1>
                {/* <h1> location ={this.person.location}</h1> */}
                {<input onChange={this.nameChange} type="text"/>}
            </div>
        )
    }
}

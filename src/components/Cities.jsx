import React, { Component } from 'react'

export default class Cities extends Component {
   
    state = {
        cities: ["chand", "moh", "abc"],
    };
    updateCities = (e) => {
        if (e.code === "Enter") {
            this.setState({ cities: [...this.state.cities, e.target.value] });
        }
      
    }
    // ek element delete krna  ho toh array se 
    delB = (city) => {
        let newCity = [...this.state.cities];
        newCity =newCity.filter(i => i !== city)
        this.setState({ cities: newCity })
        // puraa array agr ek sath khalia krna hoo toh
        /* this.setState({cities:[]}); */
    }
    render() {
        return (
            <div>
                {this.state.cities.map((city) => (
                    <h1 key={city}>{city} <button onClick={()=>this.delB(city)}>Delete</button></h1>
                ))}
                <input onKeyPress={this.updateCities} type="text"/>
            </div>
        )
    }
}

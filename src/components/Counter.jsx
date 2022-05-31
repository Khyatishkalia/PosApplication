import React, { Component } from 'react'

export default class Counter extends Component {
    constructor() {
        super()
        console.log("counter Construvutoe")//1
    }
    state = {
        count:0,
    }
    inc = () =>{
        this.setState({ count:this.state.count+1 })
    }
     dec = () =>{
         this.setState({ count:this.state.count-1 })
    }
    componentDidMount() {
        console.log("mount")
    }
    componentDidUpdate() {
        console.log("update")//4
    }
    componentWillMount() {
        console.log("about to")//2
    }
    render() {
        console.log("rendered")//3
        return (
            <div>
                <h2 className={this.state.count>=0 ? "green" :"red"}> {this.state.count}</h2>
                <button onClick={this.inc}>Increment</button>
                <button onClick={this.dec}>Decrement</button>
            </div>
        )
    }
}

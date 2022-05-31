import React, { Component } from 'react'
import Counter1 from './Counter1';


export default class Counter123 extends Component {
    state = {
        counters: [
            { id: 1, count: 0 },
            { id: 1, count: 0 },
            { id: 1, count: 0 },
            { id: 1, count: 0 },
            { id: 1, count: 0 },
            
        ]
    }
    render() {
    
        return (
            <div>
                {this.state.counters.map((counter) => {
                     <Counter1 />
                })
               
                }
               
            </div>
        )
    }
}

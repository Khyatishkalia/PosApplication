import React, { useState } from "react";
import queryString from "query-string";

function FunCounter(props) {
    console.log(props.location.search)
    let data = queryString.parse(props.location.search);
    console.log(data);
    const [state, setstate] = useState(10)
    console.log(state);
    console.log(setstate)
    const inc = () =>{
        setstate(state + 1);
    }
    const dec = () =>{
        setstate(state - 1);
    }
    let name = "kh"
    return <div>
        <h1>I am A functional component {state}</h1>
        <button onClick={inc} >Inc</button>
            <button onClick={dec} >Dec</button>
    
    </div>
}
export default FunCounter;
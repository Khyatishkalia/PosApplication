 import React from "react";

class Heading extends React.Component{
  /*  cities = ["chand", "Moh"]; */
    render() {
         console.log(this.props);
        return(
            <>
                <h1> {this.props.name}</h1>
                
                <h1> {this.props.location}</h1>
                
                <h1> {this.props.age}</h1>
                {/* <ul>
                    {this.cities.map((i) => (
                        // yhaan pr () yee wlae lagengee //
                        <li>{i}</li>
                    ))}
                </ul> */}
            </>
        );
    }
}
export default Heading;  
 
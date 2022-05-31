import React, { Component } from 'react'
import movies from "../arrayofObject";

export default class Movies extends Component {
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <th>Id</th>
                        <th>names</th>
                        <th>price</th>
                        <th>in stock</th>
                    </thead>
                    <tbody>
                        {movies.map((movie) => {
                            <tr>
                                <td>{movie.id}</td>
                                <td>{movie.name}</td>
                                <td>{movie.price}</td>
                                <td>{movie.instock}</td>
                   </tr>
                        })}
                    </tbody>
              </table>  
            </div>
        )
    }
}

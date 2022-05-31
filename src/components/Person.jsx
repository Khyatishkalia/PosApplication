import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

export default function Person() {
    const [person, setPerson] = useState();
  let id = useParams().id;
    useEffect(() => {
        getUser(id)
        async function getUser(id) {
            let result = await fetch(`https://60f2b4af6d44f3001778874d.mockapi.io/${id}`)
            let data = await result.json();
            console.log(data)
        }
    },[])
    return (
        <div>
            
        </div>
    )
}

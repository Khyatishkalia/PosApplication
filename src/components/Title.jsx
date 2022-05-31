import React,{useState,useEffect} from "react";

function Title() {
    const [title, settitle] = useState("del")
    const [person, setPerson] = useState( "Mohit");
    const ChangePerson = (e) => {
        if (e.code === "Enter") {
            setPerson(e.target.value)
        }
    }
    const changeTitle = (e) => {
        if (e.code === "Enter") {
            settitle(e.target.value)
        }
    }
    useEffect(() => {
        //STATEMENT TO EXECUTED WHEN COMPONENT IS CONSTRUCTED OR UPDATED
        console.log("hello")
        /* return () => {
            //statement to bew executed when component is unmounted
        } */
    }, [title,person])
  
    return <div>
        {console.log("rebt")}
        <h1>{title}</h1>
        <h1>{person}</h1>
        <input onKeyUp={changeTitle} type="text" />
         <input onKeyUp={ChangePerson} type="text" />
    </div>
}
export default Title;
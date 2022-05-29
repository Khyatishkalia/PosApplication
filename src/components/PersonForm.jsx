import React, { useState } from "react";
import joi, { Joi } from "joi-browser";

/* export default function PersonForm() { */
    /* const [formData, setFormData] = useState({
        name: "",
        email: "",
        age:""
    }) */
    // lecture #10
    /* const formSchema = {
        name: Joi.string().required().max(30).min(30),
        email: Joi.string().required().max(30).min(30),
        age: Joi.number().max(120).min(10),   
    } */
    const handelInput = (e) =>{
        console.log(e.target.value, e.target.name)
        
        /* setFormData({...formData,[e.target.name]:[e.target.value]}) */
    }
    const handelSubmit = (e) =>{
        e.preventDefault();
       /*  let validation = Joi.validation(formData,formSchema); */
       /*  console.log(validation); */
    }
    /* return (
        <>
      <form onChange={handelInput}>
  <div className="form-group">
    <label >Email address</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter email" />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label >Name</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        placeholder="Name" />
  </div>
  
                <div className="form-group">
    <label >Age</label>
                    <input
                        name="text"
                        type="text"
                        className="form-control"
                        id="exampleInputAge1"
                        placeholder="Age" />
                </div>
                 
  <button type="submit" className="btn btn-primary" onClick={handelSubmit}>Submit</button>
</form>
                        </>
    )
} */
/* const newRecord = {...UserResistration, id : new Date().getTime().toString()}
   // console.log(records);
    setrecords([...records,name:e.target.value]); */
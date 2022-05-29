import React from 'react'

export default function PersonUpdate() {
    return (
        <div>
                  <form >
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
                 
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
        </div>
    )
}
/* value={formData.age}
 */
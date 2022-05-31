import { link } from "fs";
import React,{useState,useEffect} from "react";
import { paginate, sorting } from "./utils/utils";
import Swal from "sweetalert2";
import queryString from "query-string";
function Persons(props) {
	
    let querydata = queryString.parse(props.location.search);
    console.log(querydata);
    const [persons, setPersons] = useState([])
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(3);
    const [sortColumn, setSortColumn] = useState(querydata.sortBy ? querydata.sortBy:"name");
	const [sortOrder, setSortOrder] = useState(querydata.sortOrder ? querydata.sortOrder:"asc");
	const [refresh,setRefresh]=useState()

    /* let paginatedLinks */

    /* pageinate(array, page - Sizzle, currentpage)
    // result slice krkedegaa */

    let totalLinks = Math.ceil(persons.length / pageSize)
    let linksArray = [];

    // converting  total links to an array
    for (let i = 0; i <= totalLinks; i++) linksArray.push(i);
    console.log(linksArray)

    //paginate this results
    let data = paginate(persons, pageSize, currentPage);
    console.log("before sorting")
    // sort the result
    data = data.length && sorting(data, "age", "desc");
    console.log("after sorting")



    const handelPageChange = (linkno) => {
        if (linkno === "next") setCurrentPage(currentPage + 1)
        else if (linkno === "previous") setCurrentPage(currentPage - 1)
        else setCurrentPage(linkno)
        setCurrentPage(linkno)
}

    useEffect(() => {
        // component ke render homne se phle   
        //get to fetch info from server
        // post  to store the info on server
        // put or patch --- to update info on server
        // delete-- delete on server
        /* fetch("https://60f2b4af6d44f3001778874d.mockapi.io/persons")
            .then((result) => result.json())
            .then((data) => setpersons(data)); */
        async function getPersons() {
            let result = await fetch("https://60f2b4af6d44f3001778874d.mockapi.io/persons");
            let data = await result.json();
            setPersons(data);
        }
        getPersons();
    }, [refresh]);
    const handelsorting = (key) => {
        console.log(key);
        setSortColumn(key);
        setSortOrder(`${sortOrder === "asc" ? "desc" :"asc" }`)
    }
	const handelSearch = (e) => {
		let searchkeyword = e.target.value
		let filtered = persons.filter((user) => {
			user = user.name.toLowerCase()
			return (
				user.startsWith(searchkeyword.toLowerCase()) ||
				user.search(searchkeyword) !== -1);
		});
		console.log(filtered)
		setPersons(filtered);
		/* setPersons(persons.filter(user => user.name.indexOf(e.target.value) !== -1)) */
		/*  data.filter([...data,data.name === e.target.value]) */
	};
	const handelDelete = (id) =>{
		async function deleteperson(id) {
			let result = await fetch(`https://60f2b4af6d44f3001778874d.mockapi.io/persons/${id}`,
				{
					method: "DELETE",
				},
			);
			console.log(result);
		}
		
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
					deleteperson(id);
					Swal.fire(
						'Deleted!',
						'Your file has been deleted.',
						'success'
					)
					setRefresh(!refresh)
				}
			})
	
	}
    return (
        <div>
            {/* <div className="m-table"> */}
            <div class="search_bar">
            <input type="text" placeholder="Search.." onKeyUp={handelSearch}></input></div>
        <table className="table ">
            <thead>
                <th onclick={()=>handelsorting(`id`)}>Id</th>
                    <th onclick={() => handelsorting(`name`)}>name</th>
                <th>avatar</th>
                    <th onclick={() => handelsorting(`age`)}>age</th>
            </thead>
            <tbody>
                {data.length && data.map((person) => ( 
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.name}</td>
                        <td><img src={person.avatar} alt=""></img></td>
						<td>{person.age}</td>
						<button type="reset" onclick={()=>handelDelete(`id`)}>Delte</button>
                    </tr>
                )) }
            </tbody>
                </table>
              {/*   </div> */}
            <div className="paginated-links">
                <ul class="pagination">
                    <li> <li onClick={() => handelPageChange(link)} class={`page-item ${link === currentPage}`}><a class="page-link" href="#">Previous</a></li></li>
                    {
                        linksArray.map((link) => (
                            
                            <li onClick={() => handelPageChange(link)} class={`page-item ${link === currentPage}`}><a class="page-link" href="#">{ link +1}</a></li>
                        ))
                    }
                    <li> <li onClick={() => handelPageChange(link)} class={`page-item ${link === currentPage}`}><a class="page-link" href="#">Next</a></li></li>
  </ul>
            </div>
    </div>)
}

export default Persons;
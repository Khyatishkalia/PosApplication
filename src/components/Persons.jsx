

// sir ka code

 import React, { useEffect, useState } from "react";
import { paginate, sorting } from "./utils/utils";

function Persons() {
	const [persons, setPersons] = useState([]);
	const [pageSize, setPageSize] = useState(50);
	const [currentPage, setCurrentPage] = useState(0);
	const [sortColumn, setSortColumn] = useState("id");
	const [sortOrder, setSortOrder] = useState("asc");

	let totalLinks = Math.ceil(persons.length / pageSize);
	let linksArray = [];
	//converting total links to an array
	for (let i = 0; i < totalLinks; i++) linksArray.push(i);

	//paginate the results
	let data = paginate(persons, pageSize, currentPage);
	console.log("Before sorging", data);
	//sort the results
	data = data.length && sorting(data, sortColumn, sortOrder);
	console.log("after sorting", data);

	const handlePageChange = (linkNo) => {
		if (linkNo === "next") setCurrentPage(currentPage + 1);
		else if (linkNo === "previous") setCurrentPage(currentPage - 1);
		else setCurrentPage(linkNo);
	};

	useEffect(() => {
		async function getPersons() {
			let result = await fetch(
				"https://60efff36f587af00179d3c01.mockapi.io/persons",
			);
			let data = await result.json();
			setPersons(data);
		}
		getPersons();
	}, []);

	const handleSorting = (key) => {
		setSortColumn(key);
		setSortOrder(`${sortOrder === "asc" ? "desc" : "asc"}`);
	};
	const handleSearch = (e) => {
		let searchKeyword = e.target.value;
		let filtered = persons.filter((user) =>
			user.name.toLowerCase().startWith(searchKeyword.toLowerCase()),
		);
		console.log(filtered);
	};

	return (
		<div>
			<div className="m-table">
				<div class="mb-3 mt-5 search-bar">
					<input
						onKeyUp={handleSearch}
						type="email"
						class="form-control"
						id="exampleFormControlInput1"
						placeholder="Search the users"
					/>
				</div>

				<table className="table m-table">
					<thead>
						<tr>
							<th onClick={() => handleSorting(`id`)}>Id</th>
							<th onClick={() => handleSorting(`name`)}>
								Name{" "}
								<span>
									<i
										class={` ${
											sortColumn === "name" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
							</th>
							<th>Avatar</th>
							<th onClick={() => handleSorting(`age`)}>
								Age
								<span>
									<i
										class={` ${
											sortColumn === "age" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
							</th>
							<th onClick={() => handleSorting(`email`)}>
								E-mail
								<span>
									<i
										class={` ${
											sortColumn === "email" && sortOrder === "desc"
												? " fas fa-arrow-up desc-arrow"
												: " fas fa-arrow-up "
										}`}></i>
								</span>
							</th>
							<th>
								Verified <input type="checkbox" />
							</th>
						</tr>
					</thead>
					<tbody>
						{data.length &&
							data.map((person) => (
								<tr key={person.id}>
									<td>{person.id}</td>
									<td>{person.name}</td>
									<td>
										<img
											className="profile-picture"
											src={person.avatar}
											alt=""
										/>
									</td>
									<td>{person.age}</td>
									<td>{person.email}</td>
									<td>{person.isVerified ? "Verified" : "Not Verified"}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			<div className="paginated-links mt-3">
				<ul class="pagination">
					<li onClick={() => handlePageChange("previous")} class={`page-item `}>
						<a class="page-link" href="#">
							Previous
						</a>
					</li>
					{linksArray.map((link) => (
						<li
							onClick={() => handlePageChange(link)}
							class={`page-item ${link === currentPage && "active"}`}>
							<a class="page-link" href="#">
								{link + 1}
							</a>
						</li>
					))}
					<li onClick={() => handlePageChange("next")} class={`page-item `}>
						<a class="page-link" href="#">
							Next
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Persons;


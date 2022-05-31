import React, { useEffect, useState } from "react";
import axios from "axios";
import queryString from "query-string";
import {
	Chip,
	Container,
	Grid,
	Paper,
	Button,
	InputAdornment,
	TextField,
	FormControl,
	Select,
	Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
	table: {},
	firstRow: {
		margin: "20px 0px",
	},
});

function Categories(props) {
	const classes = useStyles();
	const [query, setQuery] = useState({
		limit: 100,
	});
	const [categories, setCategories] = useState(null);
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		let URL = `${
			process.env.REACT_APP_BACKEND_API_URL
		}category?${queryString.stringify(query)}`;
		axios({
			url: URL,
			headers: {
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}).then((result) => setCategories(result.data.data.categories));
	}, [refresh, query]);

	const handleDelete = (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "This category will be deleted!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Delete",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`${process.env.REACT_APP_BACKEND_API_URL}category/${id}`)
					.then((result) => {
						if (result.data.status === "success") {
							Swal.fire("Deleted!", "User deleted successfully...", "success");
							setRefresh(!refresh);
						}
					})
					.catch((err) => {
						Swal.fire("Deleted!", "Something went wrong...", "error");
					});
			}
		});
	};

	const handleQueryChange = (e) => {
		setCategories(null);
		setQuery({ ...query, [e.target.name]: e.target.value });
	};
	console.log(query);
	console.log(categories);
	return (
		<div>
			<Container>
				<h2>Category</h2>
				<Grid container justifyContent="flex-end" className={classes.firstRow}>
					<Link to={`${props.match.path}/new`} className="li">
						<Button variant="contained" color="secondary" >
							New Data
						</Button>
					</Link>
				</Grid>
				<Grid container justifyContent="flex-end" className="my-3">
					<form onChange={handleQueryChange}>
						<TextField
							placeholder="Search..."
							id="outlined-start-adornment"
							className=""
							name="keyword"
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
							}}
							variant="outlined"
						/>
						<FormControl variant="outlined">
							<Select
								native
								placeholder="Role"
								inputProps={{
									name: "sort",

									id: "outlined-age-native-simple",
									shrink: false,
								}}>
								<option aria-label="None" value="" />
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
								<option value="Name">Name</option>
								<option value="Last Active">Last Active</option>
							</Select>
						</FormControl>
					</form>
				</Grid>
				<Grid container>
					<Grid item xs={12}>
						<Paper>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Category Name</TableCell>
										
										<TableCell align="right">Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{categories ? (
										categories.map((category) => (
											<TableRow key={category._id}>
												<TableCell component="th" scope="user">
													{category.name}
												</TableCell>
												<TableCell align="right">
													<Link to={`${props.match.path}/update/${category._id}`}>
														<EditIcon />
													</Link>

													<DeleteIcon onClick={() => handleDelete(category._id)} />
												</TableCell>
											</TableRow>
										))
									) : (
										<Box item sm={6} style={{ width: "100%" }}>
											<LinearProgress />
										</Box>
									)}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Categories;
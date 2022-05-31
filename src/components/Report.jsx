import React, {useEffect, useState } from "react";
import moment from "moment";
import queryString from "query-string";
import { Container, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListIcon from "@material-ui/icons/List";
import { Link } from "react-router-dom";


import {
		Button,
	InputAdornment,
	TextField,
	FormControl,
	Select,
	Box,


} from "@material-ui/core";
import List from "@material-ui/icons/List";
import Transactions from "./Transactions";
const useStyles = makeStyles({
	table: {},
	firstRow: {
		margin: "30px 0px",
	},
});


function Report(props) {
	const classes = useStyles();

	const [queryData, setQueryData] = useState({
		start: moment().startOf("week").format("llll"),
		end: moment().endOf("week").format("llll"),
		limit: 20,
	});
	const [reportData, setReportData] = useState(null);
	const [transactions, setTransactions] = useState(null);
	 const [date, setDate] = useState(new Date());
	let query = queryString.stringify(queryData);
	let income = [];

	
	useEffect(() => {
		async function getReportData() {
			let result = await fetch(
				`${process.env.REACT_APP_BACKEND_API_URL}transaction/?${query}`,
			);
			let data = await result.json();
			setReportData(data);
		}
		getReportData();
	}, []);
	useEffect(() => {
		async function getTransaction() {
			let result = await axios(
				`${process.env.REACT_APP_BACKEND_API_URL}transaction/?${query}`,
			);
			setTransactions(result.data.data.transactions);
		}
		getTransaction();
	}, []);
	console.log(transactions);

	return (
<div>
			<Container >
				<h2 align="left">Report</h2>
				<Grid container  justifyContent="flex-end" className="my-3">
                            

							<form className={classes.container} noValidate>
                             <TextField
                                id="date"
                              label="Start Date"
                                type="date"
                        defaultValue="2021-08-14"
                     className={classes.textField}
                 InputLabelProps={{
                      shrink: true,
                          }}
                         />
                       </form>
                            <form className={classes.container} noValidate>
                             <TextField
                                id="date"
                              label="End Date"
                                type="date"
                        defaultValue= "2021-08-14"
                     className={classes.textField}
                 InputLabelProps={{
                      shrink: true,
                          }}
                         />
                       </form>
							<FormControl variant="outlined">
							<Select
								native
								placeholder="Role"
								 defaultValue="Newest"
								inputProps={{
									name: "sort",
									id: "outlined-age-native-simple",
									shrink: false,
								}}>
								<option aria-label="None" value="" />
								<option value="Newest">Newest</option>
								<option value="Oldest">Oldest</option>
								<option value="Name">Name</option>
								<option value="Highest to Lowest">Highest to Lowest</option>
								<option value="Lowest to Highest">Lowest to Highest</option>
							</Select>
							</FormControl>
				</Grid>
				<Grid container justifyContent="flex-end" className={classes.firstRow}>
			
					<Grid item lg={12} sm={12}>
						<Paper>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Id</TableCell>
										<TableCell align="right">Date</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{transactions &&
										  transactions.map((row) => (
											<TableRow key={row._id}>
												<TableCell component="th" scope="row">
													{row._id}
												</TableCell>

												<TableCell align="right">
													{moment(row._createdAt).format("llll")}
												</TableCell>
												<TableCell align="right">{row.items.length}</TableCell>
												<TableCell align="right">{row.grandtotal}</TableCell>
												<TableCell align="right">
													<Link to={`${props.match.path}/new}`}>
														<ListIcon />
													</Link>
													</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
export default Report;
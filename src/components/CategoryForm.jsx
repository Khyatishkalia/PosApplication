import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { FormControl, Select, InputLabel, Paper } from "@material-ui/core";
import Joi from "joi-browser";
import Swal from "sweetalert2";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PhotoIcon from "@material-ui/icons/Photo";

const useStyles = makeStyles((theme) => ({
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
		padding: "20px",
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function CategoryForm(props) {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState(null);
	const [method, setMethod] = useState("POST");
	const [categories, setCategories] = useState(null);
	const classes = useStyles();
	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		props.match.params.id &&
			axios
				.get(
					`${process.env.REACT_APP_BACKEND_API_URL}category/${props.match.params.id}`,
				)
				.then((result) => {
					if (result.data.status === "success") {
						let { category } = result.data.data;
						setFormData({ ...formData, category});

						// setFormData(result.data.data);
						setMethod("PUT");
					}
				});
	}, []);

	useEffect(() => {
		axios(`${process.env.REACT_APP_BACKEND_API_URL}category`).then((result) =>
			setCategories(result.data.data.categories),
		);
	}, []);

	const formSchema = {

		category: Joi.string().required().min(7).max(30),
	
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		//validate the request
		let validation = Joi.validate(formData, formSchema, { abortEarly: false });
		if (validation.error) {
			setErrors(validation.error.details);
			return;
		}

		//if form data contains files
		let i = new FormData();
		for (let x in formData) i.append(x, formData[x]);


		//make post request to server
		axios({
			method,
			url: `${process.env.REACT_APP_BACKEND_API_URL}${
				method === "PUT" ? "category/" + props.match.params.id : "category"
			}`,
			data: i,
			headers: {
				"Content-type": "multipart/formData",
			},
		})
			.then((result) => {
				if (result.status === 200) {
					setErrors(null);
					Swal.fire(
						`Category ${
							method === "PUT" ? "updated" : "created"
						} successfully...`,
					);
					props.history.goBack();
				} else {
					Swal.fire("Error", "Somethings went wrong", "error");
				}
			})
			.catch((err) => {
				Swal.fire("Error", "Somethings went wrong", "error");
			});
	};


	return (
		<Container>
			<Grid container className="mt-5">
				<Button onClick={() => props.history.goBack()} variant="default">
					<ArrowBackIcon /> Back
				</Button>
			</Grid>
			<Paper>
				<div className={classes.paper}>
					<form
						onSubmit={handleSubmit}
						onChange={handleFormChange}
						className={classes.form}>
						<Grid container spacing={2}>
						 
								<Grid item xs={12} sm={6}>
								<TextField
									name="category"
									variant="outlined"
									fullWidth
									id="category"
									placeholder="Category Name"
									value={formData && formData.category}
									autoFocus
									
								/>
								{errors &&
									errors
										.filter((err) => err.context.key === "category")
										.map((error) => (
											<p className="form-errors">{error.message}</p>
										))}
							</Grid>
					
						</Grid>
						
					
					
						<Button
							type="submit"
							variant="contained"
							size="large"
							color="primary"
							className="c-btn mt-5">
							{method === "POST" ? "Create Category" : "Update Category"}
						</Button>
					</form>
				</div>
			</Paper>
		</Container>
	);
}
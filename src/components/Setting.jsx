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

export default function Setting(props) {
	const [formData, setFormData] = useState({});
	const [errors, setErrors] = useState(null);
	const [method, setMethod] = useState("POST");
	const classes = useStyles();
	const handleFormChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	useEffect(() => {
		props.match.params.id &&
			axios
				.get(
					`${process.env.REACT_APP_BACKEND_API_URL}setting/${props.match.params._id}`,
				)
				.then((result) => {
					if (result.data.status === "success") {
						setFormData(result.data.data);
						setMethod("PUT");
					}
				});
	}, []);

	const formSchema = {
		storename: Joi.string().required(),
		discount: Joi.number().required(),
		tax: Joi.number().required(),
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		//validate the request
		let validation = Joi.validate(formData, formSchema, { abortEarly: false });
		if (validation.error) {
			setErrors(validation.error.details);
			return;
		}

		//make post request to server
		axios({
			method,
			url: `${process.env.REACT_APP_BACKEND_API_URL}${
				method === "PUT" ? "setting/" + props.match.params.id : "setting"
			}`,
			data: formData,
		})
			.then((result) => {
				if (result.status === 200) {
					setErrors(null);
					Swal.fire(
						`Setting ${method === "PUT" ? "updated" : "created"} successfully...`,
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
	console.log(errors);
	console.log(formData);

	return (
		<Container>
			<h4>Update Store Settings</h4>
			<Paper>
			
				<div className={classes.paper}>
					<form
						onSubmit={handleSubmit}
						onChange={handleFormChange}
						className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12} >
								<h6 align="left">Store Name</h6>
								<TextField
									autoComplete="name"
									name="Storename"
									variant="outlined"
									fullWidth
									id="name"
									value={formData && formData.name}
									autoFocus
								/>
								{errors &&
									errors
										.filter((err) => err.context.key === "name")
										.map((error) => (
											<p className="form-errors">{error.message}</p>
										))}
							</Grid>
							<Grid item xs={12} sm={6}>
							<h6 align="left">Discount</h6>
								<TextField
									variant="outlined"
									fullWidth
									placeholder="                                                                                                                %"
									id="discount"
									name="discount"
									autoComplete="discount"
									value={formData && formData.discount}
								/>
								{errors &&
									errors
										.filter((err) => err.context.key === "discount")
										.map((error) => (
											<p className="form-errors">{error.message}</p>
										))}
							</Grid>
							<Grid item xs={12} sm={6}>
							<h6 align="left">Tax </h6>
								<TextField
									variant="outlined"
									fullWidth
									placeholder="                                                                                                                   %"
									id="lastName"
									name="tax"
									autoComplete="tax"
									value={formData && formData.tax}
								/>
								{errors &&
									errors
										.filter((err) => err.context.key === "tax")
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
							{method === "POST" ? "Submit" : ""}
						</Button>
					</form>
				</div>
			</Paper>
		</Container>
	);
}
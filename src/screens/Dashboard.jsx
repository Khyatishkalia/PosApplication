import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar.jsx";
import { Route, Switch } from "react-router-dom";
import "./dashboard.css";
import Products from "../components/Products";
import Categories from "../components/Categories";
import CategoryForm from "../components/CategoryForm";
import Transactions from "../components/Transactions";
import DashboardPanel from "../components/DashboardPanel";
import Users from "../components/Users";
import Settings from "../components/Setting";
import UserForm from "../components/UserForm";
import ProductForm from "../components/ProductForm";
import Account from "../components/Account";
import Report from "../components/Report";
import Logout from "../components/Logout";
import ReceiptModal from "../components/ReceiptModal";
function Dashboard(props) {
	return (
		<React.Fragment>
			<div className="content">
				<div className="sidebar-wrap">
					<Sidebar />
				</div>
				<div className="main-area">
					<div className="first-row">
						<Header />
					</div>
					<Switch>
						<Route
							path={`${props.match.path}/users/update/:id?`}
							component={UserForm}
						/>
						<Route
							exact
							path={`${props.match.path}/users/new`}
							component={UserForm}
						/>
						<Route exact path={`${props.match.path}/users`} component={Users} />
						<Route
							path={`${props.match.path}/products/new`}
							component={ProductForm}
						/>
				
						<Route
							path={`${props.match.path}/products/update/:id?`}
							component={ProductForm}
						/>
						<Route path={`${props.match.path}/products`} component={Products} />
						<Route
							path={`${props.match.path}/transactions`}
							component={Transactions}
						/>
						<Route
							path={`${props.match.path}/categories/update/:id?`}
							component={CategoryForm}
						/>
						<Route
						    exact
							path={`${props.match.path}/categories/new`}
							component={CategoryForm}
						/>
						<Route
							path={`${props.match.path}/categories`}
							component={Categories}
						/>
						<Route
							path={`${props.match.path}/setting`}
							component={Settings}
						/>
						<Route
							path={`${props.match.path}/account`}
							component={Account}
						/>
						<Route
							path={`${props.match.path}/report`}
							component={Report}
						/>
						<Route
							path={`${props.match.path}/report/new`}
							component={ReceiptModal}
						/>
						<Route
							path={`${props.match.path}/logout`}
							component={Logout}
						/>
						
						
						<Route path={`${props.match.path}/`} component={DashboardPanel} />
					</Switch>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Dashboard;
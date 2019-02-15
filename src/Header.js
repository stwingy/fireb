import React, { Component } from 'react';
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavbarToggler,
	Collapse,
	NavItem,
	Jumbotron,
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	Form,
	FormGroup,
	Input,
	Label
} from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { firebase, firebaseDb } from './firebase';
import { connect } from 'react-redux';
import * as actions from './reducers/actioCreators';
import styles from './header.css';
class Header extends Component {
	state = {
		isNavOpen: false,
		isModalOpen: false,
		existingUser: true,
		registerError: '',
		loggedIn: null,
		remName: { name: '', email: '' }
	};
	componentDidMount() {
		let myObj = {};
		for (let key in this.state.remName) {
			// if the key exists in localStorage
			if (localStorage.hasOwnProperty(key)) {
				// get the key's value from localStorage
				let value = localStorage.getItem(key);

				// parse the localStorage string and setState
				try {
					value = JSON.parse(value);
					myObj[key] = value;
					console.log(myObj);
					this.setState({ remName: { ...myObj } });
					console.log(this.state.remName);
					//this.name = this.state.remName.name
				} catch (e) {
					// handle empty string
					this.setState({ remName: { [key]: value } });
				}
			}
		}
	}
	toggleNav = () => {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		});
	};
	toggleModal = (myvar = true) => {
		this.setState({
			isModalOpen: !this.state.isModalOpen,
			existingUser: myvar,
			registerError: ''
		});
	};
	logOut = () => {
		firebase
			.auth()
			.signOut()
			.then(this.setState({ loggedIn: false }), this.props.history.push('/home'))
			.catch((error) => {
				this.setState({
					registerError: error.message
				});
			});
		this.props.isAuth(false);
	};
	lStore = () => {
		if (this.remember.checked) {
			let a = { name: this.name.value, email: this.email.value };
			for (let key in a) {
				// save to localStorage
				localStorage.setItem(key, JSON.stringify(a[key]));
			}
			//localStorage.setItem("name", JSON.stringify(this.name.value));
			//console.log(this.name)
		}
	};
	handleLogin = (event) => {
		this.lStore();
		this.setState({ registerError: '' });
		if (this.state.existingUser) {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email.value, this.password.value)
				.then(() => {
					console.log(firebase.auth());
					this.toggleModal();
					this.setState({ loggedIn: true });
					this.props.isAuth(true);
					this.props.storeUser({ name: this.name.value, email: this.email.value });
					// firebaseDb.ref().push(
					// 	{name:'John',
					// 	age:55,
					// 	job:'construction',
					// 	hobbies:["walking","fishing"],
					// 	motorbike:{type:"Honda",color:'red'}})
				})
				.catch((error) => {
					this.setState({
						registerError: error.message
					});
				});
		} else {
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.email.value, this.password.value)
				.then(() => {
					this.toggleModal();
					this.setState({ loggedIn: true });
					this.props.isAuth(true);
					//this.props.history.push('/')
				})
				.catch((error) => {
					this.setState({
						loggedIn: true,
						registerError: error.message
					});
				});
		}

		// alert("Username: " + this.username.value + " Password: " + this.password.value
		//     + " Remember: " + this.remember.checked);
		event.preventDefault();
	};
	errMess = () =>
		this.state.registerError !== '' ? (
			<div style={{ color: 'red', fontSize: '12px' }}>{this.state.registerError}</div>
		) : (
			''
		);
	render() {
		const userLogged =
			this.state.loggedIn !== true ? (
				<div className="logger">
					<NavItem>
						<Button style={{ margin: '4px' }} outline onClick={() => this.toggleModal()}>
							<span className="fa fa-sign-in fa-sm" /> Log In
						</Button>
					</NavItem>
					<NavItem>
						<Button style={{ margin: '4px' }} outline onClick={() => this.toggleModal(false)}>
							<span className="fa fa-sign-in fa-sm" /> Register
						</Button>
					</NavItem>
				</div>
			) : (
				<div className="logger">
					<NavItem>
						<Button style={{ margin: '4px' }} outline onClick={() => this.logOut()}>
							<span className="fa fa-sign-out fa-sm" /> Log Out
						</Button>
					</NavItem>
					<NavItem>
						<Button style={{ margin: '4px' }} outline onClick={() => console.log('IN')}>
							<span className="fa fa-sign-out fa-sm" /> My Page
						</Button>
					</NavItem>
				</div>
			);
		return (
			<div>
				<Navbar dark expand="lg">
					<div className="container">
						<NavbarToggler className="mr-3" onClick={this.toggleNav} />
						<NavbarBrand className="mr-auto" href="/">
							<img src="assets/images/pic.svg" height="30" width="40" alt="t" />
						</NavbarBrand>
						<Collapse isOpen={this.state.isNavOpen} navbar>
							<Nav navbar>
								<NavItem>
									<NavLink className="nav-link ms-4" to="/home">
										<span className="fa fa-home fa-sm" /> Home
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link ms-4" to="/aboutus">
										<span className="fa fa-info fa-sm" /> About Us
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link ms-4" to="/menu">
										<span className="fa fa-list fa-sm" /> Menu
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink className="nav-link ms-4" to="/contactus">
										<span className="fa fa-address-card fa-sm" /> Contact Us
									</NavLink>
								</NavItem>
							</Nav>
							<Nav className="ml-auto" navbar>
								{userLogged}
							</Nav>
						</Collapse>
					</div>
				</Navbar>
				<Jumbotron>
					<div className="container">
						<div className="row row-header">
							<div className="col-12 col-sm-6">
								<h1>Ristorante con Fusion</h1>
								<p>
									We take inspiration from the World's best cuisines, and create a unique fusion
									experience. Our lipsmacking creations will tickle your culinary senses!
								</p>
							</div>
						</div>
					</div>
				</Jumbotron>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Log In</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleLogin}>
							<FormGroup>
								<Label htmlFor="name">Name</Label>
								<Input
									type="inputl"
									id="name"
									name="name"
									defaultValue={this.state.remName.name}
									innerRef={(input) => (this.name = input)}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="email">Email</Label>
								<Input
									type="email"
									id="email"
									name="username"
									defaultValue={this.state.remName.email}
									innerRef={(input) => (this.email = input)}
								/>
							</FormGroup>
							<FormGroup>
								<Label htmlFor="password">Password</Label>
								<Input
									type="password"
									id="password"
									name="password"
									innerRef={(input) => (this.password = input)}
								/>
							</FormGroup>
							<FormGroup check>
								<Label check>
									<Input
										type="checkbox"
										name="remember"
										innerRef={(input) => (this.remember = input)}
									/>
									Remember me
								</Label>
							</FormGroup>
							<Button type="submit" value="submit" color="primary">
								Login
							</Button>
						</Form>
						<br />
						{this.errMess()}
					</ModalBody>
				</Modal>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		auth: state.auth
	};
};

export default withRouter(connect(mapStateToProps, actions)(Header));

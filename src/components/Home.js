import React, { Component } from 'react';
import { Button, Form, Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import styles from './home.css';
import { NavLink, withRouter } from 'react-router-dom';
import { firebaseDb } from '../firebase';
import { connect } from 'react-redux';
import * as actions from '../reducers/actioCreators';
class Home extends Component {
	state = {
		pics: [],
		coms: [],
		commentTarget: '',
		activeComment: ''
	};
	componentDidMount() {
		firebaseDb.ref('pictures').once('value').then((snapshot) => {
			const pics = [];

			snapshot.forEach((childSnapshot) => {
				pics.push({
					id: childSnapshot.key,
					url: childSnapshot.val().url,
					title: childSnapshot.val().title
				});
				//coms.push({ com: childSnapshot.val().Comments });
			});

			this.setState({ pics: pics });
		});
		this.fiBaseF();
	}
	fiBaseF() {
		firebaseDb.ref('Comments').once('value').then((snapshot) => {
			const coms = [];

			snapshot.forEach((childSnapshot) => {
				coms.push({
					id: childSnapshot.val().id,
					user: childSnapshot.val().user,
					comment: childSnapshot.val().comment
				});
				//coms.push({ com: childSnapshot.val().Comments });
			});

			this.setState({ coms: coms });
		});
	}
	textFunc(e) {
		const c = e.target.getAttribute('pic');
		this.setState({ commentTarget: c, activeComment: e.target.value });

		//this.getComments(this.state.commentTarget);
	}
	handleSubmit(event) {
		event.preventDefault();

		const id = this.state.commentTarget;
		console.log(id);
		// firebaseDb.ref(`pictures/${id}`).once('value').then((snapshot) => {
		// 	console.log(snapshot.val());
		// 	console.log(this.props.user.user.name);
		// 	console.log(this.state.activeComment);
		// });
		firebaseDb.ref('Comments').push({ user: this.props.user.user.name, comment: this.state.activeComment, id: id });
		this.fiBaseF();
	}

	getComments(id) {
		let myA = [];
		if (this.state.coms.length !== 0) {
			var c = this.state.coms.map((item) => {
				if (id === item.id) {
					myA.push({ user: item.user, comment: item.comment });
				}
			});
		}
		return myA.map((ob, i) => (
			<div key={i}>
				<p id={'comment'}>{ob.comment}</p>
				<p id={'user'}>{ob.user}</p>
				<hr />
			</div>
		));
		// <p>{item.user + ' ' + item.comment}</p> : <p>"No Comment</p>;
	}
	renderCard() {
		return (
			<div className="grid">
				{this.state.pics.map((item, i) => (
					<div key={i} className="g">
						<Card>
							<CardImg width="100%" src={item.url} alt={'aa'} />

							<CardImgOverlay>
								<CardTitle className="title">{item.title}</CardTitle>
							</CardImgOverlay>
						</Card>
						<Form onSubmit={(e) => this.handleSubmit(e)}>
							{this.getComments(item.id)}
							<textarea
								className="ta"
								defaultValue="Comment Here"
								pic={item.id}
								onChange={(e) => this.textFunc(e)}
								onFocus={(e) => (e.target.value = '')}
							/>
							<Button type="submit" value="submit" block color="dark" style={{ alignSelf: 'center' }}>
								Submit Comment
							</Button>
						</Form>
					</div>
				))}
			</div>
		);
	}
	render() {
		return (
			<div>
				home
				{this.renderCard()}
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

export default withRouter(connect(mapStateToProps, actions)(Home));

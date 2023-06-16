import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { Link } from "react-router-dom";
import Cart from "../Cart";

// importing modals
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import About from "./About";
import OrderModal from "./OrderModal";

// modal css
import "./LoginForm.css";
import "./SignupForm.css";
import "./About.css";
import "./OrderModal.css";

// importing searchbar
import Searchbar from "./Searchbar";

// importing css
import "./Navigation.css";

function Navigation() {
	const sessionUser = useSelector((state) => state.session.user);
	const [showCart, setShowCart] = useState(false);

	// setup logic so that when one modal is open, the others are closed
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showSignupModal, setShowSignupModal] = useState(false);
	const [showAboutModal, setShowAboutModal] = useState(false);
	const [showOrdersModal, setShowOrdersModal] = useState(false);

	// a problem though right now is that each modal is its own component

	// function so that when one modal is open, the others are closed
	function handleModals() {
		setShowLoginModal(false);
		setShowSignupModal(false);
		setShowAboutModal(false);
		setShowOrdersModal(false);
	}

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<>
				<ProfileButton user={sessionUser} />
				<button
					className="cart-button"
					onClick={() => setShowCart(!showCart)}
				>
					<i className="fas fa-shopping-cart" alt="Shopping Cart"></i>
				</button>
			</>
		);
	} else {
		sessionLinks = (
			<>
				<div className="modals">
					<button
						className="login-button"
						onClick={() => {
							handleModals();
							setShowLoginModal(true);
						}}
					>
						Log In
					</button>
					{showLoginModal && (
						<Modal onClose={() => setShowLoginModal(false)}>
							<LoginForm />
						</Modal>
					)}{" "}
					<>
						<button
							className="signup-button"
							onClick={() => {
								handleModals();
								setShowSignupModal(true);
							}}
						>
							Sign Up
						</button>
						{showSignupModal && (
							<Modal onClose={() => setShowSignupModal(false)}>
								<SignupForm />
							</Modal>
						)}
					</>{" "}
				</div>
			</>
		);
	}

	return (
		<>
			<nav>
				{/* orders button */}
				<button
					className="orders-button"
					onClick={() => {
						handleModals();
						setShowOrdersModal(true);
					}}
				>
					<i className="fas fa-bars"></i>
				</button>
				{showOrdersModal && (
					<Modal onClose={() => setShowOrdersModal(false)}>
						<OrderModal />
					</Modal>
				)}

				{/* home */}
				<Link to="/" className="home-button">
					grocerease
				</Link>

				{/* searchbar */}
				<Searchbar id="searchbar" />

				{/* about adam */}
				<button
					className="about-button"
					onClick={() => {
						handleModals();
						setShowAboutModal(true);
					}}
				>
					About
				</button>
				{showAboutModal && (
					<Modal onClose={() => setShowAboutModal(false)}>
						<About />
					</Modal>
				)}

				{/* session links */}
				<div className="nav-links">{sessionLinks}</div>
			</nav>

			{/* cart sidebar */}
			<div
				className="sidebar"
				style={{ right: showCart ? "0" : "-100%" }}
			>
				<div className="sidebar-header">
					<button
						className="arrow-button"
						onClick={() => setShowCart(false)}
					>
						<i className="fas fa-arrow-left"></i>
					</button>
				</div>
				<Cart />
			</div>
		</>
	);
}

export default Navigation;

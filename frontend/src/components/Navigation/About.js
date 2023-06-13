import "./About.css";

function About() {
	return (
		<div className="adam-content">
			{/* my image */}
			<img
				src="https://avatars.githubusercontent.com/u/49807160?v=4"
				alt="profile"
			/>
			{/* my name */}
			<h3>Adam Pangelinan</h3>
			{/* my github and linkedIn buttons */}
			<p>
				{/* my ATS keywords */}
				He's experienced with: Javascript, React-Redux, Express, Node |
				MongoDB | Ruby, Rails | Python, Tkinter | GIT, SQL, AWS | HTML,
				CSS
			</p>
			<div className="adam-buttons">
				<button className="github">
					<a
						href="https://github.com/bubbapang"
						target="_blank"
						rel="noreferrer"
					>
						{/* the icon */}
						<i className="fab fa-github fa-2x"></i>
					</a>
				</button>
				{/* same for linkedin */}
				<button className="linkedin">
					<a
						href="https://www.linkedin.com/in/adam-pangelinan-8695a0159/ "
						target="_blank"
						rel="noreferrer"
					>
						<i className="fab fa-linkedin fa-2x"></i>
					</a>
				</button>
			</div>
			<br></br>
		</div>
	);
}

export default About;

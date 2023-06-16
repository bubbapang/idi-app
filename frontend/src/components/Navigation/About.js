import "./About.css";

// have an organized info structure
function About() {
	return (
		<div className="adam-content">
			<div className="adam-image">
				{/* my image */}
				<img
					src="https://avatars.githubusercontent.com/u/49807160?v=4"
					alt="profile"
				/>
			</div>

			<div className="adam-info-box">
				<h3>Adam Pangelinan</h3>
				<p>
					Adam is a 20 year old software engineer from Guam, U.S.A. He
					is a lifelong student of philosophy, is making his first
					Indie Game in the Godot game engine, and loves to write about himself in the third
					person.
				</p>
				<p>
					He's experienced with: Javascript, React-Redux, Express,
					Node | MongoDB | Ruby, Rails | Python, Tkinter | GIT, SQL,
					AWS | HTML, CSS
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
			</div>
		</div>
	);
}

export default About;

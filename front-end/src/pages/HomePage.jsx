import { Link } from "react-router-dom"
import resumePDF from "../assets/Rafaela Grison Resume.pdf"


export default function HomePage() {
    return (
        <>
            <h1>Welcome to my website!</h1>
            <p>
               You’re looking at a custom-built stack I designed to house the articles that I wrote on Medium. 
               I used React and Node.js for the core, MongoDB to handle the data, and Firebase for secure authentication. 
               I’ve also integrated the Medium API to pull in my latest technical deep-dives directly to the Articles page.
            </p>

            <p>
                Feel free to explore, create an account to leave a comment, or head over to the About page to see my full journey and grab a copy of my resume.
            </p>
            <p>
                Thanks for stopping by!
            </p>

            <div className="cta-buttons">
                {/* <Link to="/articles" className="cta-blue">Read Articles</Link>
                <Link to="/about" className="cta-black">About Me</Link> */}
                <a href="https://github.com/GRISONRF" className="cta-blue" target="_blank" rel="noopener noreferrer">My GitHub</a>
                <a href="https://www.linkedin.com/in/rafaelagrison/" className="cta-black" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={resumePDF} download className="cta-blue">Download My Resume</a>
            </div>
        </>
    )
}
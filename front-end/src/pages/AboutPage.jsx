import resumePDF from "../assets/Rafaela Grison Resume.pdf"

export default function AboutPage() {
    return (
        <>
            <h1>About me</h1>
            <p>
                Hi! I’m Rafaela, a software developer who took the scenic route into tech.
            </p>

            <p>
                I grew up in Brazil writing HTML for my blog and Neopets, earned a bachelor's in Business Management, 
                and spent years working in operations before realizing I wanted to build software myself. 
            </p>
            <p>
                After moving  to the U.S., I dove into Python and JavaScript, completed a full-stack bootcamp, 
                a back-end focused apprenticeship at Walmart, and volunteered as a developer with Out in Tech and Hack for LA.
            </p>

            <p>
                Most recently, as a Software Engineer at Cartus, I worked on the Foundations team — the backbone 
                of the platform’s infrastructure. 
            </p>
            <p>My work focused on:</p>

            <ul>
                <li>
                <strong>Security & Identity:</strong> Leading SSO enablements and resolving identity federation 
                issues to ensure secure, seamless authentication.
                </li>
                <li>
                <strong>Data Integrity:</strong> Developing automated workflows using Node.js, TypeScript, and MongoDB 
                to remediate fragmented logistics data for high‑visibility clients.
                </li>
                <li>
                <strong>Observability:</strong> Standardizing AWS CloudWatch logging, significantly reducing system noise 
                and accelerating incident response.
                </li>
            </ul>

            <p>
                Outside of work, you’ll usually find me hiking, climbing, biking, swimming, or making something with my 
                hands (right now, it’s a crocheted scarf!).
            </p>

            <p>
                I'm based in Chicago, but with a goal to live in different states across the U.S., so I’m highly open to relocation 
                for my next challenge :)
            </p>
            <div className="cta-buttons">
                <a href="https://github.com/GRISONRF" className="cta-blue" target="_blank" rel="noopener noreferrer">My GitHub</a>
                <a href="https://www.linkedin.com/in/rafaelagrison/" className="cta-black" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={resumePDF} download className="cta-blue">Download My Resume</a>
            </div>

        </>
    )
}
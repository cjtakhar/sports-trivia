import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="main-container">
            <div className="trivia-container">
                <div className="title-card">
                <h1 className="title">Sports Trivia</h1>
                <Link className="play-link" to="/trivia">
                <button className="btn-play">Play</button>
                </Link>
                </div>
            </div> 
        </div>
    )
}

export default Home
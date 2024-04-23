import "./Hero.css"
import handIcon from "../Assets/hand_icon.png"
import arrowIcon from "../Assets/arrow.png"

function Hero() {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>New Arrivals only</h2>
                <div className="hero-hand-icon">
                    <p>new</p>
                    <img src={handIcon} alt="handIcon" />
                </div>
                <p>collections</p>
                <p>for everyone</p>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrowIcon} className="Arrowimg" alt="" />
                </div>
            </div>
            
        </div>
    )
}

export default Hero

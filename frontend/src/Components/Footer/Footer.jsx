import "./Footer.css"
import footerLogo from "../Assets/logo_big.png"
import instagram from "../Assets/instagram_icon.png"
import pinterest from "../Assets/pintester_icon.png"
import wattsapp from "../Assets/whatsapp_icon.png"

function Footer() {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footerLogo} alt="logo" />
                <p>SHOPPER</p>
            </div>
            <div className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </div>
            <div className="footer-social-icons">
                <div className="footer-icons-container">
                    <img src={instagram} alt="instagram" />
                </div>
                <div className="footer-icons-container">
                    <img src={pinterest} alt="pinterest" />
                </div>
                <div className="footer-icons-container">
                    <img src={wattsapp} alt="wattsapp" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved </p>
            </div>
        </div>
    )
}

export default Footer

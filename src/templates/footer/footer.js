import React,{Component} from 'react';
import {AiOutlineMail} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {FaFacebookSquare,FaTwitterSquare,FaLinkedin} from 'react-icons/fa';
import Logo from '../../styles/img/logo_transparent.png';
import './footer.css'
import {Container, Row, Col, Image} from 'react-bootstrap';

class footer extends Component{
    render(){
        return(
        <div>
        
            <footer>
                <div className="footerSection">
                    <Container>
                        <div className="footerSectionInner">
                            <Row>
                                <Col md={6} className="footerColumn">
                                    <div className="footerHeading"> About Us</div>
                                    <div className  = "footerContent">We are leading solution providers that provide solution to a number of social and technical problems</div>
                                </Col>

                                <Col md={6} className="footerColumn">
                                    <div className="footerHeading"> Contact Us</div>
                                    <div className  = "footerContent">
                                    <Row><div id="address">
                                            1215, Washington Avenue, North Suite 203, Western Coast, North-America NA <br/>
                                        </div>
                                    </Row>
                                    <Row><div><span className= "contact_icons"><FiPhoneCall/></span>+91-1234567890</div></Row>
                                    <Row><div><span className= "contact_icons"><AiOutlineMail/></span> abc@gmail.com</div></Row>
                                    
                                    
                                    </div>
                                </Col>

                                {/* <Col md={4} className="footerColumn">
                                <div className="footerHeading">Get Social With Us</div>
                                <div className  = "footerContent">
                                    <Row><div><a href ="#" className ="social_links"><span className= "social_icons facebook"><FaFacebookSquare/></span> Facebook</a></div></Row>
                                    <Row><div><a href ="#" className ="social_links"><span className= "social_icons linkedIn"><FaLinkedin/></span>LinkedIn</a></div></Row>
                                    <Row><div><a href ="#" className ="social_links"><span className= "social_icons twitter"><FaTwitterSquare/></span> Twitter</a></div></Row>
                                </div>
                                </Col> */}
                            </Row>
                            <br/>
                            <hr></hr>
                            <br/>
                            <div className="">
                                <Row className="footer__logo">
                                    <Image src={Logo} className="footer__brandlogo" fluid/>
                                    {/* <Col sm={5}>
                                        
                                    </Col>
                                    <Col sm={2}>
                                        <Image src={Logo} className="footer__brandlogo" fluid/>        
                                    </Col>
                                    <Col sm={5}>
                                        
                                    </Col> */}
                                </Row>
                                
                            </div>
                            <p>&#169;	2021. All rights Reserved.</p>
                        </div>    
                    </Container>
                </div>
                
                
            
            </footer>
        </div>
        );
    }
}
export default footer;
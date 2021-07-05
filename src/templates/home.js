import React from 'react';
import {Link} from 'react-router-dom';
import PersonFoodBasket from '../styles/img/PersonFoodBasket.png'
import TargetImage from '../styles/img/target.jpg';
import Puzzle from '../styles/img/puzzle.jpg';
import Handshake from '../styles/img/handshake.jpg';
import {Container, Row, Col, Image} from 'react-bootstrap';
import './home.css';

function home() {
    return (
        <div>
            <Container>
            <section className = "new__section">
                <Row>
                    <Col md={6}>
                        <Image src={PersonFoodBasket} className="section__side__image section__image--left"/>
                    </Col>

                    <Col md={6}>
                    <div className="section__title">
                        <h3 className="section__header">
                        Why Hunger?
                        </h3>
                    </div>
                    
                    <div className="section__content">
                        <p> 
                        Having access to nutritious food is a human right. According to research, every 10 seconds, a child dies from the effects of hunger. 
                        690 million people are going hungry, 2 billion suffer from malnutrition. It's high time that we need to act upon it; otherwise, 
                        the situation will worsen.</p>
                        <p>
                        There are enough food, knowledge, and resources for all. We lack the prevention of food wastage and equal distribution of food among 
                        all sections of society. 
                        </p>    
                    </div>
                    </Col>
                    
                </Row>
            </section>
            

            <section className = "new__section">
                <Row>
                    <Col md={6}>
                    <div className="section__title">
                        <h3 className="section__header">
                            Our Mission
                        </h3>
                    </div>
                    
                    <div className="section__content">
                        <p>
                            <b>Hunger Demons</b> is a non-profitable project launched for the welfare of society. The main motive of this project is 
                            to design interventions to reduce hunger among underserved communities across the world.
                        </p>
                        <p> 
                            We strongly believe that the community can play a significant role in eliminating the menace of hunger. We encourage people 
                            having an excess of fresh food to donate it to the ones who need it. It will also prevent food wastage.  
                        </p>   
                    </div>
                    </Col>

                    <Col md={6}>
                        <Image src={TargetImage} className="section__side__image section__image--left"/>
                    </Col>
                    
                </Row>
            </section>
            
            <section className = "new__section">
                <Row>

                    <Col md={6}>
                        <Image src={Puzzle} className="section__side__image section__image--left"/>
                    </Col>

                    <Col md={6}>
                    <div className="section__title">
                        <h3 className="section__header">
                            How We Work
                        </h3>
                    </div>
                    
                    <div className="section__content">
                        <p>
                            Hunger Demons provides a platform where the local community can help each other with food needs. Here people can register their food donation or food need requests. 
                            These requests will be visible to other people in your locality and food organizations that can help you with food services.
                        </p>
                        <p> 
                            We partner with organizations for food collection, storage, and food distribution purposes. You can also browse nearby organizations and contact them for your needs.
                        </p>   
                    </div>
                    </Col>
                </Row>
            </section>

            <section className = "new__section">
                <Row>
                    <Col md={6}>
                    <div className="section__title">
                        <h3 className="section__header">
                            Collaborate With Us
                        </h3>
                    </div>
                    
                    <div className="section__content">
                        <p>
                            We would love to partner with organizations working towards a similar cause.  Reach out to us if you’re an NGO, 
                            private organization, or educational institute that can help in food collection, food storage, and food distribution.
                            You also need to perform timely food quality checks, and ensure that proper hygiene is maintained.
                                <br/> 
                        </p>
                            <Link to="/register" className="btn" >Register Now &#8594;</Link>  
                    </div>
                    </Col>

                    <Col md={6}>
                        <Image src={Handshake} className="section__side__image section__image--left"/>
                    </Col>
                    
                </Row>
            </section> 
            </Container>
        </div>
    )
}

export default home;
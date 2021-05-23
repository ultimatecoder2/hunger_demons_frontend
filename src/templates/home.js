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
                            With the 
                            According to a research, Every ten seconds, a child dies from the effects of hunger. 690 million people are going hungry, 2 billion suffer from malnutrition, but there is enough food, knowledge and resources for all. 
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
                            <b>Feed Needy</b> is a non profitable project launched for the welfare of society. The main motive of this project
                            is to design interventions to reduce hunger among underserved communities across the world.
                        </p>
                        <p> 
                            According to a research, Every ten seconds, a child dies from the effects of hunger. 690 million people are going hungry, 2 billion suffer from malnutrition, but there is enough food, knowledge and resources for all.
                            What we actually lack is the equal distribution of food among people. There might be a lot of wastage of food in one part of the city, whereas shortage in the other. We work to solve this problem.
                            Our main motive is to make food accessible to the unprivileged section of society. 
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
                            <b>Feed Needy</b> is a non profitable project launched for the welfare of society. The main motive of this project
                            is to design interventions to reduce hunger among underserved communities across the world.
                        </p>
                        <p> 
                            According to a research, Every ten seconds, a child dies from the effects of hunger. 690 million people are going hungry, 2 billion suffer from malnutrition, but there is enough food, knowledge and resources for all.
                            What we actually lack is the equal distribution of food among people. There might be a lot of wastage of food in one part of the city, whereas shortage in the other. We work to solve this problem.
                            Our main motive is to make food accessible to the unprivileged section of society. 
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
                                We would love to partner with organisations working towards the similar cause. 
                                Reach out to us if you’re an NGO, private organisation or educational institute that can help in storing and distributing food.
                                Your organization can also contribute by informing about the food needs.
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
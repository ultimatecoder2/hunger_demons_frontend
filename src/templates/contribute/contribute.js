import React, { Component } from 'react'
import { Container, Card, CardDeck, Row, Col, Image } from 'react-bootstrap'
import {Link} from 'react-router-dom';
import Header from '../header/form__header'
import DeliveryMan from '../Images/DeliveryMan.jpg';
import  FoodDrive from '../Images/FoodDrive.jpg';
import  NeedFood from '../Images/HungryWoman.jpg';
import SaveEarth from '../../styles/img/save_world.jpg';
import WasteFood from '../../styles/img/food_trash.jpg';
import HelpHand from '../../styles/img/helping_hand.jpg';
import HandShakeIcon from '../../styles/img/hand_shake_icon.jpg';
import './contribute.css'
export default class contribute extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="outermost__container">
                <Container>
                    <div className="new__section section__c">
                        <div className="section__title">
                            <h3 className="section__header">
                                Why contribute?
                            </h3>
                        </div>
                        <div className="section__content">
                            <Row>
                                <Col md={3} sm={6} xs={6} className = "features__feature">
                                    
                                    <Image src={HelpHand} className="features__image"/>
                                    <h3 className="features__heading">
                                        Help needfull
                                    </h3>
                                    <p className="features__content">
                                        All the donated food will be going to the needfull people. Helping others is a good deed.
                                    </p>
                                </Col>

                                <Col md={3} sm={6} xs={6} className = "features__feature">
                                    
                                    <Image src={WasteFood} className="features__image"/>
                                    <h3 className="features__heading">
                                        Reduce food Wastage
                                    </h3>
                                    <p className="features__content">
                                        It reduces the food wastage, as extra unused food can be eaten by ones, who can't afford it.
                                    </p>
                                </Col>

                                <Col md={3} sm={6} xs={6} className = "features__feature">
                                    
                                    <Image src={SaveEarth} className="features__image"/>
                                    <h3 className="features__heading">
                                        Save Environment
                                    </h3>
                                    <p className="features__content">
                                       Reducing food wastage results in reducing the methane emissions from landfills and lowers the carbon footprint
                                    </p>
                                </Col>

                                <Col md={3} sm={6} xs={6} className = "features__feature">
                                    
                                    <Image src={HandShakeIcon} className="features__image"/>
                                    <h3 className="features__heading">
                                        Strengthens Community
                                    </h3>
                                    <p className="features__content">
                                        Food distribution among community ensures that you have a safe and healthy community around you.
                                    </p>
                                </Col>
                            </Row>
                            
                        </div>
                    </div>
                    
                    <div className="new__section">
                        <div className="section__title">
                            <h3 className="section__header">
                                Steps to Contribute
                            </h3>
                        </div>
                        <div className="section__content">
                            loremipsum10 Irure ipsum est culpa consectetur ut aliquip occaecat occaecat consectetur eu pariatur anim.
                        </div>

                    </div>
                    <section className="new__section" id="contribute__section">
                
                    <div className="section__title">
                        <h3 className="section__header">
                            Ways To Contribute
                        </h3>
                    </div>

                    <div className="section__content card__section">
                        <p>You can become an intervention of change in this project. Each contribution matters a lot. 
                            We strongly believe in community participation. A good community can change the future and bring the hunger to an end.
                            You can participate in this campaign in one of the following ways:</p>
                        
                        <CardDeck>
                            <Card className="contribute__card">
                                <Card.Img className="contribute__card--img" variant="top" src={FoodDrive} fluid="true"/>
                                <Card.Body>
                                    <Card.Title>Provide Food</Card.Title>
                                    <Card.Text>
                                        You can provide any kind of excess food. Whether food left from a birthday party or a marriage, you can contact us. One person will collect it from you and deliever to the unprivileged people.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to="/donate" className ="btn contribute__card__btn">Provide Food &#8594;</Link>
                                </Card.Footer>
                            </Card>

                            <Card className="contribute__card">
                                <Card.Img className="contribute__card__img" variant="top" src={DeliveryMan} fluid="true"/>
                                <Card.Body>
                                    <Card.Title>Distribute Food</Card.Title>
                                    <Card.Text>
                                        Whether on a ride to home, market or office, you can pick up food from one of the nearby location and deliver to the nearest needy people.
                                        This would be a great contribution towards feeding needy.
                                        
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to="/donate_requests" className ="btn contribute__card__btn">Distribute Food &#8594;</Link>
                                </Card.Footer>
                            </Card>
                            
                            <Card className="contribute__card">
                                <Card.Img className="contribute__card__img" variant="top" src={NeedFood} fluid="true"/>
                                <Card.Body>
                                    <Card.Title>Need Food</Card.Title>
                                    
                                    <Card.Text>
                                        If you don't have enough food then you can register a request to us. We will try our best to provide you food as soon as possible. 
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to="/getFood" className ="btn contribute__card__btn">Get food &#8594;</Link>
                                </Card.Footer>
                            </Card>
                        </CardDeck>
                    </div>
            
            </section>

                </Container>
                </div>
                
                
                
            </div>
        )
    }
}

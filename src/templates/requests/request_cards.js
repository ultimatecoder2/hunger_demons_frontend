import React, { Component } from 'react'
import {Container, Row, Col, Image,Button,Form,Card,CardDeck} from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import ReactImageAppear from 'react-image-appear';
import {Link} from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {FaAddressCard} from 'react-icons/fa';
import {ImCalendar} from 'react-icons/im';

const renderFoodDescription = (foodDescription)=>{
    return foodDescription.map(({foodName, quantity})=>{
        return <Card.Subtitle tag="h6" className="mb-4 text-muted"><span className='fa fa-question-circle fa-lg question-icon'/>{foodName} for {quantity} persons</Card.Subtitle>
    })
}
const renderAddress = (address) =>{
    const {addressLine1, addressLine2, city, state, country, postalCode} = address;
    return(
        <><span className="card__content__heading">
        <span className="request__card--icon"><FaAddressCard/></span>
        Address: &nbsp;
    </span>
    {addressLine1}, {addressLine2}, {city}, {state}, {country}, {postalCode}</>
    )
    
}

const renderAuthButtons = (data)=>{
    return(
        <div className="mt-2 card__buttons" >
            <button className="col-xs-5 card__button--bottom btn__edit">Edit Request</button>
            <button className="col-xs-5 card__button--bottom btn__delete">Delete Request</button>
        </div>
    )

}

export const renderCard = function(props){
    // console.log(props);
    const FoodDetail = props.post;
    let {val, authId}= props;
    let isAuth =false;
    // console.log(FoodDetail);
    let {foodType, food_description, address, owner} = FoodDetail
    if(owner===authId)
        isAuth = true;
    foodType = foodType[0]
    address = address[0]

    return(
    <div className='request__card' key={val}>
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
        <Card>
            <Card.Body>
                <Card.Title tag="h6">{foodType}</Card.Title>
                <div className="request__card--address">
                    <div><span className="request__card--icon"><ImCalendar/></span>
                    {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(Date.parse(FoodDetail.updatedAt)))}</div>
                    <div >{renderAddress(address)}</div>
                </div>
            </Card.Body>
            
            
            <Card.Body>
                {renderFoodDescription(food_description)}
            </Card.Body>
            <Card.Footer>
                <div className="request__card--btn"><Button className='col-10'><span className=''/>View</Button></div>
                {/* {isAuth && renderAuthButtons(val)} */}
            </Card.Footer>
        </Card>
    </FadeTransform>
    <p></p>

    </div>
)}

const renderFoodList = (foodL)=>{
    console.log(foodL);
    return foodL.map(food=>{
        return food+', '

    })

}
export const renderOrgCard = function(props){
    console.log(props);
    const OrgDetail = props.post;
    let {val}= props;
    let {foodType, email, address, contact, name} = OrgDetail
    address = address[0]

    return(
    <div className='request__card' key={val}>
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
        <Card>
            <Card.Body>
                <Card.Title tag="h6">{name}</Card.Title>
                    <div className="request__card--address">
                        <div>
                            <b><h6>Deals in:</h6></b>
                            {renderFoodList(foodType)}

                        </div>
                        <div>
                            <span className="request__card--icon"><ImCalendar/></span>
                            <b><span>Registered since: </span></b>
                            {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(Date.parse(OrgDetail.createdAt)))}
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div>{renderAddress(address)}</div>
                        <div className="card__content--row">
                            <span className="card__content__heading">
                                <span className="request__card--icon"><AiOutlineMail/></span>
                                Email: &nbsp;
                            </span>
                                {email}
                        </div>

                        <div className="card__content--row">
                            <span className="card__content__heading">
                                <span className="request__card--icon"><AiOutlineMail/></span>
                                Contact: &nbsp;
                            </span>
                                {contact}
                        </div>                       
                        
                    </div>
                
            </Card.Body>
        </Card>
    </FadeTransform>
    <p></p>

    </div>
)}
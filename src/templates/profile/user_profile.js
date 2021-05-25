import React, { Component } from "react";
import {connect} from 'react-redux'
import validator from "validator";
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import { Link, useParams } from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Components/ files
import './user_profile.css'
import userImg from '../../styles/img/profile.jpg';
import FormHeader from'../header/form__header';
import {renderCard} from '../requests/request_cards'
//Bootstrap
import { Container, Row, Col, Image, Nav, NavItem, NavLink, Form} from "react-bootstrap";
import {Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
//Icons
import { GrMail } from "react-icons/gr";
import {FaBuilding} from "react-icons/fa";
import { MdDescription } from "react-icons/md";
import {AiOutlineMail} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {FaAddressCard,FaCity,FaGlobeAmericas,FaMapMarkedAlt,FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {GiMailbox} from 'react-icons/gi';
import { updateProfile, updateAddress, fetchProfile} from "../../actions/index";
import UserDonations from './user_donations'
import UserNeed from './user_need'
// let { id } = useParams();


const requests = [{
    foodType:"Cooked Food",
    food_description:[
        {
            food:"Chapati",
            quantity:5
        },
        {
            food:"Rice",
            quantity:3
        },
        {
            food:"Vegetable",
            quantity:5
        }
    ],
    address:{
        addressLine1:"141, North Eastern Peninsula",
        addressLine2:"Western Lane",
        city:"Racoonwall",
        state:"Zooland",
        postalCode:"K13497",
        country:"Animal Planet"
    }
}, {
    foodType:"Cooked Food",
    food_description:[
        {
            food:"Chapati",
            quantity:5
        },
        {
            food:"Rice",
            quantity:3
        },
        {
            food:"Vegetable",
            quantity:5
        }
    ],
    address:{
        addressLine1:"141, North Eastern Peninsula",
        addressLine2:"Western Lane",
        city:"Racoonwall",
        state:"Zooland",
        postalCode:"K13497",
        country:"Animal Planet"
    }
}, {
    foodType:"Cooked Food",
    food_description:[
        {
            food:"Chapati",
            quantity:5
        },
        {
            food:"Rice",
            quantity:3
        },
        {
            food:"Vegetable",
            quantity:5
        }
    ],
    address:{
        addressLine1:"141, North Eastern Peninsula",
        addressLine2:"Western Lane",
        city:"Racoonwall",
        state:"Zooland",
        postalCode:"K13497",
        country:"Animal Planet"
    }
}, {
    foodType:"Cooked Food",
    food_description:[
        {
            food:"Chapati",
            quantity:5
        },
        {
            food:"Rice",
            quantity:3
        },
        {
            food:"Vegetable",
            quantity:5
        }
    ],
    address:{
        addressLine1:"141, North Eastern Peninsula",
        addressLine2:"Western Lane",
        city:"Racoonwall",
        state:"Zooland",
        postalCode:"K13497",
        country:"Animal Planet"
    }
}

]

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
			showDonations:true,
			showNeed:false,
            profileModalOpen:false,
            addressModalOpen:false,
            userId:"",
            profile:"",
            username: "",
            email:"",
            password:"",
            contact: "",
            image:"",
            addressLine1:"",
            addressLine2:"",
            city:"",
            addressState:"",
            postalCode:"",
            country:"",
            loaded:false,
            errors:{
                username: "",
                email:"",
                password:"",
                contact: "",
                image:"",
                addressLine1:"",
                addressLine2:"",
                city:"",
                addressState:"",
                postalCode:"",
                country:"",
            }
        }
        
    }

    componentDidMount = async()=>{
		const authId= this.props.match.params.userId;
        await this.props.fetchProfile(authId);
        this.setState({
            loaded:true,
            userId:authId
        });
        // console.log(authId);
    }
    
	activateNeed = (e)=>{
		e.preventDefault();
		this.setState({
			showNeed:true,
			showDonations:false
		})
	}
	activateDonation = (e)=>{
		e.preventDefault();
		this.setState({
			showNeed:false,
			showDonations:true
		})
	}
	renderDonations = ()=>{
		return <UserDonations owner={this.state.userId}/>
	}
	renderNeed = ()=>{
		return(
			<>
                <UserNeed owner={this.state.userId}/>
			</>
		)
	}

    handleInputChange= (event)=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    
    changeProfileModalState=(e)=>{
        if(e)
		    e.preventDefault();
        this.setState({
			profileModalOpen:!this.state.profileModalOpen,
            username: "",
            email:"",
            password:"",
            contact: "",
            image:""
		})
	}
    changeAddressModalState=(e)=>{
        if(e)
		    e.preventDefault();
        this.setState({
			addressModalOpen:!this.state.addressModalOpen,
            addressLine1:"",
            addressLine2:"",
            city:"",
            addressState:"",
            postalCode:"",
            country:""
		})
	}
    handleImageUpload = (e)=>{
		e.preventDefault();
        const image = e.target.files[0];
        let imageError="", error=false;
        if(image){
            if(image.type!=="image/jpeg"&&image.type!=="image/png"){
				imageError="You must upoad a valid jpeg/png image file";
				error = true;
			}else if(image.size>=1000000){
				imageError="Maximum permissible size of an image is 1Mb";
				error = true;
			}
            if(error){
                this.setState({
                    errors:{
                        image:imageError
                    }
                })
            }else{
                console.log(e.target.files[0]);
                this.setState({
                    image:e.target.files[0],
                    errors:{
                        image:""
                    }
                })
            }
        }	
		
	}
    selectCountry = (val)=>{
        this.setState({ country: val });
    };
    selectState= (val)=>{
        this.setState({ addressState: val });
    }
    userProfileValidation = (data)=>{
        const {username,email,password,contact,image} = data;
        let error=false, emailError="", passwordError="", usernameError="", imageError="", contactError="";
        if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)){
            emailError = "Email address is Invalid";
            error= true;
        }
        if(password.length>0&&password.length<5){
            passwordError="Length of password must be 5 characters or more"
            error= true;
        }
		if(username&&!username.trim()){
			usernameError = "Please enter a valid name";
            error= true;
		}
        if(contact && !validator.isMobilePhone(contact)){
            error= true;
            contactError="Enter a valid contact number";
        }
		if(image){
			if(image.type!=="image/jpeg"&&image.type!=="image/png"){
				imageError="You must upoad a valid jpeg/png image file";
				error = true;
			}else if(image.size>=1000000){
				imageError="Maximum permissible size of an image is 1Mb";
				error = true;
			}
		}

        this.setState(prevState => ({
            errors:{
                username:usernameError,
                email:emailError,
                password: passwordError,
                contact:contactError,
                image:imageError
            }
        }))
        return !error;
    }
    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);
    

    handleProfileUpdate = async(e)=>{
        e.preventDefault();
        const{username, contact, email, password, image} = this.state;
        const name = username;
        const data={name, contact, email, password, image};
        const isValid =  this.userProfileValidation(data);
        let userDetails = {};
        if(isValid&&(name||contact||image||email||password)){
            for (const property in data) {
                if(`${data[property]}`){
                    userDetails[`${property}`] = `${data[property]}`;
                }
            }
            await this.props.updateProfile(userDetails);
            if(this.props.user_form_updates.message){
                this.notifySuccess(this.props.user_form_updates.message);
            }else if(this.props.user_form_updates.error){
                this.notifyFail(this.props.user_form_updates.error);
            }
        }
    }

    handleAddressUpdate = async(e)=>{
        e.preventDefault();
        const{addressLine1, addressLine2, city, addressState, postalCode,country} = this.state;
        let address={}
        const data={addressLine1, addressLine2, city, addressState, postalCode,country};
        
        if(addressLine1||addressLine2||city||addressState||postalCode||country){
            for (const property in data) {
                if(`${data[property]}`){
                    if(`${property}`==='addressState'){
                        address['state'] = `${data[property]}`;
                    }else
                        address[`${property}`] = `${data[property]}`;
                }
            }
            await this.props.updateAddress(address);
            if(this.props.user_form_updates.message){
                this.notifySuccess(this.props.user_form_updates.message);
            }else if(this.props.user_form_updates.error){
                this.notifyFail(this.props.user_form_updates.error);
            }
        }

    }
    renderUpdateProfileModal = ()=>{
		return(
			<Modal isOpen={this.state.profileModalOpen} 
               toggle={() => this.changeProfileModalState()}
               className='modal-dialog modal-dialog-centered modal-lg'
               backdrop='static'
               >
            <ModalHeader style={{backgroundColor: 'darkgray'}} toggle={() => this.changeProfileModalState()}>Update Profile</ModalHeader>
            <ModalBody>
				<div className="invalid__feedback user__notice">**Please fill only those fields that you want to update</div>
                <Form encType="multipart/formdata">
                <Row>
                            <Col md={6}>
                        <Form.Group controlId="user__name">
                            <Form.Label><span className="form__icon"><FaUserAlt/></span>Name</Form.Label>
                            <input name="username" className="form-control" type="text" value={this.state.username} placeholder="Enter name" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.username}</div>
                        </Form.Group>
                        </Col>
                        <Col md={6}>

                        <Form.Group controlId="user__email">
                            <Form.Label><span className="form__icon"><AiOutlineMail/></span>Email address</Form.Label>
                            <input name="email" className="form-control" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                        </Form.Group>
                        </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__password">
                                    <Form.Label><span className="form__icon"><RiLockPasswordFill/></span> Password</Form.Label>
                                    <input name="password" className="form-control" type="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.password}</div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="user__contact">
                                    <Form.Label><span className="form__icon"><FiPhoneCall/></span> Contact</Form.Label>
                                    <input name="contact" className="form-control" type="text" value={this.state.contact} placeholder="Contact Number" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.contact}</div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <div>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label><span className="form__icon"><MdDescription/></span>Change Profile Picture</Form.Label>
                                <div><input type="file"  name="image"  onChange={this.handleImageUpload} /></div>
                                <div className="invalid__feedback">{this.state.errors.image}</div>
                            </Form.Group>
                        </div>
                </Form>
            </ModalBody>
            <ModalFooter style={{backgroundColor: 'lightgray'}}>
                <button onClick={this.handleProfileUpdate} className='modal__button--bottom btn--submit'>Submit</button>
                <button className="modal__button--bottom btn--cancel" onClick={() => this.changeProfileModalState()}>Cancel</button>
            </ModalFooter>
        </Modal>
		)
	}

    renderUpdateAddressModal =()=>{
        return(
			<Modal isOpen={this.state.addressModalOpen} 
               toggle={() => this.changeAddressModalState()}
               className='modal-dialog modal-dialog-centered modal-lg'
               backdrop='static'
               >
            <ModalHeader style={{backgroundColor: 'darkgray'}} toggle={() => this.changeAddressModalState()}>Update Address</ModalHeader>
            <ModalBody>
				<div className="invalid__feedback user__notice">**Please fill only those fields that you want to update</div>
                <Form encType="multipart/formdata">
                    <Form.Group controlId="user__address--1">
                        <Form.Label><span className="form__icon"><FaAddressCard/></span>Address Line 1</Form.Label>
                        <input name="addressLine1" className="form-control" type="text" value={this.state.addressLine1} placeholder="Enter address" onChange={this.handleInputChange} />
                        <div className="invalid__feedback">{this.state.errors.addressLine1}</div>
                    </Form.Group>

                    <Form.Group controlId="user__address--2">
                        <Form.Label><span className="form__icon"><FaAddressCard/></span>Address Line 2</Form.Label>
                        <input name="addressLine2" className="form-control" type="text" value={this.state.addressLine2} placeholder="Enter landmark" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="user__city">
                                <Form.Label><span className="form__icon"><FaCity/></span>City</Form.Label>
                                <input name="city" className="form-control" type="text" value={this.state.city} placeholder="Enter city" onChange={this.handleInputChange} />
                                <div className="invalid__feedback">{this.state.errors.addressCity}</div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="user__zip">
                                <Form.Label><span className="form__icon"><GiMailbox/></span>Postal Code</Form.Label>
                                <input name="postalCode" className="form-control" type="text" value={this.state.postalCode} placeholder="Enter Postal Code" onChange={this.handleInputChange} />
                                <div className="invalid__feedback">{this.state.errors.postalCode}</div>
                            </Form.Group>        
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="user__country">
                                <Form.Label><span className="form__icon"><FaGlobeAmericas/></span>Country</Form.Label>
                                <CountryDropdown value={this.state.country} className="form-control" onChange={(val) => this.selectCountry(val)} required/>
                                <div className="invalid__feedback">{this.state.errors.country}</div>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="user__state">
                                <Form.Label><span className="form__icon"><FaMapMarkedAlt/></span>State</Form.Label>
                                {/* <input name="addressState" className="form-control" type="text" value={this.state.addressState} placeholder="Enter state" onChange={this.handleInputChange} /> */}
                                <RegionDropdown blankOptionLabel="Select a country first" defaultOptionLabel="Select a region" className="form-control" 
                                            country={this.state.country} value={this.state.addressState} onChange={this.selectState}/>
                                <div className="invalid__feedback">{this.state.errors.addressState}</div>
                            </Form.Group>        
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter style={{backgroundColor: 'lightgray'}}>
                <button onClick={this.handleAddressUpdate} className='modal__button--bottom btn--submit'>Submit</button>
                <button className="modal__button--bottom btn--cancel" onClick={() => this.changeAddressModalState()}>Cancel</button>
            </ModalFooter>
        </Modal>
		)

    }
	
    render() {
        if(this.state.loaded){
            const userDetails = this.props.person__Profile.data;
            const userAddress = this.props.person__Profile.data.address[0];
            return (
                <div>
                    <FormHeader/>
                    <ToastContainer/>
                    {this.state.profileModalOpen&&this.renderUpdateProfileModal()}
                    {this.state.addressModalOpen&&this.renderUpdateAddressModal()}
                <div className="forms__section--food">
                    <Container>
                        <div className="form__heading">
                            <h2>Profile</h2>
                        </div>
                        <div className="profile__header">
                            <div className="profile__header--container">
                                <div className="profile__image">
                                    <Image src={userImg} className="user__profile__pic" roundedCircle/>
                                </div>

                                <div className="profile__details">
                                    <div>
                                        <h2 className="details--user__name">{userDetails.name}</h2>
                                    </div>
                                    <div>
                                        <p><span className="profile__header--icon"><FaBuilding/></span>
                                            {userAddress.addressLine1}, {userAddress.addressLine2},<br/>
                                            {userAddress.city}, {userAddress.state}, {userAddress.postalCode}, {userAddress.country}
                                        </p>
                                    </div>
                                    <div>
                                        <p><span className="profile__header--icon"><GrMail/></span>{userDetails.email}</p>
                                    </div>
                                    <br/>
                                    <div>
                                        <button className="user__btn userbtn--1 mr-3" onClick={this.changeProfileModalState}>Update Profile</button>
                                        <button className="user__btn userbtn--2" onClick={this.changeAddressModalState}>Update Address</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="profile__header other__header--nav">
                            <Nav className='col-12' tabs="true">  
                                <NavItem className='notification__filters'>
                                    <NavLink active={this.state.showDonations} onClick={this.activateDonation}>Donate Requests</NavLink>
                                </NavItem>
                                <NavItem className='notification__filters'>
                                <NavLink active={this.state.showNeed} onClick={this.activateNeed}>Need Requests</NavLink>
                                </NavItem>
                            </Nav>
                        </div>
                        
                        <div className="profile__section--request_content">
                            {this.state.showDonations&& this.renderDonations()}
                            {this.state.showNeed&& this.renderNeed()}
                        </div>
                    </Container>
                </div>
            </div>
            )
        }
        else{
            return(
                <div>
                    <FormHeader/>
                    <div>
                        Loading...........
                    </div>
                </div>
            )
        }
}
}
const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        user_form_updates:state.user_form_updates,
        person__Profile:state.profile
    })

}

export default connect(mapStateToProps, {fetchProfile, updateProfile, updateAddress})(Profile);
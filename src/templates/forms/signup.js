import React,{Component} from 'react';
import {connect} from 'react-redux';
import {AiOutlineMail} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {FaAddressCard,FaCity,FaGlobeAmericas,FaMapMarkedAlt,FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {GiMailbox} from 'react-icons/gi';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormHeader from'../header/form__header';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import {signUp} from '../../actions/index';
import history from '../../history'
import validator from 'validator';
import './forms.css'


class signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            email:"",
            password:"",
            contact: "",
            addressLine1:"",
            addressLine2:"",
            city:"",
            addressState:"",
            postalCode:"",
            country:"",
            address:[],
            errors:{
                username:"",email:"", password:"", contact:"",
                addressLine1:"",city:"", addressState:"", postalCode:"",
                country:""
            }
        }
    }
    
    handleInputChange = (event)=> {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    
    selectCountry(val){
        this.setState({ country: val });
    };
    selectState= (val)=>{
        this.setState({ addressState: val });
    }

    validateForm = (data)=>{
        const {username, email, password, contact, addressLine1, city, addressState, postalCode, country} = data;
        let emailError="",passwordError="",usernameError="", contactError="",addressError="", error=false;
        let cityError="", countryError="", postalError="",stateError="";
        if(!username.trim()){
            usernameError= "Username is required";
            error = true;
        }
        if(!email){
            emailError = "Email is required";
            error = true;            
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        {
            emailError = "Email address is Invalid";
            error= true;
        }
        if(!password.trim())
        {
            passwordError="Password is required"
            error= true;
        }
        else if(password.length<6)
        {
            passwordError="Password must be 6 or more characters long"
            error= true;
        }
        if(!contact.trim()){
            contactError=  "Contact required";
            error=true;
        }else if(!validator.isMobilePhone(contact)){
            contactError="Invalid Mobile number";
            error=true;
            
        }
        if(!addressLine1.trim()){
            addressError=  "This address field is required";
            error=true;
        }
        if(!city.trim()){
            cityError="City is required";
            error=true;
        }
        if(!addressState.trim()){
            stateError = "State is required";
            error=true;
        }
        
        if(!country){
            countryError=  "You must choose one country";
            error=true;
        }
        if(!postalCode.trim()){
            postalError = "Postal Code is required";
            error=true;
        }

            
        this.setState(prevState => ({
            errors:{
                username:usernameError,
                email:emailError,
                password: passwordError,
                contact:contactError,
                addressLine1:addressError,
                city:cityError,
                addressState:stateError,
                country:countryError,
                postalCode: postalError
            }
        }))
        
        return !error;
    }

    notifyFail = (message) => toast.error(message);

    handleSubmit= async (event)=>{
        event.preventDefault();
        //Validate the form
        const isValid = this.validateForm(this.state);
        if(isValid){
            //Store data in relevant fields and send request

            const {username, email, password, contact, addressLine1, addressLine2,city, addressState, postalCode,country} = this.state;
            var userAddress = {addressLine1, addressLine2, city, state: addressState, postalCode, country}
            const address = [userAddress]
            const userDetails = {name:username, email, password, contact,address}
            console.log(userDetails);
            await this.props.signUp(userDetails);

            if(this.props.auth.error){
                this.notifyFail(this.props.auth.error);
            }
        }
    }
    render(){
        return(
        <div>
            <FormHeader/>
            <ToastContainer/>
            <div className="forms__section">
                <Container>
                <Jumbotron className="form__content__div signup__div">
                    <div className="form__heading">
                        <h2>SignUp</h2>
                    </div>
                    <Form>
                        <Row>
                            <Col md={6}>
                        <Form.Group controlId="user__name">
                            <Form.Label><span className="form__icon"><FaUserAlt/></span><span className="label__important">*</span> Name</Form.Label>
                            <input name="username" className="form-control" type="text" value={this.state.username} placeholder="Enter name" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.username}</div>
                        </Form.Group>
                        </Col>
                        <Col md={6}>

                        <Form.Group controlId="user__email">
                            <Form.Label><span className="form__icon"><AiOutlineMail/></span><span className="label__important">*</span> Email address</Form.Label>
                            <input name="email" className="form-control" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                        </Form.Group>
                        </Col>
                        </Row>
                        
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__password">
                                    <Form.Label><span className="form__icon"><RiLockPasswordFill/></span><span className="label__important">*</span> Password</Form.Label>
                                    <input name="password" className="form-control" type="password" value={this.state.password} placeholder="Password must be at least 6 characters" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.password}</div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="user__contact">
                                    <Form.Label><span className="form__icon"><FiPhoneCall/></span><span className="label__important">*</span> Contact</Form.Label>
                                    <input name="contact" className="form-control" type="text" value={this.state.contact} placeholder="Contact Number" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.contact}</div>
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        
                        <Form.Group controlId="user__address--1">
                            <Form.Label><span className="form__icon"><FaAddressCard/></span><span className="label__important">*</span> Address Line 1</Form.Label>
                            <input name="addressLine1" className="form-control" type="text" value={this.state.addressLine1} placeholder="Enter address" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.addressLine1}</div>
                        </Form.Group>

                        <Form.Group controlId="user__address--2">
                            <Form.Label><span className="form__icon"><FaAddressCard/></span> Address Line 2</Form.Label>
                            <input name="addressLine2" className="form-control" type="text" value={this.state.addressLine2} placeholder="Enter landmark" onChange={this.handleInputChange} />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__city">
                                    <Form.Label><span className="form__icon"><FaCity/></span><span className="label__important">*</span> City</Form.Label>
                                    <input name="city" className="form-control" type="text" value={this.state.city} placeholder="Enter city" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.city}</div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="user__zip">
                                    <Form.Label><span className="form__icon"><GiMailbox/></span><span className="label__important">*</span> Postal Code</Form.Label>
                                    <input name="postalCode" className="form-control" type="text" value={this.state.postalCode} placeholder="Enter Postal Code" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.postalCode}</div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__country">
                                    <Form.Label><span className="form__icon"><FaGlobeAmericas/></span><span className="label__important">*</span> Country</Form.Label>
                                    <CountryDropdown value={this.state.country} className="form-control" onChange={(val) => this.selectCountry(val)} required/>
                                    <div className="invalid__feedback">{this.state.errors.country}</div>
                                </Form.Group>        
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="user__state">
                                    <Form.Label><span className="form__icon"><FaMapMarkedAlt/></span><span className="label__important">*</span> State</Form.Label>
                                    <RegionDropdown blankOptionLabel="Select a country first" defaultOptionLabel="Select a region" className="form-control" 
                                            country={this.state.country} value={this.state.addressState} onChange={this.selectState}/>
                                    <div className="invalid__feedback">{this.state.errors.addressState}</div>
                                </Form.Group>        
                            </Col>
                        </Row>

                    
                        <div className="form__btn">
                            <button className="btn" onClick={this.handleSubmit}>
                                Sing Up
                            </button>
                        </div>
                    </Form>
                        
                    <div className="form__other__text">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                    </Jumbotron>
                </Container>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        auth:state.auth
    })

}
export default connect(mapStateToProps,{signUp})(signup);
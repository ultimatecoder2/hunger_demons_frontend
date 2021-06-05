import React,{Component} from 'react';
import {connect} from 'react-redux';
import validator from 'validator';
import {AiOutlineMail} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {VscOrganization} from 'react-icons/vsc';
import {FaAddressCard,FaCity,FaGlobeAmericas,FaMapMarkedAlt} from 'react-icons/fa';
import {GiMailbox, GiKnifeFork} from 'react-icons/gi';
import FormHeader from'../header/form__header';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Select from 'react-select'
import './forms.css'
import {foodTypes} from '../../variables';
import {addOrganization} from '../../actions/organizations';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class register extends Component{
    constructor(props){
        super(props);
        this.state = {
            organizationName: "",
            foodtype:"",
            email:"",
            contact: "",
            addressLine1:"",
            addressLine2:"",
            city:"",
            addressState:"",
            postalCode:"",
            country:"",
            errors:{
                organizationName:"", foodtype:"", email:"", contact:"",
                addressLine1:"",city:"", addressState:"", postalCode:"",
                country:""
            } 
        }
    }
    handleMultiSelectChange = foodtype => {
        this.setState({ foodtype });
    }

    handleInputChange = (event)=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    

    selectCountry = (val)=>{
        this.setState({ country: val });
    };
    selectState= (val)=>{
        this.setState({ addressState: val });
    }

    validateForm = (data)=>{
        const {organizationName, foodtype, email, contact, addressLine1, city, addressState, postalCode, country} = data;
        let nameError="",foodTypeError="",emailError="", contactError="",addressError="", error=false;
        let cityError="", countryError="", postalError="",stateError="";
        if(!organizationName.trim()){
            nameError= "Organization name is required";
            error = true;
        }
        if(!foodtype || foodtype.length===0)
        {
            foodTypeError="Foodtype is required"
            error= true;
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
                organizationName:nameError,
                email:emailError, 
                foodtype:foodTypeError, 
                contact:contactError,
                addressLine1:addressError,
                city:cityError,
                addressState:stateError,
                postalCode:postalError,
                country:countryError
            }
        }))
        
        return !error;
    }

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);

    handleSubmit = async(event)=> {
        event.preventDefault();

        let {organizationName, foodtype, email, contact, 
            addressLine1, addressLine2, city, 
            addressState, country, postalCode} = this.state;
        if(foodtype)
            foodtype = foodtype.map(food=>food.value);

        const vals = {organizationName, foodtype, email, contact, 
            addressLine1, addressLine2, city, 
            addressState, country, postalCode}
        const isValid = this.validateForm(vals);
        if(isValid){
            
            let data = {name:organizationName, foodType:foodtype, email, contact,
                 address:{
                    addressLine1, addressLine2,city, 
                    state:addressState, country, postalCode
                 }
            }
            await this.props.addOrganization(data);
            if(this.props.newOrganization.message){
                this.notifySuccess(this.props.newOrganization.message);
                this.setState({
                    organizationName: "",
                    foodtype:"",
                    email:"",
                    contact: "",
                    addressLine1:"",
                    addressLine2:"",
                    city:"",
                    addressState:"",
                    postalCode:"",
                    country:"",
                })
            }else{
                this.notifyFail(this.props.newOrganization.error);
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
                        <h2>Register a food Organization</h2>
                    </div>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__name">
                                    <Form.Label><span className="form__icon"><VscOrganization/></span><span className="label__important">*</span> Organization Name</Form.Label>
                                    <input name="organizationName" className="form-control" type="text" value={this.state.organizationName} placeholder="Enter name" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.organizationName}</div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="food__type">
                                    <Form.Label><span className="form__icon"><GiKnifeFork/></span><span className="label__important">*</span> Food Type</Form.Label>
                                    <div><Select isMulti name="foodType" options={foodTypes} className="basic-multi-select" value={this.state.foodtype} onChange={this.handleMultiSelectChange} classNamePrefix="select"/></div>
                                    <div className="invalid__feedback">{this.state.errors.foodtype}</div>
                                </Form.Group>
                                
                            </Col>
                        
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__email">
                                    <Form.Label><span className="form__icon"><AiOutlineMail/></span><span className="label__important">*</span> Email address</Form.Label>
                                    <input name="email" className="form-control" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.email}</div>
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
                            <Form.Label><span className="form__icon"><FaAddressCard/></span>Address Line 2</Form.Label>
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
                                Proceed &#8594;
                            </button>
                        </div>
                    </Form>
                        
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
        newOrganization:state.addOrganization
    })

}
export default connect(mapStateToProps, {addOrganization})(register);
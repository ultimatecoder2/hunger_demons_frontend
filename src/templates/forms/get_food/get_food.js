import React,{Component} from 'react';
import {connect} from 'react-redux';
import {addRequest} from '../../../actions/index';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../forms.css'
//Components
import FormHeader from'../../header/form__header';
import {foodTypes, foodOptions} from '../../../variables';
//Bootstrap
import {Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select'
import Table from 'react-bootstrap/Table'
//Icons
import {GiMailbox} from 'react-icons/gi';
import {FaAddressCard,FaCity,FaGlobeAmericas,FaMapMarkedAlt} from 'react-icons/fa';
import { CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import {BiNotepad} from 'react-icons/bi';
import {GiKnifeFork} from 'react-icons/gi';



class DonateFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            food_description:[],
            foodName:"",
            quantity:"",
            askFood:true,
            askAddress:false,
            addressLine1:"",
            addressLine2:"",
            city:"",
            addressState:"",
            postalCode:"",
            country:"",
            errors:{
                foodtype:"",
                food_description:"",
                foodName:"",
                quantity:"",
                addressLine1:"",
                city:"",
                addressState:"",
                postalCode:"",
                country:""
            }
        }
    }
    handlefoodTypeChange = foodtype => {
        this.setState({ foodtype });
    }
    handlefoodNameChange = foodName => {
        this.setState({ foodName });
    }
    handleInputChange = event =>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    selectState= val =>{
        this.setState({ addressState: val });
    }
    selectCountry = val =>{
        this.setState({ country: val });
    };

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);

    showAddressForm= e =>{
        e.preventDefault();
        const foodtype = this.state.foodtype.value;
        const food_description = this.state.food_description;
        const isValid = this.formValidation(foodtype, food_description);
        if(isValid){
            this.setState({
                askAddress:true,
                askFood:false
            })
        }
    }
    showFoodForm = e =>{
        e.preventDefault();
        this.setState({
            askAddress:false,
            askFood:true
        })
    }

    validateFoodDescription = (foodName, quantity) =>{
        let foodNameError="", quantityError = "", error;
        if(!foodName){
            foodNameError="Select Food";
            error = true;
        }
        if(!quantity){
            quantityError="This field is required";
            error=true;
        }else if(!/^[1-9][0-9]*$/.test(quantity)){
            quantityError="Quantity must be a valid integer greater than 0";
            error = true;
        }
        this.setState(prevState => ({
            errors:{
                foodName:foodNameError,
                quantity: quantityError
            }
        }))
        return !error;
    }

    formValidation = (foodtype, food_description) =>{
        let foodtypeError="", food_descriptionError = "", error;
        if(!foodtype){
            foodtypeError = "Select a Food Type";
            error = true;            
        }
        
        if(!food_description.length)
        {
            food_descriptionError="You must Add at least one food item"
            error= true;
        }
        
        this.setState(prevState => ({
            errors:{
                foodtype:foodtypeError,
                food_description: food_descriptionError
            }
        }))
        
        return !error;
    }


    addFoodDescriptiton = event =>{
        event.preventDefault();
        const foodName = this.state.foodName.value;
        const quantity = this.state.quantity;
        const isValid = this.validateFoodDescription(foodName, quantity);
        
        if(isValid){
            const food = {foodName, quantity}
            this.setState({
                food_description:[...this.state.food_description, {food}],
                foodName:"",
                quantity:"",
                errors:{
                    foodName:"",
                    quantity:""
                }
            })
        }

    }
    addressValidation = data=>{
        const {addressLine1, city, addressState, postalCode, country} = data;
        let addressError="", cityError="", countryError="", postalError="",stateError="", error=false;
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
                addressLine1:addressError,
                city:cityError,
                addressState:stateError,
                postalCode:postalError,
                country:countryError
            }
        }))
        
        return !error;

    }
    


    handleSubmit = async(event)=> {
        event.preventDefault();
        const foodtype = this.state.foodtype.value;
        let food_description = this.state.food_description;
        const isValid = this.addressValidation(this.state)
        if(isValid){
            const {addressLine1,addressLine2, city, addressState, postalCode, country} = this.state;
            food_description = food_description.map(food_desc=>food_desc.food)
            let data={
                foodType:foodtype, requestType:'Need', 
                food_description, 
                address:{
                    addressLine1, addressLine2, 
                    city, state:addressState,
                    postalCode, country 
                }
            }
            await this.props.addRequest(data);
            if(this.props.foodRequest.message){
                this.notifySuccess(this.props.foodRequest.message);
                this.setState({
                    foodtype:"",
                    food_description:[],
                    foodName:"",
                    quantity:"",
                    askFood:true,
                    askAddress:false,
                })
            }
            else if(this.props.foodRequest.error){
                this.notifyFail(this.props.foodRequest.error);
            }
        }
    }
    renderFoodForm = ()=>{
        let foodDescPlaceHolder = this.state.foodtype?"Select Food":"Select Food Type first" 
        return(
            <Form>
                <Form.Group controlId="food__type">
                    <Form.Label><span className="form__icon"><GiKnifeFork/></span><span className="label__important">*</span> Food Type</Form.Label>
                    <div>
                        <Select name="foodtype" options={foodTypes} className="basic-multi-select" value={this.state.foodtype} onChange={this.handlefoodTypeChange} classNamePrefix="select" placeholder="Select Food Type"/>
                        <div className="invalid__feedback">{this.state.errors.foodtype}</div>
                    </div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><span className="form__icon"><BiNotepad/></span><span className="label__important">*</span> Food description</Form.Label>
                    {this.renderSelectedFood()}
                    <Row>
                        <Col sm={5}>
                            <Select multi name="foodName" options={foodOptions[this.state.foodtype.value]} className="basic-multi-select" value={this.state.foodName} onChange={this.handlefoodNameChange} classNamePrefix="Select" placeholder={foodDescPlaceHolder}/>
                            <div className="invalid__feedback">{this.state.errors.foodName}</div>
                        </Col>
                        <Col sm={5}>
                            <input name="quantity" className="form-control" type="text" value={this.state.quantity} placeholder="Quantity" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.quantity}</div>
                        </Col>
                        <Col sm={2}>
                            <button className="btn__normal btn-outline-info" onClick={this.addFoodDescriptiton}>Add food</button>
                        </Col>
                    </Row>
                    <div className="invalid__feedback">{this.state.errors.food_description}</div>
                    
                </Form.Group>

                <div className="form__btn">
                    <button className="btn" type="submit" onClick={this.showAddressForm}>
                        Next
                    </button>
                </div>
            </Form>
        )
    }

    renderSelectedFood = ()=>{
        const food_description  =this.state.food_description; 
        if(food_description.length>0)
        {
            const foodList = food_description.map(({food}, index)=><tr key={index}>
                <td>{index+1}</td>
                <td>{food.foodName}</td>
                <td>{food.quantity}</td>
            </tr>)
            return(
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>Food Description</th>
                            <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodList}       
                        </tbody>
                        </Table>
                
                </div>
            )
        }
        return;
    }

    renderAddressForm = ()=>{
        return(
            <>
                <div className="form__subHeading">
                    <h3>Delivery Address</h3>
                </div>
                <Form>
                    
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
                                <Form.Label><span className="form__icon"><FaMapMarkedAlt/></span><span className="label__important">*</span> Region</Form.Label>
                                <RegionDropdown blankOptionLabel="Select a country first" defaultOptionLabel="Select a region" className="form-control" 
                                    country={this.state.country} value={this.state.addressState} onChange={this.selectState}/>
                                <div className="invalid__feedback">{this.state.errors.addressState}</div>
                            </Form.Group>        
                        </Col>
                    </Row>
                </Form>
                <div className="form__btn">
                    <button className="form__btn--normal btn--green mr-3" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                    <button className="form__btn--normal btn--red"  onClick={this.showFoodForm}>
                        Go back
                    </button>
                </div>
            </>
        )
    }

    render(){
        return(
        <div>
            <FormHeader/>
            <ToastContainer/>
            <div className="forms__section--food">
                <Container>
                
                    <div className="form__heading">
                        <h2>Get Food</h2>
                    </div>
                    {this.state.askFood&& this.renderFoodForm()}
                    {this.state.askAddress&&this.renderAddressForm()}
                   
                </Container>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        foodRequest: state.foodRequest
    })

}

export default connect(mapStateToProps,{addRequest})(DonateFood);
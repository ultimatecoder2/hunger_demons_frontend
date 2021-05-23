import React,{Component} from 'react';
import {BiNotepad} from 'react-icons/bi';
import {IoIosPeople} from 'react-icons/io';
import {GiKnifeFork} from 'react-icons/gi';
import FormHeader from'../../header/form__header';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Select from 'react-select'
import '../forms.css'


const foodOptions = [{value:'Packed Food',label:'Packed Food'}, 
    {value:'Raw Food', label:'Raw Food'}, 
    {value:'Freshly Cooked Food', label:'Freshly Cooked Food'}];

class RequestFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            foodtype:null,
            foodQuantity:1,
            description:""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleMultiSelectChange = foodtype => {
        this.setState({ foodtype });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }
    

    render(){
        const { foodtype } = this.state;
        
        return(
        <div>
            
            <FormHeader/>
            <div className="forms__section">
                <Container>
                <Jumbotron className="form__content__div">
                    <div className="form__heading">
                        <h2>Request food</h2>
                    </div>
                    <Form>
                        <Row>
                            <Col md={12}>
                            <Form.Group controlId="food__type">
                                    <Form.Label><span className="form__icon"><GiKnifeFork/></span>Food Type</Form.Label>
                                    <div><Select isMulti name="foodType" options={foodOptions} className="basic-multi-select" value={foodtype} onChange={this.handleMultiSelectChange} classNamePrefix="select"/></div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                            <Form.Group controlId="user__foodQuantity">
                                    <Form.Label><span className="form__icon"><IoIosPeople/></span>Food Quantity</Form.Label>
                                    <input name="foodQuantity" className="form-control" type="number" value={this.state.name} placeholder="Number of persons" onChange={this.handleInputChange} />
                                    <Form.Text muted> Enter food quantity in terms of number of persons</Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        
                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="user__foodDescription">
                                    <Form.Label><span className="form__icon"><BiNotepad/></span> Food Description</Form.Label>
                                    <textarea name="description" className="form-control"  value={this.state.name} placeholder="Food details" onChange={this.handleInputChange} rows={4} />
                                </Form.Group>
                            </Col>
                        </Row>
                        
                        <div className="form__btn">
                            <button className="btn" onClick={this.handleSubmit}>
                                Next &#8594;
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
export default RequestFood;
import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col,Form} from 'react-bootstrap';
import './pickup.css';
import {renderOrgCard} from './request_cards.js';
import {fetchOrganizations} from '../../actions/index';
import FloatingLabelInput from 'react-floating-label-input';
import InfiniteScroll from 'react-infinite-scroll-component';

class Organizaitons extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            data:[],
            formError:"",
            hasMore: true,
            limit:12
            }
    }

    fetchData = async()=>{
        if(!this.state.hasMore) return;
        let { data, limit, requestType, city, state, country, postalCode}= this.state;
        const skip = data.length;
        let apiData = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode}
        await this.props.fetchOrganizations(apiData);
        if(this.props.orgs.message==="Success"){
            let newData = this.props.orgs.data.organization;
            if(newData&& newData.length>0){
                var hasMoreNew;
                if(newData.length<limit){
                    hasMoreNew = false;
                }else{
                    hasMoreNew = true;
                }
                const resData = data.concat(newData)
                this.setState({
                    hasMore: hasMoreNew,
                    data: resData
                })
            }else{
                this.setState({hasMore:false})
            }
        }
    }

    componentDidMount = async()=>{
        await this.fetchData();
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

    handleFloatingInput = (event)=>{
        const target = event.target;
        const val = target.value;
        const label= target.id;
        this.setState({
            [label]:val
        })
    }

    filterFormValidation = ()=>{
        const {city, postalCode} = this.state;
        let error=false;
        if(!city.trim()&&!postalCode.trim()){
            error = true;
            this.setState({
                formError:"At least one of the field from 'City' or 'PostalCode' must be filled"
            })
        }else{
            this.setState({
                formError:""
            })
        }
        return !error;
    }

    handleFilterButton = (e)=>{
        e.preventDefault();
        const isValid = this.filterFormValidation();
        if(isValid){
            this.fetchOrg();
        }
    }
    
    renderRequests = ()=>{
        const organizations = this.state.data;
        if(organizations&&organizations.length>0){
            return organizations.map((post,  key)=>{
                return renderOrgCard({post,val:key})
            })
        }else{
            return(
                <h3>No organization in your area is registered with us.</h3>
            )
        }
        
    }

    render() {
        return (
            <div>
                <FormHeader/>
                <div className="forms__section--food">
                    <Container>    
                        <div className="form__heading">
                            <h2>Organizations</h2>
                        </div>
                        <div className="search__section">
                            <h3 className="filters__heading"> Filter results</h3>
                            {/* Food type, address->[city, postal, state, maxQuantity] */}
                            <Form.Group as={Row} controlId="food__type">
                                <Col md={6}>
                                    <FloatingLabelInput
                                        id="city"
                                        className="floating_input"
                                        label="Enter City"
                                        onChange={this.handleFloatingInput}
                                        value={this.state.city}
                                    />
                                </Col>
                                <Col md={6}>
                                    <FloatingLabelInput
                                        id="postalCode"
                                        className="floating_input"
                                        label="Enter Postal Code"
                                        onChange={this.handleFloatingInput}
                                        value={this.state.postalCode}
                                    />
                                </Col>
                                <div className="invalid__feedback">{this.state.formError}</div>
                            </Form.Group>
                            
                            
                            
                            <div style={{textAlign:'right'}}>   
                                <button className="filter__button reset_filter_btn"  onClick={this.resetFilterButton}>Reset Filter</button>   
                                <button className="filter__button apply_filter_btn" onClick={this.handleFilterButton}>Search Requests</button>
                            </div>    
                        </div>

                        <div className="requests__content">
                            <InfiniteScroll 
                                dataLength={this.state.data.length}
                                next = {this.fetchData}
                                hasMore = {this.state.hasMore}
                                loader={<h4>Loading........</h4>}
                                endMessage={<></>}
                                className="flex flex-wrap scroll_div_outer"
                            >
                                {this.renderRequests()}
                            </InfiniteScroll>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        orgs:state.organizations
    })

}

export default connect(mapStateToProps,{fetchOrganizations})(Organizaitons);
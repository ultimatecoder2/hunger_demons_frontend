import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col,Form} from 'react-bootstrap';
import './pickup.css';
import {renderOrgCard} from './request_cards.js';
import {fetchOrganizations} from '../../actions/index';
import FloatingLabelInput from 'react-floating-label-input';

class Organizaitons extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            pageNo:0,
            limit:9,
            tCount:0,
            organizations:"",
            formError:"",
            isLast:false
        }
    }

    fetchNextOrg = async()=>{
        const {pageNo, limit, city, state, country, postalCode}= this.state;
        const skip = (pageNo)*limit;
        let data = {Limit:limit, Skip:skip, city, state, country, postalCode}
        await this.props.fetchOrganizations(data);
        if(this.props.orgs.message==="Success"){
            this.setState({
                tCount:this.props.orgs.data.count,
                organizations: this.props.orgs.data.organization,
                pageNo: this.state.pageNo+1,
                isLast:((skip+limit)>=this.props.orgs.data.count),
            })
        }
    }

    fetchPrevOrg = async()=>{
        const {pageNo, limit, city, state, country, postalCode}= this.state;
        if(pageNo<=1)
            return;
        const skip = (pageNo-2)*limit;
        let data = {Limit:limit, Skip:skip, city, state, country, postalCode}
        await this.props.fetchOrganizations(data);
        if(this.props.orgs.message==="Success"){
            this.setState({
                tCount:this.props.orgs.data.count,
                organizations: this.props.orgs.data.organization,
                pageNo: this.state.pageNo-1,
                isLast:((skip+limit)>=this.props.orgs.data.count),
            })
        }

    }

    fetchOrg = async()=>{
        const {pageNo, limit, requestType, city, state, country, postalCode}= this.state;
        const skip = 0;
        let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode}
        await this.props.fetchOrganizations(data);
        if(this.props.orgs.message==="Success"){
            this.setState({
                tCount:this.props.orgs.data.count,
                organizations: this.props.orgs.data.organization,
                pageNo:1,
                isLast:limit>this.props.orgs.data.count
            })
        }
    }
    componentDidMount = async()=>{
        await this.fetchNextOrg();
    }
    
    nextPage = async(e)=>{
        e.preventDefault();
        const {tCount, pageNo, limit} = this.state;
        if(tCount>pageNo*limit){
            this.fetchNextOrg();
        }
    }

    prevPage = async(e)=>{
        e.preventDefault();
        const {tCount, pageNo, limit} = this.state;
        if(pageNo>1){
            this.fetchPrevOrg();
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
            return !error;
        }else{
            this.setState({
                formError:""
            })
            return true;
        }
    }

    handleFilterButton = (e)=>{
        e.preventDefault();
        const isValid = this.filterFormValidation();
        if(isValid){
            this.fetchOrg();
            // console.log("Valid");
        }
    }
    
    renderRequests = ()=>{
        const {organizations} = this.state;
        if(organizations&&organizations.length>0){
            return organizations.map((post,  key)=>{
                console.log(post);
                return renderOrgCard({post,val:key})
            })
        }else{
            return(
                <h3>No organization in your area is registered with us.</h3>
            )
        }
        
    }

    render() {
        const {pageNo, limit, tCount} = this.state;
        let mini = (pageNo-1)*limit + 1;
        if(tCount===0){
            mini = 0;
        }
        let maxi = Math.min(pageNo*limit , tCount)
        
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

                        <div>
                                <p>Showing {mini} - {maxi} of {tCount}</p>
                        </div>
                        
                        <div className="navigation__btns">
                            <button className="page_navigation_btn  btn--prev_page" onClick={this.prevPage} disabled={(this.state.pageNo===1)}>Previous Page</button>
                            <button className = "page_navigation_btn btn--next_page" onClick={this.nextPage} disabled={this.state.isLast}>Next Page</button>
                        </div>

                        <div className="requests__content">
                            {this.renderRequests()}
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
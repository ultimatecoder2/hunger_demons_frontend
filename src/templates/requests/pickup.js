import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col,Form} from 'react-bootstrap';
import './pickup.css';
import {renderCard} from './request_cards.js'
import {fetchRequests} from '../../actions/index'
// import Input from 'react-select/src/components/input';
import FloatingLabelInput from 'react-floating-label-input';

class PickupRequest extends Component {
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
            requestType:"Donate",
            tCount:"",
            posts:"",
            formError:"",
            isLast:false
        }
    }
    fetchNextPosts = async ()=>{
        let {pageNo, limit, tCount, requestType, city, state, country, postalCode}= this.state;
        const skip = (pageNo)*limit;
        let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode}
        await this.props.fetchRequests(data);
        if(this.props.food_Requests.message==="Success"){
            this.setState({
                tCount:this.props.food_Requests.data.count,
                posts: this.props.food_Requests.data.foodRequest,
                isLast:((skip+limit)>=this.props.food_Requests.data.count),
                pageNo: this.state.pageNo+1
            })
        }
    }

    fetchPrevPosts = async()=>{
        let {pageNo, limit, tCount, requestType, city, state, country, postalCode}= this.state;
        if(pageNo<=1)
            return;
        const skip = (pageNo-2)*limit;
        let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode}
        await this.props.fetchRequests(data);
        if(this.props.food_Requests.message==="Success"){
            this.setState({
                tCount:this.props.food_Requests.data.count,
                posts: this.props.food_Requests.data.foodRequest,
                isLast:((skip+limit)>=this.props.food_Requests.data.count),
                pageNo: this.state.pageNo-1
            })
        }

    }

    fetchPosts = async()=>{
        const {pageNo, limit, requestType, city, state, country, postalCode}= this.state;
        let data = {Limit:limit, Skip:0, requestType, city, state, country, postalCode}
        await this.props.fetchRequests(data);
        if(this.props.food_Requests.message==="Success"){
            this.setState({
                tCount:this.props.food_Requests.data.count,
                posts: this.props.food_Requests.data.foodRequest,
                pageNo:1,
                isLast:(limit>=this.props.food_Requests.data.count)

            })
        }
    }
    componentDidMount = async()=>{
        await this.fetchNextPosts();
    }
    
    nextPage = async(e)=>{
        console.log("Next btn click")
        e.preventDefault();
        const {tCount, pageNo, limit} = this.state;
        if(tCount>pageNo*limit){
            this.fetchNextPosts();
        }
    }

    prevPage = async(e)=>{
        console.log("back btn click")
        e.preventDefault();
        const {tCount, pageNo, limit} = this.state;
        if(pageNo>1){
            this.fetchPrevPosts();
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
            return false;
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
            this.fetchPosts();
        }
    }
    
    renderRequests = ()=>{
        const {posts} = this.state;
        if(posts&&posts.length>0){
            return posts.map((post,  key)=>{
                return renderCard({post,val:key, authId:this.props.auth.userId})
            })
        }else{
            return(
                <h3>No request exist at your location</h3>
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
                            <h2>Donate Requests</h2>
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
                        
                        {/* <div className="navigation__btns">
                            <button className="page_navigation_btn  btn--prev_page" onClick={this.prevPage} disabled={(this.state.pageNo===1)}></button>
                            <button className = "page_navigation_btn btn--next_page" onClick={this.nextPage} disabled={this.state.isLast}>Next</button>
                        </div> */}
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        food_Requests:state.donateRequests,
        auth:state.auth
    })

}

export default connect(mapStateToProps,{fetchRequests})(PickupRequest);
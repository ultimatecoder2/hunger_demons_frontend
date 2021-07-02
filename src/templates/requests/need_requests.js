import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col,Form} from 'react-bootstrap';
import './pickup.css';
import {renderCard} from './request_cards.js'
import {toast, ToastContainer} from 'react-toastify';
import {foodTypes} from '../../variables';
import {fetchRequests, deleteFoodRequest} from '../../actions/index'
import FloatingLabelInput from 'react-floating-label-input';
import InfiniteScroll from 'react-infinite-scroll-component';

class NeedRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            limit:12,
            requestType:"Need",
            formError:"",
            hasMore: true,
            data:[]
        }
    }

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);

    fetchData = async()=>{
        if(!this.state.hasMore) return;
        let { data, limit, requestType, city, state, country, postalCode}= this.state;
        const skip = data.length;
        let apiData = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode}
        await this.props.fetchRequests(apiData);
        if(this.props.food_Requests.message==="Success"){
            let newData = this.props.food_Requests.data.foodRequest;
            console.log("hello there", newData);
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
        console.log(e);
        e.preventDefault();
        const isValid = this.filterFormValidation();
        if(isValid){
            // this.fetchPosts();
            console.log("Valid");
        }
    }

    deleteFoodPost = async(id)=>{
        await this.props.deleteFoodRequest({id})
        if(this.props.foodRequestConfirmation.error){
            this.notifyFail(this.props.foodRequestConfirmation.error);
        }else if(this.props.foodRequestConfirmation.message){
            this.notifySuccess(this.props.foodRequestConfirmation.message);
            let data = this.state.data
            let newData = [];
            for(var i=0;i<data.length;i++){
                if(data[i]._id !== id){
                    newData.push(data[i]);
                }
            }
            this.setState({
                data: newData,
            }, this.fetchData)
        }
    }
    
    renderRequests = ()=>{
        const posts = this.state.data;
        if(posts&&posts.length>0){
            return posts.map((post,  key)=>{
                return renderCard({post,val:key, authId:this.props.auth.userId, deleteFoodRequest: (id)=>this.deleteFoodPost(id)})
            })
        }else{
            return(
                <h3>No request exist at your location</h3>
            )
        }
        
    }

    render() {        
        return (
            <div>
                <FormHeader/>
                <ToastContainer/>
                <div className="forms__section--food">
                    <Container>    
                        <div className="form__heading">
                            <h2>Need Requests</h2>
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
        food_Requests: state.needRequests,
        auth:state.auth,
        foodRequestConfirmation: state.foodRequest 
    })

}

export default connect(mapStateToProps,{fetchRequests, deleteFoodRequest})(NeedRequest);
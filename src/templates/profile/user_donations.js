import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col, Image,Button,Form,Card,CardDeck} from 'react-bootstrap';
import Select from 'react-select'
import '../requests/pickup.css';
import {renderCard} from '../requests/request_cards.js'
import {foodTypes} from '../../variables';
import {GiKnifeFork} from 'react-icons/gi';
import {toast, ToastContainer} from 'react-toastify';
import {fetchUserRequests, deleteFoodRequest} from '../../actions/index'
import InfiniteScroll from 'react-infinite-scroll-component';

class UserDonations extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            limit:6,
            requestType:"Donate",
            formError:"",
            isLast:false,
            hasMore: true,
            data:[]
        }
    }

    fetchData = async()=>{
        if(!this.state.hasMore) return;
        const {owner} = this.props;
        let { data, limit, requestType, city, state, country, postalCode}= this.state;
        const skip = data.length;
        let apiData = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode, owner}
        await this.props.fetchUserRequests(apiData);
        if(this.props.food_Requests.message==="Success"){
            let newData = this.props.food_Requests.data.foodRequest;
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
    
    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);
    
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

    deleteFoodPost = async(id)=>{
        await this.props.deleteFoodRequest({id})
        console.log(id)
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

    filterFormValidation = ()=>{
        const {city, postalCode} = this.state;
        let error=false;
        if(!city&&!postalCode.trim()){
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
            // this.fetchData();
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
                <h3>No donation request found</h3>
            )
        }
        
    }

    render() {
        return (
            <div>
                        
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
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        food_Requests:state.donateRequests,
        auth:state.auth,
        foodRequestConfirmation: state.foodRequest
    })

}

export default connect(mapStateToProps,{fetchUserRequests, deleteFoodRequest})(UserDonations);
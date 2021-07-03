import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col, Image,Button,Form,Card,CardDeck} from 'react-bootstrap';
import Select from 'react-select'
import '../requests/pickup.css';
import {renderCard} from '../requests/request_cards.js'
import {foodTypes} from '../../variables';
import {toast, ToastContainer} from 'react-toastify';
import {fetchUserRequests, deleteFoodRequest} from '../../actions/index'
import InfiniteScroll from 'react-infinite-scroll-component';

class UserNeeds extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit:12,
            foodtype:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            requestType:"Need",
            tCount:"",
            posts:"",
            formError:"",
            hasMore: true,
            data:[]
        }
    }
    // fetchNextPosts = async ()=>{
    //     console.log(this.props);
    //     const {owner} = this.props;
    //     let {pageNo, limit, tCount, requestType, city, state, country, postalCode}= this.state;
    //     const skip = (pageNo)*limit;
    //     let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode, owner}
    //     await this.props.fetchUserRequests(data);
    //     if(this.props.food_Requests.message==="Success"){
    //         this.setState({
    //             tCount:this.props.food_Requests.data.count,
    //             posts: this.props.food_Requests.data.foodRequest,
    //             isLast:((skip+limit)>=this.props.food_Requests.data.count),
    //             pageNo: this.state.pageNo+1
    //         })
    //     }
    // }

    // fetchPrevPosts = async()=>{
    //     const {owner} = this.props;
    //     let {pageNo, limit, tCount, requestType, city, state, country, postalCode}= this.state;
    //     if(pageNo<=1)
    //         return;
    //     const skip = (pageNo-2)*limit;
    //     let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode, owner}
    //     await this.props.fetchUserRequests(data);
    //     if(this.props.food_Requests.message==="Success"){
    //         this.setState({
    //             tCount:this.props.food_Requests.data.count,
    //             posts: this.props.food_Requests.data.foodRequest,
    //             isLast:((skip+limit)>=this.props.food_Requests.data.count),
    //             pageNo: this.state.pageNo-1
    //         })
    //     }

    // }

    // fetchPosts = async()=>{
    //     const {owner} = this.props;
    //     const {pageNo, limit, requestType, city, state, country, postalCode}= this.state;
    //     let data = {Limit:limit, Skip:0, requestType, city, state, country, postalCode, owner}
    //     await this.props.fetchUserRequests(data);
    //     if(this.props.food_Requests.message==="Success"){
    //         this.setState({
    //             tCount:this.props.food_Requests.data.count,
    //             posts: this.props.food_Requests.data.foodRequest,
    //             pageNo:1,
    //             isLast:(limit>=this.props.food_Requests.data.count)

    //         })
    //     }
    // }

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
    
    // nextPage = async(e)=>{
    //     console.log("Next btn click")
    //     e.preventDefault();
    //     const {tCount, pageNo, limit} = this.state;
    //     if(tCount>pageNo*limit){
    //         this.fetchNextPosts();
    //     }
    // }

    // prevPage = async(e)=>{
    //     console.log("back btn click")
    //     e.preventDefault();
    //     const {tCount, pageNo, limit} = this.state;
    //     if(pageNo>1){
    //         this.fetchPrevPosts();
    //     }
    // }

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
            this.fetchPosts();
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
                <h3>No need request found</h3>
            )
        }
        
    }

    render() {
        return (
            <div>
                <ToastContainer/>
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
        food_Requests:state.needRequests,
        auth:state.auth,
        foodRequestConfirmation: state.foodRequest 
    })

}

export default connect(mapStateToProps,{fetchUserRequests, deleteFoodRequest})(UserNeeds);
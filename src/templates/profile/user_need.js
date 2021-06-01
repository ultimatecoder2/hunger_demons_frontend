import React, { Component } from 'react'
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import {Container, Row, Col, Image,Button,Form,Card,CardDeck} from 'react-bootstrap';
import Select from 'react-select'
import '../requests/pickup.css';
import {renderCard} from '../requests/request_cards.js'
import {foodTypes} from '../../variables';
import {GiKnifeFork} from 'react-icons/gi';
import {fetchUserRequests} from '../../actions/index'

class UserNeeds extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            city:"",
            state:"",
            country:"",
            postalCode:"",
            pageNo:0,
            limit:3,
            requestType:"Need",
            tCount:"",
            posts:"",
            formError:"",
            isLast:false
        }
    }
    fetchNextPosts = async ()=>{
        console.log(this.props);
        const {owner} = this.props;
        let {pageNo, limit, tCount, requestType, city, state, country, postalCode}= this.state;
        const skip = (pageNo)*limit;
        let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode, owner}
        await this.props.fetchUserRequests(data);
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
        const {owner} = this.props;
        let {pageNo, limit, tCount, requestType, city, state, country, postalCode}= this.state;
        if(pageNo<=1)
            return;
        const skip = (pageNo-2)*limit;
        let data = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode, owner}
        await this.props.fetchUserRequests(data);
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
        const {owner} = this.props;
        const {pageNo, limit, requestType, city, state, country, postalCode}= this.state;
        let data = {Limit:limit, Skip:0, requestType, city, state, country, postalCode, owner}
        await this.props.fetchUserRequests(data);
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
                <h3>No need request found</h3>
            )
        }
        
    }

    render() {
        const {pageNo, limit, tCount} = this.state;
        let mini = (pageNo-1)*limit + 1;
        if(tCount==0){
            mini = 0;
        }
        let maxi = Math.min(pageNo*limit , tCount)
        
        return (
            <div>
                        
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
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        food_Requests:state.needRequests,
        auth:state.auth
    })

}

export default connect(mapStateToProps,{fetchUserRequests})(UserNeeds);
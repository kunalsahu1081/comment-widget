import React, { Component } from 'react'
import Comment from './Comment'
import './CSSFILE/CommentBox.css'

export class Comments extends Component {

  constructor(props) {
    super(props)
  
    this.rerender = this.rerender.bind(this);
    this.state = {
      list :  (JSON.parse(localStorage.getItem('item')) || [])
    }

    this.updateComment = this.updateComment.bind(this);
  }



  rerender(){
   // console.log('first');
    this.setState((prevState)=>(
      {list: (JSON.parse(localStorage.getItem('item')) || [])}
    ),()=>this.forceUpdate())
    
   }

   updateComment(){

    const list = (JSON.parse(localStorage.getItem('item')) || [])
  
    list.sort((a,b)=>{
      return b.like - a.like;
    });
    localStorage.setItem('item',JSON.stringify(list));
    this.setState((prevState)=>(
      {list: (JSON.parse(localStorage.getItem('item')) || [])}
    ),()=>this.forceUpdate())
   }
  

  
  render() {

  

    return (
      <div>
        <span><button className='button' onClick={this.updateComment}> SortByLikes</button></span>
        {
            this.state.list.map((item) => {
                if(item.parent == 0) return <Comment key={item.id} item={item} rerender={this.rerender}/>
            })
        }
      </div>
    )
  }
}

export default Comments
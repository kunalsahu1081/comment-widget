import React, { Component } from 'react'
import './CSSFILE/CommentBox.css'


class CommentBox extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         comment :'' ,
         item : (JSON.parse(localStorage.getItem('item')) || []),
         maxind : (JSON.parse(localStorage.getItem('cur')) || 0)
      }

      this.updateText = this.updateText.bind(this);
      this.updateList = this.updateList.bind(this);
    }

    updateText(event){
        let wordLen = 200;
        let len = event.target.value.split(/[\s]+/);
           if(len.length < wordLen){
               this.setState({
                  comment : event.target.value
               })
           }
    }


    updateList(){

        const timeNow = new Date();

        this.setState((prevState)=>(
         { item : [...(JSON.parse(localStorage.getItem('item')) || []) , {
          id : +(this.state.maxind) + 1,
          name : 'kunal',
          parent : +(this.props.parent),
          comment : this.state.comment,
          time : timeNow,
          like:0
         }]}
        ),()=>{
          localStorage.setItem('item',JSON.stringify(this.state.item));
          localStorage.setItem('cur',JSON.stringify(+this.state.maxind + 1));
        })
        
    }

  render() {
    return (
      <div>
        <form className='Form-box' onSubmit={this.updateList}>
            <textarea className="comment-box" type="text" value={this.state.comment} height='45' onChange={this.updateText} placeholder='Add a new comment' rows='4'/>
            <button type='submit' className='button'>comment</button>
            
        </form>
        
        </div>
      )
}
}

export default CommentBox;
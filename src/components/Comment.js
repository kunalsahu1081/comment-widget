import React, { Component } from 'react'
import CommentBox from './CommentBox';
import './CSSFILE/CommentBox.css'

class Comment extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         Reply:false,
         commList: (JSON.parse(localStorage.getItem('item')) || [])
      }

      this.showReply = this.showReply.bind(this);
      this.delReply = this.delReply.bind(this);
      this.deleteAllReply = this.deleteAllReply.bind(this);
      this.delList = [];
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
    //  this.rerender = this.rerender.bind(this);

    }

    showReply(){
        this.setState((prevState)=>(
            {
                Reply : !prevState.Reply
            }
        ))
    }

    delReply(id){
        const list = (JSON.parse(localStorage.getItem('item')) || []);
        const index = id;
        this.delList.push(index);

        for(let i=0;i<list.length;i++){
            if(list[i].parent == index) this.delReply(list[i].id);
        }

    }

    increment(){
        const list = (JSON.parse(localStorage.getItem('item')) || []);
        for(let i=0;i<list.length;i++){
            if(list[i].id==this.props.item.id){
                list[i].like = +list[i].like + 1;
                break;
            }
        }
        localStorage.setItem('item',JSON.stringify(list));
        this.props.rerender();
    }

    decrement(){
        const list = (JSON.parse(localStorage.getItem('item')) || []);
        for(let i=0;i<list.length;i++){
            if(list[i].id==this.props.item.id){
                list[i].like = +list[i].like - 1;
                break;
            }
        }
        localStorage.setItem('item',JSON.stringify(list));
        this.props.rerender();
    }


    deleteAllReply(id){
        this.delReply(id)
        //console.log(this.delList);
        const nlist = [];
        const list = (JSON.parse(localStorage.getItem('item')) || []);
        for(let i = 0;i<list.length;i++){
            let s = true;
            for(let j=0;j<this.delList.length;j++){

                if(list[i].id==this.delList[j]) s = false;
            }
        
            if(s) nlist.push(list[i]);
        }
       // console.log(nlist.length,list.length);
        localStorage.setItem('item',JSON.stringify(nlist));
        this.props.rerender();
    }

  render() {

    const list = (JSON.parse(localStorage.getItem('item')) || []);

    return (
      <div className='Singlecomment'>
        <table className='comment-table'>
            <table-body>
            <tr>
                <td className='left'>
                    <i className="fa-brands fa-discord"></i>
                    <h6>{this.props.item.name}</h6>
                </td>
                <td className='right'>
                    <div className='info'>
                        <span className='time'>{this.props.item.time}</span>
                        <span className='item' onClick={this.increment}><i class="fa-solid fa-caret-up"></i></span>
                        <span className='item'>{this.props.item.like}</span>
                        <span className='item' onClick={this.decrement}><i class="fa-solid fa-caret-down"></i></span>
                    </div>
                    <div className='comment'>
                        <p>{this.props.item.comment}</p>
                    </div>
                    <button className='reply' onClick={this.showReply} >reply</button>
                    <i className="fa-solid fa-trash-can delete" onClick={()=>this.deleteAllReply(this.props.item.id)}></i>
                    <div hidden={!this.state.Reply}>
                        <CommentBox parent={this.props.item.id}/>
                    </div>
                    <ul>
                       { list.map((ite) => {
                            {if(ite.parent == this.props.item.id) return <Comment key={ite.id} item={ite} rerender={this.props.rerender}/>}
                        })}
                    </ul>
                </td>
            </tr>
            </table-body>
        </table>
      </div>
    )
  }
}

export default Comment
import './App.css';
import CommentBox from './components/CommentBox';
import Comments from './components/Comments';
import Newline from './components/Newline';
import { useState } from 'react';


function App() {

 // localStorage.removeItem('item');


  return (
    <div className="comments">
      <CommentBox autoFocus={false} parent={0} updateComment={SortByLikes}/>
      <Newline />
      <Comments />
    </div>
  );
}

export default App;

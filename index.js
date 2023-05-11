import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useState } from 'react';
import reportWebVitals from './reportWebVitals';

const array = [
{ key: "1", type: "person", value: "Peter" },
  { key: "2", type: "person", value: "John" },
  { key: "3", type: "person", value: "Oliver" },
  { key: "4", type: "animal", value: "Cat" },
  { key: "5", type: "animal", value: "Dog" },
];

function Object() {

  const [searchItem,setSearchItem]=useState("");
  const[searchResult,setSearchResult]=useState(array);

  const [newItem,setNewItem]=useState({key:'',type: '',value:''});

 
const [data,setData]=useState(array);
const [editItem,setEditItem]=useState({});

const handleChange=(e)=>{
  const{name,value}=e.target;
  setEditItem({...editItem,[name]:value});
};

const handleSubmit=(e)=>{
e.preventDefault();
const newData=data.map((item)=>{
  if(item.key===editItem.key){
    return editItem;
  }else{
    return item;
  }
});
setData(newData);
setEditItem({});
};
const handleEdit=(item)=>{
  setEditItem(item);
};
  const searchText=(event)=>{
    setSearchItem(event.target.value);
  };
  const clickButtonSearch=()=>{
const results = array.filter(item=>
          item.type.includes(searchItem)||
          item.value.includes(searchItem));
     setSearchResult(results);
  };
 const inputAdd = (event)=>{
const {name,value}=event.target;
setNewItem({...newItem,[name]:value});
   };
  
  const submitAdd=(event)=>{
    event.preventDefault();//ko load lại trang khi ấn nút Add
   setSearchResult([...searchResult,newItem]);//add new item to the array
    setNewItem({key:'',type: '',value:''});
  };
const dataDelete=(key)=>{
  const newArray = array.filter((item)=>item.key !== key);
  setSearchResult(newArray)
}
const handleClick=(value)=>{
  alert(`Clicked on ${value}`);
};

return(
  
  <div>

    <div>
      <input type='text' value={searchItem} onChange={searchText}></input>
      <button onClick={clickButtonSearch}>Search</button>
    </div>
    <div>
      <form onSubmit={submitAdd}>
        <input type='text' name='key' value={newItem.key} onChange={inputAdd} placeholder='Key'></input>
        <input type='text' name='type' value={newItem.type} onChange={inputAdd} placeholder='Type'></input>
        <input type='text' name='value' value={newItem.person} onChange={inputAdd} placeholder='Value'></input>
     <button type='submit'>Add</button>
      </form>
    </div>
    
     <div>
      {array.length > 0 ? ( //nếu có data, bắt đầu chạy bảng
         <table border={1}>
  <thead>
      <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Value</th>
  </tr>
  </thead>
  <tbody>
{searchResult.map((item)=>(
  <tr key={item.key}>
    
    <td>{item.key}</td>
      <td>{item.type}</td>
      <td>
        <button onClick={() => handleClick(item.value)}>{item.value}</button>
      </td>
      <td>
      <button onClick={() => dataDelete(item.key)}>Delete</button>
      </td>
      <td>
        <button onClick={()=>handleEdit(item)}>Edit</button>
      </td>

  </tr>
))}
  </tbody>
</table>

        )
       : (//nếu không có data
        <p>No Data</p>
      )}
      <div>
  <h2>Edit Form</h2>
  <form onSubmit={handleSubmit}>
    <h3>Key:</h3>
    <input type='text' name='key' value={editItem.key || ""} onChange={handleChange}></input>
    <h3>Type:</h3>
    <input type='text' name='type' value={editItem.type || ""} onChange={handleChange}></input>
    <h3>Value:</h3>
    <input type='text' name='value' value={editItem.value || ""} onChange={handleChange}></input>
<button type='submit'>Save</button>
  </form>
</div>
    </div>
  

</div>
);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Object></Object>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

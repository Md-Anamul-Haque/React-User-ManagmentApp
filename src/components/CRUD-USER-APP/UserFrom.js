import React, { useEffect, useState } from 'react';

const UserFrom = ({handleSubmitData,selectedUser,btnText}) => {
    const [user,setUser]=useState({
        username:'',
        email:''
    })
    const {username,email}=user;


    useEffect(() => {
        setUser(selectedUser)
      console.log(selectedUser);

    }, [selectedUser])


      
    const handleChange=(e)=>{
        const catchName=e.target.name;
        const catchValue=e.target.value;

        setUser((previusState)=>{
            return {...previusState, [catchName]:catchValue}
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        handleSubmitData(user);
        setUser({
            username:'',
            email:''
        })
    }

 
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={username} name='username' onChange={handleChange} placeholder='username' required/>
        <input type='email' value={email} name='email' onChange={handleChange} placeholder='email' required/>
        <button>{btnText}</button>
      </form>
    </div>
  )
}

UserFrom.defaultProps = {
    selectedUser:{
        id:'',username:'',email:''
    }
}

export default UserFrom

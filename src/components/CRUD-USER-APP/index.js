import React, { useEffect, useState } from 'react';

import './style.css';
import UserFrom from './UserFrom';
const COUD = () => {

  const [datas,setDatas]=useState('');
  const [isLoading,setIsloading]=useState(true);
  const [error,setError]=useState('');
  const [updateFlag,setUpdateFlag]=useState(false);
  const [selectedUser,setSelectedUser]=useState({id:'',username:'',email:''})
  const URL='https://rest-api-without-db.herokuapp.com/users/'; 
  
  const getAllUser=()=>{
    fetch(URL)
      .then((res)=>{
        if (res.ok) {
          return(res.json());
        }
        throw Error('data not get')
      })
      .then((data)=>{console.log(data.users);
        setDatas(data);
      })
      .catch((err)=>{
        console.log(err);
        setError(err)
      })
      .finally(()=>{
        setIsloading(false)
      })
  }

  const handleDelete=(id)=>{
    console.log(id);
    fetch(URL+id,{method:'DELETE'})
    .then((res)=>{
      if (res.ok) {
        getAllUser();
        return(res.json());      }
      throw Error('data not delete')
    }).catch((err)=>{
      console.log(err);
      setError(err)
    })
  }

  useEffect(()=>{
    getAllUser();
  },[])


  const AddUser=(user)=>{
    fetch(URL,{
      method:'POST',
      headers:{
        "Content-type":'application/json'
      },
      body:JSON.stringify(user)
    })
    .then((res)=>{
      if (res.ok) {
        getAllUser();
        return(res.json());
      }
      throw Error('data not add')
    }).catch((err)=>{
      console.log(err);
      setError(err)
    })
  }
  const handleEdit=(clickid)=>{
    const filterData=datas.users.filter((user)=>user.id===clickid);
    const {id,username,email}=filterData[0];
    setSelectedUser({id,username,email});
    setUpdateFlag(true)
  }
  const handleUpdate=(user)=>{
    fetch(URL+user.id,{
      method:'PUT',
      headers:{
        "Content-type":'application/json'
      },
      body:JSON.stringify(user)
    })
    .then((res)=>{
      if (res.ok) {
        getAllUser();
        return(res.json());
      }
      throw Error('data not add')
    }).catch((err)=>{
      console.log(err);
      setError(err)
    })
  }
  return (
    <div>
      <h1>COUD page</h1>
      {console.log('hhhhhh',selectedUser)}
      {updateFlag ? 
      <UserFrom btnText='Update user' handleSubmitData={handleUpdate} selectedUser={selectedUser} /> : 
      <UserFrom btnText='Add user' handleSubmitData={AddUser} />}

        {isLoading && <h2>loading...</h2>}
        {error && <h2>{error}</h2>}
            <div className='cards'>
              {datas && datas.users.map((user)=>{
                const {id,username,email}=user;
                return(
                  <section className='card' key={id}>
                  <h2>name: {username}</h2>
                  <p>{email}</p>
                  <button className='btn' onClick={()=>{handleEdit(id)}}>Edit</button>
                  <button className='btn' onClick={()=>{handleDelete(id)}}>delete</button>
                </section>
                )
              })}
            </div>
      
    </div>
  )
}

export default COUD

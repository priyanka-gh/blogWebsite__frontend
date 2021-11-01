import React,{useState, useEffect} from 'react'
import {isAuthenticated} from '../index'
import {getAllUsers} from '../apicalls'
import './AllUsers.css'
import {useHistory} from 'react-router-dom'

const AllUsers = () => {
    const {user, token} = isAuthenticated()

    const [users, setUsers] = useState([]);
    const [items, setItems] = useState('')
    const preload = () => {    
        getAllUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                 setUsers(data);
            }
        });
    };
    
    useEffect(() => {
    preload();
    },[]);
    
    let history=useHistory();

    var openUser = (id) => {
        history.push({
            pathname : `/thisUserBlogs`,
            state : {detail : id }
        })
    }
    return (
        <div className="allusers">
            <form className="search">
            <input  onChange={(e) => setItems(e.target.value)}></input>
            </form>
            <div className="innerallUsers">
            {users?users.filter((val) => val.name.toLowerCase().includes(items.toLowerCase()))
            .map((val, key) => {
                return (
                    <div>
                        {val.role==0?
                        <div className="userNames" onClick={function(){openUser(val._id)}} key={key}>
                            <h4>{val.name}</h4>
                            <h4>{val.email}</h4>
                        </div>:" "}
                    </div>
                )
            })
            :" "
            }
            </div>
        </div>
    )
}

export default AllUsers


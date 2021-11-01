import React,{useEffect, useState} from 'react'
import './Navbar.css'
import {signout,isAuthenticated} from '../index'
import {Link, useHistory } from 'react-router-dom'

const Homepage = () => {
    const history=useHistory()

    const [loggedIn,setLoggedIn]=useState(false);

    useEffect(() => {
        isAuthenticated()?setLoggedIn(true):setLoggedIn(false)
    },[])

        const [colorChange, setColorchange] = useState(false);
        const changeNavbarColor = () =>{
           if(window.scrollY >= 300){
             setColorchange(true);
           }
           else{
             setColorchange(false);
           }
        };
        window.addEventListener('scroll', changeNavbarColor);
    return (
        <div>
            <div className="top">
                <div className={colorChange ? 'navbar colorChange' : 'navbar'}>
                    {
                        <a className='ecrire' href="/">écrire</a>
                    }
                    <div className="insideNav" >
                    {<Link to ='/allUsers' className="link">Users</Link>}
                        {!loggedIn && (
                        <Link to='/login' className="link">Login</Link>
                            )}
                            {!loggedIn && (
                                <Link to='/signup' className="link">Signup</Link>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role===0 && (
                                <Link to='/myAllBlogs' className="link">My Work</Link>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <Link to = '/admin/dashboard'
                                    className="link">
                                    Dashboard
                                </Link>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <Link to = '/manageCat'
                                    className="link">
                                    Manage Categories
                                </Link>
                            )}
                            {loggedIn && (
                                <Link to='/'  
                                className="link"
                                onClick={()=>{
                                    signout(()=>{
                                        history.push("/")
                                        window.location.reload();

                                    });
                                }}>
                                Signout</Link>
                            )}
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage

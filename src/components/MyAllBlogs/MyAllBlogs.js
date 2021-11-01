import React,{useState,useEffect} from 'react'
import './MyAllBlogs.scss'
import {useHistory} from 'react-router-dom'
import { FaEdit} from "react-icons/fa";
import { RiDeleteBin6Line} from "react-icons/ri";
import {getMyBlogs} from '../apicalls'
import {isAuthenticated} from '../index'
import {deleteBlog} from '../apicalls'

const MyAllBlogs = () => {
let history=useHistory();

function selectBlog(){
    history.push('/post')
}

const [blogs, setBlogs] = useState([]);

const { user, token } = isAuthenticated();

const preload = () => {

    getMyBlogs(user._id,token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  useEffect(() => {
    preload();
  });

  function truncate(str,n){
    return str?.length>n?str.substr(0,n-1)+"...":str;
    }

  let updatedEntry=blogs?.map(entry=>{
    var created_date=new Date(entry.createdAt);
    var updated_date=new Date(entry.updatedAt);
    var months=['Jan','Feb','March','April','May','June','July','August','Sept','Oct','Nov','Dec'];        
    var year=created_date.getFullYear();
    var month=months[created_date.getMonth()];
    var date=created_date.getDate();
    var hour=created_date.getHours();
    var min=created_date.getMinutes();
    var sec=created_date.getSeconds();
    var year2=updated_date.getFullYear();
    var month2=months[updated_date.getMonth()];
    var date2=updated_date.getDate();
    var hour2=updated_date.getHours();
    var min2=updated_date.getMinutes();
    var sec2=updated_date.getSeconds();
    var time=date+','+month+' '+year+' '+hour+':'+min+':'+sec;
    var time2=date2+','+month2+' '+year2+' '+hour2+':'+min2+':'+sec2;

    return{
        createdAt: time,
        updatedAt: time2,
    }

})

var openBlog=(prop, author)=>{
    history.push({
        pathname:`/details/${prop}`,
        state : {detail : prop, auth : author, time : updatedEntry[0].createdAt }
    })
}
  
    const deleteThisBlog = (blogId) => {
        deleteBlog(user._id,blogId,token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            window.location.reload();
            setBlogs(data);
        }       
        });
      };
      
      const updateThisBlog=(blog)=>{
        history.push({
            pathname: '/updateBlog',
            state : {detail : blog}
        })
      }

    return (
        <div className="myAllBlogs"> 
        <div className="innerClass"> 
            <button className="createNew" onClick={selectBlog}>Create New</button>
                    {
                        blogs.map((blog)=>{
                            return(
                                <div className="allBlogCard2" >
                                    <div className='myBlogsHeader'>{updatedEntry[0].createdAt}</div>
                                    <div  className="myBlogsBody">
                                    <div className="blogArea" onClick={function(){openBlog(blog._id, blog.author.name)}}>
                                            <h3 className="blogTitle">
                                                {truncate(blog.title,40)}</h3>
                                                <p className="blogContent">
                                                    {truncate(blog.content,100)}
                                                </p>
                                    </div>
                                    <div className="blogIcon">
                                        <FaEdit className="editIcon" onClick={function(){updateThisBlog(blog)}}/>
                                        <RiDeleteBin6Line className="delIcon" onClick={function(){deleteThisBlog(blog._id)}}/>
                                    </div>
                             </div>
                                </div>
                            )
                        })
                    }
                </div>  
        </div>
    )
}

export default MyAllBlogs

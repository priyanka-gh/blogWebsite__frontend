import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {showAllBlogs,deleteBlogbyAdmin} from '../apicalls'
import {isAuthenticated} from '../index'
import { RiDeleteBin6Line} from "react-icons/ri";
import './DeleteBlogs.css'
const DeleteBlogs = () => {

    let history=useHistory();

    function selectBlog(){
        history.push('/post')
    }
    
    const [blogs, setBlogs] = useState([]);
    
    const { user, token } = isAuthenticated();
    
    const preload = () => {    
        showAllBlogs().then(data => {
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

    var openBlog=(prop)=>{
        history.push({
            pathname:'/thisblog',
            state : {detail : prop, time : updatedEntry[0].createdAt }
            // state: { detail : blog._id}
        })
    }
      
    const deleteThisBlog = (blogId) => {
        deleteBlogbyAdmin(user._id,blogId,token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            window.location.reload();
            setBlogs(data);
        } ;
    });
    };

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
                pathname:'/details',
                state : {detail : prop, auth : author, time : updatedEntry[0].createdAt }
            })
        }
        
    return (
        <div>
        <div className="myAllBlogs"> 
        <div className="innerClass"> 
            {
                blogs.map((blog)=>{
                    return(
                        <div className="allBlogCard2" >
                            <div className='myBlogsHeader'>Created at {updatedEntry[0].createdAt} by {blog.author.name}</div>
                            <div  className="myBlogsBody" onClick={function(){openBlog(blog._id, blog.author.name)}}>
                            <div className="blogArea">
                                <h3 className="blogTitle">
                                    {truncate(blog.title,40)}</h3>
                                    <p className="blogContent">
                                    {truncate(blog.content,200)}
                                    </p>
                            </div>
                            </div>
                            <div className="deleteIcon">
                                <RiDeleteBin6Line className="delIcon" onClick={function(){deleteThisBlog(blog._id)}}/>
                            </div>

                        </div>
                    )
                })
            }
            </div>  
        </div>
        </div>
    )
}

export default DeleteBlogs

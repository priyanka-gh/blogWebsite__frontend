import React, {useState, useEffect} from 'react'
import './Browse.css'
import {showAllBlogs, allCategories} from '../apicalls'
import ImageHelper from '../helper/imageHelper'
import {useHistory} from 'react-router-dom'
import "aos/dist/aos.css"

const Browse = () => {
    let history = useHistory()

    const [blogs, setBlogs] = useState([])
    const [categories, setCategories] = useState([])
    const showBlogs = () => {    
        showAllBlogs().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
                // console.log('dats ',data)
            }
        })
    };
    
    const showCategories = () =>{
        allCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        })
        
    }

    useEffect(() => {
        showCategories()
        showBlogs()  
    },[])

    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+"...":str;
    }


    var openBlog=(prop, author)=>{
        history.push({
            pathname:'/details',
            state : {detail : prop, auth : author, time : updatedEntry[0].createdAt }
        })
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

    const [tag,setTag]=useState('all')
    const [filtered,setFiltered]=useState([])


    useEffect(()=>{
        tag==='all'?
        setFiltered(blogs)
        :
        setFiltered(blogs.filter(blog => blog.category.name===tag))
    },[tag])

    const TagButton=({name,handleSetTag,tagActive})=>{
        return <button className="submit" onClick={
            ()=>{
                handleSetTag(name)
                } }>
            {name.toUpperCase()}
            
        </button>
    }

    return (
        <div className="browsediv" handleSetTag={setTag}>
            <div className="TagButton" >
            {categories.map((category) => {
                return (
                    <div className = "indTag">
                    <TagButton name = {category.name} handleSetTag = {setTag} tagActive={tag===category.name?true:false}></TagButton>
                    </div>
                )
            })}
                    <TagButton name = 'all' handleSetTag = {setTag} tagActive={tag==='all'?true:false}></TagButton>

            </div>
            <ul class="cards2">
                {filtered.map((card) => {
                return (
                    <div data-aos="zoom-in">
                    {console.log(card)}

                    <li>
                    <a onClick={function(){openBlog(card._id, card.author.name)}} class="card">
                    <ImageHelper card = {card}></ImageHelper>
                    <div class="card__overlay">
                        <div class="card__header">
                        <div class="card__header-text">
                            <h3 class="card__title">{truncate(card.title,30)}</h3>            
                            <span class="card__category">{card.category.name}</span>
                        </div>
                        </div>
                        <p class="card__description">{truncate(card.content,50)}</p>
                    </div>
                    </a>
                    </li>
                    </div> 
                    )
                    })}  
            </ul>
        </div>
    )
}

export default Browse

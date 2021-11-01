import React,{useState,useEffect} from 'react'
import './Home.css'
import Aos from 'aos';
import {useHistory} from 'react-router-dom'
import "aos/dist/aos.css"
import {isAuthenticated} from '../index'
import {showAllBlogs} from '../apicalls'
import ImageHelper from '../helper/imageHelper'
import ImageHelperBanner from '../helper/imageHelperBanner';
const Home = () => {
    
    let history=useHistory();
        
    function selectBlog(){
        history.push('/post')
    }
    
    Aos.init({
        offset: 120, // offset (in px) from the original trigger point
        // delay: 500, // values from 0 to 3000, with step 50ms
        duration: 1000 // values from 0 to 3000, with step 50ms
    });

    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+"...":str;
    }

    const { user } = isAuthenticated();

    const [blogs, setBlogs] = useState([]);

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
    },[]);

    var openBlog=(prop, author)=>{
        history.push({
            pathname:`/details/${prop}`,
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

    return (  
        <div class="home">
            {/* <div className="main-div">
                <div className="first">W</div>
                <div className="second">E</div>
                <div className="third">L</div>
                <div className="forth">C</div>
                <div className="fifth">O</div>
                <div className="sixth">M</div>
                <div className="seventh">E</div>
            </div> */}
            <div data-aos="zoom-in">
            <div className="upperHomeStart overlay">
            <a onClick={function(){openBlog(blogs?blogs[blogs.length-1]._id:" ", blogs?blogs[blogs.length-1].author.name:" ")}} class="cardTop">
                {blogs.length!=0?
                    <div className="upperHome">
                        <ImageHelperBanner card = {blogs[blogs.length-1]} class="bgphoto"></ImageHelperBanner>
                    </div>
                    : 
                    <div className="upperHome2">
                    </div>
                }
                {blogs.length!=0?
                    <div className="upperHomeContent">
                    <div className="upperHomeTitle">
                        {truncate(blogs?blogs[blogs.length-1].title:" ",20)}
                    </div>
                    {truncate(blogs?blogs[blogs.length-1].content:" ", 900)}
                    </div>
                    :
                    <div className="upperHomeContent2">
                    </div>
                    }
            </a>
            </div>
            </div>
            <div className="lowerHome">
            <div data-aos="zoom-in">
            <svg width = "100%" height = "100%">
                {blogs.length!=0 ? 
                    <text x="50%" y="60%"  text-anchor="middle">
                        Recent Stories
                    </text> : " "
                }
            </svg>
            </div>


            <ul class="cards">
                {blogs.slice(-4).reverse().map((card) => {
                return (
                    <div data-aos="flip-left">
                    <li>
                    <a onClick={function(){openBlog(card._id, card.author.name)}} class="card">
                    <ImageHelper card = {card}></ImageHelper>
                    <div class="card__overlay">
                        <div class="card__header">
                        <div class="card__header-text">
                            <h3 class="card__title">{truncate(card.title,15)}</h3>            
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

                <button onClick={function(){history.push('/Browse')}} className = "browse">Browse</button>
            </div>
        </div>
        
    )
}

export default Home

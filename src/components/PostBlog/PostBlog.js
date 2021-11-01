import React,{useState, useEffect, formData} from 'react'
import './PostBlog.scss'
import CheckIcon from '@material-ui/icons/CheckCircle';
import Pick from '../ImagePick/ImagePick'
import {createBlog, getCategories} from '../apicalls'
import {isAuthenticated} from '../index'
import {Link,useHistory} from 'react-router-dom'
import { API } from '../../backend';
var FormData = require('form-data');

const Post = () => {

    const history=useHistory()
    var openBlog=(prop)=>{
        history.push({
            pathname:'/thisblog',
        })
    }
    const {user,token}=isAuthenticated();

    const [values, setValues] = useState({
        title : "",
        content : "",
        category : "",
        categories : [],
        author : "",
        createdBlog : "",
        photo: "",
        formData : ""
    })

    const{title, content, category, categories, author, photo, formData}=values;

    const preload=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error:data.error});
                console.log('error hai ')
            }else{
                setValues({...values,categories: data,formData: new FormData()});
                console.log('CATEGORY ',categories)
            }
        });
    };

    useEffect(() => {
        preload()
    }, [])

    
        
    const handleChange=name=>event=>{
        const value=name==="photo"?event.target.files[0]:event.target.value;
        formData.set(name,value);
        setValues({...values, [name]:value});
        console.log('frrmmmmm ',formData)
    }

    const onSubmit=event=>{
        console.log('onsub trigger ', formData)
        event.preventDefault();
        formData.set('author', user._id);

        setValues({...values,error:""})
        createBlog(user._id,token,formData).then(data=>{
            console.log('hehrhehehhe ',formData)
          if(data.error)
          {
            setValues({...values,error:data.error})
            setTimeout(function(){
                window.location.href = '/failPost';
             }, 1000);
          }
          else
          {
            setValues({
              ...values,
              title : " ",
              content : " ",
              category : " ",
              photo : " ",
              createdBlog : data.name
            })
            setTimeout(function(){
                window.location.href = '/successPost';
             }, 1000);
          }
          
        })
    }

    return (
        <div className="postPick">
            <div className="textPost">
                <div className="upperInfo">
                    <input className="title link" type="text" placeholder="Title" onChange={handleChange("title")}></input>
                    <div className="select">
                        <select
                        onChange={handleChange("category")}
                        placeholder="Category"
                        name = "format"
                        id = "format"
                        >
                        <option>Select</option>
                        {categories && categories.map((cate,index)=>(
                            <option key={index} value={cate._id}>
                                {cate.name}
                            </option>
                        ))}
                        </select>
                    </div>
                    <input 
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                        className="inpChoose"  
                        id= "file"/>
                        <label for="file" class="btn-1">upload file</label>
                </div>
                <textarea className="content" type="text" onChange={handleChange("content")}></textarea>
                <button className="submitPost" type="submit"  onClick={onSubmit} ><CheckIcon/></button>
            </div>
        </div>
    )
}

export default Post

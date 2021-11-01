import React,{useState, useEffect, formData} from 'react'
import './UpdateBlog.scss'
import CheckIcon from '@material-ui/icons/CheckCircle';
import {createBlog, getCategories, updateProduct, getThisBlog} from '../apicalls'
import {isAuthenticated} from '../index'
import {useHistory, useLocation} from 'react-router-dom'
var FormData = require('form-data');

const UpdateBlog = ({ match }) => {

    const history=useHistory()
    const location = useLocation()

    const blog=location.state.detail;
    const blogId=blog._id

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

    const{title, content, category, categories, createdBlog, photo,  formData}=values;

    const preloadCategories = () => {
      getCategories().then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            categories: data,
            formData: new FormData()
          });
        }
      });
    };

    const preload = blogId => {
        getThisBlog(blogId).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            title: data.title,
            content: data.content,
            category: data.category.name,
            formData: new FormData()
          });
          preloadCategories();
        }      
      });
    };

    useEffect(() => {       
        preload(blogId);
      }, []);
 
    const handleChange=name=>event=>{
        const value=name==="photo"?event.target.files[0]:event.target.value;
        formData.set(name,value);
        setValues({...values, [name]:value});
    }

    const onSubmit=event=>{
        event.preventDefault();
        formData.set('author', user._id);

        setValues({...values,error:""})
        updateProduct(blogId, user._id, token, formData).then(data=>{
            console.log('hehrhehehhe ',formData)
          if(data.error){
            setValues({...values,error:data.error})
          }else{
            setValues({
              ...values,
              title : " ",
              content : " ",
              category : " ",
              photo : " ",
              createdBlog : data.name
            })
            setTimeout(function(){
              window.location.href = '/successUpdate';
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

export default UpdateBlog

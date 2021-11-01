import {API} from "../backend"


export const createBlog=(userId,token,blog)=>{
    console.log("blg ",blog)

    return fetch(`${API}/blogs/create/${userId}`,{
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
        body: blog
    })
    .then(response => {
        console.log("success ",response)
        return response.json();
    })
    .catch(err=>console.log("err"))
}

//done
export const showAllBlogs=()=>{
    return fetch(`${API}/blogs`,{
        method:"GET"
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err))
}

//done
export const getThisBlog=(blogId,token)=>{
    return fetch(`${API}/blogs/${blogId}`,{
        method:"GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err))
}

//done
export const getMyBlogs=(userId,token)=>{
    return fetch(`${API}/blogs/all/${userId}`,{
        method:"GET",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then(res=>{
        return res.json()
    }).catch(err=>{console.log(err)})
}

export const getUsersBlogs=(userId)=>{
    return fetch(`${API}/blogs/all/${userId}`,{
        method:"GET",
    }).then(res=>{
        return res.json()
    }).catch(err=>{console.log(err)})
}

export const getAllUsers=()=>{
    return fetch(`${API}/users`,{
        method:"GET",
    }).then(res=>{
        return res.json()
    }).catch(err=>{console.log(err)})
}

export const deleteBlog=(userId,blogId,token)=>{
    return fetch(`${API}/blogs/remove/${userId}/${blogId}`,{
        method:"DELETE",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err))
}

export const getAllBlogsByUser = (userId) => {

    return fetch(`${API}/blogs/all/${userId}`, {
        method : "GET",
    }).then(res => {
        return res.json()
    }).catch(err => console.log(err))
}

export const updateProduct = (blogId, userId, token, blog) =>{
    return fetch(`${API}/blogs/update/${userId}/${blogId}` , {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: blog
    }).then(response => {
    console.log('updated blog ',response)
        return response.json();
    })
    .catch(err => console.log(err));    
}

//delete by admin
export const deleteBlogbyAdmin=(userId,blogId,token)=>{
    return fetch(`${API}/blogs/removeByAdmin/${userId}/${blogId}`,{
        method:"DELETE",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then(res=>{
        return res.json();
    }).catch(err=>console.log(err))
}

// export const likePost = (blogId) => {
//     return fetch(`${API}/blogs/likePost/${blogId}`,{
//         method : "PUT",
//     }).then(response=>{
//         return response.json();
//     }).catch(err=>console.log(err));
// }

export const getCategories=()=>{
    return fetch(`${API}/categories`,{
        method : "GET"
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err));
};

export const likePost = (userId, blogId, token) => {
    return fetch(`${API}/${userId}/${blogId}`,{
        method : "POST",
        headers : {
            Authorization : `Bearer ${token}`
        }
    }).then(response=>{
        console.log("rezponse ",response)
        return response.json();
    }).catch(err=>console.log(err));
}

export const deleteLike = (likeId) => {
    return fetch(`${API}/likes/delete/${likeId}`,{
        method : "DELETE",
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err));
}

export const getLike = (userId, blogId) => {
    return fetch(`${API}/like/${userId}/${blogId}`,{
        method : "GET",
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err));
}

export const totalLikes = (blogId) => {
    return fetch(`${API}/likes/${blogId}`,{
        method : "GET"
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err));
}

export const allCategories = (blogId) => {
    return fetch(`${API}/categories`,{
        method : "GET"
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err));
}

export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
       
    body: JSON.stringify(category)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>console.log(err));
}

export const deleteThisCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
import { Link, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { useEffect } from "react"
import { getPostById, removeWatchingBlog } from "../../redux/slice/blogsSlice"
import s from "./PostDetail.module.scss"
import { CircularProgress } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteIcon from "@mui/icons-material/Delete"
import { removeBlog } from "../../redux/slice/blogsSlice"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

interface Post {
    _id: string,
    title: string,
    text: string,
    image: string,
    user: {
        _id: string,
        login: string,
        password: string,
        role: string,
        avatar: string,
        posts: string[],
        createdAt: string,
        likes: string[],
        comments: string[],
    }
    likes: string[],
    createdAt: string,
    comments: string[],
}

const Index = () => {

    const dispatch = useAppDispatch()
    const userId = Cookies.get("userId")
    const blog: Post | any = useAppSelector(state => state.blogs.watchingBlog)
    const status: Post | any = useAppSelector(state => state.blogs.status)
    const { postID } = useParams()
    const url = "http://localhost:5000/"
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPostById(postID))

        return () => {
            dispatch(removeWatchingBlog())
        }
    }, [postID])

    const handleRemove = () => {
        dispatch(removeBlog(blog._id))

        if(status === "succeded") {
            navigate("/")
        }
    };

    return (
        <>
            {blog ? (
            <div className={s.main}>
                <div className={s.content}>
                    <div className={s.user_info}>
                        <Link to={`/profile/${blog.user._id}`}>
                        <div>
                            <img src={blog.user.avatar && url + blog.user.avatar} alt="" />
                            <p>{blog.user.login}</p>
                        </div>
                        </Link>
                        <div className={s.dropDown}>
                            {blog.user._id === userId &&
                                <>
                                    <MoreHorizIcon className={s.edit} color='primary' />
                                    <div className={s.dropDownContent}>
                                        <Link to={`/change-post/${blog._id}`}>
                                            <p>
                                                Изменить <EditIcon />
                                            </p>
                                        </Link>
                                        <p onClick={handleRemove}>
                                            Удалить <DeleteIcon />
                                        </p>
                                    </div>
                                </>
                            }
                    </div>
                </div>
                    <div className={s.post_info}>
                        <h1>{blog.title}</h1>
                        <img src={blog.image && url + blog.image} alt="" />
                        <p dangerouslySetInnerHTML={{__html: blog.text.split("\n").join("<br />")}}></p>
                    </div>
                </div>
            </div>
            ) : (
                <div className={s.content} 
                    style={{height: 400, display: "flex", justifyContent: "center", alignItems: 'center'}}>
                    <CircularProgress size={100}/>
                </div>
            )}
        </>
    )
}

export default Index
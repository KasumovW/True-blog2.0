import s from "./Profile.module.scss"
import Cookies from 'js-cookie'
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUserByID, removeUserId } from '../../redux/slice/userSlice'
import UserInfo from "../../components/Profile"
import { CircularProgress } from "@mui/material"

type Props = {}

interface userInfo {
  login: string,
  role: string,
  avatar: string,
  posts: string[],
  likes: string[],
  id: string
}

const Index = (props: Props) => {

  let user = {}

  const {userID} = useParams()

  if(userID) {
      const dispatch = useAppDispatch()

      useEffect(() => {
        if(userID) {
            dispatch(getUserByID(userID))
        }

        return () => {
             dispatch(removeUserId())
        }
      }, [])

      const userInfo: userInfo | any = useAppSelector((state) => state.user.watchingUser)
  
      const {userID} = useParams()

      user = userInfo
  } else {
    const login: any = Cookies.get('login'),
      // id: any = Cookies.get('userId'),
      avatar: any = Cookies.get('avatar'),
      posts: any =Cookies.get('posts'),
      likes: any = Cookies.get('likes'),
      role: any = Cookies.get('role'),
      url = "http://localhost:5000/"

    const postsArr: string[] = Array.from(posts.split(','))
    const likesArr: string[] = Array.from(likes.split(','))

    user = {
      login, avatar: url + avatar, id: userID, posts: postsArr, likes: likesArr, role
    }
  }

  return (
    <div className={s.main}>
      {user ?
        <UserInfo user={user} />
      : <CircularProgress />}
    </div>
  )
}

export default Index
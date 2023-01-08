import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from "./Profile.module.scss"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Camera from '@mui/icons-material/CameraAlt'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUserByID } from '../../redux/slice/userSlice'
import UserInfo from "../../components/Profile"

type Props = {}

interface userInfo {
    login: string,
    role: string,
    avatar: string,
    posts: string[],
    likes: string[]
}

const Index = (props: Props) => {
    
    const [file, setFile] = useState<any>()

    const inputFile = useRef<any>(null)
    const dispatch = useAppDispatch()
    const userInfo: userInfo | any = useAppSelector((state) => state.user.watchingUser)

    const checkfile = () => {
        console.log(inputFile.current.files[0])

        if(inputFile) {
            setFile(inputFile.current.files[0])
        }
    }

    const login: any = Cookies.get('login'),
        avatar: any = Cookies.get('avatar'),
        posts: any =Cookies.get('posts'),
        likes: any = Cookies.get('likes'),
        role: any = Cookies.get('role'),
        url = "http://localhost:5000"

    const postsArr: string[] = Array.from(posts.split(','))
    const likesArr: string[] = Array.from(likes.split(','))

    const user = {
        login, avatar, posts: postsArr, likes: likesArr, role
    }

  return (
    <div className={s.main}>
        <UserInfo user={user} />
    </div>
  )
}

export default Index
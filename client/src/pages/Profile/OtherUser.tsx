import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import s from "./Profile.module.scss"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { CircularProgress } from '@mui/material'
import Camera from '@mui/icons-material/CameraAlt'
import Cookies from 'js-cookie'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getUserByID } from '../../redux/slice/userSlice'
import UserInfo from "../../components/Profile"

type Props = {}

interface userInfo {
    login: string,
    role: string,
    posts: string[],
    likes: string[]
}

const OtherUser = (props: Props) => {
    
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

    const {userID} = useParams()

    useEffect(() => {
        if(userID) {
            dispatch(getUserByID(userID))
        }
    }, [])

  return (
    <div className={s.main}>
        {userInfo ? 
        <UserInfo login={userInfo.login} avatar={userInfo.avatar}/> :
        <div className={s.user_info}><CircularProgress style={{margin: "auto"}} /></div>
        }
    </div>
  )
}

export default OtherUser
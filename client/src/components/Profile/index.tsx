import { useEffect, useRef, useState } from 'react'
import s from "./Profile.module.scss"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Camera from '@mui/icons-material/CameraAlt'
import { Button, CircularProgress, Input } from '@mui/material'
import { editUser } from '../../redux/slice/userSlice'
import { useAppDispatch } from '../../hooks/redux'
import Cookies from 'js-cookie'

type User = {
    user: {
        login: string,
        role: string,
        avatar: string,
        posts: string[],
        likes: string[],
        id: string
    }
}

const Index = (props: User | any) => {

    const {posts, likes, id} = props.user
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState<any>(props.user.login),
        [avatar, setAvatar] = useState<any>(props.user.avatar),
        [changeData, setChangeData] = useState<{login: string, file: File | undefined}>({
        login: login,
        file: undefined
    }),
        [isEditing, setIsEditing] = useState<boolean>(false),
        [preview, setPreview] = useState<any>(null)

    const inputFile = useRef<any>(null),
        url = "http://localhost:5000/"

    const checkfile = () => {
        if(inputFile) {
            setChangeData({...changeData, file: inputFile.current.files[0]})
        }
        var file = inputFile.current.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);

      
        reader.onloadend = function () {
            setPreview(reader.result)
        }
        setIsEditing(true)
    }

    const checkLogin = (e: any) => {
        console.log(e)
        setChangeData({...changeData, login: e.target.value})
    }

    const edit = () => {
        setIsEditing(!isEditing)
    }

    const sendData = () => {
        dispatch(editUser(changeData))
        setIsEditing(false)
        if(changeData.file) {
            setAvatar(preview)
        }
        if(changeData.login) {
            setLogin(changeData.login)
        }
    }

    const userId = Cookies.get("userId")

    console.log(id, userId)
    
    return ( 
        <div className={s.user_info}>
            <input id='file' type="file" className={s.user_file_input} ref={inputFile} onChange={checkfile}/>
            <div className={s.avatar}>
                {id === userId && 
                <label className={s.label} htmlFor="file">
                    <Camera />
                </label>
                }
                <img src={avatar} alt="" />
                {isEditing && <img className={s.preview_image} src={preview} alt="" />}
            </div>
            <div className={s.user_extra_info}>
                <div className={s.flex_container}>
                    <div>
                        <h1 className={s.user_name}>
                            {!isEditing && login} 
                            <Input type="text" className={isEditing ? `${s.user_name_input + " " + s.show}` : s.user_name_input} onChange={(e) => checkLogin(e)} value={changeData.login}/>
                            {id === userId && <BorderColorIcon className={s.pen} color='primary' onClick={edit}/>}
                        </h1>
                        <p className={s.created_at}>
                            ???????? ????????????????: <span>04.03.2023</span>
                        </p>
                    </div>
                    <p className={s.publications}>
                        {posts.length}
                        <span>????????????????????</span>
                    </p>
                </div>
                {isEditing &&
                <div className={s.button_wrapper}>
                    <Button onClick={sendData} className={s.submit_button} variant='contained'>??????????????????????</Button>
                </div>
                }
            </div>
        </div>
    )

}

export default Index
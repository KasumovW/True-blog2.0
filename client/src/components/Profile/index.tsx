import { useEffect, useRef, useState } from 'react'
import s from "./Profile.module.scss"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Camera from '@mui/icons-material/CameraAlt'
import { Button, Input } from '@mui/material'
import { editUser } from '../../redux/slice/userSlice'
import { useAppDispatch } from '../../hooks/redux'

type User = {
    user: {
        login: string,
        role: string,
        avatar: string,
        posts: string[],
        likes: string[]
    }
}

const Index = (props: User) => {

    const {login, avatar, posts, likes} = props.user
    const dispatch = useAppDispatch()
    
    const [changeData, setChangeData] = useState<{login: string, file: File | undefined}>({
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
    }

    // useEffect(() => {
        // create the preview
        // const objectUrl = URL.createObjectURL(inputFile)
        // setPreview(objectUrl)
     
        // free memory when ever this component is unmounted
    //     return () => URL.revokeObjectURL(objectUrl)
    //  }, [inputFile])

    return (
    <div className={s.user_info}>
        <input id='file' type="file" className={s.user_file_input} ref={inputFile} onChange={checkfile}/>
        <div className={s.avatar}>
            <label className={s.label} htmlFor="file">
                <Camera />
            </label>
            <img src={url + avatar} alt="" />
            {isEditing && <img className={s.preview_image} src={preview} alt="" />}
        </div>
        <div className={s.user_extra_info}>
            <div className={s.flex_container}>
                <div>
                    <h1 className={s.user_name}>
                        {!isEditing && login} 
                        <Input type="text" className={isEditing ? `${s.user_name_input + " " + s.show}` : s.user_name_input} onChange={(e) => checkLogin(e)} value={changeData.login}/>
                        <BorderColorIcon className={s.pen} color='primary' onClick={edit}/>
                    </h1>
                    <p className={s.created_at}>
                        Дата создания: <span>04.03.2023</span>
                    </p>
                </div>
                <p className={s.publications}>
                    {posts.length}
                    <span>публикации</span>
                </p>
            </div>
            {isEditing &&
            <div className={s.button_wrapper}>
                <Button onClick={sendData} className={s.submit_button} variant='contained'>Подтвердить</Button>
            </div>
            }
        </div>
    </div>
  )
}

export default Index
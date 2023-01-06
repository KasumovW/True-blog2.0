import { useRef, useState } from 'react'
import s from "./Profile.module.scss"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Camera from '@mui/icons-material/CameraAlt'
import Cookies from 'js-cookie'

type Props = {}

const Index = (props: Props) => {
    
    const [file, setFile] = useState<any>()

    const inputFile = useRef<any>(null)

    const checkfile = () => {
        console.log(inputFile.current.files[0])

        if(inputFile) {
            setFile(inputFile.current.files[0])
        }
    }

    const login = Cookies.get('login')
    const avatar: any = Cookies.get('avatar')

  return (
    <div className={s.main}>
        <div className={s.user_info}>
            <input id='file' type="file" ref={inputFile} onChange={checkfile}/>
            <div className={s.avatar}>
                <label className={s.label} htmlFor="file">
                    <Camera />
                </label>
                <img src={"http://localhost:5000" + avatar} alt="" />
            </div>
            <div className={s.user_extra_info}>
                <div>
                    <h1 className={s.user_name}>
                        {login} <BorderColorIcon className={s.pen} color='primary'/>
                    </h1>
                    <p className={s.created_at}>
                        Дата создания: <span>04.03.2023</span>
                    </p>
                </div>
                <p className={s.publications}>
                    100
                    <span>публикации</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Index
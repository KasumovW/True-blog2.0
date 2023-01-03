import React from 'react'
import s from "./Profile.module.scss"
import BorderColorIcon from '@mui/icons-material/BorderColor'
import Camera from '@mui/icons-material/CameraAlt'

type Props = {}

const Index = (props: Props) => {
  return (
    <div className={s.main}>
        <div className={s.user_info}>
            <input id='file' type="file" />
            <div className={s.avatar}>
                <label className={s.label} htmlFor="file">
                    <Camera />
                </label>
                <img src="" alt="" />
            </div>
            <div className={s.user_extra_info}>
                <div>
                    <h1 className={s.user_name}>
                        Niggels <BorderColorIcon className={s.pen} color='primary'/>
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
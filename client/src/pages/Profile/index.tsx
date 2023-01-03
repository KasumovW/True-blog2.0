import React from 'react'
import s from "./Profile.module.scss"

type Props = {}

const Index = (props: Props) => {
  return (
    <div className={s.main}>
        <div className={s.user_info}>
            <div className={s.avatar}>
                <img src="" alt="" />
            </div>
            <div className={s.user_extra_info}>
                <div>
                    <h1 className={s.user_name}>
                        Niggels
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
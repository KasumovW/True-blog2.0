import s from "./Profile.module.scss"
import Cookies from 'js-cookie'
import UserInfo from "../../components/Profile"

type Props = {}

const Index = (props: Props) => {

    const login: any = Cookies.get('login'),
        avatar: any = Cookies.get('avatar'),
        posts: any =Cookies.get('posts'),
        likes: any = Cookies.get('likes'),
        role: any = Cookies.get('role')

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
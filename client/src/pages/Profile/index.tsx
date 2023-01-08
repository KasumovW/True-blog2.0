import s from "./Profile.module.scss"
import Cookies from 'js-cookie'
import UserInfo from "../../components/Profile"

type Props = {}

const Index = (props: Props) => {

    const login: any = Cookies.get('login'),
        id: any = Cookies.get('userId'),
        avatar: any = Cookies.get('avatar'),
        posts: any =Cookies.get('posts'),
        likes: any = Cookies.get('likes'),
        role: any = Cookies.get('role'),
        url = "http://localhost:5000/"

    const postsArr: string[] = Array.from(posts.split(','))
    const likesArr: string[] = Array.from(likes.split(','))

    const user = {
        login, avatar: url + avatar, id, posts: postsArr, likes: likesArr, role
    }

  return (
    <div className={s.main}>
        <UserInfo user={user} />
    </div>
  )
}

export default Index
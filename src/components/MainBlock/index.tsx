import React from 'react';
import s from './MainBlock.module.scss';

type Props = {};

const index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <img
                src='https://d226lax1qjow5r.cloudfront.net/blog/blogposts/the-ultimate-list-of-fun-apis-for-your-next-coding-project/list-of-apis_1200x627.png'
                alt='Picture didnt load'
            />
        </div>
    );
};

export default index;

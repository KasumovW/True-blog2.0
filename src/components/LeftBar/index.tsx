import React from 'react';
import s from './LeftBar.module.scss';
import BorderColorIcon from '@mui/icons-material/BorderColor';

type Props = {};

const index = (props: Props) => {
    return (
        <div className={s.wrapper}>
            <img
                src='https://d226lax1qjow5r.cloudfront.net/blog/authors/cory.png'
                alt='Picture didnt load'
            />
            <div>
                <h3>
                    <BorderColorIcon color='primary' /> John Wick
                </h3>
                <p>
                    Cory Althoff is a developer advocate at Vonage and the author of two books: The
                    "Self-Taught Programmer" and "The Self-Taught Computer Scientist". Book
                    Authority named "The Self-Taught Programmer" ...
                </p>
                <a href=''>Read more</a>
            </div>
        </div>
    );
};

export default index;

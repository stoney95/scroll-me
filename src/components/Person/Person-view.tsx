import {FC, RefObject} from "react";

import "./Person.scss";

interface PersonViewProps {
    imageRef: RefObject<HTMLDivElement>;
    textRef: RefObject<HTMLDivElement>;
    titleRef: RefObject<HTMLDivElement>;
}


const PersonView: FC<PersonViewProps> = ({imageRef, titleRef, textRef}) => {
        return <>
        <div ref={imageRef} className="person-picture-container">
            <img className="person-picture" src="profile-picture.jpg"/>
        </div>
        <div ref={titleRef}  className="person-title">Hi, I'm <span className="highlighted">Simon</span></div>
        <div ref={textRef} className="person-description">
            ❤️ A passionate <span className='highlighted'>MLOps Engineer</span> who loves python, data and automation. 
            <br/>🔨 I build <span className='highlighted'>productive</span> ML systems and <span className='highlighted'>end-to-end</span> data products.
            <br/>🤓 I'm glad to learn something new every day
        </div>
    </>
}

export default PersonView;
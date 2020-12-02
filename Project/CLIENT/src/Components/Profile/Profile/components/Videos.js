import React from 'react'
import "../css/video.css"
 const Videos = () => {
    return (
        <div className="container-videos">
            <div className="box-video">
            <iframe className="video"
src="https://www.youtube.com/embed/0gVVQuw1WZw">
</iframe>
</div>
<div className="box-video">
<iframe className="video"
src="https://www.youtube.com/embed/PWzEsE74A8Y">
</iframe>
</div>
<div className="box-video">
<iframe className="video"
src="https://www.youtube.com/embed/9urcN220W3c">
</iframe>
</div>
<div className="box-video">
<iframe className="video"
src="https://www.youtube.com/embed/74eW17GS-n4">
</iframe>
            </div>
        </div>
    )
}
export default Videos;
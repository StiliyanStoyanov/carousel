import React from 'react';

function SlideChangeButton({ activeIndex, lastIndex, infiniteLoop, className, children, onClick }) {
    if (infiniteLoop || activeIndex !== lastIndex) {
        return <button type="button" onClick={onClick} className={className}>{children}</button>
    }

    return null
}

export default SlideChangeButton;
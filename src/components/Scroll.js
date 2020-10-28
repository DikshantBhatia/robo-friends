import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{overflow: 'scroll', height: '800px', border : '5px solid black'}}>
            {props.children}    
        </div>
    );
};

export default Scroll;
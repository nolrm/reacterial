import React from 'react';

interface BtnProps {
  name: string;
  class?: string;
}

function Button(props: BtnProps) {
    return (
        <button className={props.class}>
            {props.name}
        </button>
    );
}

export default Button;
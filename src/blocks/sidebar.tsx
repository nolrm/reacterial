import React from 'react';

interface SidebarProps {
  name: string;
  class?: string;
}

function Sidebar(props: SidebarProps) {
    return (
        <div className={props.class}>
            {props.name}
        </div>
    );
}

export default Sidebar;
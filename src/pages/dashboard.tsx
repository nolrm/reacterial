import React from 'react';

interface DashboardProps {
  name: string;
  class?: string;
}

function Dashboard(props: DashboardProps) {
    return (
        <div className={props.class}>
            {props.name}
        </div>
    );
}

export default Dashboard;
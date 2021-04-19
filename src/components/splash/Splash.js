import React from 'react';
import Authentication from "../authentication/Authentication"
import "./splash.css"

function Splash() {
    return (
        <>
        <div className="splash__intro">
        <h1> welcome to kanban board</h1>
        <h2>Let's make your work visible so you can show it to others and keep everyone on the same page</h2>
        </div>
            
            <Authentication/>
            <h3>Peter Kang's Pensieve Frontend Coding Challenge</h3>
        </>
    );
}

export default Splash;
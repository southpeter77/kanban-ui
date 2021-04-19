import React from 'react';
import{useSelector} from "react-redux"

function KanbanBoard() {
    const stateeee = useSelector(state=>state.user.current_user)
    return (
        <div>
            <button
            onClick={()=>console.log(stateeee)}
            >click</button>
            <h1>ssssssssssssssss</h1>
        </div>
    );
}

export default KanbanBoard;
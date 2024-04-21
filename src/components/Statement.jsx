import React, { useState } from 'react'
import { databaseService } from '../appwrite/index'
import { useSelector } from 'react-redux'

function Statement() {
    const [statement, setStatement] = useState([])
    const userData = useSelector((state) => state.auth.userData)
    databaseService.getStatement(userData.$id).then((statement) => {
        console.log(statement.documents)
    })

    return (
        <div>
            <h1>Statement</h1>
        </div>
    )

}

export default Statement
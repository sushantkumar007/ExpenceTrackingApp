import React, { useState } from 'react'
import { Container, Statement, TransectionForm } from '../components/index';
import { useSelector } from 'react-redux';

function Home() {
    const authStatus = useSelector((state) => state.auth.status)
    const [editTransectin, setEditTransection] = useState(null)

    return (
    authStatus ? (
        <Container>
            <div className="w-full ">
                <TransectionForm />
                <Statement />
            </div>
        </Container>
    ) : (
        <div className='w-full'>
            <h1 className='text-center mt-4'>Login to see statement</h1>
        </div>
    )
    )
}

export default Home;
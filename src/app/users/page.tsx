import React from 'react'
import Nav from '@/Components/Nav'

const User = async() => {
    const res = await fetch(`https://dummyjson.com/users/30`)
    const projects = await res.json()

    return (
        <>
            <Nav />
            <div>User: {projects.firstName}</div>
        </>
    )
}

export default User
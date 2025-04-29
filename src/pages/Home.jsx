import React from 'react'
import Navbar from '../Components/Navbar'
import ProjectList from '../Components/ProjectList'

function Home() {
    return (
        <>
            <Navbar />
            <div className="p-4">
                <ProjectList />
            </div>
        </>
  )
}

export default Home
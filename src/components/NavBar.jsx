import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header>
        <div className="container">
            <Link to='/'>
                <h1>Tasky</h1>
            </Link>
        </div>
    </header>
  )
}

export default NavBar
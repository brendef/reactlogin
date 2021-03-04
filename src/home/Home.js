import React from 'react'
import { Link } from 'react-router-dom'

import { routes } from '../App'

// Import Auth Context and Hooks
import { useAuth } from '../context/AuthContext'
import NavigationTab from '../NavigationTab/NavigationTab'

// Components
import Logout from '../sign/out/Out'

import './Home.css'
const Home = () => {
	const { currentUser, signout } = useAuth()

	const name = 'Brendan'

	return (
		<div className='jsx-parent'>
			<h1> Welcome {currentUser.email}</h1>
			<Link to={routes.settings}> settings</Link>
			<Logout signout={signout} />
			<NavigationTab></NavigationTab>
		</div>
	)
}

export default Home

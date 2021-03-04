import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../App'

// Import Auth Context and Hooks
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { ChevronRight, ArrowBack } from '@material-ui/icons'

import './settings.css'

const Settings = () => {
	const history = useHistory()

	function goToUserSettings() {
		history.push(routes.accountSettings)
	}

	return (
		<div className='jsx-parent'>
			<AppBar position='sticky'>
				<Toolbar>
					<IconButton onClick={history.goBack} color='inherit'>
						<ArrowBack />
					</IconButton>
					<Typography variant='h6'>Settings</Typography>
				</Toolbar>
			</AppBar>
			<div className='container'>
				<ul className='list-group list-group-flush'>
					<li
						className='list-group-item d-flex justify-content-between align-items-center settings-link'
						onClick={goToUserSettings}
					>
						Your account
						<ChevronRight />
					</li>
					<li className='list-group-item d-flex justify-content-between align-items-center'>
						Notifications
						<ChevronRight />
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Settings

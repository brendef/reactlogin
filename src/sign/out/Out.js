import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Material UI Imports
import Button from '@material-ui/core/Button'
import { routes } from '../../App'

const Logout = (props) => {
	const [error, setError] = useState('')
	const history = useHistory()

	async function handleLogout() {
		setError('')
		try {
			await props.signout()
			history.pushState(routes.signin)
		} catch {
			setError('Failed to logout')
		}
	}

	return (
		<div>
			<Button variant='outlined' size='small' onClick={handleLogout}>
				Logout
			</Button>
		</div>
	)
}

export default Logout

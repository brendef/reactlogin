import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

// Material UI Imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

// Firebase context imports
import { useAuth } from '../../../context/AuthContext'
import { routes } from '../../../App'

function ChangeEmail() {
	const validateEmail = (email) => {
		if (
			(email.trim() === '' &&
				!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
					email
				) &&
				!email.trim().includes('@')) ||
			!email.trim().includes('.')
		) {
			return 'Please enter a valid email address'
		} else {
			return false
		}
	}

	// useRef Variables to get form value
	const emailAddressRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	// useState Variables
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [passwordType, setPasswordType] = useState('password')
	const [confirmPasswordType, setConfirmPasswordType] = useState('password')

	// Custom useAuth Hook
	const { currentUser, updateEmail, updatePassword } = useAuth()

	const history = useHistory()

	function onSubmit(event) {
		event.preventDefault()

		if (validateEmail(emailAddressRef.current.value)) {
			return setError(validateEmail(emailAddressRef.current.value))
		}

		const promises = []
		setLoading(true)
		setError('')
		if (emailAddressRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailAddressRef.current.value))
		}

		Promise.all(promises)
			.then(() => {
				setLoading(false)
				history.push(routes.home)
			})
			.catch((error) => {
				setError(error.message)
				setLoading(false)
			})
	}

	const changePasswordType = () => {
		if (passwordType === 'password') {
			setPasswordType('text')
		} else {
			setPasswordType('password')
		}
	}

	const changeConfirmPasswordType = () => {
		if (confirmPasswordType === 'password') {
			setConfirmPasswordType('text')
		} else {
			setConfirmPasswordType('password')
		}
	}

	return (
		<div className='jsx-parent'>
			<AppBar position='sticky'>
				<Toolbar>
					<IconButton onClick={history.goBack} color='inherit'>
						<ArrowBack />
					</IconButton>
					<Typography variant='h6'>Change Email</Typography>
				</Toolbar>
			</AppBar>
			<div className='container d-flex flex-column mt-3'>
				<div className='row d-flex justify-content-center'>
					<div className='col-lg-7'>
						{error && (
							<Alert className='mt-1 mb-2' severity='error'>
								{error}
							</Alert>
						)}
						<h4>Current Email Address</h4>
						<p>{currentUser.email}</p>
						<form onSubmit={onSubmit}>
							<h4>New Email Address</h4>
							<p>Enter your new email address below</p>
							<div className='d-flex flex-column justify-content-center'>
								<TextField
									className='mt-1 mb-2'
									type='email'
									inputRef={emailAddressRef}
									label='New Email Address'
									variant='outlined'
									color='secondary'
								/>
								<Button
									disabled={loading}
									type='submit'
									className='mt-1 mb-2'
									variant='contained'
									color='primary'
									size='large'
								>
									Save Changes
								</Button>
								<Link to={routes.home} className='mt-1 mb-2'>
									Cancel Changes
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChangeEmail

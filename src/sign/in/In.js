import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// Material UI Imports
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import './in.css'
import { useAuth } from '../../context/AuthContext'
import { routes } from '../../App'

const In = () => {
	// useReferences hooks
	const emailAddressRef = useRef()
	const passwordRef = useRef()

	// State hooks
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [passwordType, setPasswordType] = useState('password')

	// Authentication hook
	const { signin } = useAuth()

	// Routing hooks
	const history = useHistory()

	async function onSubmit(event) {
		event.preventDefault()

		const finalEmailAddressRef = emailAddressRef.current.value.trim()
		const finalPasswordRef = passwordRef.current.value.trim()

		switch (finalEmailAddressRef) {
			case '':
				return setError('Please enter your email address')
		}

		switch (finalPasswordRef) {
			case '':
				return setError('Please enter a valid password')
		}

		try {
			setError('')
			setLoading(true)
			await signin(
				emailAddressRef.current.value.toLowerCase(),
				passwordRef.current.value
			)
			setLoading(false)
			history.push(routes.home)
		} catch (error) {
			setLoading(false)
			switch (error.code) {
				case 'auth/user-not-found':
					setError(
						'The email address you entered does not exist, please check that it is correct and try again.'
					)
					break
				case 'auth/wrong-password':
					setError('Invalid password, please try again.')
					break
				default:
					setError(error.message)
					break
			}
		}
	}

	const changePasswordType = () => {
		if (passwordType === 'password') {
			setPasswordType('text')
		} else {
			setPasswordType('password')
		}
	}

	return (
		<div className='jsx-parent container d-flex flex-column justify-content-center'>
			<div className='h-50'>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-7'>
						<h2>Sign in to your account</h2>
						<p>
							Don't have an account?
							<Link to={routes.signup} className='link'>
								<span> </span>Create a new account
							</Link>
						</p>
						{error && (
							<Alert className='mt-1 mb-2' severity='error'>
								{error}
							</Alert>
						)}
						<form onSubmit={onSubmit}>
							<div className='d-flex flex-column justify-content-center'>
								<TextField
									inputRef={emailAddressRef}
									className='mt-1 mb-2'
									type='email'
									label='Email Address'
									variant='outlined'
									color='secondary'
								/>
								<TextField
									inputRef={passwordRef}
									className='mt-1 mb-2'
									label='Password'
									type={passwordType}
									variant='outlined'
									color='secondary'
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton onClick={changePasswordType}>
													{passwordType === 'password' ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								/>
								<Link
									to={routes.forgotPassword}
									className='align-self-end mt-1 mb-2'
								>
									Forgot password?
								</Link>
								<Button
									disabled={loading}
									className='mt-1 mb-2'
									type='submit'
									variant='contained'
									color='primary'
									size='large'
								>
									Log in
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default In

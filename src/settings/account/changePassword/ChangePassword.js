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
	const validatePassword = (password, confirmpassword) => {
		if (
			password < 5 ||
			password !== confirmpassword ||
			!/[a-z]/.test(password) ||
			!/[0-9]/.test(password) ||
			!/[A-Z]/.test(password)
		) {
			if (password < 5) {
				return 'Passwords should contain atleast 6 characters or more'
			}
			if (password !== confirmpassword) {
				return 'Passwords do not match'
			}
			if (!/[a-z]/.test(password)) {
				return 'Password must contain atleast one lowercase character'
			}
			if (!/[0-9]/.test(password)) {
				return 'Password must contain atleast one numeric character'
			}
			if (!/[A-Z]/.test(password)) {
				return 'Password must contain atleast one uppercase character'
			}
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

		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setError('Passwords do not match')
		}

		if (
			validatePassword(
				passwordRef.current.value,
				confirmPasswordRef.current.value
			)
		) {
			return setError(
				validatePassword(
					passwordRef.current.value,
					confirmPasswordRef.current.value
				)
			)
		}

		const promises = []
		setLoading(true)
		setError('')

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value))
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
					<Typography variant='h6'>Change Password</Typography>
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
						<form onSubmit={onSubmit}>
							<div className='d-flex flex-column justify-content-center'>
								<h4>Current password</h4>
								<TextField
									className='mt-1 mb-2'
									label='Current Password'
									inputRef={passwordRef}
									type={passwordType}
									variant='outlined'
									color='secondary'
									placeholder='Leave blank to not change'
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
								<h4>New password</h4>
								<TextField
									className='mt-1 mb-2'
									label='New Password'
									inputRef={passwordRef}
									type={passwordType}
									variant='outlined'
									color='secondary'
									placeholder='Leave blank to not change'
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
								<TextField
									className='mt-1 mb-2'
									label='Confirm New Password'
									inputRef={confirmPasswordRef}
									type={confirmPasswordType}
									variant='outlined'
									color='secondary'
									placeholder='Leave blank to not change'
									InputProps={{
										endAdornment: (
											<InputAdornment>
												<IconButton onClick={changeConfirmPasswordType}>
													{confirmPasswordType === 'password' ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
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

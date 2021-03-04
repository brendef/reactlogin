import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

// Firebase context imports
import { useAuth } from '../../context/AuthContext'

// Material UI Imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import './up.css'
import { routes } from '../../App'

const Up = () => {
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
	const firstNameRef = useRef()
	const lastNameRef = useRef()
	const emailAddressRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()

	// useState Variables
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [passwordType, setPasswordType] = useState('password')
	const [confirmPasswordType, setConfirmPasswordType] = useState('password')

	// Custom useAuth Hook
	const { signup } = useAuth()

	const history = useHistory()

	async function onSubmit(event) {
		event.preventDefault()

		const finalFirstNameRef = firstNameRef.current.value.trim()
		const finalLastNameRef = lastNameRef.current.value.trim()
		const finalEmailAddressRef = emailAddressRef.current.value.trim()
		const finalPasswordRef = passwordRef.current.value.trim()
		const finalConfirmPasswordRef = confirmPasswordRef.current.value.trim()

		if (validateEmail(finalEmailAddressRef)) {
			return setError(validateEmail(finalEmailAddressRef))
		}

		if (validatePassword(finalPasswordRef, finalConfirmPasswordRef)) {
			return setError(
				validatePassword(finalPasswordRef, finalConfirmPasswordRef)
			)
		}

		switch (finalFirstNameRef) {
			case '':
				return setError('Please enter your first name')
		}
		switch (finalLastNameRef) {
			case '':
				return setError('Please enter your last name')
		}

		switch (finalPasswordRef) {
			case '':
				return setError('Please enter a valid password')
		}
		switch (finalConfirmPasswordRef) {
			case '':
				return setError('Please enter a valid password')
		}

		try {
			setError('')
			setLoading(true)
			await signup(
				emailAddressRef.current.value.toLowerCase(),
				passwordRef.current.value,
				finalFirstNameRef,
				finalLastNameRef
			)
			setLoading(false)
			history.push(routes.home)
		} catch (error) {
			setLoading(false)
			switch (error.code) {
				case 'auth/email-already-in-use':
					setError(
						'The email address you entered is already in use by another account, if it is yours please go to the sign in page instead.'
					)
					break
				case 'auth/weak-password':
					setError('Your password should be more than 6 characters.')
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

	const changeConfirmPasswordType = () => {
		if (confirmPasswordType === 'password') {
			setConfirmPasswordType('text')
		} else {
			setConfirmPasswordType('password')
		}
	}

	return (
		<div className='jsx-parent container d-flex flex-column justify-content-center'>
			<div className='h-40'>
				<div className='row d-flex justify-content-center'>
					<div className='col-lg-7'>
						<h2>Create a new account</h2>
						<p>
							Already have an account?<span> </span>
							<Link to={routes.signin} className='link'>
								Sign in to your account
							</Link>
						</p>
						{error && (
							<Alert className='mt-1 mb-2' severity='error'>
								{error}
							</Alert>
						)}
						<form onSubmit={onSubmit}>
							<div className='d-flex flex-column justify-content-center'>
								<div className='d-sm-flex'>
									<TextField
										className='mt-1 mb-2 mr-sm-1'
										type='text'
										inputRef={firstNameRef}
										label='First Name'
										variant='outlined'
										fullWidth={true}
										required
										color='secondary'
									/>
									<TextField
										className='mt-1 mb-2 ml-sm-1'
										type='text'
										inputRef={lastNameRef}
										label='Last Name'
										variant='outlined'
										fullWidth={true}
										required
										color='secondary'
									/>
								</div>
								<TextField
									className='mt-1 mb-2'
									type='email'
									inputRef={emailAddressRef}
									label='Email Address'
									variant='outlined'
									color='secondary'
									required
								/>
								<TextField
									className='mt-1 mb-2'
									label='Password'
									inputRef={passwordRef}
									type={passwordType}
									variant='outlined'
									color='secondary'
									required
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
									label='Confirm Password'
									inputRef={confirmPasswordRef}
									type={confirmPasswordType}
									variant='outlined'
									color='secondary'
									required
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
									Sign up
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Up

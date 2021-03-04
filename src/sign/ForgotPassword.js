import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

// Material UI Imports
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { useAuth } from '../context/AuthContext'
import { routes } from '../App'

const ForgotPassword = () => {
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

	// useReferences hooks
	const emailAddressRef = useRef()

	// State hooks
	const [error, setError] = useState()
	const [message, setMessage] = useState()
	const [loading, setLoading] = useState(false)

	// Authentication hook
	const { resetPassword } = useAuth()

	async function onSubmit(event) {
		event.preventDefault()

		const finalEmailAddressRef = emailAddressRef.current.value.trim()

		if (validateEmail(finalEmailAddressRef)) {
			return setError(validateEmail(finalEmailAddressRef))
		}

		switch (finalEmailAddressRef) {
			case '':
				return setError('Please enter your email address')
		}

		try {
			setMessage('')
			setError('')
			setLoading(true)
			await resetPassword(emailAddressRef.current.value.toLowerCase())
			setMessage('Email sent, please check your inbox')
		} catch (error) {
			setError(error + '')
		}
		setLoading(false)
	}

	return (
		<div className='jsx-parent container d-flex flex-column justify-content-center'>
			<div className='h-50'>
				<div className='row d-flex justify-content-center'>
					<div className='col-md-7'>
						<h2>Reset your password</h2>
						{message ? (
							<div>
								<p>
									Thank you, an email with a link to reset your password has
									been sent.
								</p>
								<Alert className='mt-1 mb-2' severity='success'>
									{message}
								</Alert>
								<p>
									Go to
									<Link to={routes.signin} className='link'>
										<span> </span>Sign in<span> </span>
									</Link>
									page
								</p>
							</div>
						) : (
							<div>
								<p>
									Enter your email address and we'll send you a link to get back
									into your account.
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

										<Button
											disabled={loading}
											className='mt-1 mb-2'
											type='submit'
											variant='contained'
											color='primary'
											size='large'
										>
											Reset Password
										</Button>
									</div>
								</form>
								<p>
									Don't have an account?
									<Link to={routes.signup} className='link'>
										<span> </span>Create a new account
									</Link>
								</p>
							</div>
						)}

						{/* <form onSubmit={onSubmit}>
								<div className='d-flex flex-column justify-content-center'>
									<TextField
										inputRef={emailAddressRef}
										className='mt-1 mb-2'
										type='email'
										label='Email Address'
										variant='outlined'
										color='secondary'
									/>

									<Button
										disabled={loading}
										className='mt-1 mb-2'
										type='submit'
										variant='contained'
										color='primary'
										size='large'
									>
										Reset Password
									</Button>
								</div>
							</form> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword

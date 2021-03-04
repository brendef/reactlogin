import React, { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'

// Materia Ui imports
import IconButton from '@material-ui/core/IconButton'
import { ArrowBack, ChevronRight } from '@material-ui/icons'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { routes } from '../../App'

import '../settings.css'

const UpdateProfile = () => {
	const history = useHistory()

	function goToChangeEmail() {
		history.push(routes.changeEmail)
	}
	function goToChangePassword() {
		history.push(routes.changePassword)
	}

	return (
		<div className='jsx-parent'>
			<AppBar position='sticky'>
				<Toolbar>
					<IconButton onClick={history.goBack} color='inherit'>
						<ArrowBack />
					</IconButton>
					<Typography variant='h6'>Your Account</Typography>
				</Toolbar>
			</AppBar>
			<div className='container'>
				<ul className='list-group list-group-flush'>
					<li
						className='list-group-item d-flex justify-content-between align-items-center settings-link'
						onClick={goToChangeEmail}
					>
						Update email address
						<ChevronRight />
					</li>
					<li
						className='list-group-item d-flex justify-content-between align-items-center'
						onClick={goToChangePassword}
					>
						Change password
						<ChevronRight />
					</li>
				</ul>
			</div>
		</div>
		// 	<div className='container d-flex flex-column mt-3'>
		// 		<div className='row d-flex justify-content-center'>
		// 			<div className='col-lg-7'>
		// 				<h2>Update profile</h2>
		// 				<p>Edit Profile below</p>
		// 				{error && (
		// 					<Alert className='mt-1 mb-2' severity='error'>
		// 						{error}
		// 					</Alert>
		// 				)}
		// 				<form onSubmit={onSubmit}>
		// 					<div className='d-flex flex-column justify-content-center'>
		// 						<h4>Change email</h4>
		// 						<TextField
		// 							className='mt-1 mb-2'
		// 							type='email'
		// 							inputRef={emailAddressRef}
		// 							label='Email Address'
		// 							variant='outlined'
		// 							color='secondary'
		// 							defaultValue={currentUser.email}
		// 							required
		// 						/>
		// 						<h4>Change Password</h4>
		// 						<p>Leave blank to not change</p>
		// 						<TextField
		// 							className='mt-1 mb-2'
		// 							label='New Password'
		// 							inputRef={passwordRef}
		// 							type={passwordType}
		// 							variant='outlined'
		// 							color='secondary'
		// 							placeholder='Leave blank to not change'
		// 							InputProps={{
		// 								endAdornment: (
		// 									<InputAdornment>
		// 										<IconButton onClick={changePasswordType}>
		// 											{passwordType === 'password' ? (
		// 												<VisibilityOff />
		// 											) : (
		// 												<Visibility />
		// 											)}
		// 										</IconButton>
		// 									</InputAdornment>
		// 								),
		// 							}}
		// 						/>
		// 						<TextField
		// 							className='mt-1 mb-2'
		// 							label='Confirm New Password'
		// 							inputRef={confirmPasswordRef}
		// 							type={confirmPasswordType}
		// 							variant='outlined'
		// 							color='secondary'
		// 							placeholder='Leave blank to not change'
		// 							InputProps={{
		// 								endAdornment: (
		// 									<InputAdornment>
		// 										<IconButton onClick={changeConfirmPasswordType}>
		// 											{confirmPasswordType === 'password' ? (
		// 												<VisibilityOff />
		// 											) : (
		// 												<Visibility />
		// 											)}
		// 										</IconButton>
		// 									</InputAdornment>
		// 								),
		// 							}}
		// 						/>
		// 						<Button
		// 							disabled={loading}
		// 							type='submit'
		// 							className='mt-1 mb-2'
		// 							variant='contained'
		// 							color='primary'
		// 							size='large'
		// 						>
		// 							Save Changes
		// 						</Button>
		// 						<Link to='/' className='mt-1 mb-2'>
		// 							Cancel Changes
		// 						</Link>
		// 					</div>
		// 				</form>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default UpdateProfile

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import Home from './home/Home'
import In from './sign/in/In'
import Up from './sign/up/Up'
import ForgotPassword from './sign/ForgotPassword'
import AccountSettings from './settings/account/AccountSettings'
import Settings from './settings/Settings'
import { AuthProvider } from './context/AuthContext'

import PrivateRoute from './routes/PrivateRoute'
import ChangeEmail from './settings/account/changeEmail/ChangeEmail'
import ChangePassword from './settings/account/changePassword/ChangePassword'

// Material UI Imports
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import NavigationTab from './NavigationTab/NavigationTab'

export const routes = {
	home: '/',
	settings: '/settings',
	accountSettings: '/account-settings',
	signup: '/welcome',
	signin: '/welcome-back',
	forgotPassword: '/forgot-password',
	changeEmail: '/change-email',
	changePassword: '/change-password',
}

const App = () => {
	const theme = createMuiTheme({
		palette: {
			primary: {
				main: '#113791',
			},
			secondary: {
				main: '#01a659',
			},
		},
	})
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute path='/' exact component={Home} />
						<PrivateRoute path='/settings' component={Settings} />
						<PrivateRoute
							path='/account-settings'
							component={AccountSettings}
						/>
						<PrivateRoute path='/change-email' component={ChangeEmail} />
						<PrivateRoute path='/change-password' component={ChangePassword} />
						<Route path='/welcome' component={Up} />
						<Route path='/welcome-back' component={In} />
						<Route path='/forgot-password' component={ForgotPassword} />
					</Switch>
				</AuthProvider>
			</Router>
		</ThemeProvider>
	)
}

export default App

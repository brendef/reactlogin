import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState()
	const [userDetails, setUserDetails] = useState()

	const [loading, setLoading] = useState(true)

	function signup(email, password, firstname, lastname) {
		return auth.createUserWithEmailAndPassword(email, password).then((user) => {
			return db.collection('users').doc(user.user.uid).set({
				firstname,
				lastname,
				email,
			})
		})
	}

	function signin(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function signout() {
		return auth.signOut()
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password)
	}

	function getUserDetails(user) {
		const usersRef = db.collection('users').doc(user.uid)
		usersRef.get().then((user) => {
			const userData = user.data()
			setUserDetails(userData)
		})
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user)
			user && getUserDetails(user)
			setLoading(false)
		})
		return unsubscribe
	}, [])

	const value = {
		currentUser,
		userDetails,
		signin,
		signup,
		signout,
		resetPassword,
		updateEmail,
		updatePassword,
	}
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}

import React from 'react'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'

import { Restore, Favorite, LocationOn, Folder } from '@material-ui/icons'

function NavigationTab() {
	return (
		<BottomNavigation>
			<BottomNavigationAction
				label='Recents'
				value='recents'
				icon={<Restore />}
			/>
			<BottomNavigationAction
				label='Favorites'
				value='favorites'
				icon={<Favorite />}
			/>
			<BottomNavigationAction
				label='Nearby'
				value='nearby'
				icon={<LocationOn />}
			/>
			<BottomNavigationAction label='Folder' value='folder' icon={<Folder />} />
		</BottomNavigation>
	)
}

export default NavigationTab

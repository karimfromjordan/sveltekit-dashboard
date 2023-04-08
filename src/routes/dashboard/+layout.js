/** @type {import('./$types').LayoutLoad} */
export async function load(event) {
	return {
		navigation: {
			links: [
				{ title: 'Overview', href: '/' },
				{ title: 'Customers', href: '/customers' },
				{ title: 'Orders', href: '/orders' },
				{ title: 'Settings', href: '/settings' }
			]
		}
	};
}

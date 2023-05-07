<script>
	import '$lib/global.css';
	import { page } from '$app/stores';

	/** @type {import('./$types').LayoutData}*/
	export let data;

	let show = false;

	function js(node) {
		node.classList.replace('no-js', 'js');
	}

	function toggle_show() {
		show = !show;
	}

	function navigation(node, show) {
		function toggle(show) {
			if (show) {
				node.removeAttribute('inert');
				node.classList.add('--show');
			} else {
				node.removeAttribute('inert');
				node.classList.remove('--show');
			}
		}

		function on_click_outside(e) {
			if (e.target.contains(node) && e.target !== node) {
				toggle(false);
			}
		}

		toggle(show);

		window.addEventListener('click', on_click_outside);

		return {
			update(show) {
				toggle(show);
			},
			destroy() {
				window.removeEventListener('click', on_click_outside);
			}
		};
	}
</script>

<div class="container no-js" use:js>
	{#if data.banner}
		<aside class="banner">
			{@html data.banner}
		</aside>
	{/if}

	<div class="con">
		<nav class="navigation" id="navigation" use:navigation={show}>
			{#each Object.entries(data.navigation.links) as [heading, links]}
				{#if heading !== 'default'}
					<div class="navigation__heading">{heading}</div>
				{/if}
				{#each links as link}
					<ul class="navigation__list">
						<li class="navigation__item">
							<a
								class="navigation__link"
								href={link.path}
								class:--current={$page.url.pathname.startsWith(link.path)}
							>
								<span>{link.title}</span>
								{#if link.info}
									<span class="link__info">{link.info}</span>
								{/if}
							</a>
						</li>
					</ul>
				{/each}
			{/each}

			<hr />

			<div class="navigation__item">
				<button class="navigation__link">Light</button>
			</div>

			<form class="navigation__item" action="/logout" method="POST">
				<button class="navigation__link">Logout</button>
			</form>
		</nav>

		<div class="page">
			<header class="page__header">
				<a class="navigation-link" href="#navigation">N</a>
				<button class="navigation-toggle" on:click={toggle_show}>T</button>
			</header>

			<main class="page__content">
				<div>PAGE</div>
				<slot />
			</main>
		</div>
	</div>
</div>

<style>
	.container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		overflow-x: hidden;
	}

	.con {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		flex: 1;
		position: relative;
	}

	.banner {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.navigation-link,
	.navigation-toggle {
		display: none;
	}

	.navigation {
		--width: 16rem;

		flex: 0 0 auto;
		height: 100%;
		width: var(--width);
		padding: 1.5rem;
		background-color: #f6f1f1;
	}

	.navigation__heading {
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		opacity: 0.75;
		padding-inline: 1rem;
	}

	.navigation__list {
		list-style: none;
		display: flex;
		flex-direction: column;
		row-gap: 0.6rem;
	}

	.navigation__link {
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-decoration: none;
		padding-inline: 1rem;
		padding-block: 0.5rem;
		color: inherit;

		transition: scale 100ms;
	}

	button.navigation__link {
		appearance: none;
		border: none;
		background-color: transparent;
	}

	.link__info {
		font-size: 0.8rem;
		font-weight: 700;
		line-height: 1;
		color: white;
		background-color: #e03131;
		min-width: calc(2 * 0.25rem + 0.8rem);
		padding: 0.25rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		opacity: 0.9;
		border-radius: 9999px;
	}

	.navigation__link:active {
		scale: 0.96;
	}

	.navigation__link.--current {
		font-weight: 700;
		background-color: white;
		border-radius: 0.3rem;
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	}

	.page {
		flex: 1;
		padding: 1rem;
	}

	.page__header {
	}

	@media (max-width: 800px) {
		.page__content {
			height: 80rem;
		}

		:global(.no-js) .con {
			flex-direction: column-reverse;
		}

		:global(.no-js) .navigation {
			height: auto;
			width: 100%;
		}

		:global(.no-js) .navigation-link {
			display: inline-block;
		}

		:global(.js) .navigation-toggle {
			display: inline-block;
		}

		:global(.js) .navigation {
			position: absolute;
			z-index: 1001;
			inset-inline-start: calc(-1 * var(--width));

			transition: inset-inline-start 300ms;
		}

		:global(.js .navigation.--show) {
			inset-inline-start: 0%;
		}
	}
</style>

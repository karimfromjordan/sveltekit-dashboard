<script>
	import '$lib/global.css';

	/** @type {import('./$types').LayoutData}*/
	export let data;
</script>

<div style="height:100%; display:flex; flex-direction:column; align-items:stretch;">
	{#if data.banner}
		<aside style="background-color: hsl(0, 0%, 0%, 0.1);">
			{@html data.banner}
		</aside>
	{/if}

	<div style="display:flex; flex-direction:row; align-items:stretch; flex:1;">
		<nav class="navigation" style="flex:0 0 10rem; background-color: hsl(0, 0%, 0%, 0.1);">
			<div>
				Dashboard
			</div>

			<ul class="navigation__links">
				{#each data.navigation.links as link}
					<li class="navigation__item">
						<a href={link.href}>
							<span>{link.title}</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div style="flex:1;">
			<header>
				
			</header>

			<main>
				<slot />
			</main>
		</div>
	</div>
</div>

<style>
	.navigation {
		padding-inline: 1rem;
	}
</style>

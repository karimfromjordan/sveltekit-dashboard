<script>
	import { enhance } from '$app/forms';

  export let form;
</script>

<div class="container">
	<form action="/login" method="POST" enctype="multipart/form-data" use:enhance>
		<div>
			<label for="email">Email</label>
			<input type="email" name="email" id="email" required />
		</div>

		<div>
			<label for="password">Password</label>
			<input type="password" name="password" id="password" required />
		</div>

		<button>Login</button>
	</form>
</div>

<style>
	.container {
		height: 100%;
		display: grid;
		place-items: center;
	}
</style>

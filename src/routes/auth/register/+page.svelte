<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { registerSchema, type RegisterSchema } from '$lib/formSchema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data }: { data: { form: SuperValidated<Infer<RegisterSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(registerSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance action="/register">
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label></Form.Label>
				<Input {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.Description>Enter your email.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label></Form.Label>
				<Input {...props} bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.Description>Enter your password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="confirm">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label></Form.Label>
				<Input {...props} bind:value={$formData.confirm} />
			{/snippet}
		</Form.Control>
		<Form.Description>Confirm your password.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>

<Separator />

<Button href="">Google</Button>
<Button>Icloud</Button>

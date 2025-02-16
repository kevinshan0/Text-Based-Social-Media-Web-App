<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';

    const { data } = $props();
</script>

<div class="w-screen flex flex-row">
	<Avatar.Root class="w-24 h-24">
		<Avatar.Image src="" alt="@shadcn" />
		<Avatar.Fallback></Avatar.Fallback>
	</Avatar.Root>
    <div class="flex flex-col">
        <h1>
            followers
        </h1>
    </div>
</div>
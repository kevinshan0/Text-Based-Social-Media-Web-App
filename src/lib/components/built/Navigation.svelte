<script lang="ts">
    import Button from "../ui/button/button.svelte";

    let links = [
        { href: "/", label: "Home" },
        { href: "/explore", label: "Explore" },
        { href: "/create", label: "Create" },
        { href: "/messages", label: "Messages" },
        { href: "/notifications", label: "Notifications" },
        { href: "/settings", label: "Settings" },
    ]
</script>

{#each links as link }
    <Button href="{link.href}">{link.label}</Button>
{/each}
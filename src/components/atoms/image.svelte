<script>
	// @ts-nocheck
	export let baseUrl;
	export let alt;
	export let className;
	export let loading;
</script>

<img
	src="{baseUrl}original.webp"
	srcset="
    {baseUrl}567w.webp 567w,
    {baseUrl}768w.webp 768w,
    {baseUrl}992w.webp 992w
    "
	sizes="(max-width: 567px) 567w,
    (max-width: 768px) 768w,
    (max-width: 992px) 992w"
	{alt}
	{loading}
	class={className}
/>


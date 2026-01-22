<script>
  import { twMerge } from 'tailwind-merge';
  export let className = '';
</script>

<div class={twMerge("glass-card rounded-2xl p-6 transition-all duration-300 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1", className)}>
  <slot />
</div>

<script lang="ts">
  import { onMount } from 'svelte';
  import type { PortfolioData } from '../types';

  export let portfolio: PortfolioData;

  let heroRef: HTMLElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef) observer.observe(heroRef);

    return () => observer.disconnect();
  });
</script>

<section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden" bind:this={heroRef}>
  <!-- Advanced Background Elements -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-0 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/3 left-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-2xl"></div>
    
    <!-- Animated Grid -->
    <svg class="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" class="text-primary"/>
    </svg>
  </div>

  <div class="container-custom text-center relative z-10">
    <div class="max-w-5xl mx-auto">
      <!-- Badge -->
      <div class="animate-fade-in opacity-0 mb-8" class:opacity-100={isVisible} style="animation-delay: 0.1s; animation-fill-mode: forwards">
        <span class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium backdrop-blur-sm">
          <span class="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          Welcome to my portfolio
        </span>
      </div>

      <!-- Main Title -->
      <div class="animate-slide-up opacity-0 mb-6" class:opacity-100={isVisible} style="animation-delay: 0.2s; animation-fill-mode: forwards">
        <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span class="block text-gradient mb-2">Creative</span>
          <span class="block text-white">Designer & Developer</span>
        </h1>
      </div>

      <!-- Subtitle -->
      <div class="animate-slide-up opacity-0 mb-12" class:opacity-100={isVisible} style="animation-delay: 0.3s; animation-fill-mode: forwards">
        <p class="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
          {portfolio.hero.description}
        </p>
      </div>

      <!-- CTA Buttons -->
      <div class="animate-bounce-in opacity-0 flex flex-col sm:flex-row gap-4 justify-center items-center" class:opacity-100={isVisible} style="animation-delay: 0.4s; animation-fill-mode: forwards">
        <a href={portfolio.hero.primaryButton.link} class="btn-primary group relative overflow-hidden">
          <span class="relative flex items-center gap-2">
            {portfolio.hero.primaryButton.text}
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </span>
        </a>

        <a href={portfolio.hero.secondaryButton.link} class="btn-secondary group">
          <span class="flex items-center gap-2">
            {portfolio.hero.secondaryButton.text}
            <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </span>
        </a>
      </div>

      <!-- Scroll Indicator -->
      <div class="animate-fade-in opacity-0 fixed bottom-8 left-1/2 -translate-x-1/2 z-20" class:opacity-100={isVisible} style="animation-delay: 0.8s; animation-fill-mode: forwards">
        <div class="flex flex-col items-center gap-3 cursor-pointer hover:scale-110 transition-transform duration-300" on:click={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span class="text-xs font-bold text-primary uppercase tracking-widest animate-pulse">Scroll</span>
          <div class="w-6 h-10 border-2 border-primary/60 rounded-full flex justify-center hover:border-primary transition-colors">
            <div class="w-1.5 h-2 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    background: linear-gradient(180deg, rgba(5, 10, 18, 0.5) 0%, rgba(5, 10, 18, 0.8) 100%);
  }
</style>

<script lang="ts">
  import Navbar from './components/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import About from './components/About.svelte';
  import Experience from './components/Experience.svelte';
  import Projects from './components/Projects.svelte';
  import Contact from './components/Contact.svelte';
  import data from '../data.json';
  import type { PortfolioData } from './types';

  const portfolio: PortfolioData = data as PortfolioData;
</script>

<div class="relative min-h-screen bg-background text-white selection:bg-primary selection:text-white overflow-x-hidden">
  <!-- Dynamic Background -->
  <div class="fixed inset-0 z-0 pointer-events-none">
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] animate-pulse-slow"></div>
    <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow" style="animation-delay: 2s"></div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] animate-pulse-slow" style="animation-delay: 4s"></div>
    <div class="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
  </div>

  <div class="relative z-10">
    <Navbar {portfolio} />
    
    <main class="container-custom pt-20">
      <Hero {portfolio} />
      <About {portfolio} />
      
      {#if portfolio.experience && portfolio.experience.length > 0}
        <Experience {portfolio} />
      {/if}
      
      {#if portfolio.projects && portfolio.projects.length > 0}
        <Projects {portfolio} />
      {/if}
      
      <Contact {portfolio} />
    </main>
    
    <footer class="py-6 text-center text-muted-foreground text-sm">
      <p>© {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.</p>
    </footer>
  </div>
</div>


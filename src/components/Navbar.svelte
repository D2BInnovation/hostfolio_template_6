<script lang="ts">
  import { onMount } from 'svelte';
  import type { PortfolioData } from '../types';

  export let portfolio: PortfolioData;

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let activeSection = '';

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;

      // Update active section based on scroll position
      const sections = ['hero', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            activeSection = section;
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  });

  function scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    isMobileMenuOpen = false;
  }
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" class:scrolled={isScrolled}>
  <div class="glass-card border-b border-white/10 transition-all duration-300 {isScrolled ? 'bg-surface/95' : ''}">
    <div class="container-custom py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <button
          on:click={() => scrollToSection('hero')}
          class="text-xl font-bold text-gradient-primary hover:scale-105 transition-transform duration-300"
        >
          {portfolio.personal.name}
        </button>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <nav class="flex items-center gap-6">
            {#each [
              { id: 'about', label: 'About' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ] as item}
              <button
                on:click={() => scrollToSection(item.id)}
                class="relative px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-primary {activeSection === item.id ? 'text-primary' : 'text-white/70'}"
              >
                {item.label}
                <div
                  class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all duration-300"
                  class:scale-x-100={activeSection === item.id}
                  class:scale-x-0={activeSection !== item.id}
                ></div>
              </button>
            {/each}
          </nav>

          <!-- Resume Button -->
          {#if portfolio.personal.resume}
            <a
              href={portfolio.personal.resume}
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-sm px-6 py-2"
            >
              Resume
            </a>
          {/if}
        </div>

        <!-- Mobile Menu Button -->
        <button
          on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
          class="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <div class="w-6 h-6 flex flex-col justify-center items-center">
            <span
              class="w-5 h-0.5 bg-white transition-all duration-300"
              class:rotate-45={isMobileMenuOpen}
              class:translate-y-1={isMobileMenuOpen}
            ></span>
            <span
              class="w-5 h-0.5 bg-white transition-all duration-300 mt-1"
              class:opacity-0={isMobileMenuOpen}
            ></span>
            <span
              class="w-5 h-0.5 bg-white transition-all duration-300 mt-1"
              class:-rotate-45={isMobileMenuOpen}
              class:-translate-y-1={isMobileMenuOpen}
            ></span>
          </div>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        class:max-h-96={isMobileMenuOpen}
        class:max-h-0={!isMobileMenuOpen}
      >
        <div class="pt-4 pb-2 space-y-2">
          {#each [
            { id: 'about', label: 'About' },
            { id: 'experience', label: 'Experience' },
            { id: 'projects', label: 'Projects' },
            { id: 'contact', label: 'Contact' }
          ] as item}
            <button
              on:click={() => scrollToSection(item.id)}
              class="block w-full text-left px-4 py-3 text-white/80 hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-300"
              class:text-primary={activeSection === item.id}
            >
              {item.label}
            </button>
          {/each}

          {#if portfolio.personal.resume}
            <div class="pt-2">
              <a
                href={portfolio.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full btn-secondary text-center"
              >
                Download Resume
              </a>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

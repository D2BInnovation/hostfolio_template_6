<script lang="ts">
  import { onMount } from 'svelte';
  import type { PortfolioData } from '../types';

  export let portfolio: PortfolioData;

  let projectsRef: HTMLElement;
  let isVisible = false;
  let hoveredIndex: number | null = null;

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

    if (projectsRef) observer.observe(projectsRef);

    return () => observer.disconnect();
  });
</script>

<section id="projects" class="section-padding relative overflow-hidden" bind:this={projectsRef}>
  <!-- Background -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" style="animation-delay: 2s"></div>
  </div>

  <div class="container-custom relative z-10">
    <!-- Section Header -->
    <div class="mb-16">
      <div class="animate-slide-up opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.2s; animation-fill-mode: forwards">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span class="text-gradient">Featured</span> Work
        </h2>
        <p class="text-xl text-white/50 max-w-2xl">Showcasing my latest and most impactful projects</p>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
      {#each portfolio.projects as project, index (project.id)}
        <div
          class="group relative animate-bounce-in opacity-0 overflow-hidden"
          class:opacity-100={isVisible}
          style="animation-delay: {0.3 + index * 0.1}s; animation-fill-mode: forwards"
          on:mouseenter={() => hoveredIndex = index}
          on:mouseleave={() => hoveredIndex = null}
        >
          <div class="glass-card glass-card-hover h-full flex flex-col overflow-hidden hover-lift">
            <!-- Project Image/Visual Header -->
            <div class="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              
              <!-- Animated Background -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30"></div>
              </div>

              <!-- Featured Badge -->
              {#if project.featured}
                <div class="absolute top-4 left-4 px-3 py-1 bg-primary text-background text-xs font-bold rounded-full z-10">
                  ⭐ Featured
                </div>
              {/if}

              <!-- Tech Stack -->
              <div class="absolute bottom-4 left-4 right-4 z-10">
                <div class="flex gap-2 flex-wrap">
                  {#each project.technologies.slice(0, 3) as tech}
                    <span class="px-2 py-1 bg-background/40 backdrop-blur-md text-white text-xs rounded-lg border border-white/10">
                      {tech}
                    </span>
                  {/each}
                  {#if project.technologies.length > 3}
                    <span class="px-2 py-1 bg-background/40 backdrop-blur-md text-white text-xs rounded-lg border border-white/10">
                      +{project.technologies.length - 3}
                    </span>
                  {/if}
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="p-8 flex-1 flex flex-col">
              <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-gradient-primary transition-all duration-300">
                {project.title}
              </h3>
              
              <p class="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                {project.description}
              </p>

              <!-- All Technologies -->
              <div class="mb-6">
                <div class="flex flex-wrap gap-2">
                  {#each project.technologies as tech}
                    <span class="px-3 py-1 bg-surface/50 text-xs font-medium text-primary rounded-full border border-primary/30 hover:bg-primary/10 transition-colors">
                      {tech}
                    </span>
                  {/each}
                </div>
              </div>

              <!-- Links -->
              <div class="flex gap-3 pt-4 border-t border-white/10">
                {#if project.githubUrl}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-surface/50 hover:bg-primary/20 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:text-primary group/link"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                {/if}
                {#if project.liveUrl}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary hover:bg-primary/90 text-background text-sm font-medium rounded-lg transition-all duration-300 group/link"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    Live
                  </a>
                {/if}
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA Section -->
    <div class="mt-24 text-center animate-fade-in opacity-0" class:opacity-100={isVisible} style="animation-delay: 1.2s; animation-fill-mode: forwards">
      <div class="glass-card p-12 md:p-16 max-w-2xl mx-auto">
        <p class="text-xl md:text-2xl text-white mb-8 font-semibold">Ready to bring your ideas to life?</p>
        <a href="#contact" class="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 text-lg">
          Let's Collaborate
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    background: linear-gradient(180deg, rgba(5, 10, 18, 0.5) 0%, rgba(13, 22, 32, 0.3) 100%);
  }
</style>

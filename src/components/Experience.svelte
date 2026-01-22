<script lang="ts">
  import { onMount } from 'svelte';
  import type { PortfolioData } from '../types';

  export let portfolio: PortfolioData;

  let experienceRef: HTMLElement;
  let isVisible = false;
  let expandedIndex: number | null = null;

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

    if (experienceRef) observer.observe(experienceRef);

    return () => observer.disconnect();
  });
</script>

<section id="experience" class="section-padding relative overflow-hidden" bind:this={experienceRef}>
  <!-- Background -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-1/3 right-10 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/4 left-10 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" style="animation-delay: 4s"></div>
  </div>

  <div class="container-custom relative z-10">
    <!-- Section Header -->
    <div class="mb-16">
      <div class="animate-slide-up opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.2s; animation-fill-mode: forwards">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span class="text-gradient">Professional</span> Journey
        </h2>
        <p class="text-xl text-white/50 max-w-2xl">Track record of delivering impactful projects and growing teams</p>
      </div>
    </div>

    <!-- Experience Timeline -->
    <div class="relative">
      <!-- Timeline Line -->
      <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-accent transform -translate-x-1/2"></div>

      <div class="space-y-12 md:space-y-20">
        {#each portfolio.experience as exp, index (exp.id)}
          <div
            class="relative animate-slide-up opacity-0"
            class:opacity-100={isVisible}
            style="animation-delay: {0.3 + index * 0.2}s; animation-fill-mode: forwards"
          >
            <!-- Timeline Dot -->
            <div class="hidden md:block absolute left-1/2 w-5 h-5 bg-primary rounded-full transform -translate-x-2.5 z-10">
              <div class="absolute inset-0 bg-primary rounded-full animate-ping opacity-50"></div>
            </div>

            <!-- Content Card - Alternating Left/Right -->
            <div class="md:w-1/2 {index % 2 === 0 ? 'md:mr-auto md:pr-20' : 'md:ml-auto md:pl-20'}">
              <button
                on:click={() => expandedIndex = expandedIndex === index ? null : index}
                class="glass-card glass-card-hover p-8 w-full text-left transition-all duration-300 hover-lift"
              >
                <!-- Header -->
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-1">
                    <h3 class="text-2xl font-bold text-gradient-primary mb-2">{exp.position}</h3>
                    <p class="text-lg font-semibold text-white/80 mb-2">{exp.company}</p>
                    <div class="flex flex-wrap gap-4 text-sm text-white/50">
                      <span>{exp.duration}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <div class="text-primary transition-transform duration-300" class:rotate-180={expandedIndex === index}>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </div>
                </div>

                <!-- Description (always visible) -->
                <p class="text-white/70 mb-4 leading-relaxed">{exp.description}</p>

                <!-- Expanded Content -->
                <div
                  class="overflow-hidden transition-all duration-300 ease-in-out"
                  class:max-h-96={expandedIndex === index}
                  class:max-h-0={expandedIndex !== index}
                >
                  <div class="pt-6 border-t border-white/10 space-y-6">
                    <!-- Achievements -->
                    {#if exp.achievements && exp.achievements.length > 0}
                      <div>
                        <h4 class="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Key Achievements</h4>
                        <ul class="space-y-2">
                          {#each exp.achievements as achievement}
                            <li class="flex items-start gap-3">
                              <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span class="text-sm text-white/70">{achievement}</span>
                            </li>
                          {/each}
                        </ul>
                      </div>
                    {/if}

                    <!-- Technologies -->
                    {#if exp.technologies && exp.technologies.length > 0}
                      <div>
                        <h4 class="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">Technologies Used</h4>
                        <div class="flex flex-wrap gap-2">
                          {#each exp.technologies as tech}
                            <span class="px-3 py-1 bg-surface/50 text-xs font-medium text-primary rounded-full border border-primary/30 hover:bg-primary/10 transition-colors">
                              {tech}
                            </span>
                          {/each}
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  section {
    background: linear-gradient(180deg, rgba(5, 10, 18, 0.5) 0%, rgba(13, 22, 32, 0.3) 100%);
  }
</style>

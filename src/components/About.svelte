<script lang="ts">
  import { onMount } from 'svelte';
  import type { PortfolioData } from '../types';

  export let portfolio: PortfolioData;

  let aboutRef: HTMLElement;
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

    if (aboutRef) observer.observe(aboutRef);

    return () => observer.disconnect();
  });
</script>

<section id="about" class="section-padding relative overflow-hidden" bind:this={aboutRef}>
  <!-- Advanced Background -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/3 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl animate-float" style="animation-delay: 3s"></div>
  </div>

  <div class="container-custom relative z-10">
    <div class="mb-16">
      <div class="animate-slide-up opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.2s; animation-fill-mode: forwards">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span class="text-gradient">Who I Am</span>
        </h2>
        <p class="text-xl text-white/50 max-w-2xl">Passionate about creating beautiful, functional digital experiences</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-12 mb-20">
      <!-- Main Description -->
      <div class="lg:col-span-2 space-y-8">
        <div class="space-y-6 stagger-animation">
          {#each portfolio.about.description as paragraph, index}
            <div class="animate-fade-in opacity-0" class:opacity-100={isVisible} style="animation-delay: {0.3 + index * 0.15}s; animation-fill-mode: forwards">
              <p class="text-lg text-white/70 leading-relaxed">
                {paragraph}
              </p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Stats Card -->
      <div class="animate-slide-in-right opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.5s; animation-fill-mode: forwards">
        <div class="glass-card p-8 space-y-8 h-full">
          <div>
            <div class="text-4xl font-bold text-gradient-primary mb-2">5+</div>
            <p class="text-sm text-white/60 uppercase tracking-widest font-medium">Years of Experience</p>
          </div>
          <div>
            <div class="text-4xl font-bold text-gradient-secondary mb-2">50+</div>
            <p class="text-sm text-white/60 uppercase tracking-widest font-medium">Projects Delivered</p>
          </div>
          <div>
            <div class="text-4xl font-bold text-primary mb-2">100%</div>
            <p class="text-sm text-white/60 uppercase tracking-widest font-medium">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="animate-fade-in opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.7s; animation-fill-mode: forwards">
      <h3 class="text-2xl font-bold mb-8 text-white/90">Technical Stack</h3>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-animation">
        {#each portfolio.about.skills as skill, index}
          <div
            class="glass-card glass-card-hover p-5 text-center group animate-bounce-in opacity-0"
            class:opacity-100={isVisible}
            style="animation-delay: {0.8 + index * 0.08}s; animation-fill-mode: forwards"
          >
            <span class="text-sm font-semibold text-white/80 group-hover:text-primary transition-colors duration-300">{skill}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Expertise Areas -->
    <div class="mt-20">
      <div class="grid md:grid-cols-3 gap-8">
        {#each [
          { title: 'Frontend', icon: '💻', desc: 'React, Vue, Svelte & modern web technologies' },
          { title: 'Backend', icon: '⚙️', desc: 'Node.js, Python & scalable architecture' },
          { title: 'Design', icon: '✨', desc: 'UI/UX design with Figma & prototyping' }
        ] as item, index}
          <div
            class="glass-card p-8 text-center hover-lift animate-slide-up opacity-0"
            class:opacity-100={isVisible}
            style="animation-delay: {1.1 + index * 0.15}s; animation-fill-mode: forwards"
          >
            <div class="text-4xl mb-4">{item.icon}</div>
            <h4 class="text-xl font-bold mb-3 text-white">{item.title}</h4>
            <p class="text-white/60 text-sm">{item.desc}</p>
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

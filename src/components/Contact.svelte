<script lang="ts">
  import { onMount } from 'svelte';
  import type { PortfolioData } from '../types';

  export let portfolio: PortfolioData;

  let contactRef: HTMLElement;
  let isVisible = false;
  let name = '';
  let email = '';
  let message = '';
  let isSubmitting = false;
  let submitSuccess = false;

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

    if (contactRef) observer.observe(contactRef);

    return () => observer.disconnect();
  });

  async function handleSubmit() {
    if (!name || !email || !message) return;

    isSubmitting = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log({ name, email, message });

    // Show success message
    submitSuccess = true;

    // Reset form
    name = '';
    email = '';
    message = '';
    isSubmitting = false;

    // Hide success message after 3 seconds
    setTimeout(() => {
      submitSuccess = false;
    }, 3000);
  }
</script>

<section id="contact" class="section-padding relative overflow-hidden" bind:this={contactRef}>
  <!-- Advanced Background -->
  <div class="absolute inset-0 pointer-events-none overflow-hidden">
    <div class="absolute top-1/4 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-1/4 left-1/3 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float" style="animation-delay: 3s"></div>
  </div>

  <div class="container-custom relative z-10">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="animate-slide-up opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.2s; animation-fill-mode: forwards">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span class="text-gradient">Let's Build</span> Something Great
        </h2>
        <p class="text-xl text-white/50 max-w-2xl mx-auto">Have a project in mind? I'm here to help bring your ideas to life.</p>
      </div>
    </div>

    <div class="grid lg:grid-cols-2 gap-16 items-start">
      <!-- Contact Form -->
      <div class="animate-slide-in-left opacity-0" class:opacity-100={isVisible} style="animation-delay: 0.3s; animation-fill-mode: forwards">
        <div class="gradient-border p-8 md:p-10">
          <div class="space-y-8">
            <div>
              <h3 class="text-2xl font-bold text-white mb-2">Send me a message</h3>
              <p class="text-white/60 text-sm">I'll get back to you as soon as possible</p>
            </div>

            {#if submitSuccess}
              <div class="p-4 bg-success/20 border border-success/50 rounded-lg flex items-start gap-3">
                <span class="text-2xl">✓</span>
                <div>
                  <p class="font-semibold text-success mb-1">Message sent!</p>
                  <p class="text-sm text-white/60">Thank you for reaching out. I'll be in touch soon.</p>
                </div>
              </div>
            {/if}

            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
              <div class="grid sm:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-semibold text-white/80 mb-3">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    bind:value={name}
                    required
                    class="input-field w-full"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-semibold text-white/80 mb-3">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    bind:value={email}
                    required
                    class="input-field w-full"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label for="message" class="block text-sm font-semibold text-white/80 mb-3">Your Message</label>
                <textarea
                  id="message"
                  bind:value={message}
                  required
                  rows="6"
                  class="input-field w-full resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed font-semibold py-3 transition-all duration-300"
              >
                {#if isSubmitting}
                  <span class="flex items-center justify-center gap-2">
                    <div class="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></div>
                    Sending...
                  </span>
                {:else}
                  <span class="flex items-center justify-center gap-2">
                    Send Message
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                  </span>
                {/if}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="animate-slide-in-right opacity-0 space-y-8" class:opacity-100={isVisible} style="animation-delay: 0.4s; animation-fill-mode: forwards">
        <div>
          <h3 class="text-2xl font-bold text-white mb-4">Get in Touch</h3>
          <p class="text-white/60 leading-relaxed">
            I'm always open to new opportunities and collaborations. Whether you have a question or want to discuss your next project, feel free to reach out!
          </p>
        </div>

        <!-- Contact Details -->
        <div class="space-y-6">
          <!-- Email -->
          {#if portfolio.personal.email}
            <div class="glass-card p-6 group hover-lift">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                  <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-white mb-1">Email</h4>
                  <a href="mailto:{portfolio.personal.email}" class="text-white/60 hover:text-primary transition-colors break-all">
                    {portfolio.personal.email}
                  </a>
                </div>
              </div>
            </div>
          {/if}

          <!-- Phone -->
          {#if portfolio.personal.phone}
            <div class="glass-card p-6 group hover-lift">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/30 transition-colors">
                  <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-white mb-1">Phone</h4>
                  <a href="tel:{portfolio.personal.phone}" class="text-white/60 hover:text-secondary transition-colors">
                    {portfolio.personal.phone}
                  </a>
                </div>
              </div>
            </div>
          {/if}

          <!-- Location -->
          {#if portfolio.personal.location}
            <div class="glass-card p-6 group hover-lift">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
                  <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-white mb-1">Location</h4>
                  <p class="text-white/60">{portfolio.personal.location}</p>
                </div>
              </div>
            </div>
          {/if}
        </div>

        <!-- Social Links -->
        <div class="pt-6 border-t border-white/10">
          <h4 class="font-semibold text-white mb-4">Connect on Social</h4>
          <div class="flex gap-4 flex-wrap">
            {#if portfolio.personal.linkedin}
              <a
                href={portfolio.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 glass-card glass-card-hover flex items-center justify-center transition-all duration-300 group/social"
              >
                <svg class="w-5 h-5 text-primary group-hover/social:text-gradient-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            {/if}
            {#if portfolio.personal.github}
              <a
                href={portfolio.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 glass-card glass-card-hover flex items-center justify-center transition-all duration-300 group/social"
              >
                <svg class="w-5 h-5 text-primary group-hover/social:text-gradient-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            {/if}
            {#if portfolio.personal.website}
              <a
                href={portfolio.personal.website}
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 glass-card glass-card-hover flex items-center justify-center transition-all duration-300 group/social"
              >
                <svg class="w-5 h-5 text-secondary group-hover/social:text-gradient-secondary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    background: linear-gradient(180deg, rgba(5, 10, 18, 0.5) 0%, rgba(13, 22, 32, 0.3) 100%);
  }

  input::placeholder,
  textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
</style>

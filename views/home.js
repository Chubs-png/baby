// Home View Component — Premium Rose Theme (Light/Dark Aware)

export function HomeView() {
    return `
    <div class="flex flex-col items-center justify-center min-h-[85vh] text-center w-full px-4">
        
        <!-- Hero Section -->
        <div class="relative flex flex-col items-center gap-8 max-w-3xl">
            
            <!-- Ambient glow behind hero -->
            <div class="absolute -top-20 w-96 h-96 bg-rose-500/8 rounded-full blur-[100px] pointer-events-none"></div>
            <div class="absolute top-40 -left-20 w-64 h-64 bg-rose-400/5 rounded-full blur-[80px] pointer-events-none animate-blob"></div>
            <div class="absolute top-20 -right-20 w-72 h-72 bg-rose-300/5 rounded-full blur-[80px] pointer-events-none animate-blob animation-delay-2000"></div>

            <!-- Floating decorative heart icon -->
            <div class="relative animate-float" style="opacity:0; animation: fadeUp 0.8s forwards 100ms, gentleFloat 4s ease-in-out infinite 1s;">
                <div class="w-20 h-20 glass-card-light rounded-2xl flex items-center justify-center rotate-12 transition-all duration-500 hover:rotate-0 hover:scale-110 animate-glow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-rose-400 drop-shadow-[0_0_12px_rgba(244,63,94,0.4)]">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
            </div>

            <!-- Main Title -->
            <h1 class="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-2 font-playfair" style="opacity:0; animation: fadeUp 0.8s forwards 250ms;">
                <span class="bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(244,63,94,0.3)]">For my baby</span>
            </h1>

            <!-- Shimmer divider -->
            <div class="w-32 h-[2px] shimmer-line rounded-full" style="opacity:0; animation: fadeUp 0.8s forwards 350ms;"></div>
            
            <!-- Subtitle -->
            <p class="text-lg md:text-xl font-light max-w-2xl leading-relaxed" style="opacity:0; animation: fadeUp 0.8s forwards 450ms; color: var(--text-muted);">
                I wanted to create something more permanent than a photo album—a little corner of the digital universe where our memories can just peacefully exist, floating outside of time.
            </p>

            <!-- Quote card -->
            <div class="glass-card p-8 md:p-10 max-w-2xl w-full mt-4 relative overflow-hidden" style="opacity:0; animation: fadeUp 0.8s forwards 600ms;">
                <!-- Decorative corner accents -->
                <div class="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-rose-400/20 rounded-tl-xl"></div>
                <div class="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-rose-400/20 rounded-br-xl"></div>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="text-rose-400/30 mb-4">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p class="text-lg md:text-xl italic font-playfair leading-relaxed" style="color: var(--text-secondary);">
                    Capturing a moment that turned into a lifetime of memories.
                </p>
            </div>
        </div>
    </div>
    `;
}

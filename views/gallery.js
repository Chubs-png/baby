// Gallery View Component — Premium Rose Theme with Lightbox (Light/Dark Aware)

export function GalleryView() {
    const totalImages = 63;
    
    // Generate gallery cards dynamically
    const cards = [];
    
    // Define varied aspect ratios for visual rhythm
    const aspects = [
        'aspect-[3/4]',  // portrait
        'aspect-square',  // square
        'aspect-[4/5]',  // tall portrait
        'aspect-square',  // square
        'aspect-[3/4]',  // portrait
    ];
    
    // Some cards span 2 columns for visual interest
    const wideCards = new Set([3, 6, 11, 16, 21]);
    
    for (let i = 1; i <= totalImages; i++) {
        const aspect = aspects[(i - 1) % aspects.length];
        const delay = ((i - 1) % 8 + 1) * 80;
        const isWide = wideCards.has(i);
        const spanClass = isWide ? 'sm:col-span-2 md:col-span-1' : '';
        
        cards.push(`
            <div class="gallery-card group cursor-pointer ${aspect} ${spanClass} shadow-sm"
                 style="opacity:0; animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}ms;">
                <div class="absolute inset-0 bg-rose-200/30 animate-pulse -z-10"></div>
                <img src="./images/${i}.jpg" 
                     alt="Memory ${i}" 
                     class="w-full h-full object-cover"
                     loading="lazy">
                <!-- Hover overlay with heart icon -->
                <div class="absolute inset-0 z-[2] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div class="w-12 h-12 rounded-full backdrop-blur-md flex items-center justify-center border border-rose-300/20 transform scale-75 group-hover:scale-100 transition-transform duration-300" style="background: var(--gallery-hover-bg);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-rose-400">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                        </svg>
                    </div>
                </div>
            </div>
        `);
    }

    return `
    <div class="w-full">
        <!-- Header -->
        <header class="text-center mb-14 pt-4" style="opacity:0; animation: fadeUp 0.8s forwards 50ms;">
            <div class="inline-flex items-center gap-3 mb-4">
                <div class="w-10 h-[1px] bg-gradient-to-r from-transparent to-rose-400/40"></div>
                <span class="text-rose-400/60 text-xs tracking-[0.3em] uppercase font-medium">Our Moments</span>
                <div class="w-10 h-[1px] bg-gradient-to-l from-transparent to-rose-400/40"></div>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold font-playfair mb-5">
                <span class="bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 bg-clip-text text-transparent">Captured Moments</span>
            </h2>
            <p class="max-w-lg mx-auto text-base leading-relaxed" style="color: var(--text-muted);">
                A collection of beautiful memories and snapshots — each one a little piece of our story.
            </p>
        </header>

        <!-- Masonry-style CSS Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            ${cards.join('')}
        </div>

        <!-- Lightbox Modal -->
        <div id="lightbox" class="fixed inset-0 z-[60] hidden opacity-0 transition-opacity duration-300 lightbox-backdrop flex items-center justify-center p-4 sm:p-8" style="background: var(--lightbox-bg);">
            <button id="lightbox-close" class="absolute top-6 right-6 w-12 h-12 rounded-full bg-rose-500/10 backdrop-blur-md flex items-center justify-center hover:bg-rose-500/20 transition-all duration-300 border border-rose-400/15 z-10" style="color: var(--text-secondary);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <img id="lightbox-img" src="" alt="" class="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-[0_0_80px_rgba(244,63,94,0.15)] animate-scale-in">
        </div>
        
        <!-- Bottom spacing for the floating nav -->
        <div class="h-28"></div>
    </div>
    `;
}

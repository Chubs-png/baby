// Interactive / Messages View Component — Flip Card Design with Pink Flowers (Light/Dark Aware)

export function InteractiveView() {
    // Array of interactive love notes
    const messages = [
        {
            title: "1st",
            text: "Just a little reminder that you're one of the best things that ever happened to me. I'm really happy that I have you, baby."
        },
        {
            title: "2nd",
            text: "I hope you know that no matter how busy my day gets, there's always a part of me thinking about you. I miss you even when we just talked."
        },
        {
            title: "3rd",
            text: "You don't have to be okay all the time, baby. I'm here for you, whether you're happy, sad, tired, or just need someone to listen."
        },
        {
            title: "4th",
            text: "I hope I can make you feel as loved as you make me feel. You deserve so much love, patience, and happiness, and I want to give you that."
        },
        {
            title: "5th",
            text: "If there's one thing I'm sure of, it's that I'm really grateful I get to love you. I wouldn't trade what we have for anything."
        },
        {
            title: "6th",
            text: "Even on ordinary days, you make my life feel a little more special. Sometimes, just receiving a message from you is enough to make me smile."
        },   
        {
            title: "7th",
            text: "Baby, please don't ever feel like you have to earn my love. I love you for who you are, even on the days when you don't feel like your best self."
        }, 
        {
            title: "8th",
            text: "I know I won't always get everything right, but I promise to keep learning how to love you better. Your feelings matter to me, and so does your happiness."
        }, 
        {
            title: "9th",
            text: "If you ever have a bad day, I hope you remember that somewhere, there's someone who's always rooting for you, proud of you, and happy to call you his girl."
        }
    ];

    let cardsHtml = messages.map((msg, index) => {
        const delay = (index + 1) * 120;
        
        return `
        <!-- Flip Card Wrapper -->
        <div class="flip-card" style="opacity:0; animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards ${delay}ms;">
            <div class="flip-card-inner">
                
                <!-- Front Face — Pink Flowers -->
                <div class="flip-card-front">
                    <img src="./images/pink_flowers.jpg" alt="Pink Flowers" class="absolute inset-0 w-full h-full object-cover">
                    <!-- Soft tinted overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-rose-900/50 via-rose-800/20 to-transparent"></div>
                    <!-- Card number badge -->
                    <div class="absolute top-4 left-4 z-10 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center border border-rose-300/20" style="background: var(--flipcard-badge-bg);">
                        <span class="text-rose-100 text-xs font-semibold drop-shadow">${index + 1}</span>
                    </div>
                    <!-- Centered heart icon & label -->
                    <div class="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div class="w-14 h-14 rounded-full bg-rose-400/15 backdrop-blur-sm flex items-center justify-center mb-3 border border-rose-300/20 shadow-[0_0_30px_rgba(244,63,94,0.2)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" class="text-rose-200 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <span class="text-rose-100 font-playfair text-xl font-semibold drop-shadow-lg">${msg.title}</span>
                        <span class="text-rose-200/60 text-xs mt-1.5 tracking-widest uppercase font-light drop-shadow">Tap to read</span>
                    </div>
                </div>
                
                <!-- Back Face — Love Note -->
                <div class="flip-card-back">
                    <div class="absolute inset-0" style="background: linear-gradient(135deg, var(--flipcard-back-from), var(--flipcard-back-via), var(--flipcard-back-to));"></div>
                    <!-- Decorative glow -->
                    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
                    <div class="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
                        <div class="w-10 h-10 rounded-full bg-rose-400/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-rose-300/15">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold mb-3 font-playfair" style="color: var(--text-heading);">${msg.title}</h3>
                        <p class="text-sm md:text-base leading-relaxed font-light" style="color: var(--text-secondary);">${msg.text}</p>
                    </div>
                </div>
                
            </div>
        </div>
        `;
    }).join('');

    return `
    <div class="w-full flex flex-col items-center justify-center min-h-[70vh]">
        <!-- Header -->
        <header class="text-center mb-16 max-w-2xl px-4" style="opacity:0; animation: fadeUp 0.8s forwards 80ms;">
            <div class="inline-flex items-center gap-3 mb-4">
                <div class="w-10 h-[1px] bg-gradient-to-r from-transparent to-rose-400/40"></div>
                <span class="text-rose-400/60 text-xs tracking-[0.3em] uppercase font-medium">Love Notes</span>
                <div class="w-10 h-[1px] bg-gradient-to-l from-transparent to-rose-400/40"></div>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold font-playfair mb-6">
                <span class="bg-gradient-to-r from-rose-500 via-rose-400 to-rose-500 bg-clip-text text-transparent">Memory Lane</span>
            </h2>
            <p class="text-base leading-relaxed" style="color: var(--text-muted);">Click or tap each card to flip it and read a little message written just for you.</p>
        </header>

        <!-- Message Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full max-w-5xl px-4">
            ${cardsHtml}
        </div>
        
        <!-- Bottom spacing for the floating nav -->
        <div class="h-32"></div>
    </div>
    `;
}

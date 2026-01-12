const components = {
    videoCard(v) {
        const a = store.actors.find(x => x.id === v.actorId) || {name: 'Premium'};
        return `
            <div class="video-card group cursor-pointer" onclick="app.openVideo(${v.id})">
                <div class="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-900 shadow-2xl ring-1 ring-white/5">
                    <img src="${v.preview}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div class="absolute bottom-4 left-4 right-4 flex justify-between items-center translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <div class="flex items-center gap-2">
                            <img src="${a.avatar}" class="w-6 h-6 rounded-full border border-white/20">
                            <span class="text-[9px] font-black uppercase tracking-tighter text-white/80">${a.name}</span>
                        </div>
                        <div class="bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-bold text-white border border-white/10">
                            ${v.duration}
                        </div>
                    </div>
                </div>
                <div class="mt-6 px-2">
                    <h3 class="text-xl font-extrabold text-white leading-tight group-hover:text-rose-500 transition-colors line-clamp-1">${v.title}</h3>
                    <div class="flex items-center gap-4 mt-3 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                        <span><i class="fas fa-play-circle mr-2 text-rose-600"></i>${v.views.toLocaleString()}</span>
                        <span class="w-1 h-1 bg-zinc-800 rounded-full"></span>
                        <span>#${v.category}</span>
                    </div>
                </div>
            </div>
        `;
    },

    actorCard(a) {
        return `
            <div class="group cursor-pointer flex flex-col items-center" onclick="app.filterByActor(${a.id})">
                <div class="relative w-full aspect-square rounded-[2.5rem] overflow-hidden p-1 bg-gradient-to-br from-white/10 to-transparent group-hover:from-rose-600 group-hover:to-rose-900 transition-all duration-500">
                    <img src="${a.avatar}" class="w-full h-full object-cover rounded-[2.3rem] grayscale group-hover:grayscale-0 transition-all duration-700">
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div class="mt-6 text-center">
                    <h3 class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-white transition">${a.name}</h3>
                    <p class="text-[8px] font-black text-rose-600 mt-2 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">${a.videosCount} Content Units</p>
                </div>
            </div>
        `;
    }
};
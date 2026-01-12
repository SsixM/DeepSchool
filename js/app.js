let store = { videos: [], actors: [] };

const app = {
    currentVideo: null,
    async init() {
        const d = await api.getInitData();
        if (d) {
            store = d;
            this.renderCats();
            this.renderVideos(store.videos);
            this.renderActors();
            player.init();
            this.setupSearch();
            document.body.style.opacity = '1';
        }
    },
    renderVideos(list, actor = null) {
        const g = document.getElementById('video-grid');
        const h = document.getElementById('channel-header');
        if (actor) {
            h.classList.remove('hidden');
            document.getElementById('ch-name').innerText = actor.name;
            document.getElementById('ch-img').src = actor.avatar;
            document.getElementById('ch-stats').innerText = `${actor.videosCount} ВИДЕО В АРХИВЕ`;
        } else h.classList.add('hidden');
        g.innerHTML = list.map(v => components.videoCard(v)).join('');
    },
    renderActors() {
        document.getElementById('actors-grid').innerHTML = store.actors.map(a => components.actorCard(a)).join('');
    },
    renderCats() {
        const c = ['Все', ...new Set(store.videos.map(v => v.category))];
        document.getElementById('category-bar').innerHTML = c.map(cat => 
            `<button onclick="app.filterCat('${cat}', this)" class="filter-chip ${cat==='Все'?'active':''}">#${cat}</button>`
        ).join('');
    },
    filterCat(c, btn) {
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = c === 'Все' ? store.videos : store.videos.filter(v => v.category === c);
        this.renderVideos(f);
    },
    filterByActor(aid) {
        const a = store.actors.find(x => x.id === aid);
        this.renderVideos(store.videos.filter(v => v.actorId === aid), a);
        router.go('home');
    },
    setupSearch() {
        document.getElementById('search-input').oninput = (e) => {
            const t = e.target.value.toLowerCase();
            const f = store.videos.filter(v => {
                const a = store.actors.find(x => x.id === v.actorId);
                return v.title.toLowerCase().includes(t) || a.name.toLowerCase().includes(t);
            });
            this.renderVideos(f);
            router.go('home');
        };
    },
    async openVideo(id) {
        const v = store.videos.find(x => x.id === id);
        const a = store.actors.find(x => x.id === v.actorId);
        this.currentVideo = v;
        document.getElementById('v-title').innerText = v.title;
        document.getElementById('v-actor-name').innerText = a.name;
        document.getElementById('v-actor-img').src = a.avatar;
        document.getElementById('v-actor-link').onclick = () => this.filterByActor(a.id);
        const vid = document.getElementById('main-video');
        vid.src = v.src;
        vid.play();
        this.updateStats(v);
        router.go('player');
        api.sendAction(v.id, 'view');
    },
    updateStats(v) {
        document.getElementById('v-likes').innerText = v.likes;
        document.getElementById('v-dislikes').innerText = v.dislikes;
        const total = v.likes + v.dislikes;
        const r = total === 0 ? 0 : Math.round((v.likes / total) * 100);
        document.getElementById('v-rating').innerText = `${r}%`;
        const my = localStorage.getItem(`v_${v.id}`);
        document.getElementById('like-btn').style.color = my === 'like' ? '#f43f5e' : '';
        document.getElementById('dislike-btn').style.color = my === 'dislike' ? '#f43f5e' : '';
    },
    async vote(t) {
        const id = this.currentVideo.id;
        const old = localStorage.getItem(`v_${id}`);
        if (old === t) return;
        if (old) await api.sendAction(id, old === 'like' ? 'unlike' : 'undislike');
        const res = await api.sendAction(id, t);
        localStorage.setItem(`v_${id}`, t);
        this.updateStats(res);
    }
};

const api = {
    async getInitData() {
        const r = await fetch('https://genterfd4.pythonanywhere.com/api/init');
        return await r.json();
    },
    async sendAction(id, action) {
        const r = await fetch(`https://genterfd4.pythonanywhere.com/api/video/${id}/action`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ action })
        });
        return await r.json();
    }
};

const router = {
    go(s) {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.getElementById(`view-${s}`).classList.add('active');
        if (s !== 'player') document.getElementById('main-video').pause();
        window.scrollTo(0, 0);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
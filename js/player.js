const player = {
    el: null,
    init() {
        this.el = document.getElementById('main-video');
        const playBtn = document.getElementById('play-pause');
        const vol = document.getElementById('volume-slider');
        const progressArea = document.getElementById('progress-area');

        this.el.setAttribute('preload', 'metadata');

        playBtn.onclick = () => this.toggle();
        this.el.onclick = () => this.toggle();

        this.el.ontimeupdate = () => {
            const p = (this.el.currentTime / this.el.duration) * 100;
            document.getElementById('progress-bar').style.width = `${p}%`;
            document.getElementById('curr-time').innerText = this.format(this.el.currentTime);
            
            if (this.el.buffered.length > 0) {
                const loaded = (this.el.buffered.end(this.el.buffered.length - 1) / this.el.duration) * 100;
                document.getElementById('buffer-bar').style.width = `${loaded}%`;
            }
        };

        progressArea.onclick = (e) => {
            const rect = progressArea.getBoundingClientRect();
            const p = (e.clientX - rect.left) / rect.width;
            this.el.currentTime = p * this.el.duration;
        };

        vol.oninput = (e) => { this.el.volume = e.target.value; };

        this.el.onloadedmetadata = () => {
            document.getElementById('dur-time').innerText = this.format(this.el.duration);
        };
    },
    toggle() {
        const i = document.querySelector('#play-pause i');
        if (this.el.paused) { this.el.play(); i.className = 'fas fa-pause'; }
        else { this.el.pause(); i.className = 'fas fa-play'; }
    },
    format(s) {
        if (isNaN(s)) return "00:00";
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }
};
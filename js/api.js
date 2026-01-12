const API_URL = 'http://127.0.0.1:5000/api'; 

const api = {
    async getInitData() {
        try {
            const r = await fetch(`${API_URL}/init`);
            return await r.json();
        } catch (e) { return null; }
    },
    async sendAction(id, action) {
        try {
            const r = await fetch(`${API_URL}/video/${id}/action`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ action })
            });
            return await r.json();
        } catch (e) { return null; }
    },
    async saveDuration(id, duration) {
        try {
            await fetch(`${API_URL}/video/${id}/duration`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ duration })
            });
        } catch (e) { }
    }
};
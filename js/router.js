const router = {
    go(viewId) {
        const sections = document.querySelectorAll('.view-section');
        const target = document.getElementById(`view-${viewId}`);
        
        // Сначала скрываем всё с анимацией
        sections.forEach(s => {
            s.style.opacity = '0';
            s.style.transform = 'translateY(20px) scale(0.98)';
        });

        setTimeout(() => {
            sections.forEach(s => s.classList.remove('active'));
            target.classList.add('active');
            
            // Форсируем перерисовку для запуска анимации появления
            requestAnimationFrame(() => {
                target.style.opacity = '1';
                target.style.transform = 'translateY(0) scale(1)';
            });
        }, 300);

        if (viewId !== 'player') {
            const v = document.getElementById('main-video');
            v.pause();
            document.getElementById('player-container').classList.remove('player-active');
        } else {
            document.getElementById('player-container').classList.add('player-active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
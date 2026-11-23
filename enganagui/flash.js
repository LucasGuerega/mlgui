    const TEMPO_ESPERA = 5000; // 25 segundos
    const layer = document.getElementById('jumpscare-layer');
    const img = document.getElementById('jumpscare-img');

    // Pré-carrega a imagem
    const preload = new Image();
    preload.src = img.src;

    // Gera um som estridente curto usando Web Audio API (se o navegador permitir sem interação)
    function tocarSomSusto() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        osc1.frequency.setValueAtTime(190, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(920, ctx.currentTime + 0.12);
        osc1.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + 1.4);

        osc2.frequency.setValueAtTime(310, ctx.currentTime);
        osc2.frequency.exponentialRampToValueAtTime(1240, ctx.currentTime + 0.1);
        osc2.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 1.4);

        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 1.5);
        osc2.stop(ctx.currentTime + 1.5);
      } catch (e) {
        // Navegadores modernos podem bloquear áudio automático sem clique prévio
      }
    }

    function dispararJumpscare() {
      layer.classList.add('ativo');
      tocarSomSusto();
    }

    window.addEventListener('load', () => {
      setTimeout(dispararJumpscare, TEMPO_ESPERA);
    });
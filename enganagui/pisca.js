
    // Lista exata com os nomes das imagens enviadas
    const imagens = [
      'noxL.png',
      'HNJo7xQW8AESR8h.jpg',
      'HNBpjlwbYAAommg.png',
      'HISGw4wXIAA28a3.jpg',
      'anam.jpg',
      'artworks-EFzbwZavPVP0yqIX-ew8e2Q-t1080x1080.jpg',
      '856903861_1883249679702588_666004206007542156_n.png',
      '859659385_1151855570612397_5256764631137480567_n.png',
      '849634749_1059233050507529_1511516660970893497_n.png',
      '857672437_1152141240581669_3730227356058952505_n.png',
      '8b2ebc26-af8d-4728-a36b-c8e946cb4a63.jpg'
    ];

    // Pré-carrega as imagens na memória para não engasgar na hora do flash
    imagens.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const overlay = document.getElementById('flash-overlay');
    const flashImg = document.getElementById('flash-img');

    const TEMPO_ESPERA = 10000; // 10 segundos em milissegundos
    const VELOCIDADE_FLASH = 55; // Troca de imagem a cada 25ms (quanto menor, mais rápido)

    let indiceAtual = 0;

    function iniciarFlashesInfinitos() {
      overlay.style.display = 'flex';

      setInterval(() => {
        // Pega uma imagem aleatória (diferente da anterior) ou em sequência
        let proximoIndice;
        do {
          proximoIndice = Math.floor(Math.random() * imagens.length);
        } while (proximoIndice === indiceAtual && imagens.length > 1);

        indiceAtual = proximoIndice;
        flashImg.src = imagens[indiceAtual];
      }, VELOCIDADE_FLASH);
    }

    // Inicia o cronômetro assim que a página terminar de carregar
    window.addEventListener('load', () => {
      setTimeout(iniciarFlashesInfinitos, TEMPO_ESPERA);
    });
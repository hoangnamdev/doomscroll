document.addEventListener('DOMContentLoaded', () => {
    const tunnel = document.getElementById('tunnel');
    const worldBg = document.getElementById('world-bg');
    const particlesContainer = document.getElementById('particles-container');
    const depthProbe = document.getElementById('depth-probe');
    const depthText = document.getElementById('depth-text');
    const endMessage = document.getElementById('end-message');
    const SCROLL_HEIGHT = 100000;
    const VIRTUAL_DEPTH = 6371000; 
    const VIEWPORT_HEIGHT = window.innerHeight;
    const MARKERS = [
        { depth: 0, emoji: '🌳', name: 'Surface Level', description: 'Touch grass while you still can.' },
        { depth: 1.8, emoji: '⚰️', name: 'Standard Grave', description: 'Six feet under. Cozy.' },
        { depth: 4, emoji: '🐊', name: 'Nile Crocodile Burrow', description: 'They dig tunnels to escape the heat. Clever dinos.' },
        { depth: 6, emoji: '🦒', name: 'Giraffe Height', description: 'Buried standing up. Why would you do that?' },
        { depth: 12, emoji: '🎍', name: 'Deepest Roots', description: 'Wild Fig trees can reach this deep looking for water.' },
        { depth: 20, emoji: '💀', name: 'Paris Catacombs', description: '6 million skeletons are judging your scrolling speed.' },
        { depth: 33, emoji: '🧱', name: 'Great Wall of China', description: 'If you buried it vertically. It\'s not that deep.' },
        { depth: 40, emoji: '🏊', name: 'Deepest Scuba Dive', description: 'World Record. Your lungs would look like raisins here.' },
        { depth: 60, emoji: '🤽', name: 'Deep Dive Dubai', description: 'Deepest swimming pool. Contains a sunken city.' },
        { depth: 105, emoji: '🚇', name: 'Arsenalna Station', description: 'Deepest metro station (Kyiv). 5 minute escalator ride.' },
        { depth: 155, emoji: '🏨', name: 'Sala Silver Mine', description: 'You can rent a hotel room here. No windows, obviously.' },
        { depth: 220, emoji: '🐟', name: 'Congo River', description: 'The deepest river in the world. Light does not reach the bottom.' },
        { depth: 300, emoji: '🗼', name: 'Eiffel Tower (Inverted)', description: 'Imagine the view, but dirt.' },
        { depth: 392, emoji: '🧗', name: 'Woodingdean Well', description: 'Deepest hand-dug hole. Dug by guys with shovels in 1862.' },
        { depth: 600, emoji: '☢️', name: 'Nuclear Waste Storage', description: 'Onkalo, Finland. Safe for 100,000 years. Hopefully.' },
        { depth: 700, emoji: '👷', name: 'Chilean Miners', description: 'Where 33 miners were trapped for 69 days in 2010.' },
        { depth: 828, emoji: '🏢', name: 'Burj Khalifa (Inverted)', description: 'We just passed the world\'s tallest building.' },
        { depth: 1270, emoji: '🎸', name: 'Concert in a Mine', description: 'Deepest underground concert (Agnew, Canada). The acoustics rocked.' },
        { depth: 1642, emoji: '🚤', name: 'Lake Baikal', description: 'Deepest lake. Holds 20% of Earth\'s unfrozen fresh water.' },
        { depth: 2197, emoji: '🐌', name: 'Krubera Cave', description: 'The \'Everest of Caves\'. It takes weeks to descend.' },
        { depth: 2400, emoji: '👻', name: 'Jinping Lab', description: 'Deepest physics lab. Hunting for Dark Matter in silence.' },
        { depth: 3800, emoji: '🚢', name: 'Titanic Wreck', description: 'Jack still wouldn\'t fit on the door down here.' },
        { depth: 4000, emoji: '⛏️', name: 'Mponeng Gold Mine', description: 'Deepest mine. Rock temp is 60°C. They pump ice slurry down.' },
        { depth: 8848, emoji: '🏔️', name: 'Mt. Everest (Inverted)', description: 'If you stuffed the mountain into the ocean, this is the tip.' },
        { depth: 10994, emoji: '🦑', name: 'Challenger Deep', description: 'Bottom of Mariana Trench. Pressure: 1,000x surface.' },
        { depth: 12262, emoji: '🕳️', name: 'Kola Borehole', description: 'Soviet Russia drilled this. Stopped because rocks melted into goo.' },
        { depth: 35000, emoji: '💎', name: 'Diamonds Form Here', description: 'Carbon gets crushed into bling.' },
        { depth: 100000, emoji: '🌫️', name: 'Karman Line (Equivalent)', description: 'Edge of space (if you looked up). We are this far down now.' },
        { depth: 410000, emoji: '🔄', name: 'Transition Zone', description: 'Minerals change crystal structure here. It gets messy.' },
        { depth: 700000, emoji: '🌋', name: 'Lower Mantle', description: '70% of Earth\'s volume. Slowly churning like thick soup.' },
        { depth: 2890000, emoji: '📉', name: 'The D\'\' Layer', description: 'The Gutenberg Discontinuity. Boundary between stone and metal.' },
        { depth: 2900000, emoji: '🌊', name: 'Outer Core', description: 'Liquid iron ocean. Magnetic fields generated here.' },
        { depth: 5150000, emoji: '☀️', name: 'Inner Core', description: 'Solid iron ball. Hotter than the surface of the Sun.' },
        { depth: 6371000, emoji: '🛑', name: 'Center of Earth', description: 'You made it. Now scroll back up.' }
    ];
    const COLOR_STOPS = [
        { depth: 0, color: '#87CEEB' },
        { depth: 20, color: '#D2B48C' },
        { depth: 220, color: '#696969' },
        { depth: 1642, color: '#191970' },
        { depth: 10994, color: '#0d0d1f' },
        { depth: 35000, color: '#5E1D1D' },
        { depth: 2900000, color: '#FF4500' },
        { depth: 5150000, color: '#FFFACD' },
        { depth: 6371000, color: '#FFFFFF' }
    ];
    const PARTICLE_ZONES = [
        { start: 0, end: 12, emojis: ['🌳', '🍃', '🪨', '🐊', '🎍', '🪱'] },
        { start: 12, end: 105, emojis: ['💀', '🦴', '🧱', '💧', '🪨'] },
        { start: 105, end: 828, emojis: ['🐟', '🧱', '🪨', '💧'] },
        { start: 828, end: 3800, emojis: ['🐌', '👻', '🦇', '🪨', '💧'] },
        { start: 3800, end: 12262, emojis: ['🏔️', '🦑', '🕳️', '💧', '🔥', '🌋'] },
        { start: 12262, end: 34000, emojis: ['🪨', '🔥', '💥'], effects: { pulse: true } },
        { start: 34000, end: 36000, emojis: ['💎', '💍', '💎', '💎', '✨'], effects: { pulse: true } },
        { start: 36000, end: 100000, emojis: ['🪨', '🔥', '💥', '💎'], effects: { pulse: true } },
        { start: 100000, end: 700000, emojis: ['🔄', '🌫️', '✨', '🪨'], effects: { pulse: true } },
        { start: 700000, end: 2900000, emojis: ['🌋', '🔥', '💥', '☄️', '🪨'], effects: { pulse: true } },
        { start: 2900000, end: 5150000, emojis: ['🌊', '⚡', '🌪️', '🔥', '💥'], effects: { spin: true } },
        { start: 5150000, end: 6371000, emojis: ['☀️', '⚛️', '💥', '💫', '🌟'], effects: { spin: true } }
    ];
    const SCALING_CONFIG = [
        { endDepth: 1000, power: 0.2, scrollPortion: 0.30 },
        { endDepth: 35000, power: 0.5, scrollPortion: 0.30 },
        { endDepth: 2700000, power: 0.8, scrollPortion: 0.25 },
        { endDepth: 2900000, power: 1.0, scrollPortion: 0.05 },
        { endDepth: VIRTUAL_DEPTH, power: 1.5, scrollPortion: 0.10 }
    ];
    function getScrollTopForDepth(depth) {
        if (depth <= 0) return 0;
        if (depth >= VIRTUAL_DEPTH) return SCROLL_HEIGHT;
        let accumulatedScroll = 0;
        let lastDepth = 0;
        for (const zone of SCALING_CONFIG) {
            if (depth <= zone.endDepth) {
                const depthIntoZone = depth - lastDepth;
                const normalizedDepthInZone = depthIntoZone / (zone.endDepth - lastDepth);
                const scrollInZone = Math.pow(normalizedDepthInZone, zone.power) * (zone.scrollPortion * SCROLL_HEIGHT);
                return accumulatedScroll + scrollInZone;
            }
            accumulatedScroll += zone.scrollPortion * SCROLL_HEIGHT;
            lastDepth = zone.endDepth;
        }
        return SCROLL_HEIGHT;
    }
    function getDepthForScrollTop(scrollY) {
        if (scrollY <= 0) return 0;
        if (scrollY >= SCROLL_HEIGHT) return VIRTUAL_DEPTH;
        let accumulatedScroll = 0;
        let lastDepth = 0;
        for (const zone of SCALING_CONFIG) {
            const zoneScrollHeight = zone.scrollPortion * SCROLL_HEIGHT;
            if (scrollY <= accumulatedScroll + zoneScrollHeight) {
                const scrollIntoZone = scrollY - accumulatedScroll;
                const normalizedScrollInZone = scrollIntoZone / zoneScrollHeight;
                const depthInZone = Math.pow(normalizedScrollInZone, 1 / zone.power) * (zone.endDepth - lastDepth);
                return lastDepth + depthInZone;
            }
            accumulatedScroll += zoneScrollHeight;
            lastDepth = zone.endDepth;
        }
        return VIRTUAL_DEPTH;
    }
    function setup() {
        generateParticles();
        generateMarkers();
        update();
    }
    function generateParticles() {
        const isMobile = window.innerWidth <= 600;
        const totalParticles = isMobile ? 300 : 600;
        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const particleScrollY = Math.random() * SCROLL_HEIGHT;
            const particleDepth = getDepthForScrollTop(particleScrollY);
            const zone = PARTICLE_ZONES.find(z => particleDepth >= z.start && particleDepth <= z.end) || PARTICLE_ZONES[0];
            particle.innerHTML = zone.emojis[Math.floor(Math.random() * zone.emojis.length)];
            particle.style.top = `${particleScrollY}px`;
            particle.style.left = `${-20 + Math.random() * 140}%`;
            particle.style.fontSize = `${20 + Math.random() * 100}px`;
            particle.style.opacity = (0.1 + Math.random() * 0.3).toFixed(2);
            particle.style.filter = `blur(${Math.random() * 4}px)`;
            if (zone.effects?.pulse) particle.style.animation = `pulse ${2 + Math.random() * 2}s infinite`;
            if (zone.effects?.spin) particle.style.animation = `spin ${5 + Math.random() * 10}s linear infinite`;
            if (zone.effects?.glow) particle.style.filter += ` drop-shadow(0 0 15px rgba(0, 150, 255, 0.7))`;
            particlesContainer.appendChild(particle);
        }
    }
    function generateMarkers() {
        MARKERS.forEach(markerData => {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            marker.innerHTML = markerData.emoji;
            const topPosition = getScrollTopForDepth(markerData.depth);
            marker.style.top = `${topPosition}px`;
            marker.dataset.depth = markerData.depth;
            const label = document.createElement('div');
            label.classList.add('marker-label');
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('marker-name');
            nameSpan.textContent = `${markerData.name} (${markerData.depth.toLocaleString()} m)`;
            label.appendChild(nameSpan);
            const descSpan = document.createElement('span');
            descSpan.classList.add('marker-description');
            descSpan.textContent = markerData.description;
            label.appendChild(descSpan);
            if (markerData.depth === VIRTUAL_DEPTH) {
                marker.id = 'center-of-earth-marker';
            }
            marker.appendChild(label);
            tunnel.appendChild(marker);
        });
    }
    let hasShakenAtBottom = false;
    function update() {
        const scrollY = window.scrollY;
        const probeLine = scrollY + VIEWPORT_HEIGHT / 2;
        const maxScrollY = SCROLL_HEIGHT; 
        const scrollPercent = Math.max(0, Math.min(1, probeLine / maxScrollY));
        const normalizedScrollYForDepthCalc = scrollPercent * SCROLL_HEIGHT;
        const currentDepth = getDepthForScrollTop(normalizedScrollYForDepthCalc); 
        updateBackgroundColor(Math.floor(currentDepth)); 
        updateMarkersAndProbe(probeLine, currentDepth); 
        particlesContainer.style.transform = `translateY(${-scrollY}px)`;
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1; 
        if (isAtBottom && !hasShakenAtBottom) {
            hasShakenAtBottom = true; 
            tunnel.classList.add('shake-active');
            setTimeout(() => {
                tunnel.classList.remove('shake-active');
            }, 500); 
        } else if (!isAtBottom && hasShakenAtBottom) {
            hasShakenAtBottom = false; 
        }
        const startFadeDepth = 5500000;
        const endFadeDepth = 6200000;
        const opacity = 1 - Math.max(0, Math.min(1, (currentDepth - startFadeDepth) / (endFadeDepth - startFadeDepth)));
        depthProbe.style.opacity = opacity;
        document.getElementById('center-of-earth-marker').style.opacity = 1; 
        const endMessageStartFade = 6100000;
        const endMessageEndFade = 6200000;
        const endMessageOpacity = Math.max(0, Math.min(1, (currentDepth - endMessageStartFade) / (endMessageEndFade - endMessageStartFade)));
        endMessage.style.opacity = endMessageOpacity;
        requestAnimationFrame(update);
    }
    function updateBackgroundColor(currentDepth) {
        let startColor, endColor, localPercent;
        for (let i = 0; i < COLOR_STOPS.length - 1; i++) {
            const startStop = COLOR_STOPS[i];
            const endStop = COLOR_STOPS[i+1];
            if (currentDepth >= startStop.depth && currentDepth <= endStop.depth) {
                startColor = hexToRgb(COLOR_STOPS[i].color);
                endColor = hexToRgb(COLOR_STOPS[i+1].color);
                const range = endStop.depth - startStop.depth;
                localPercent = range > 0 ? (currentDepth - startStop.depth) / range : 1;
                break;
            }
        }
        if(startColor && endColor) {
            const r = Math.round(startColor.r + (endColor.r - startColor.r) * localPercent);
            const g = Math.round(startColor.g + (endColor.g - startColor.g) * localPercent);
            const b = Math.round(startColor.b + (endColor.b - startColor.b) * localPercent);
            worldBg.style.backgroundColor = `rgb(${r},${g},${b})`;
        }
    }
    function updateMarkersAndProbe(probeLine, currentDepth) {
        let visuallyActiveMarkerData = null;
        document.querySelectorAll('.marker').forEach(marker => {
            const markerTop = marker.offsetTop;
            const markerHeight = marker.offsetHeight; 
            const totalVisualHeight = markerHeight;
            if (probeLine >= markerTop && probeLine <= markerTop + totalVisualHeight) {
                const markerData = MARKERS.find(m => m.depth == marker.dataset.depth);
                if (markerData) {
                    visuallyActiveMarkerData = markerData;
                }
            }
            const markerCenter = markerTop + (100 / 2); 
            const distanceToProbeCenter = Math.abs(probeLine - markerCenter);
            if (distanceToProbeCenter < VIEWPORT_HEIGHT / 4) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
        if (visuallyActiveMarkerData) {
            depthText.textContent = `${visuallyActiveMarkerData.name.toUpperCase()} [${visuallyActiveMarkerData.depth.toLocaleString()} m]`;
            depthProbe.classList.add('pulsing');
        } else {
            let depthString;
            if (currentDepth < 2) {
                depthString = currentDepth.toFixed(2);
            } else {
                depthString = Math.floor(currentDepth).toLocaleString();
            }
            depthText.textContent = `${depthString} m`;
            depthProbe.classList.remove('pulsing');
        }
    }
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
    }
    function checkOrientation() {
        const rotateNotification = document.getElementById('rotate-notification');
        if (window.innerWidth < window.innerHeight) {
            rotateNotification.classList.add('visible');
        } else {
            rotateNotification.classList.remove('visible');
        }
    }
    window.addEventListener('resize', checkOrientation);
    setup();
    checkOrientation();
});
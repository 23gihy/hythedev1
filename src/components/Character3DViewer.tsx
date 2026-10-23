import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Scan, ZoomIn, ZoomOut, RefreshCw, Volume2, VolumeX, Eye, ShieldCheck } from 'lucide-react';
import { soundFX } from '../utils/audio';
import originalCharacterNobgUrl from '../assets/images/original_character_nobg.png';

interface Character3DViewerProps {
  onAngleChange?: (degrees: number) => void;
}

export const Character3DViewer: React.FC<Character3DViewerProps> = ({ onAngleChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const standeeMeshRef = useRef<THREE.Mesh | null>(null);
  const backMeshRef = useRef<THREE.Mesh | null>(null);
  const scanPlaneRef = useRef<THREE.Mesh | null>(null);
  const loadedTextureRef = useRef<THREE.Texture | null>(null);

  // Interaction tracking
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const rotationYRef = useRef(0);
  const rotationXRef = useRef(0);
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0);
  const autoRotateRef = useRef(true);
  const zoomLevelRef = useRef(4.8);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 580;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.35, 4.8);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Lighting setup - natural studio lighting without excessive yellow cast
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(2.5, 4, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe2e8f0, 1.6);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    // Subtle crisp rim accents
    const rimLightLeft = new THREE.DirectionalLight(0xf59e0b, 2.8);
    rimLightLeft.position.set(-2.5, 3, -4);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0xfbbf24, 2.2);
    rimLightRight.position.set(2.5, 2.5, -4);
    scene.add(rimLightRight);

    const bottomLight = new THREE.DirectionalLight(0x71717a, 1.2);
    bottomLight.position.set(0, -3, 2);
    scene.add(bottomLight);

    // 5. Ambient Cyber Dust Particles
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      particleColors[i * 3] = 0.95;
      particleColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
      particleColors[i * 3 + 2] = 0.4;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Character Master Group
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);
    characterGroupRef.current = characterGroup;

    // 7. Premium Collector Display Stand (Pedestal)
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -1.6;
    characterGroup.add(pedestalGroup);

    // Glossy Piano Black Base
    const baseGeo = new THREE.CylinderGeometry(1.35, 1.45, 0.12, 64);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x09090b,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 0.9,
      clearcoatRoughness: 0.05,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    pedestalGroup.add(baseMesh);

    // Inner Stage Bevel
    const stageGeo = new THREE.CylinderGeometry(1.15, 1.2, 0.06, 48);
    const stageMat = new THREE.MeshPhysicalMaterial({
      color: 0x18181b,
      roughness: 0.25,
      metalness: 0.6,
      clearcoat: 0.6,
    });
    const stageMesh = new THREE.Mesh(stageGeo, stageMat);
    stageMesh.position.y = 0.08;
    pedestalGroup.add(stageMesh);

    // Clean standee base slot
    const slotGeo = new THREE.BoxGeometry(1.50, 0.04, 0.1);
    const slotMat = new THREE.MeshBasicMaterial({ color: 0x27272a });
    const slotMesh = new THREE.Mesh(slotGeo, slotMat);
    slotMesh.position.set(0, 0.12, 0);
    pedestalGroup.add(slotMesh);

    // Floor Contact Shadow
    const shadowGeo = new THREE.RingGeometry(0.1, 0.95, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = 0.12;
    pedestalGroup.add(shadowMesh);

    // Sleek Radar Grid on Pedestal
    const polarGrid = new THREE.PolarGridHelper(1.15, 6, 3, 32, 0xf59e0b, 0x3f3f46);
    polarGrid.position.y = 0.125;
    pedestalGroup.add(polarGrid);

    // Rotating Outer Rings on Pedestal
    const ringGeo1 = new THREE.TorusGeometry(1.48, 0.015, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2;
    pedestalGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.25, 0.012, 16, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xd97706, transparent: true, opacity: 0.75 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 2;
    pedestalGroup.add(ring2);

    // Dynamic Orbiting Rings around the character (as originally loved by the user)
    const orbitRingGeo = new THREE.TorusGeometry(1.68, 0.015, 16, 64);
    const orbitRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.65 });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing1.rotation.x = Math.PI / 3;
    characterGroup.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing2.rotation.x = -Math.PI / 3;
    orbitRing2.rotation.y = Math.PI / 4;
    characterGroup.add(orbitRing2);

    // 8. 3D ACRYLIC DIE-CUT OF ORIGINAL CHARACTER (NO BACKGROUND)
    const standeeAssembly = new THREE.Group();
    characterGroup.add(standeeAssembly);

    // Dimensions matching full character ratio (536x948 -> 1.40 x 2.48)
    const standeePlaneGeo = new THREE.PlaneGeometry(1.40, 2.48);

    // Front Face (Original Character Cutout with Clean Transparency & Glossy Finish)
    const frontMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      alphaTest: 0.02,
      roughness: 0.14,
      metalness: 0.04,
      clearcoat: 0.95,
      clearcoatRoughness: 0.04,
      opacity: 0,
      side: THREE.FrontSide,
    });

    const frontMesh = new THREE.Mesh(standeePlaneGeo, frontMat);
    frontMesh.position.set(0, -0.22, 0.015);
    standeeAssembly.add(frontMesh);
    standeeMeshRef.current = frontMesh;

    // Back Face (Mirrored Standee with Clean Transparency)
    const backMat = new THREE.MeshPhysicalMaterial({
      transparent: true,
      alphaTest: 0.02,
      roughness: 0.2,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.06,
      opacity: 0,
      side: THREE.FrontSide,
    });

    const backMesh = new THREE.Mesh(standeePlaneGeo, backMat);
    backMesh.position.set(0, -0.22, -0.015);
    backMesh.rotation.y = Math.PI;
    standeeAssembly.add(backMesh);
    backMeshRef.current = backMesh;

    // 9. Laser Scanning Plane
    const scanGeo = new THREE.PlaneGeometry(2.8, 0.05);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const scanPlane = new THREE.Mesh(scanGeo, scanMat);
    scanPlane.position.y = -1.2;
    characterGroup.add(scanPlane);
    scanPlaneRef.current = scanPlane;

    // 10. Load Original Character Cutout Texture with Maximum Clarity & Anisotropic Filtering
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(originalCharacterNobgUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      loadedTextureRef.current = tex;

      if (frontMesh.material instanceof THREE.MeshPhysicalMaterial) {
        frontMesh.material.map = tex;
        frontMesh.material.opacity = 1.0;
        frontMesh.material.needsUpdate = true;
      }
      if (backMesh.material instanceof THREE.MeshPhysicalMaterial) {
        backMesh.material.map = tex;
        backMesh.material.opacity = 0.98;
        backMesh.material.needsUpdate = true;
      }
    });

    // 11. Pointer & Drag Event Handlers for 360 Rotation
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
      soundFX.playClick();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevMousePosRef.current.x;
      const deltaY = e.clientY - prevMousePosRef.current.y;

      targetRotationYRef.current += deltaX * 0.012;
      targetRotationXRef.current = Math.max(-0.4, Math.min(0.4, targetRotationXRef.current + deltaY * 0.006));

      prevMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Wheel zoom
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomLevelRef.current = Math.max(3.2, Math.min(6.5, zoomLevelRef.current + e.deltaY * 0.003));
    };
    domElement.addEventListener('wheel', onWheel, { passive: false });

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth || 500;
      const newHeight = container.clientHeight || 580;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop with smooth inertial physics
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let scanDirection = 1;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Auto rotation
      if (autoRotateRef.current && !isDraggingRef.current) {
        targetRotationYRef.current += delta * 0.65;
      }

      // Smooth inertia interpolation (lerp)
      rotationYRef.current += (targetRotationYRef.current - rotationYRef.current) * 0.08;
      rotationXRef.current += (targetRotationXRef.current - rotationXRef.current) * 0.08;

      if (characterGroupRef.current) {
        characterGroupRef.current.rotation.y = rotationYRef.current;
        characterGroupRef.current.rotation.x = rotationXRef.current;
      }

      // Smooth camera zoom lerp
      if (cameraRef.current) {
        cameraRef.current.position.z += (zoomLevelRef.current - cameraRef.current.position.z) * 0.1;
      }

      // Orbiting cyber rings and stage rings rotation
      orbitRing1.rotation.z += delta * 0.35;
      orbitRing2.rotation.z -= delta * 0.3;
      ring1.rotation.z += delta * 0.2;
      ring2.rotation.z -= delta * 0.25;

      // Dust particles float
      particles.rotation.y = elapsedTime * 0.035;

      // Laser Scanner Sweep
      if (scanPlaneRef.current && scanPlaneRef.current.material instanceof THREE.MeshBasicMaterial) {
        if (scanPlaneRef.current.material.opacity > 0) {
          scanPlaneRef.current.position.y += delta * 2.2 * scanDirection;
          if (scanPlaneRef.current.position.y > 1.4) {
            scanDirection = -1;
          } else if (scanPlaneRef.current.position.y < -1.4) {
            scanDirection = 1;
          }
        }
      }

      // Calculate degrees (0° - 360°)
      const rawDeg = ((rotationYRef.current * 180) / Math.PI) % 360;
      const normalizedDeg = Math.round(rawDeg < 0 ? rawDeg + 360 : rawDeg);
      setCurrentAngle(normalizedDeg);
      if (onAngleChange) onAngleChange(normalizedDeg);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Trigger Security Laser Scan
  const handleTriggerScan = () => {
    setIsScanning(true);
    soundFX.playScan();
    if (scanPlaneRef.current && scanPlaneRef.current.material instanceof THREE.MeshBasicMaterial) {
      scanPlaneRef.current.material.opacity = 0.85;
    }
    setTimeout(() => {
      if (scanPlaneRef.current && scanPlaneRef.current.material instanceof THREE.MeshBasicMaterial) {
        scanPlaneRef.current.material.opacity = 0;
      }
      setIsScanning(false);
      soundFX.playSuccess();
    }, 2400);
  };

  const handleResetAngle = () => {
    targetRotationYRef.current = 0;
    targetRotationXRef.current = 0;
    zoomLevelRef.current = 4.8;
    soundFX.playClick();
  };

  const handleZoom = (inOut: 'in' | 'out') => {
    zoomLevelRef.current = inOut === 'in'
      ? Math.max(3.2, zoomLevelRef.current - 0.5)
      : Math.min(6.5, zoomLevelRef.current + 0.5);
    soundFX.playClick();
  };

  return (
    <div className="relative w-full h-[500px] lg:h-[620px] flex items-center justify-center select-none overflow-hidden">
      {/* Ambient background aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] lg:w-[480px] lg:h-[480px] rounded-full bg-amber-500/10 blur-[95px] animate-cyber-glow" />
      </div>

      {/* Subtle scanline overlay on canvas */}
      <div className="absolute inset-0 scanlines-overlay opacity-20 pointer-events-none z-10" />

      {/* Main 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none z-20 flex items-center justify-center"
        title="Nhấp và kéo chuột hoặc vuốt để xoay mô hình Hy Dev 360 độ"
      />

      {/* Floating 360 HUD Angle Indicator */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono text-amber-400">
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span className="tabular-nums font-semibold">{currentAngle}°</span>
          <span className="text-zinc-500 text-[10px]">/ 360°</span>
        </div>

        {isScanning && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-[11px] font-mono text-amber-300 animate-pulse">
            <Scan className="w-3.5 h-3.5" />
            <span>SCANNING 3D...</span>
          </div>
        )}
      </div>

      {/* Audio Mute & Reset Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5">
        <button
          onClick={() => {
            const next = !isMuted;
            setIsMuted(next);
            soundFX.setMuted(next);
          }}
          className="p-2 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors"
          title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          aria-label="Toggle Audio"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={handleResetAngle}
          className="p-2 rounded-lg bg-black/60 border border-white/10 text-zinc-400 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
          title="Đặt lại góc nhìn chính diện (0°)"
          aria-label="Reset Angle"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Interactive Controller Bar */}
      <div className="absolute bottom-4 inset-x-4 z-30 flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md">
        {/* Character Name & Identity: Hy Dev (360°) */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/90 rounded-lg border border-amber-500/30 text-xs font-semibold text-amber-300 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Hy Dev (360°)</span>
        </div>

        {/* Action Controls: Auto Rotate, Scan, Zoom */}
        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => {
              setAutoRotate(!autoRotate);
              soundFX.playClick();
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
              autoRotate
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-zinc-200'
            }`}
            title={autoRotate ? 'Dừng tự xoay 360' : 'Bật tự xoay 360'}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{autoRotate ? 'Đang xoay' : 'Tự xoay'}</span>
          </button>

          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 hover:text-amber-300 hover:border-amber-500/40 transition-colors flex items-center gap-1.5"
            title="Quét radar an ninh laser"
          >
            <Scan className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quét Pentest</span>
          </button>

          <div className="flex items-center gap-0.5 bg-zinc-900 rounded-lg border border-white/10 p-0.5">
            <button
              onClick={() => handleZoom('in')}
              className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
              title="Phóng to"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-1 text-zinc-400 hover:text-white rounded transition-colors"
              title="Thu nhỏ"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Helper Indicator */}
      <div className="absolute top-16 right-4 z-20 pointer-events-none hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[11px] text-zinc-300 backdrop-blur-sm">
        <Eye className="w-3.5 h-3.5 text-amber-400" />
        <span>Kéo để xoay mô hình Hy Dev 360° · Cuộn để thu phóng</span>
      </div>
    </div>
  );
};

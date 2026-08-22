import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreeLeafCanvas({ className = "w-full h-full" }) {
  const containerRef = useRef(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x10b981, 2.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 12);
    pointLight1.position.set(-3, -2, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 4, 12);
    pointLight2.position.set(3, 3, 2);
    scene.add(pointLight2);

    // Main 3D Plant & Orbitals Group
    const plantGroup = new THREE.Group();

    // Central Stem
    const stemGeo = new THREE.CylinderGeometry(0.04, 0.08, 4.0, 16);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x00422b,
      roughness: 0.3,
      metalness: 0.2
    });
    const stem = new THREE.Mesh(stemGeo, stemMat);
    stem.position.y = -0.5;
    plantGroup.add(stem);

    // Leaves Creation Helper
    const createLeaf = (scale = 1, rotZ = 0, posY = 0) => {
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.bezierCurveTo(0.5, 0.5, 1.2, 1.2, 0.8, 2.2);
      leafShape.bezierCurveTo(0.4, 2.8, 0, 3.2, 0, 3.2);
      leafShape.bezierCurveTo(0, 3.2, -0.4, 2.8, -0.8, 2.2);
      leafShape.bezierCurveTo(-1.2, 1.2, -0.5, 0.5, 0, 0);

      const extrudeSettings = {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 2,
        bevelSize: 0.04,
        bevelThickness: 0.04
      };

      const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
      const leafMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        emissive: 0x00422b,
        emissiveIntensity: 0.25,
        roughness: 0.2,
        metalness: 0.15,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        transmission: 0.35,
        opacity: 0.95,
        transparent: true
      });

      const leafMesh = new THREE.Mesh(leafGeo, leafMat);
      leafMesh.scale.set(scale * 0.42, scale * 0.42, scale * 0.42);
      leafMesh.rotation.z = rotZ;
      leafMesh.position.y = posY;
      return leafMesh;
    };

    // Add Leaves
    const leaf1 = createLeaf(1.2, -Math.PI / 4, 0.2);
    const leaf2 = createLeaf(1.2, Math.PI / 4, 0.5);
    const leaf3 = createLeaf(1.0, -Math.PI / 3, -0.5);
    const leaf4 = createLeaf(1.0, Math.PI / 3, -0.2);
    const leafTop = createLeaf(0.85, 0, 1.1);

    plantGroup.add(leaf1, leaf2, leaf3, leaf4, leafTop);

    // STITCH DIGITAL ORBITALS WITH TELEMETRY DATA
    const orbitGroup = new THREE.Group();
    const nodeCount = 10;

    const telemetryNodesData = [
      { label: 'Soil Moisture Sensor Node', value: '62% (Optimal Range 55-75%)', status: 'Healthy' },
      { label: 'NDVI Vegetation Satellite Node', value: '0.84 (High Vigorous Growth)', status: 'Optimal' },
      { label: 'NPK Soil Nitrogen Node', value: '42 ppm (Target Nitrogen Applied)', status: 'High' },
      { label: 'Microclimate Weather Node', value: '24°C • 12 km/h Wind', status: 'Active' },
      { label: 'APMC Mandi Arbitrage Node', value: 'Wheat +3.2% Today (Lucknow APMC)', status: 'Bullish' }
    ];

    for (let i = 0; i < nodeCount; i++) {
      const nodeGeo = new THREE.SphereGeometry(0.13, 16, 16);
      const isBlue = i % 2 === 0;
      const nodeMat = new THREE.MeshStandardMaterial({
        color: isBlue ? 0x38bdf8 : 0x6ffbbe,
        emissive: isBlue ? 0x0284c7 : 0x10b981,
        emissiveIntensity: 0.9,
        roughness: 0.1,
        metalness: 0.8
      });

      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 2.2 + (i % 3) * 0.3;
      node.position.x = Math.cos(angle) * radius;
      node.position.z = Math.sin(angle) * radius;
      node.position.y = (Math.random() - 0.5) * 2.5;

      node.userData = telemetryNodesData[i % telemetryNodesData.length];

      orbitGroup.add(node);
    }

    plantGroup.add(orbitGroup);

    // Orbital Ring Lines
    const ringGeo = new THREE.TorusGeometry(2.4, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.45
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    plantGroup.add(ringMesh);

    plantGroup.position.set(0, -0.2, 0);
    scene.add(plantGroup);

    // Particle Swarm Cloud
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 8;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x6ffbbe,
      size: 0.09,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Movement Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Raycaster for Clicking 3D Telemetry Nodes
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(orbitGroup.children);

      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        if (clickedMesh.userData && clickedMesh.userData.label) {
          setSelectedNodeData(clickedMesh.userData);
        }
      }
    };

    container.addEventListener('click', handleClick);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      plantGroup.rotation.y = elapsedTime * 0.35 + mouseX * 0.4;
      plantGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08 + mouseY * 0.2;
      plantGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.2) * 0.15;

      orbitGroup.rotation.y = -elapsedTime * 0.6;
      orbitGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.2;

      ringMesh.rotation.z = elapsedTime * 0.2;

      particles.rotation.y = elapsedTime * 0.04;
      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(elapsedTime + i) * 0.002;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className={className} />

      {/* Floating 3D Telemetry Inspection Dialog */}
      {selectedNodeData && (
        <div className="absolute top-4 right-4 z-50 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#006c49]/30 shadow-2xl space-y-2 max-w-xs animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#006c49]/15 pb-2">
            <span className="text-[10px] font-extrabold uppercase text-[#006c49] tracking-wider">
              🛰️ 3D Telemetry Node
            </span>
            <button 
              onClick={() => setSelectedNodeData(null)}
              className="text-xs font-bold text-red-500 hover:underline"
            >
              ✕
            </button>
          </div>
          <h4 className="font-display font-extrabold text-sm text-[#002117]">{selectedNodeData.label}</h4>
          <p className="text-xs font-bold text-[#006c49]">{selectedNodeData.value}</p>
          <span className="inline-block text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
            Status: {selectedNodeData.status}
          </span>
        </div>
      )}
    </div>
  );
}

import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();

// Read the original (unscaled) model
const document = await io.read('public/models/armchair.glb');

// Scale factor: convert from cm to meters (divide by 100)
const scaleFactor = 0.01;

const scene = document.getRoot().listScenes()[0];
for (const node of scene.listChildren()) {
    // Reset any existing translation to origin
    node.setTranslation([0, 0, 0]);
    
    // Apply scale
    const currentScale = node.getScale();
    node.setScale([
        currentScale[0] * scaleFactor,
        currentScale[1] * scaleFactor,
        currentScale[2] * scaleFactor
    ]);
}

// Write the fixed model
await io.write('public/models/armchair-fixed.glb', document);

console.log('Armchair fixed! New file: public/models/armchair-fixed.glb');

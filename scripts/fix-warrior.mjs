import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();
const document = await io.read('public/models/warrior-toy.glb');

const scaleFactor = 0.5; // Scale down by half

const scene = document.getRoot().listScenes()[0];
for (const node of scene.listChildren()) {
    // Reset translation to origin
    node.setTranslation([0, 0, 0]);
    
    // Scale down
    const currentScale = node.getScale();
    node.setScale([
        currentScale[0] * scaleFactor,
        currentScale[1] * scaleFactor,
        currentScale[2] * scaleFactor
    ]);
}

await io.write('public/models/warrior-toy-fixed.glb', document);
console.log('Warrior toy fixed! New file: public/models/warrior-toy-fixed.glb');

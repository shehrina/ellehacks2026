import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();

// Fix bed - scale down MUCH more (5% of original)
const bedDoc = await io.read('public/models/bed.glb');
const bedScene = bedDoc.getRoot().listScenes()[0];
for (const node of bedScene.listChildren()) {
    node.setTranslation([0, 0, 0]);
    const currentScale = node.getScale();
    node.setScale([currentScale[0] * 0.05, currentScale[1] * 0.05, currentScale[2] * 0.05]);
}
await io.write('public/models/bed-fixed.glb', bedDoc);
console.log('Bed fixed! New file: public/models/bed-fixed.glb');

// Fix bookshelf - scale down MUCH more (5% of original)
const shelfDoc = await io.read('public/models/bookshelf.glb');
const shelfScene = shelfDoc.getRoot().listScenes()[0];
for (const node of shelfScene.listChildren()) {
    node.setTranslation([0, 0, 0]);
    const currentScale = node.getScale();
    node.setScale([currentScale[0] * 0.05, currentScale[1] * 0.05, currentScale[2] * 0.05]);
}
await io.write('public/models/bookshelf-fixed.glb', shelfDoc);
console.log('Bookshelf fixed! New file: public/models/bookshelf-fixed.glb');

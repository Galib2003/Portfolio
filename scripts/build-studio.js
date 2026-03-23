import fs from 'fs';
import path from 'path';

const galleries = [
    {
        name: 'Studio Gallery',
        imageDir: path.join(process.cwd(), 'public', 'images', 'studio'),
        outputFile: path.join(process.cwd(), 'src', 'data', 'studio.json'),
        urlPrefix: 'images/studio/'
    },
    {
        name: 'Art & Design Gallery',
        imageDir: path.join(process.cwd(), 'public', 'images', 'art_design'),
        outputFile: path.join(process.cwd(), 'src', 'data', 'art_design.json'),
        urlPrefix: 'images/art_design/'
    }
];

const buildDir = path.join(process.cwd(), 'src', 'data');

// Ensure build directory exists
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

galleries.forEach(gallery => {
    console.log(`Building ${gallery.name} Database...`);

    // Ensure image directory exists
    if (!fs.existsSync(gallery.imageDir)) {
        console.log(`Creating directory for you to upload images: ${gallery.imageDir}`);
        fs.mkdirSync(gallery.imageDir, { recursive: true });
    }

    // Read all files in the image folder
    const files = fs.readdirSync(gallery.imageDir);

    // Filter for images and build data array
    const imageData = files
        .filter(file => file.match(/\.(jpg|jpeg|png|gif|webp)$/i))
        .map(file => {
            // Clean up the filename to make a rough "title" or "alt" text
            const title = file
                .replace(/\.[^/.]+$/, "") // Remove extension
                .replace(/[-_]/g, " ");   // Replace dashes/underscores with spaces

            return {
                imageUrl: `${gallery.urlPrefix}${file}`,
                alt: title
            };
        });

    // Always write the file, even if empty, so the UI doesn't crash on import
    fs.writeFileSync(gallery.outputFile, JSON.stringify(imageData, null, 2));

    console.log(`Successfully mapped ${imageData.length} images for ${gallery.name}.`);
});

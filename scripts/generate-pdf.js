
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.resolve(__dirname, '../public/portfolio.pdf');

async function generatePDF() {
    console.log('Starting PDF generation...');

    // Start the Vite server
    console.log('Starting local server...');
    const server = spawn('npm', ['run', 'dev', '--', '--port', '5174'], {
        cwd: path.resolve(__dirname, '..'),
        shell: true,
        stdio: 'pipe' // Capture output to detect when ready
    });

    let serverUrl = 'http://localhost:5174';

    // Wait for server to be ready
    await new Promise((resolve, reject) => {
        server.stdout.on('data', (data) => {
            const output = data.toString();
            // console.log(output); // Debug logs
            if (output.includes('Local:')) {
                // Extract port if needed, but we forced 5174
                resolve();
            }
        });

        // Fallback timeout
        setTimeout(resolve, 5000);
    });

    console.log('Server started. Launching browser...');

    const browser = await puppeteer.launch({
        headless: "new"
    });
    const page = await browser.newPage();

    try {
        // Navigate to print mode
        await page.goto(`${serverUrl}?print=true`, { waitUntil: 'networkidle0' });

        // Wait a bit for any animations or images (safety buffer)
        await new Promise(r => setTimeout(r, 2000));

        console.log(`Generating PDF to ${OUTPUT_PATH}...`);

        await page.pdf({
            path: OUTPUT_PATH,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '1cm',
                right: '1cm',
                bottom: '1cm',
                left: '1cm'
            }
        });

        console.log('PDF generated successfully!');
    } catch (err) {
        console.error('Error generating PDF:', err);
    } finally {
        await browser.close();
        server.kill();
        process.exit(0);
    }
}

generatePDF();

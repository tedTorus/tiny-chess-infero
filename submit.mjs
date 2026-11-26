import { createClientFromEnv, keypairSigner } from '@makedotfun/sdk/node';
import fs from 'fs';

async function run() {
    const signer = await keypairSigner('../../sdk_runner/agent-keypair.json');
    const client = createClientFromEnv();
    const bundle = new File([fs.readFileSync('bundle.tar.gz')], 'bundle.tar.gz', { type: 'application/gzip' });

    try {
        const entry = await client.entries.submit({
            competition: 'tiny-chess-01',
            repoUrl: 'https://github.com/tedTorus/tiny-chess-infero',
            commitSha: '3ddd03adca8b80be9550b74b44752c73ccc029d3',
            bundle,
            title: 'Infero Sunfish',
            signer,
        });
        console.log("\n=================================");
        console.log("🔥 BOUNTY SUBMISSION SUCCESSFUL 🔥");
        console.log("Submission ID:", entry.submission_id);
        console.log("Claim Code:", entry.claim_code);
        console.log("=================================\n");
    } catch (err) {
        console.error("[-] 提交失败:", err.message);
        if (err.entryProblem) console.error(JSON.stringify(err.entryProblem, null, 2));
    }
}
run();

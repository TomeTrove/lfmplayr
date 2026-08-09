import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

const assetRoots = [
    "./drizzle/media",
    "./drizzle/users",
];

const output = "./src/assets.ts";

type Asset = {
    path: string;
    data: string;
};

async function collectFiles(root: string): Promise<Asset[]> {
    const results: Asset[] = [];

    async function walk(directory: string) {
        const entries = await readdir(directory, {
            withFileTypes: true,
        });

        for (const entry of entries) {
            const fullPath = join(directory, entry.name);

            if (entry.isDirectory()) {
                await walk(fullPath);
                continue;
            }

            const relativePath = relative(root, fullPath)
                .replaceAll("\\", "/");

            const data = await readFile(fullPath);

            results.push({
                path: relativePath,
                data: data.toString("base64"),
            });
        }
    }

    await walk(root);

    return results;
}

const assets: Record<string, Asset[]> = {};

for (const root of assetRoots) {
    assets[root.replaceAll("\\", "/")] = await collectFiles(root);
}

const generated = `
// THIS FILE IS AUTO-GENERATED.
// DO NOT EDIT.

export type EmbeddedAsset = {
    path: string;
    data: string;
};

export const Assets: Record<string, EmbeddedAsset[]> =
    ${JSON.stringify(assets, null, 4)};
`;

await writeFile(output, generated);

console.log(`Generated ${output}`);
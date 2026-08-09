import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { tmpdir } from "node:os";

import { Assets } from "./assets";

export class AssetLoader {
    private static loaded = new Map<string, string>();

    static async Load(assetPath: string): Promise<string> {
        const normalized = assetPath
            .replaceAll("\\", "/")
            .replace(/\/$/, "");

        const existing = this.loaded.get(normalized);

        if (existing) {
            return existing;
        }

        // Normal development environment
        if (!Bun.embeddedFiles?.length) {
            const path = resolve(normalized);

            if (!existsSync(path)) {
                throw new Error(
                    `Asset directory does not exist: ${normalized}`
                );
            }

            return path;
        }

        // Compiled executable
        const files = Assets[normalized];

        if (!files) {
            throw new Error(
                `Embedded asset directory not found: ${normalized}`
            );
        }

        const destination = join(
            tmpdir(),
            "lfmplayr",
            normalized.replace(/^\.\/+/, "")
        );

        for (const file of files) {
            const outputPath = join(destination, file.path);

            await mkdir(dirname(outputPath), {
                recursive: true,
            });
            console.log("wrote asset", outputPath)
            await writeFile(
                outputPath,
                Buffer.from(file.data, "base64")
            );
        }

        this.loaded.set(normalized, destination);

        return destination;
    }
}
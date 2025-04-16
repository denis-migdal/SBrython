import fs from "fs/promises";

const encoder = new TextEncoder();

export default async function save(path, content) {

    const file = await fs.open(path, "a+");

    const old_content = await file.readFile({encoding: "utf8"});

    if( content !== old_content ) {
        await file.truncate();
        await file.write( encoder.encode(content), {position: 0}); // ftruncate doesn't reset position...
    }
    await file.close();
}
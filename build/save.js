import fs from "fs/promises";

const encoder = new TextEncoder();

export default async function save(path, content) {

    const file = await fs.open(path, "a+");

    const size = (await file.stat()).size;
    const file_changed = size !== content.length;

    if( file_changed ) {
        if( size )
            await file.truncate();
        await file.write( encoder.encode(content), {position: 0}); // ftruncate doesn't reset position...
    }
    await file.close();
}
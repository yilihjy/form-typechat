const { readFile, writeFile  } = require("node:fs/promises");
const { resolve, join } = require("node:path");

async function main() {
  try {
    const filePath = resolve("./src/FormSchema.ts");
    const contents = await readFile(filePath, { encoding: "utf8" });
    const data = '/**\n* 由beforeBuild.js自动生成，不要手动修改 \n*\/\nexport const formSchemaString: string = `' + contents + '`;'
    await writeFile(join(filePath, '..', 'FormSchemaString.ts', ), data); 
  } catch (err) {
    console.error(err.message);
  }
}

main();

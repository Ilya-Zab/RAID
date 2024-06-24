const { existsSync, readFileSync, writeFileSync } = require("fs");

// adds "type" property with "module" value to the package.json configuration file of the DeepAR library
// it is required, because EcmaScript version for this package detects uncorrectly, it leads to error in the execution time
function mutateDeepARPackageConfig() {
    const path = "./node_modules/deepar/package.json";

    if (!existsSync(path)) {
        console.error(`"${path}" does not found.`);
        return;
    }

    const text = readFileSync(path);
    const config = JSON.parse(text);

    config.type = "module";
    writeFileSync(path, JSON.stringify(config, null, 4));
    console.log(`"type" property successfully defined to "module" in the package.json config of the DeepAR library.`)
}

mutateDeepARPackageConfig();

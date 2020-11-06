const path = require("path");
const fs = require("fs");
const CLIEngine = require("eslint").CLIEngine;

createComponentsIndex();

function createComponentsIndex() {
    let contentHeader = `
    /**
     *  1、这个文件是动态生成的， 执行npm run build:file即可。
     *  2、请不要手动写这里的代码， 将会被覆盖。
     */
    `;
    let contentExportComp = "export default { \n";
    let contentExportConfig = "export const componentsConfig = { \n";
    let result = "";
    const paths = fs.readdirSync(path.resolve(process.cwd(), "src/components"));
    paths.forEach(child => {
        const upper = upperCase(child);
        if (fs.statSync(path.resolve(process.cwd(), "src/components/" + child)).isDirectory()) {
            contentHeader += `import Rp${upper} from "./${child}/index.vue"; \n`;
            contentHeader += `import Rp${upper}Config from "./${child}/config"; \n`;
            contentExportComp += `  Rp${upper}, \n`;
            contentExportConfig += `  Rp${upper}: Rp${upper}Config, \n`;
        }
    });
    contentExportComp += `}`;
    contentExportConfig += `}`;
    result = `${contentHeader}\n\n${contentExportComp}\n\n${contentExportConfig}`;
    fs.writeFileSync(path.resolve(process.cwd(), "src/components/index.ts"), result);
    const engine = new CLIEngine({
        fix: true
    });
    const report = engine.executeOnFiles(path.resolve(process.cwd(), "src/components/index.ts"));
    CLIEngine.outputFixes(report);
}

function upperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}
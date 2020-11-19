const path = require("path");
const fs = require("fs");
const CLIEngine = require("eslint").CLIEngine;
const rootPath = "wepage-components/"
const componentsPath = rootPath + "packages/"


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
    const paths = fs.readdirSync(path.resolve(process.cwd(), componentsPath));
    paths.forEach(child => {
        const upper = upperCase(child);
        if (fs.statSync(path.resolve(process.cwd(), componentsPath + child)).isDirectory()) {
            contentHeader += `import Wui${upper} from "./packages/${child}/index.vue"; \n`;
            contentHeader += `import Wui${upper}Config from "./packages/${child}/config"; \n`;
            contentExportComp += `  Wui${upper}, \n`;
            contentExportConfig += `  Wui${upper}: Wui${upper}Config, \n`;
        }
    });
    contentExportComp += `}`;
    contentExportConfig += `}`;
    result = `${contentHeader}\n\n${contentExportComp}\n\n${contentExportConfig}`;
    fs.writeFileSync(path.resolve(process.cwd(), rootPath + "index.ts"), result);
    const engine = new CLIEngine({
        fix: true
    });
    const report = engine.executeOnFiles(path.resolve(process.cwd(), rootPath + "/index.ts"));
    CLIEngine.outputFixes(report);
}

function upperCase(str) {
    str = str.replace(/(-[^-]?)/g, $1 => ($1.slice(1)).toUpperCase())
    return str[0].toUpperCase() + str.slice(1);
}
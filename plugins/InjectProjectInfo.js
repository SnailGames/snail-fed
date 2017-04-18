var projectInfo = require('../config/project.info')

function InjectProjectInfo() {

}
InjectProjectInfo.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            var infoInjected = JSON.stringify(projectInfo)
            var splits = htmlPluginData.html.split('</head>')
            htmlPluginData.html = splits[0] + '<!--' + infoInjected.replace(/['"{}]/g, '') + '-->\n</head>' + splits[1]
            callback(null, htmlPluginData)
        });
    })
}
module.exports = InjectProjectInfo
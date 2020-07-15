const fs = require('fs');
const path = require('path');
const HandleBars = require('handlebars');

/**
 * 创建一个Hbs，专门处理模版引擎handlebars和express的关系
 */
function Hbs(){
    if (!(this instanceof Hbs)) {
        return new Hbs();
    }
    this.baseUrl = path.join(__dirname, '../views');
}

Hbs.prototype.init = function () {
    /**
     * 注册一些指令
     */
    HandleBars.registerHelper('link', (url) => {
        var url = HandleBars.Utils.escapeExpression(url);
        var link = '<link rel="stylesheet" href="http://localhost:3000/style/'+url+'.css">';
        return link;
    });
    HandleBars.registerHelper('script', (url) => {
        var url = HandleBars.Utils.escapeExpression(url);
        var script = '<script src="http://localhost:3000/script/'+url+'.js"></script>';
        return script;
    })
}

/**
 * 设置url，如果没有设置那么默认就是在项目的根目录下的views文件夹
 * url是相对于项目的根目录的
 */
Hbs.prototype.set = function (url) {
    this.baseUrl = path.join(__dirname, '..', url);
}
/**
 * 
 */
Hbs.prototype.engine = function () {
    this.init();
    return (req, res, next) => {
        /**
         * 在这里给res注册一个render函数
         */
        res.render = (url, data) => {
            const assetUrl = path.join(this.baseUrl, url+'.hbs');
            const html = fs.readFileSync(assetUrl).toString();
            const template = HandleBars.compile(html);
            res.send(template(data));
        }
        next();
    }
}

module.exports = Hbs
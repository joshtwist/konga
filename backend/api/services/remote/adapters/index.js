var fs = require('fs');

// Methods
module.exports = {
    getSchemas : function(req,res) {
        fs.readdir(__dirname, function(err, files) {
            if(err) return res.negotiate(err)
            var schemas = {}
            files.forEach(function(file) {
                if(file.indexOf('index') < 0) {
                    schemas[file.replace(".js","")] = require('./' + file).schema
                }
            });
            res.json(schemas)
        })
    }
}

// Export the actual adapters
var files = fs.readdirSync(__dirname)
files.forEach(function(file) {
    if(file.indexOf('index') < 0) {
        module.exports[file.replace(".js","")] = require('./' + file)
    }
})

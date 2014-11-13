var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-clean-url';

function gulpCleanPageUrl(opts) {
  opts = opts || {};

  var index = opts.index || 'index.html';

  var stream = through.obj(function(file, enc, cb) {

    if (file.isNull()) {
      // do nothing if no contents
    }

    if (file.isStream()) {
    	cb(new gutil.PluginError('gulp-clean-url', 'Streaming not supported'));
    	return;
    }

    try {
      file.path = gutil.replaceExtension(file.path, '/' + index);
      this.push(file);
      cb();
    } catch (err) {
      cb(err);
    }
  });

  return stream;
};

module.exports = gulpCleanPageUrl;

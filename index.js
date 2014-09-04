#!/usr/bin/env node

'use strict';

var spawn = require('child_process').spawn,
    utils = require('./lib/utils'),
    _ = require('underscore'),
    fs = require('fs');


var args;

args = process.argv.slice(1);

// configuration option, get/set browser
if (args.length >= 3) {
  if (args[0] === 'config') {
    if (args[1] === 'get') {
      log(require('./lib/config').browser);
    } else if (args[1] === 'set') {
      var browser;

      if (args[3] === 'chrome') {
        browser = 'google\ chrome';
      } else if (args[3] === 'safari') {
        browser = 'safari';
      } else if (args[3] === 'firefox') {
        browser = 'firefox';
      } else {
        log(new Error('invalid browser name ' + args[3]));
        log('>> Supported browsers: chrome, safari, firefox');
      }

      fs.writeFile('./lib/config.json', JSON.stringify({ browser: browser }), function(err) {
        if (err) {
          log(err);
        }
      });
    }
  }

} else if (args.length === 1) {
  var arg, coreModuleNames, module, file, child;

  arg = args[0].toLowerCase();
  coreModuleNames = utils.moduleNames();

  // help option
  if (arg === 'help' || arg === '-h') {
    help();
  } else if (arg === 'ls') {

    // print core module names
    coreModuleNames.forEach(function (module) {
      log(' • ' + module);
    });
  } else {

    module = arg;

    if (_.contains(coreModuleNames, module)) {

      file = process.cwd() + '/lib/node_docs/' + module + '.html';

      // spawn chrome, open docs
      child = spawn('open', ['-a', 'google\ chrome', file]);
    } else {

      // invalid module
      log(new Error('invalid module name ' + module));
      log('>> Option "ls" to list module names');
    }
  }

} else {
  log('Invalid number of arguments');
  log('>> Option "help" to print man page');
}


// man page
function help () {
  log('-------------');
  log('nocs man page');
  log('-------------');
  log('\nUSAGE');
  log(' $ nocs <option>');
  log('\nOPTIONS');
  log(' module       core module name (e.g. cluster)');
  log(' config       get / set browser (e.g. chrome)');
  log(' help | -h    print nocs\' help menu');
  log(' ls           print list of core module names');
  log('\nEXAMPLE');
  log(' $ nocs config set browser chrome  # void');
  log(' $ nocs config get browser         # void, logs google chrome');
  log(' $ nocs cluster                    # open cluster docs in chrome');
}


function log (arg) {
  console.log(arg);
}

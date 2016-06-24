#!/usr/bin/env node
// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

"use strict";

var argv= require("minimist")(process.argv.slice(2));
var path= require("path");

var utils  = require("./tools/_Utils");
var config = utils.GetConfig("agl");

function main () {
    
  process.chdir (path.dirname (process.argv[1]));  
  
  var success=0;  
  if (argv.verbose) console.log ("Starting");
  
  if (argv.all) {
     argv.build=true;
     argv.push=true;
  }  
  
  if (argv.build || argv.built) {
     argv.config=true;
     argv.html=true;
  }
  
  if (argv.conf ||argv.configs || argv.config) {
     argv.vers = true;      
     argv.defs = true;      
     argv.tocs = true;
     argv.dict = true;
  }
    
    
  if (argv.clean) {
      if (argv.verbose) console.log ("  - clean = [%s]", config.CLEAN_ALL);
      utils.DocsTool(config.CLEAN_ALL, argv);
      success++;
  }
  
  if (argv.fetch) {
      if (argv.verbose) console.log ("  - fetch = [%s]", config.FETCH_DOCS);
      utils.DocsTool(config.FETCH_DOCS, argv);
      success++;
  }
  
  if (argv.vers || argv.versions) {
      if (argv.verbose) console.log ("  - versions = [%s]", config.GEN_VERS);
      utils.DocsTool(config.GEN_VERS, argv);
      success++;
  }
  
  if (argv.defs || argv.defaults) {
      if (argv.verbose) console.log ("  - defaults = [%s]", config.GEN_DEFS);
      utils.DocsTool(config.GEN_DEFS, argv);
      success++;
  }
 
  if (argv.tocs) {
      if (argv.verbose) console.log ("  - tocs = [%s]", config.GEN_TOCS);
      utils.DocsTool(config.GEN_TOCS, argv);
      success++;
  }
  
  if (argv.dict) {
      if (argv.verbose) console.log ("  - dict = [%s]", config.GEN_DICT);
      utils.DocsTool(config.GEN_DICT, argv);
      success++;
  }
  
  if (argv.html) {
      if (argv.verbose) console.log ("  - html = [%s]", config.GEN_HTML);
      utils.DocsTool(config.GEN_HTML, argv);
      success++;
  }
  
  if (argv.push) {
      if (argv.verbose) console.log ("  - push = [%s]", config.PUSH_SITE);
      utils.DocsTool(config.PUSH_SITE, argv);
      success++;
  }
 
  if (!success) {
      console.log ('\nusage: build.js');
      console.log (' --vers (generate %s from templates at %s)', config.DEFAULTS_FILE, config.TOCS_DIR);
      console.log (' --defs (generate %s YAML for index pages)', config.DEFAULTS_FILE);
      console.log (' --dict (generate dictonaty page)', config.DEFAULTS_FILE);
      console.log (' --tocs (generate TOC from templates at %s)', config.TOCS_DIR);
      console.log (' --html (generate HTML site to %s/%s)', config.DST_DEVL, config.DST_PROD);
      console.log ('   --prod  (production mode dest=%s)', config.DST_PROD);
      console.log ('   --serve (run localhost devel httpd)');
      console.log ('   --watch (watch for Markdown & Template update)');
      console.log (' --site=xxx (force documents source default="%s")', config.DOCS_DIR);
      console.log (' --clean (clean all generated files)');
      console.log (' --fetch [--dumponly --force] (update references from git default=%s)', config.FETCH_CONFIG);
      console.log (' --push  (push site to "%s")', config.PUSH_DEST);
      console.log (' --configs (vers+defs+tocs+defs)');
      console.log (' --build (config+html)');
      console.log (' --all (build+push [but not fetch])');
      console.log (' --verbose (display steps)');
      console.log ('\n');
  }
 
}

main();

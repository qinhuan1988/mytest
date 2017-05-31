#!/usr/bin/env node

var fs = require('fs');



/*
 * MainActivity.java can't be overriden within pluging.xml
 * at <source-file src="src/android/MainActivity.java" target-dir="src/com/mcongroup/bmw/memberapp/sit/MainActivity.java" />
 *
 * use hooks in order to achieve this
 */

// get MainActivity.java from /cordova-build/plugins????
var data = fs.readFileSync('../config/dev/plugins/cordova-bmwlp-passguard/src/android/MainActivity.java', 'utf8');

// replace package name and license??? (passed by args???)
fs.writeFileSync('./platforms/android/src/com/mcongroup/bmw/memberapp/dev/MainActivity.java', data, 'utf8');

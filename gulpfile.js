#!/usr/bin/env node

'use strict';

var lernaJSON = require('./lerna.json');
var path = require('path');

var del = require('del');
var gulp = require('gulp');
var browserify = require('browserify');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var bower = require('bower');
var streamify = require('gulp-streamify');
var replace = require('gulp-replace');
// var exec = require('child_process').exec;

var DEST = path.join(__dirname, 'dist/');
var CHAIN3_PACKAGE_DEST = path.join(__dirname, 'packages/chain3/dist');

var packages = [{
    fileName: 'chain3',
    expose: 'Chain3',
    src: './packages/chain3/src/index.js',
    ignore: ['xmlhttprequest']
}, {
    fileName: 'chain3-utils',
    expose: 'Chain3Utils',
    src: './packages/chain3-utils/src/index.js'
}, {
    fileName: 'chain3-mc',
    expose: 'Chain3Mc',
    src: './packages/chain3-mc/src/index.js'
}, {
    fileName: 'chain3-mc-accounts',
    expose: 'Chain3McAccounts',
    src: './packages/chain3-mc-accounts/src/index.js'
}, {
    fileName: 'chain3-mc-contract',
    expose: 'Chain3McContract',
    src: './packages/chain3-mc-contract/src/index.js'
}, {
    fileName: 'chain3-scs',
    expose: 'Chain3Scs',
    src: './packages/chain3-scs/src/index.js'
}, {
    fileName: 'chain3-core-method',
    expose: 'Chain3Method',
    src: './packages/chain3-core-method/src/index.js'
}];

var browserifyOptions = {
    debug: true,
    // standalone: 'Chain3',
    derequire: true,
    insertGlobalVars: false, // jshint ignore:line
    detectGlobals: true,
    bundleExternal: true
};

var ugliyOptions = {
    compress: {
        dead_code: true,  // jshint ignore:line
        drop_debugger: true,  // jshint ignore:line
        global_defs: {      // jshint ignore:line
            'DEBUG': false      // matters for some libraries
        }
    }
};

gulp.task('version', function() {
    if (!lernaJSON.version) {
        throw new Error('version property is missing from lerna.json');
    }

    var version = lernaJSON.version;
    var jsonPattern = /"version": "[.0-9\-a-z]*"/;
    var jsPattern = /version: '[.0-9\-a-z]*'/;
    var glob = [
        './package.json',
        './bower.json',
        './package.js'
    ];

    return gulp.src(glob, {base: './'})
        .pipe(replace(jsonPattern, '"version": "' + version + '"'))
        .pipe(replace(jsPattern, 'version: \'' + version + '\''))
        .pipe(gulp.dest('./'));
});

gulp.task('bower', gulp.series('version', function(cb) {
    bower.commands.install().on('end', function(installed) {
        console.log(installed);
        cb();
    });
}));

gulp.task('lint', function() {
    return gulp.src(['./*.js', './lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('clean', gulp.series('lint', function(cb) {
    del([DEST]).then(cb.bind(null, null));
}));

// Process each package
packages.forEach(function(pckg, i) {
    var prevPckg = (!i) ? 'clean' : packages[i - 1].fileName;
    // console.log("packages:", i, " : ", pckg);//display for debuggin

    gulp.task(pckg.fileName, gulp.series(prevPckg, function() {
        browserifyOptions.standalone = pckg.expose;

        var stream = browserify(browserifyOptions)
            .require(pckg.src, {expose: pckg.expose})
            .require('bn.js', {expose: 'BN'}) // expose it to dapp developers
            .add('./node_modules/regenerator-runtime')
            .add(pckg.src);

        if (pckg.ignore) {
            pckg.ignore.forEach(function(ignore) {
                stream.ignore(ignore);
            });
        }

        var bundle = stream.transform(
            "babelify",
            {
                global: true,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            useBuiltIns: 'entry',
                            corejs: 3,
                            targets: {
                                ie: 10
                            }
                        }
                    ]
                ]
            }
        ).bundle();

        stream = bundle
            .pipe(exorcist(path.join(DEST, pckg.fileName + '.js.map')));

        if (pckg.fileName === 'chain3') {
            bundle
                .pipe(exorcist(path.join(CHAIN3_PACKAGE_DEST, pckg.fileName + '.js.map')));
        }

        stream = stream.pipe(source(pckg.fileName + '.js'));

        if (pckg.fileName === 'chain3') {
            stream = stream
                .pipe(gulp.dest(CHAIN3_PACKAGE_DEST));
        }

        stream = stream
            .pipe(gulp.dest(DEST))
            .pipe(streamify(uglify(ugliyOptions)))
            .on('error', function(err) {
                console.error(err);
            })
            .pipe(rename(pckg.fileName + '.min.js'));

        if (pckg.fileName === 'chain3') {
            stream = stream
                .pipe(gulp.dest(CHAIN3_PACKAGE_DEST));
        }

        return stream
            .pipe(gulp.dest(DEST));
    }));
});

// gulp.task('publishTag', function() {
//     exec('git commit -am "add tag v' + lernaJSON.version + '"; git tag v' + lernaJSON.version + '; git push origin v' + lernaJSON.version + ';');
// });

gulp.task('watch', function() {
    gulp.watch(['./packages/chain3/src/*.js'], gulp.series('lint', 'default'));
});

gulp.task('all', gulp.series('version', 'lint', 'clean', packages[packages.length - 1].fileName));

gulp.task('default', gulp.series('version', 'lint', 'clean', packages[0].fileName));

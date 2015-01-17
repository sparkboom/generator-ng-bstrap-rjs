'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the beautiful' + chalk.red('NgBstrapRjs') + ' generator!'
        ));

        var prompts = [{
            name: 'appName',
            message: 'What is the name of your app?'
        },{
            name: 'appDescription',
            message: 'App Description:'
        }];

        function lowerFirstLetter(string)
        {
            return string.charAt(0).toLowerCase() + string.slice(1);
        }

        this.prompt(prompts, function (props) {

            this.settings = {
                appName : props.appName,
                appDescription : props.appDescription,
                appClassName : this._.camelize(lowerFirstLetter(props.appName), true),
                appFileName : this._.slugify(props.appName)
            };

            done();
        }.bind(this));
    },

    folders: function(){
        this.mkdir('app');
        this.mkdir('app/css');
        this.mkdir('app/modules');
    },
    app: function () {

        var filesToCopy = {
            '_package.json':'package.json',
            'app/_bower.json':'app/bower.json',
            'app/_index.html':'app/index.html',
            'app/css/_myapp.css':'app/css/' + this.settings.appFileName + '.css',
            'app/js/_main.js':'app/js/main.js',
            'app/modules/_myapp.app.js':'app/modules/' + this.settings.appClassName + '.app.js',
        };

        this._.forEach(filesToCopy, function(dest, src){
            this.template(src, dest, this.settings);
        }, this);


    },

    install: function () {
        this.installDependencies({        
          bower: false,
          npm: true
        });
        process.chdir("app/");
        this.installDependencies({        
          bower: true,
          npm: false
        });
    }
});

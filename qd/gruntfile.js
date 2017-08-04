var argv = process.argv.slice(3);
if(argv!==null && argv.length>0){
  var baseEnv = ['-DEV','-UAT','-PRD'];
  if(baseEnv.indexOf(argv[0])>-1){
    console.log("====当前环境"+argv[0]);

    var timestamp = new Date().getTime();
  
  module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ["./tmp", "./dist"],
      aa:["./tmp/baseconf"],
      tmp:["./tmp"]
    },
    copy: {
      tmp: {
        expand: true,
        cwd: 'app/',
        src: '**',
        dest: 'tmp/',
        //flatten: true,
        filter: 'isFile',
        /*rename: function( dest, fileName ) { 
          var reg = /(.*)+\.js/;
          fileName = fileName.replace(reg,'$1.'+timestamp+".js");
          return dest + "/" +fileName; 
         } ,*/
        options: {
          process: function (content, srcpath) {
            return content.replace(/baseconf\//g,"");
          },
        },

      },
      dist: {
        expand: true,
        cwd: 'tmp/',
        src: '**',
        dest: 'dist/',
        //flatten: true,
        filter: 'isFile',
        rename: function( dest, fileName ) { 
          var reg1 = /lib\/(.*)+\.js/;
          if(!(reg1.test(fileName))){
            var reg = /(.*)+\.js/;
            fileName = fileName.replace(reg,'$1.'+timestamp+".js");
          }
          //console.log(fileName.match(reg1));
          
          return dest + "/" +fileName; 
         } ,
        options: {
          process: function (content, srcpath) {
            var indexreg = /tmp\/index\.html/;
            var regModule = /tmp\/main\.js/;
            if(srcpath.match(indexreg)){
              return content.replace(/(main)\.js/g,"$1."+timestamp+".js");
            }
            if(srcpath.match(regModule)){
              console.log(srcpath);
              var reg = /mainVersionstmp/;
              //var k = "modules/one/one.js";
              //console.log(k.replace(reg,"$1123"));
              //console.log(content.match(reg));
              return content.replace(reg,timestamp);
            }
            //eturn content.replace(/.*\.js\//g,"");
            //console.log(content+"--"+srcpath);
            return content;
          },
        },

      },
      aa:{
        expand: true,
        cwd: 'app/baseconf/lib/requirejs/',
        src: '**',
        dest: 'tmp/lib/requirejs/',
        //flatten: true,
        filter: 'isFile',
      }
    },
    concat: {
      options: {
        separator: ''
      },
      //lib: {
      //  src: ['tmp/**/*.js'],
      //  dest: 'dist/<%= pkg.name %>.js'
      //},
      base :{
        src: ['tmp/**/*.js','!tmp/components/**/*.js'],
        dest: 'tmp/base.js'
      }
    },
    uglify: {
      options: {
        //banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
          mangle:false,
          sourceMap: true,
          sourceMapIncludeSources: true,
          /*mangle: {
            except: ['require', 'exports' , 'module','&q','angular'] //除了这3个
          },*/
            preserveComments: false, //删除全部注释，还可以为 all（不删除注释），some（保留@preserve @license @cc_on等注释）
            report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
              
      },
      buildmain: {
        
        files: {
          'tmp/main.js': ['tmp/main.js']
        }
      },
      buildother: {
        options:{
          mangle: {
            except: ['require', 'exports' , 'module','&q','angular','$scope','$rootScope', '$http', '$interval','mainService','$timeout'] //除了这3个
          },
          preserveComments: false, //删除全部注释，还可以为 all（不删除注释），some（保留@preserve @license @cc_on等注释）
          report: "min" //输出压缩率，可选的值有 false(不输出信息)，gzip
        },
        files: [{
                    expand:true,
                    cwd:'tmp',//js目录下
                    src:['**/*.js','!main.js'],//所有js文件
                    dest: 'tmp'//输出到此目录下
                }]
      }
    },
    bower: {
      install: {
        options: {
          targetDir: './app/baseconf/lib',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },
    requirejs: {

        build:{

             "options":{

                 "baseUrl":"./tmp/baseconf",
                 "name":"main",
                 //"optimize": "uglify",
                 "optimize": "none",
                 "mainConfigFile":"./tmp/baseconf/main.js",
                 "out":"./tmp/main.js",
                 "findNestedDependencies": false,
                 paths: {                    //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
                      angular: 'lib/angular/angular.min',
                      route: 'lib/angular-route/angular-route.min'
                         },
                shim: {                     //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
                      angular: {
                          exports: 'angular'
                      },
                      route: {
                          deps: ['angular'],   //依赖什么模块
                          exports: 'ngRouteModule'
                      }
                      }
             }
         }

                //此处的modules就是要打包的文件(模块)
                //我们例子项目因为通过main.js就把整个项目模块 关联了起来
                //main ->angular+jquery+app ->myCon->mySer
                //所以我只打包main.js grunt就自动把其他依赖文件按依赖关系(顺序)打包进去
              /*  modules: [{
                    name: 'main'
                }]*/
        },
    jshint: {
      files: ['gruntfile.js', 'app/**/*.js', '!app/components/**/*.js'],
      options: {
        globals: {
          jshintrc:'.jshintrc'
          /*console: true,
          module: true,
          document: true*/
        }
      }
    },
     watch: {
        
        files: ['app/**/*.js','!components/**/*.js'],
        tasks: ['jstest'],
        options: {
          spawn: false
        }
    
      }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.registerTask('jstest', ['jshint']);
   grunt.loadNpmTasks('grunt-contrib-requirejs');


  grunt.registerTask('merge', ['requirejs']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('build', ['clean', 'copy:tmp','requirejs','clean:aa','copy:aa','uglify:buildmain','uglify:buildother','copy:dist']);
};
}
else{
    console.log("===环境参数应为['-DEV','-UAT','-PRD']");
  }
}else{
  console.log('===grunt进行过改造，后面需要接环境配置，如 gurnt jstest -DEV====');
}

 
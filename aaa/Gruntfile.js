module.exports = function (grunt) {
	grunt.file.defaultEncoding = 'utf-8';
    var transport = require('grunt-cmd-transport');
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        //将生成的hSea.js压缩混淆
clean: { //清除目标文件下文件
	  start:['guidedist','guidetmp'],
      end: ['guidetmp','.build']

    },

    copy: {

        copytotmp : {
          files: [
              {expand: true, 
               cwd: "guide/",
               src: ['**/*.*'], 
               dest: 'guidetmp/',
               flatten: false,//用来指定是否保持文件目录结构
               filter: 'isFile'
               },
              
            ]
        },
        copyimagestodist : {
          files: [
              {expand: true, 
               cwd: "guide/css/images",
               src: ['**/*.*'], 
               dest: 'guidedist/css/images/',
               flatten: false,//用来指定是否保持文件目录结构
               filter: 'isFile'
               },
              
            ]
        },
        copypdf:{
          files:{
            'guidedist/build/pdf.worker.js':['guide/build/pdf.worker.js']
          }
        },
        copyend:{
          files: {
          'guidedist/index.html':['guide/index.html'],
          'guidedist/configuration.js':['guide/configuration.js'],
          'guidedist/startup.js':['guide/startup.js']    
          
                      
        }
         

        }
    },
	
	
	
	    transport: {

        options: {
            
            paths: ['/html/rzrq/guidedist'], // where is the module, default value is ['sea-modules']
            alias:'<%= pkg.spm.alias %>'
            
            },
            base:{
            options: {
              idleading: '/html/rzrq/guidedist/base/'
            },
            files: [
              {
              expand: true, 
              cwd: 'guidetmp/base',
              src: '**/*.js',
              dest: '.build/base'
              }
            ]
            }
              
        
        },
              
        
        
        concat: {
              options: {
                include: 'relative'
              },
              build: {
                files: {
                //'dist/base/main.js': ['.build/base/**/*.js']
                  '.build/base/main.js': ['.build/base/*.js','!.build/base/*-debug.js']
                }
              }
            },
		    
	uglify: {//压缩js文件
      options: {
                mangle: true, //混淆变量名,false不混淆
                mangle: {
                  except: ['require', 'exports' , 'module'] //除了这3个
                },
                  preserveComments: 'false', //删除全部注释，还可以为 all（不删除注释），some（保留@preserve @license @cc_on等注释）
                  report: "min", //输出压缩率，可选的值有 false(不输出信息)，gzip
                  //beautify : true
              },

      pagedist: {
        files: [{
          expand: true,
          cwd: 'guidetmp', //js源文件目录
          src: ['**/*.js','!base/*.js','!**/configuration.js','!init/*.js','!startup.js','!**/pdf.worker.js'], //所有js文件
          dest: 'guidedist' //输出到此目录下
        }]
      },
      maindist: {
        files: [{
          'guidedist/base/main.js': ['.build/base/main.js'] ,
          'guidedist/configuration.js': ['guidetmp/init/prd/configuration.js'],
          'guidedist/startup.js': ['guidetmp/init/prd/startup.js']

        }]
      }
    },

			
	cssmin: { //压缩css
      dist: {
        "files": {
          'guidedist/css/style.css': ['guidetmp/css/*.css','!guidetmp/css/viewer.css'],//将数组里面的css文件压缩成一个目标文件
          'guidedist/css/viewer.css': ['guidetmp/css/viewer.css']
        }
      }
    },

    imagemin: {
    /* 压缩图片大小 */
    dist: {
      options: {
        optimizationLevel: 3 //定义 PNG 图片优化水平
      },
      files: [{
        expand: true,
        cwd: 'guidetmp/images/',
        src: ['**/*.{jpg,png,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
        dest: 'guidedist/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
      }]
    }       
  },
    htmlmin: { //压缩html
      options: { // Target options
          removeComments: true,
          collapseWhitespace: true
        },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: 'guidetmp', // Src matches are relative to this path.
          src: ['**/*.html','!index.html','!init/*.html'], // Actual pattern(s) to match.
          dest: 'guidedist', // Destination path prefix.
          ext: '.html', // Dest filepaths will have this extension.
          extDot: 'guide' // Extensions in filenames begin after the first dot
        }]
      },
      initprd:{
        "files": {
          'guidedist/index.html': ['guidetmp/init/prd/index.html']
        }
      }

    }
		       
			
    });
    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    
    //构建框架js
	
	grunt.registerTask('default', ['clean:start','copy:copytotmp','copy:copyimagestodist','copy:copypdf','transport:base','concat:build','uglify:pagedist','uglify:maindist','cssmin:dist','imagemin:dist','htmlmin:dist','htmlmin:initprd','clean:end']);
    
    
}; 





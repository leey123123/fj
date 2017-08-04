define([
    	"angular",
		"app",
		"C",
		"test/specs/demoSpecs"
	],function(
		angular,
		app,
		C
	){
    app.bootstrap();
    mocha.run();
    
})
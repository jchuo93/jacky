/* Loading page which boots up the game */
var FindX = {};

FindX.Boot = function(game) {};

FindX.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar.png');
    },
    
    create: function() {
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.maxWidth = 540;
        this.scale.maxHeight = window.innerHeight;
		this.scale.minWidth = 320;
		this.scale.minHeight = 480;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);  
        
		this.input.addPointer();
		this.stage.backgroundColor = '#99CCFF';
        
        this.state.start('Preloader');
    }
}
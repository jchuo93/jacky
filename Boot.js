/* Loading page which boots up the game */
var FindX = {};

/**
 * Loading page which boots up the game
 * @method Boot
 * @param {} game
 * @return 
 */
FindX.Boot = function(game) {};

FindX.Boot.prototype = {
    /**
     * Load the loader Image progress bar
     * @method preload
     * @return 
     */
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar.png');
    },
    
    /**
     * Creates the initial interface of the game
     * @method create
     * @return 
     */
    create: function() {
        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        if(window.outerWidth >= 540) {
            this.scale.maxWidth = 450;
            
        } else {
            
            this.scale.maxWidth = window.innerWidth;
            
        }
        
        this.scale.maxHeight = window.innerHeight;
		this.scale.minWidth = 320;
		this.scale.minHeight = 480;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true);  
        
		this.input.addPointer();
		this.stage.backgroundColor = '#0588b2';
        
        this.state.start('Preloader');
        
        
//        $.ajax( { url: "https://api.mongolab.com/api/1/databases/findx/collections/HighScore?apiKey=CDvbQJBiWFpyu08aN2PYkWAqi2Q3m0E1",
//		  data: JSON.stringify( { "name" : 1 } ),
//		  type: 'POST',
//		  contentType: "application/json" } );

    }
}
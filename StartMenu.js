/**
 * Shows the Start Menu Interface with designation clickable buttons
 * @method StartMenu
 * @param {} game
 * @return 
 */
FindX.StartMenu = function(game) {
    this.logo;
    this.startPrompt;
    this.highScoreButton;
    this.ding;
    this.startSound;
    this.settingsButton;
    this.onSound;
    this.soundToggle;
    
  
}


FindX.StartMenu.prototype = {
	
	/**
	 * Creates the buttons
	 * @method create
	 * @return 
	 */
	create: function () {
        this.onSound = true;
        
        this.ding = this.add.audio('select_audio');
        this.startSound = this.add.audio('start_audio');
        this.startSound.play('', 0, 0.8, true);
		this.add.image(0, 0, 'titlescreen');
        this.logo = this.add.image(this.world.centerX - 230, this.world.centerY - 400, 'titlelogo');
        highScoreButton = this.add.button(this.world.centerX, this.world.centerY+150, 'HighScore', this.highScore, this, 1 , 0);
		startPrompt = this.add.button(this.world.centerX, this.world.centerY+80, 'PlayButton', this.startGame, this, 1 , 0);
        settingsButton = this.add.button(this.world.centerX, this.world.centerY+220, 'Settings', this.settingsMenu, this, 0 , 1);
        startPrompt.anchor.setTo(0.5, 0.5);
        highScoreButton.anchor.setTo(0.5, 0.5);
        settingsButton.anchor.setTo(0.5, 0.5);
        
       
	},
	/**
	 * Function call when Play Button is click
	 * @method startGame
	 * @param {} pointer
	 * @return 
	 */
	startGame: function (pointer) {
        this.ding.play();
        this.startSound.stop();
		this.state.start('Game');
        
	},
    
    /**
     * Function call when High Score Button is click
     * @method highScore
     * @param {} pointer
     * @return 
     */
    highScore: function(pointer) {
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
         var sprite = this.add.image(this.world.centerX, this.world.centerY+10, 'settingsBG');
         sprite.anchor.setTo(0.5, 0.5);
        
         backToMenu = this.add.bitmapText(0 , 0,'gamefont', 'back', 30);
         backToMenu.inputEnabled = true;
        
        
        highScore = this.add.bitmapText(0 , 0,'gamefont', 'High Score', 40);
        sprite.addChild(highScore);
        highScore.anchor.setTo(0.5, 0.5);
        highScore.x = 0;  
        highScore.y = -200;
        
        // get the save high Score from local storage
        score = this.add.bitmapText(0 , 0,'gamefont', localStorage.getItem('highscore'), 60);
        sprite.addChild(score);
        score.anchor.setTo(0.5, 0.5);
        score.x = 0;  
        score.y = 0;
        
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        backToMenu.x = 10;
        backToMenu.y = 200;
        
        backToMenu.events.onInputDown.add(
            function() {
                startPrompt.inputEnabled = true;
                highScoreButton.inputEnabled = true;
                settingsButton.inputEnabled = true;
                sprite.destroy(); 
                backToMenu.destroy();
                
            }
            ,this);
    },
    
    /**
     * Settings Menu with toggle On and off Sound
     * @method settingsMenu
     * @param {} pointer
     * @return 
     */
    settingsMenu : function(pointer){
        startPrompt.inputEnabled = false;
        highScoreButton.inputEnabled = false;
        settingsButton.inputEnabled = false;
        // background Sprite
        var sprite = this.add.image(this.world.centerX, this.world.centerY+10, 'settingsBG');
        sprite.anchor.setTo(0.5, 0.5);
        
        soundText = this.add.bitmapText(0 , 0,'gamefont', 'Sound:', 52);
        this.soundToggle = this.add.bitmapText(0 , 0,'gamefont', 'off'  , 52);
        backToMenu = this.add.bitmapText(0 , 0,'gamefont', 'back', 30);
        backToMenu.inputEnabled = true;
        
        this.soundToggle.inputEnabled = true;
        
        sprite.addChild(soundText);
        soundText.anchor.setTo(0.5, 0.5);
        soundText.x = -80;
        soundText.y = 0;
        
        sprite.addChild(this.soundToggle);
        this.soundToggle.anchor.setTo(0.5, 0.5);
        this.soundToggle.x = 100;
        this.soundToggle.y = 0;
        
        sprite.addChild(backToMenu);
        backToMenu.anchor.setTo(0.5, 0.5);
        backToMenu.x = 10;
        backToMenu.y = 200;
        
        // toggle sound on/off anonymous function calls appropriate methods
        this.soundToggle.events.onInputDown.add(
            function() {
                if(this.onSound == true){
                    this.onSound = false;
                    this.soundToggle.setText('on'); 
                    this.game.sound.mute = true;
        
                }else{ 
                    this.onSound = true;
                    this.soundToggle.setText('off');
                    this.game.sound.mute = false; 
                }
            }
            ,this);
        
        // click to go back to menu
        backToMenu.events.onInputDown.add(
            function() {
                startPrompt.inputEnabled = true;
                highScoreButton.inputEnabled = true;
                settingsButton.inputEnabled = true;
                soundText.destroy();
                this.soundToggle.destroy();
                sprite.destroy();
                backToMenu.destroy();
            }
            ,this);
    },
        
     
};
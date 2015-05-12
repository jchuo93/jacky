FindX.GameOver = function(game) {
    this.gameoverBG;
    this.gameoverPrompt;
    this.gameoverPrompt2;
    
}

FindX.GameOver.prototype = {
	
	create: function () {
        
		gameoverBG = this.add.image(0, 0, 'gameoverskull');
		gameoverBG.inputEnabled = true;
		gameoverPrompt = this.add.button(this.world.centerX-100, this.world.centerY+280, 'gameoverplay', this.restartGame, this);
        gameoverPrompt2 = this.add.button(this.world.centerX-100, this.world.centerY+350, 'gameoverquit', this.quitGame, this);
        
        console.log(  localStorage.getItem( 'highscore' )  );
	},
	restartGame: function (pointer) {
		this.state.start('Game');
	},
    quitGame: function (pointer) {
		this.state.start('StartMenu');
	}
};
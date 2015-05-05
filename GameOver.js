FindX.GameOver = function(game) {
    this.gameoverBG;
    this.gameoverPrompt;
    
}

FindX.GameOver.prototype = {
	
	create: function () {
        
		gameoverBG = this.add.image(0, 0, 'gameoverskull');
		gameoverBG.inputEnabled = true;
		gameoverPrompt = this.add.button(this.world.centerX-100, this.world.centerY+350, 'homePlay', this.startGame, this);
        //this.startPrompt.anchor.setTo(0.5, 0.5);
	},
	startGame: function (pointer) {
		this.state.start('StartMenu');
	}
};
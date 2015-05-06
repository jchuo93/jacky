FindX.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
    this.ding;
}

FindX.StartMenu.prototype = {
	
	create: function () {
        this.ding = this.add.audio('start_audio');
		startBG = this.add.image(0, 0, 'titlescreen');
		startBG.inputEnabled = true;
		startPrompt = this.add.button(this.world.centerX-105, this.world.centerY+80, 'homePlay', this.startGame, this);

	},
	startGame: function (pointer) {
        this.ding.play();
		this.state.start('Game');
	}
};
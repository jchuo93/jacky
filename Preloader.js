
FindX.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

FindX.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0);
		this.load.setPreloadSprite(this.preloadBar);
        this.load.image('titlescreen', 'images/TitleBG.png');
        this.load.bitmapFont('gamefont', 'font/font.png', 'font/font.fnt');
        this.load.image('homePlay', 'images/HomePlay.png');
        this.load.audio('game_audio', 'audio/bgm.mp3');
        this.load.image('X', 'images/X.png');
        this.load.image('pause','images/PAUSE.png');
        this.load.image('skip','images/SKIP.png');
        this.load.image('loot','images/LOOT.png');
        this.load.image('gameoverskull','images/GameOver.png');
	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('game_audio') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
	}
};
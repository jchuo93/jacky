
FindX.Game = function(game) {
    this.randomNumberTop;
    this.randomNumberBottom;
    this.operator = ['+', '-' ,'*', '/'];
    this.result;
    this.randomOperation;
    this.showNumberTop;
    this.showNumberBottom;
    this.showOperator;
    this.showUnderLine;
    this.showResult;
    this.topNumberText;

};

FindX.Game.prototype = {
    preload: function() {
        this.load.image('X', 'images/X.png');
        this.load.image('pause','images/PAUSE.png');
        this.load.image('skip','images/SKIP.png');
        this.load.image('loot','images/LOOT.png');
        this.load.image('choice1','images/choice.png');
        this.load.image('choice2','images/choice2.png');
        this.load.image('choice3','images/choice.png');
    },

    create: function() {
        this.stage.backgroundColor = '#99CCFF';  
        this.mathScene();
        this.showButtons();
        
    },
    //does not work....
    gameTimer: function() {
        this.time.events.add(Phaser.Timer.SECOND * 0, 0, 180, 0, false, this, this.Game, null);
    },
    
    //create the math equation
    mathScene: function() {

        this.randomGenerator();
        this.solveEquation();
        
        this.showNumberTop = this.add.bitmapText(this.world.centerX, this.world.centerY-200, 'gamefont',  '' + this.randomNumberTop, 105);
        this.showNumberBottom =  this.add.bitmapText(this.world.centerX, this.world.centerY-100, 'gamefont', '' + this.randomNumberBottom, 105);
        
        this.showOperator = this.add.bitmapText(this.world.centerX - 60, this.world.centerY-130, 'gamefont', '' + this.operator[this.randomOperation], 105);
        
        this.showUnderLine = this.add.bitmapText(this.world.centerX - 60, this.world.centerY-100, 'gamefont', '__', 105);
        this.showResult = this.add.bitmapText(this.world.centerX, this.world.centerY + 10, 'gamefont', '' + this.result, 105)
	
   },
    
    //display buttons
    showButtons: function(){
        this.add.image(this.world.centerX-250, this.world.centerY-350, 'loot', null);
        
        //i could not generate the X image to a random position
		this.add.image(this.world.centerX,this.world.centerY-this.randomXposition, 'X', null);
        
        this.add.button(this.world.centerX-250, this.world.centerY+125, 'pause', this.pauseMenu, this, null, null, null, null);
        this.add.button(this.world.centerX+125, this.world.centerY+125, 'skip', this.randomGenerator, this, null, null, null, null);
        
        //created variables for the buttons for later use. need to implement solution and random incorrect solutions on top of button.
        this.choice1 = this.add.button(this.world.centerX-260, this.world.centerY+275, 'choice1', this.randomGenerator, this, null, null, null, null);
        this.choice2 = this.add.button(this.world.centerX-82, this.world.centerY+275, 'choice2', this.randomGenerator, this, null, null, null, null);
        this.choice3 = this.add.button(this.world.centerX+95, this.world.centerY+275, 'choice3', this.randomGenerator, this, null, null, null, null);
    },
    
    //randomize numbers
    randomGenerator: function() {
    
        this.randomOperation = Math.floor(Math.random() * 4);
        this.randomNumberTop = Math.floor((Math.random() * 9) + 1);
        this.randomNumberBottom = Math.floor((Math.random() * 9) + 1);
        
        //tried using this for the X image ..doesn't work
        this.randomXposition = this.rnd.pick(100,200,10);
    },
    
    
    solveEquation: function() {
    
        switch(this.operator[this.randomOperation]) {
            
                case '+' : this.result = this.randomNumberTop + this.randomNumberBottom;
                            break;
                case '-' : this.result = this.randomNumberTop - this.randomNumberBottom;
                            break;
                case '*' : this.result = this.randomNumberTop * this.randomNumberBottom;
                            break;
                case '/' : this.result = this.randomNumberTop / this.randomNumberBottom;
                            break;
        }
        
    },
       
    
    loopClick: function() {
        
        this.showNumberTop.destroy(); 
        this.showNumberBottom.destroy(); 
        this.showOperator.destroy(); 
        this.showUnderLine.destroy();
        this.showResult.destroy();
        this.mathScene();  
    },
    
    update: function() {
        
        this.input.onDown.addOnce(this.loopClick, this);
    }
        
};

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
    this.showCurrentOperator;
    this.randomX;
    this.choice;
    this.showChoice1;
    this.showChoice2;
    this.showChoice3;
    this.choice1;
    this.choice2;
    this.choice3;
    this.ansMidButton;
    this.ansLeftButton;
    this.ansRightButton;
    this.choiceButtons;
    this.randTemp = [1, 2, 3];
    this.skipButton;
    this.timer = 2;
    this.showTimer;
    this.timeEvents;
    
};

FindX.Game.prototype = {
    
    create: function() {    
       
        this.stage.backgroundColor = '#99CCFF';
        this.mathScene();  
        //not the correct solution
        this.nextEquation();
        this.add.bitmapText(5, 5, 'gamefont',  'Time: ', 50);
        this.showTimer  = this.add.bitmapText(160, 35, 'gamefont',  '' + this.timer, 50);
        this.showTimer.anchor.setTo(0.5, 0.5);
        this.timeEvents = this.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);    
        
    },
      
    //create the math equation
    mathScene: function() {

        this.randomGenerator();
        this.currentOperator = this.solveEquation();
        
        this.showXlocation();
        this.showButtons();
        
        this.showNumberTop = this.add.bitmapText(this.world.centerX, this.world.centerY-200, 'gamefont',  '' + this.randomNumberTop, 105);
        this.showNumberBottom =  this.add.bitmapText(this.world.centerX, this.world.centerY-100, 'gamefont', '' + this.randomNumberBottom, 105);
        this.showOperator = this.add.bitmapText(this.world.centerX - 60, this.world.centerY-90, 'gamefont', '' + this.currentOperator, 105);
        this.showOperator.anchor.setTo(0.5, 0.5);	
        this.showUnderLine = this.add.bitmapText(this.world.centerX - 60, this.world.centerY-100, 'gamefont', '__', 105);
        this.showResult = this.add.bitmapText(this.world.centerX + 5, this.world.centerY + 75, 'gamefont', '' + this.result, 105);
        this.showResult.anchor.setTo(0.5, 0.5);	
        
        
        this.choice1.events.onInputDown.addOnce(this.check(this.ansLeftButton, 1), this);
        this.choice2.events.onInputDown.addOnce(this.check(this.ansMidButton, 2), this);
        this.choice3.events.onInputDown.addOnce(this.check(this.ansRightButton, 3), this);
        
        //skip
        this.skipButton.events.onInputDown.addOnce(this.nextEquation, this);
   },
    
    //randomize the location of X 
    showXlocation: function() {
        
        this.randomX = Math.floor(Math.random() * 4);
        
        switch(this.randomX) {
            case 1 : this.choice = this.randomNumberTop; 
                     this.randomNumberTop = '?';
                     break;
            case 2 : this.choice = this.randomNumberBottom; 
                     this.randomNumberBottom = '?';
                     break;
            default: this.choice = this.result;
                     this.result = '?';
                     break;
        }
        
    },
    
    // draw the yellow buttons with rounded curve
    drawButtons: function(x, y, width, height, radius, fill) {
        
         this.choiceButtons = this.add.bitmapData(200,250);
    
         this.choiceButtons.ctx.beginPath();
         this.choiceButtons.ctx.moveTo(x + radius, y);
         this.choiceButtons.ctx.lineTo(x + width - radius, y);
         this.choiceButtons.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
         this.choiceButtons.ctx.lineTo(x + width, y + height - radius);
         this.choiceButtons.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
         this.choiceButtons.ctx.lineTo(x + radius, y + height);
         this.choiceButtons.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
         this.choiceButtons.ctx.lineTo(x, y + radius);
         this.choiceButtons.ctx.quadraticCurveTo(x, y, x + radius, y);
         this.choiceButtons.ctx.closePath();
         this.choiceButtons.ctx.fillStyle = fill;
         this.choiceButtons.ctx.fill();
                      
        return this.choiceButtons;
        
    },
    
    // function to call to update the timer
    updateCounter: function() {
        this.timer--;

        this.showTimer.setText('' + this.timer);
    
    },
    
    //display buttons
    showButtons: function(){
               
        //catching the choices;
        this.ansMidButton = this.setChoiceButtons();
        this.ansLeftButton = this.setChoiceButtons();
        this.ansRightButton = this.setChoiceButtons();
        
        //button for choice 1 || left button
        this.choice1 = this.add.sprite(10, 750, this.drawButtons(0, 0, 160, 160, 20, "yellow" ));
        this.choice1.inputEnabled = true;
        this.showChoice1 = this.add.bitmapText(0 ,0,'gamefont', '' + this.ansLeftButton , 110);
        this.choice1.addChild(this.showChoice1);
        this.showChoice1.anchor.setTo(0.5, 0.5);
        this.showChoice1.x = 78;
        this.showChoice1.y = 74;
              
        //button for choice 2 || mid button
        this.choice2 = this.add.sprite(190, 750, this.drawButtons(0, 0, 160, 160, 20, "yellow" ));
        this.choice2.inputEnabled = true;
        this.showChoice2 = this.add.bitmapText(50 ,this.choice1.centerY - 10,'gamefont', '' + this.ansMidButton, 110);
        this.choice2.addChild(this.showChoice2);
        this.showChoice2.anchor.setTo(0.5, 0.5);
        this.showChoice2.x = 78;
        this.showChoice2.y = 74;
        
        
        //button for choice 3 || right button
        this.choice3 = this.add.sprite(370, 750, this.drawButtons(0, 0, 160, 160, 20, "yellow" ));
        this.choice3.inputEnabled = true;
        this.showChoice3 = this.add.bitmapText(50 ,this.choice1.centerY - 10,'gamefont', '' + this.ansRightButton, 110);
        this.choice3.addChild(this.showChoice3);
        this.showChoice3.anchor.setTo(0.5, 0.5);
        this.showChoice3.x = 78;
        this.showChoice3.y = 74;
        
        //reset tints || button colors
//        this.choice1.tint = 0xffff33;
//        this.choice2.tint = 0xffff33;
//        this.choice3.tint = 0xffff33;
        
        
        this.add.image(this.world.centerX-250, this.world.centerY-350, 'loot', null);       
        this.add.button(this.world.centerX-250, this.world.centerY+125, 'pause', this.pauseMenu, this);
        this.skipButton = this.add.button(this.world.centerX+125, this.world.centerY+125, 'skip', this.randomGenerator, this);
        this.skipButton.inputEnabled = true;
        
    },
    
    //randomize numbers
    randomGenerator: function() {
    
        this.randomOperation = Math.floor(Math.random() * 4);
        this.randomNumberTop = Math.floor((Math.random() * 9) + 1);
        this.randomNumberBottom = Math.floor((Math.random() * 9) + 1);
        
    },
    
    //randomize the choice location among the three yellow buttons
    setChoiceButtons: function() {
             
        var cur = this.choice;
        var rand = Math.floor(Math.random() * this.randTemp.length);
             
        if(this.randTemp[rand] == 1){
            this.randTemp.splice(this.randTemp.indexOf(1), 1);
            return cur + 1;   
        } else if(this.randTemp[rand] == 2){
            this.randTemp.splice(this.randTemp.indexOf(2), 1);
            return cur - 1;
        } else if (this.randTemp[rand] == 3){
            this.randTemp.splice(this.randTemp.indexOf(3), 1);
            return cur;
        }
         
    },
    
    // check the ans and change background color(background color is not yet working..
    checkAnswer: function(ans, bNumber){
        
        if(ans == this.choice){
            
            switch(bNumber) {
                    
                case 1 : this.choice1.tint = 0xff00;
                            break;
                case 2 : this.choice2.tint = 0xff00
                            break;
                default : this.choice3.tint = 0xff00
                            break;
            }
            
            this.nextEquation();            
        }    
    },
    
  
    
    // returns anonymous function to call check answer required by addOnce function
    check: function(ans, bNumber) {
        
        return function () {
            
          this.checkAnswer(ans, bNumber);
        };
              
    },
    
    //solve the equation and set operator to be displayed
    solveEquation: function() {
    
        switch(this.operator[this.randomOperation]) {
            
                case '+' : this.result = this.randomNumberTop + this.randomNumberBottom;
                            this.showCurrentOperator = '+'
                            break;
                case '-' : this.result = this.randomNumberTop - this.randomNumberBottom;
                            this.showCurrentOperator = '-';
                            break;
                case '*' : this.result = this.randomNumberTop * this.randomNumberBottom;
                            this.showCurrentOperator = '\327';
                            break;
                case '/' : this.result = this.randomNumberTop / this.randomNumberBottom;
                            this.showCurrentOperator = '\367';
                            break;
        }
        
        if(((this.result % 1) != 0) || this.result < 0){
            
            this.randomGenerator();
            this.solveEquation();
        }
        
         return this.showCurrentOperator;     
    },
       
    // show nice equation
    nextEquation: function() {
           
        this.showNumberTop.destroy(); 
        this.showNumberBottom.destroy(); 
        this.showOperator.destroy(); 
        this.showUnderLine.destroy();
        this.showResult.destroy();
        this.choice1.destroy();
        this.showChoice1.destroy();
        this.showChoice2.destroy();
        this.showChoice3.destroy();
        this.randTemp = [1, 2, 3];
        
        this.mathScene();      
    },
    
    
    update: function() {
         if(this.timer == 0){
            this.time.events.remove(this.timeEvents);  
		  this.state.start('GameOver');
             this.timer = 2;
        }
       
    }
    
   
    
};
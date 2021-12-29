//  estado 'main' que conterá o jogo
var mainState = {
    preload: function () {
        // carrega o sprite do passaro 
        game.load.image('bird', 'assets/bird.png');
        game.load.image('pipe', 'assets/pipe.png');
    },

    create: function () {
        this.pipes = game.add.group(); 

        // Muda a cor do fundo para azul

        game.stage.backgroundColor = '#71c5cf';

        // defini o sistema de fisica 
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Mostra o objeto bird na posição x=100 e y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // adiciona fisica a ao objeto bird 
        // necessario para : movemento, gravidade, collisoes, etc.
        game.physics.arcade.enable(this.bird);

        // Adiciona gravidade ao passo para cair 
        this.bird.body.gravity.y = 1000;

        // Chama a função jump quando a barra de espaço e pressionada
        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);



    },

    addOnePipe: function (x, y) {

        var pipe = game.add.sprite(x, y, 'pipe');


        this.pipes.add(pipe);


        game.physics.arcade.enable(pipe);

        pipe.body.velocity.x = -200;


        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        
        var hole = Math.floor(Math.random() * 5) + 1;
    
        
        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1) 
                this.addOnePipe(400, i * 60 + 10);   
    },

    update: function () {
        // Se o passaro sair da tela (muito auto ou muito baixo)
        // chama funcão 'restartGame' 
        if (this.bird.y < 0 || this.bird.y > 490)
            this.restartGame();
    },

    // Faz o passaro pular
    jump: function () {
        // Adiciona velocidade no sentido vertical ao passaro
        this.bird.body.velocity.y = -350;
    },

    // Reinicia o jogo
    restartGame: function () {
        // Inicia o estado principal 'main' , que reinicia o jogo
        game.state.start('main');
    },

};

// Initializa Phaser, cria o jogo com  400px por 490px (pixels)
var game = new Phaser.Game(400, 490);

// adiciona  'mainState' e chama 'main'
game.state.add('main', mainState);

// Inicia o estado 'main' para iniciar o jogo
game.state.start('main');
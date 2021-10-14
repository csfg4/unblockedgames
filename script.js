canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

let direction;
let time = 0;
let pos;
let foodhide = false;

let length = 1;

const player = [
    {x: 20, y: 20},
];

const food = {x: 0, y: 0};

document.addEventListener("keydown", function(ext)
{
    switch(ext.key)
    {
        case "ArrowRight":
            if (direction == "left") break;
            direction = "right";
            break;

        case "ArrowLeft":
        if (direction == "right") break;
            direction = "left";
            break;
        
        case "ArrowDown":
        if (direction == "up") break;
            direction = "down";
            break;

        case "ArrowUp":
        if (direction == "down") break;
            direction = "up";
            break;
    }
})

function gameloop()
{
    update();
    draw();
    setTimeout(gameloop, 100)
}

function update()
{
    spawn();
    movesnake(direction);
    collisions();
    
}

function collisions()
{
    if (player[0].x == food.x && player[0].y == food.y)
    {
        player.push({x: 0, y: 0})
        updatelength();
        foodhide = true;
        time = 0;
        spawn();
    }

    if (player[0].x > 39)
    {
        alert("dead");
    }
    if (player[0].y > 39)
    {
        alert("dead");
    }
    if (player[0].x < 0)
    {
        alert("dead");
    }
    if (player[0].y < 0)
    {
        alert("dead");
    }

    for (var i = player.length - 1; i >= 1; --i)
    {
        if (player[0].x == player[i].x && player[0].y == player[i].y)
        {
            alert("dead");
        }
    }

}

function updatelength()
{
    ++length;
    document.getElementById("score").innerText = "Length: " + length;
}

function spawn()
{
    if (time == 0)
    {
        do
        {
            testing = false;
            food.x = Math.floor(Math.random() * 40);
            food.y = Math.floor(Math.random() * 40);
            for (var i = player.length - 1; i >= 0; --i)
            {
                if (food.x == player[i].x && food.y == player[i].y)
                {
                    food.x = Math.floor(Math.random() * 40);
                    food.y = Math.floor(Math.random() * 40);
                    testing = true;
                }
            }
        } while (testing)
        food.x = Math.floor(Math.random() * 40);
        food.y = Math.floor(Math.random() * 40);
        time = 1;
    }
    
}

function movesnake(direction)
{

    for (var i = player.length - 1; i >= 1; --i)
    {
        player[i].x = player[i - 1].x;
        player[i].y = player[i - 1].y;
    }

    switch(direction)
    {
        case "right":
            ++player[0].x;
            break;
        case "left":
            --player[0].x;
            break;
        case "down":
            ++player[0].y;
            break;
        case "up":
            --player[0].y;
            break;
    }
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "darkgreen";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    for (var i = 0; i < player.length; ++i)
    {
        ctx.fillRect(player[i].x * 10, player[i].y * 10, 10, 10)
    }
        ctx.fillStyle = "blue";
        ctx.fillRect(food.x * 10, food.y * 10, 10, 10)
}

gameloop();
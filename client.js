var grid;
let found;
let pathvar;
let variable;
let pathstep;


function getplayer()
{
    grid = new PF.Grid(40, 40);
    for (var i = 1; i < player.length; i++)
    {
        grid.setWalkableAt(player[i].x, player[i].y, false);
    }
}


function findpath()
{
    var finder = new PF.AStarFinder();
    var path = finder.findPath(player[0].x, player[0].y, food.x, food.y, grid);
    console.log("Found path from " + player[0].x + ", " + player[0].y + " to " + food.x + ", " + food.y)
    console.log(path);
    pathvar = path;
    pathstep = 1;
    travel();
}

function travel()
{
    if (pathvar[pathstep].at(0) == player[0].x + 1){
        direction = "right"
    }
    else if (pathvar[pathstep].at(0) == player[0].x - 1){
        direction = "left"
    }
    else if (pathvar[pathstep].at(1) == player[0].y + 1){
        direction = "down"
    }
    else if (pathvar[pathstep].at(1) == player[0].y - 1){
        direction = "up"
    }
    pathstep++
}

function startbot()
{
    getplayer();
    findpath();
    setTimeout(startbot, 1)
}

var LivingCreature = require("./LivingCreature");
module.exports = class Mard extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.index = 4;
        this.sov = 3;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x - 3, this.y - 3],
            [this.x - 2, this.y - 3],
            [this.x - 1, this.y - 3],
            [this.x, this.y - 3],
            [this.x + 1, this.y - 3],
            [this.x + 2, this.y - 3],
            [this.x + 3, this.y - 3],
            [this.x - 3, this.y - 2],
            [this.x + 3, this.y - 2],
            [this.x - 3, this.y],
            [this.x - 3, this.y - 1],
            [this.x + 3, this.y - 1],
            [this.x + 3, this.y],
            [this.x - 3, this.y + 1],
            [this.x + 3, this.y - 1],
            [this.x - 3, this.y + 2],
            [this.x + 2, this.y + 2],
            [this.x - 3, this.y + 3],
            [this.x - 2, this.y + 3],
            [this.x - 1, this.y + 3],
            [this.x, this.y + 3],
            [this.x + 1, this.y + 3],
            [this.x + 2, this.y + 3],
            [this.x + 3, this.y + 3]



        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {

        var newCell = Random(this.chooseCell(1));
        if (newCell) {
            this.sov--;
            var newx = newCell[0];
            var newy = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newy][newx] = 4;
            this.x = newx;
            this.y = newy;
        }
    }
    eat() {
        var eatArr = [];
        var newCell = Random(this.chooseCell(2));
        var newCell1 = Random(this.chooseCell(3));
        eatArr.push(newCell);
        eatArr.push(newCell1);
        var mard = Random(eatArr);

        if (mard) {
            var newx = mard[0];
            var newy = mard[1];
            matrix[newy][newx] = 4;
            matrix[this.y][this.x] = 0;
            if (mard == 2) {
                for (var i in xotakerArr) {
                    if (newx == grasseaterArr[i].x && newy == grasseaterArr[i].y) {
                        grasseaterArr.splice(i, 1);
                        break
                    }
                }
            }
            else {
                for (var i in predatorArr) {
                    if (newx == predatorArr[i].x && newy == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break
                    }
                }
            }

            this.x = newx;
            this.y = newy;
            this.sov += 2;
        }
    }
    mul() {
        var newCell = Random(this.chooseCell(0));

        if (this.sov >= 7 && newCell) {
            var newmard = new Mard(newCell[0], newCell[1], this.index);
            mardArr.push(newmard);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.sov = 3;
        }
    }
    die() {
        if (this.sov <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in mardArr) {
                if (this.x == mardArr[i].x && this.y == mardArr[i].y) {
                    mardArr.splice(i, 1);

                }
            }
        }

    }
}
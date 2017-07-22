const paper = require('paper')
// const data = require('./complex-1000.json')
// const data = require('./simple-1000.json')
const data = require('./middle-1000.json')

paper.install(window);
paper.setup('myCanvas');
view.viewSize.set(800, 500)

const DATA_MAX = 255
const CELL_SIZE = 50
const ROW = Math.floor(view.size.width / CELL_SIZE)
const COLUMN = Math.floor(view.size.height / CELL_SIZE)

const fingers = []

function draw(drawingData, x, y, size) {
  const drawing = drawingData.drawing
  const finger = new CompoundPath({
    transformContent: false, // this flag lets rotation get saved on the compound itself instead of paths within
  })
  finger.strokeColor = 'black'
  for (let i = 0; i < drawing.length; i++) {
    const path = new Path()
    const strokeX = drawing[i][0]
    const strokeY = drawing[i][1]
    for (let j = 0; j < strokeX.length; j++) {
      path.add([
        strokeX[j] / DATA_MAX * size + x,
        strokeY[j] / DATA_MAX * size + y,
      ])
    }
    finger.addChild(path)
  }
  finger.scale(0.8)
  fingers.push(finger)
}

for (var i = 0; i < ROW; i++) {
  for (var j = 0; j < COLUMN; j++) {
    const index = i * COLUMN + j
    draw(data[index], i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE)
  }
}
/**
 * return the angle of a vector formed from pointA to pointB
 * in degree
 * Vector(1, 0) has angle of 0
 * @param  {Paper.Point} pointA
 * @param  {Paper.Point} pointB
 * @return {Number}        [description]
 */
function getAngleDeg(pointA, pointB) {
  const x = pointB.x - pointA.x
  const y = pointB.y - pointA.y
  return Math.atan2(y, x) / (Math.PI / 180)
}

view.onMouseMove = function(event) {
  for (let i = 0; i < fingers.length; i++) {
    const finger = fingers[i]
    const angle = getAngleDeg(finger.position, event.point) + 90
    const lastAngle = finger.rotation
    finger.rotate(angle - lastAngle)
  }
}

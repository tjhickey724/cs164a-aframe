console.log("loading powerup.js")
AFRAME.registerComponent('powerup', {
  schema: {
    target: {type: 'selector', default:"#hud"}
  },


  init: function() {
    const component = this
    this.health=5
    this.score=0
    this.avatar = document.querySelector("#avbox")
    this.collisionHandler = (e) => {
         console.log('just collided with something')
         component.otherBody = e.detail.body
    }
    this.el.addEventListener('collide', this.collisionHandler);
  },

  tick: function(uptime,delta) {
    const otherBody = this.otherBody
    this.otherBody = null
    if (this.avatar) {

    let pos = this.avatar.object3D.position
    let wall=40
    if (pos.x >  wall) pos.x=  wall
    if (pos.x < -wall) pos.x= -wall
    if (pos.z >  wall) pos.z=  wall
    if (pos.z < -wall) pos.z= -wall
    //pos.set(position)
  }

    if (otherBody) {

      console.log('in the tick function')
      console.dir(otherBody)
      const hud = this.data.target

      let elt = otherBody.el
      const eltHealth = parseInt(elt.getAttribute('health'))
      const eltScore = parseInt(elt.getAttribute('score'))

      if (eltHealth) {
        this.health+= eltHealth;
      }

      if (eltScore) {
        this.score += eltScore;
      }


      hud.setAttribute('health',this.health)
      hud.setAttribute('score',this.score)
      hud.setAttribute('text','value',
               "Score:"
             + this.score
             + "  Health:"
             + this.health)

      if (eltHealth || eltScore){
        console.log('removing elt from scene')
        console.dir(elt)
        console.log('parent is ')
        console.dir(elt.parentNode)
        otherBody.el.removeAttribute("dynamic-body");
        elt.parentNode.removeChild(elt)
      }

      if (this.health <0){
        hud.setAttribute('text','value',"YOU LOSE!! GAME OVER!")
      }
      if (this.score>20){
        hud.setAttribute('text','value',"YOU WIN!!")
      }

    }
  }

});

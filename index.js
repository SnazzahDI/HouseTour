const { Plugin } = require('elements')

module.exports = class FakeConnections extends Plugin {
  preload () {
    const r = (this.react = this.manager.get('react'));
    this.mBind = this.check.bind(this);
    this.react.on('mutation', this.mBind);
    this.html = `<div class="membershipDialog-rVL-t_ di-housetour"><div class="membershipDialogContent-3zv-XB"><div class="membershipDialogHouseName-ezTTJ9 white-2qwKC7 weightSemiBold-NJexzi">Change your House Instantly</div><div class="flex-1xMQg5 flex-1O1GKY horizontal-1ae9ci horizontal-2EEEnY flex-1O1GKY directionRow-3v3tfG alignStretch-DpGPf3 noWrap-3jynv6" style="flex: 1 1 auto;"><div class="houseLogoWrapper-3XZ6yo" style="flex: 0 0 auto;" data-house="1"><img class="houseLogo-2MU96l" src="/assets/59419b0683ef50f5e8ecd8748ecbcfeb.svg" alt="House of Bravery"></div><div class="houseLogoWrapper-3XZ6yo" style="flex: 0 0 auto;" data-house="2"><img class="houseLogo-2MU96l" src="/assets/0f1eadc1ec3616e0b1c9ce515ee5683a.svg" alt="House of Brilliance"></div><div class="houseLogoWrapper-3XZ6yo" style="flex: 0 0 auto;" data-house="3"><img class="houseLogo-2MU96l" src="/assets/ac89ab7dd6f700d02b0ac958b98a3309.svg" alt="House of Balance"></div></div></div></div>`;
    this.parentClass = ".content-column.default";
    this.checkClass = ".membershipDialog-rVL-t_:not(.di-housetour)";
  }

  load () { }

  unload () {
    this.react.removeListener('mutation', this.mBind);
    if(document.querySelector(".di-housetour")) document.querySelector(this.parentClass).removeChild(document.querySelector(".di-housetour"));
  }

  get color() {
    return '7A78BD';
  }

  check(){
    if(!document.querySelector(".di-housetour") && document.querySelector(this.checkClass)){
      let html = document.createRange().createContextualFragment(this.html);
      let box = html.childNodes[0];
      let self = this;
      Array.from(box.querySelectorAll('[class*="houseLogoWrapper-"]')).map(e => e.onclick = function(){
        self.log("Changing house to ", this.dataset.house);
        self.post(parseInt(this.dataset.house))
      })
      document.querySelector(this.parentClass).insertBefore(box, document.querySelector(this.parentClass).childNodes[2]);
    } else {
      if(document.querySelector(".di-housetour") && !document.querySelector(this.checkClass)) document.querySelector(this.parentClass).removeChild(document.querySelector(".di-housetour"));
    }
  }

  post(house){
    return fetch('https://canary.discordapp.com/api/v6/hypesquad/online', {
      body: JSON.stringify({ house_id: house }),
      cache: 'no-cache',
      headers: {
        'content-type': 'application/json',
        'authorization': JSON.parse(this.DI.localStorage.token)
      },
      method: 'POST',
      mode: 'cors'
    }).then(r => r.json())
  }
}

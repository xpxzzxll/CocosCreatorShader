cc.Class({
    extends: cc.Component,

    properties: {
        mask: cc.Mask
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.mask._graphics.clear();
        this.mask._graphics.roundRect(0, 0, 512, 512, 512 * 0.1);
        this.mask._graphics.fill();
    },

    // update (dt) {},
});

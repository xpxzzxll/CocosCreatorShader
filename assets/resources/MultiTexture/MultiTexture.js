cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        disallowMultiple: true,
        executeInEditMode: true,
        requireComponent: cc.RenderComponent,
    },

    properties: {
        texture_another: {
            default: null,
            type: cc.Texture2D,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rc = this.node.getComponent(cc.RenderComponent);
    },

    start () {
        if (null != this.texture_another) {
            this.rc.getMaterial(0).setProperty('texture_another', this.texture_another);
        }
    },

    // update (dt) {},
});

/**
 * 个人感觉此shader在生产环境中并无实际意义
 * sprite：不可以是合图，也不可以被动态合图（texture设置packable = false）
 * label：对 bitmapfont 或者 cache mode 为 char 表现异常（可以去掉 editor:requireComponent，自行对label实验）
 */
cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        requireComponent: cc.Sprite,
        disallowMultiple: true,
    },

    properties: {
        offset: cc.v2(0.0, 0.0),
        duration: 3
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.rc = this.node.getComponent(cc.RenderComponent);
    },

    start() {
        this.uv_delta_x = 1.0;
        this.uv_delta_y = 1.0;

        this.offset_x = this.uv_delta_x / this.duration / cc.game.getFrameRate();
        this.offset_y = this.uv_delta_y / this.duration / cc.game.getFrameRate();
    },

    onEnable() {
    },

    update(dt) {
        let x = this.offset.x + this.offset_x;
        if (x >= this.uv_delta_x) {
            x -= this.uv_delta_x;
        }
        let y = this.offset.y + this.offset_y;
        if (y >= this.uv_delta_y) {
            y -= this.uv_delta_y;
        }
        this.offset = cc.v2(x, y);
        this.rc.getMaterial(0).setProperty('uv_offset', this.offset);
    },
});

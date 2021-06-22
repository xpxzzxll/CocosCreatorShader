/**
 * 个人感觉此shader在生产环境中并无实际意义
 * sprite：无论【提前合图】/【动态合图】都可以正常工作
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
        //指向组件同名函数
        this.rc._updateMaterial = this._updateMaterial.bind(this);
    },

    start() {
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
        this.offset = cc.v2(x, 0);
        this.rc.getMaterial(0).setProperty('uv_offset', this.offset);
    },

    _updateMaterial() {
        if (this.rc instanceof cc.Sprite) {
            cc.Sprite.prototype._updateMaterial.call(this.rc);

            // this._sprite_calc_with_rect();
            this._sprite_calc_with_uv();

        } else if (this.rc instanceof cc.Label) {
            if (cc.game.renderType === cc.game.RENDER_TYPE_CANVAS) {
                cc.Label.prototype._updateMaterialCanvas.call(this.rc);
            } else {
                cc.Label.prototype._updateMaterialWebgl.call(this.rc);
            }

            this._label_calc_with_uv();
        } else {
            throw new Error('msg');
        }
    },

    _sprite_calc_with_rect() {
        let spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
        let rect = spriteFrame.getRect();
        let texture = spriteFrame.getTexture();

        this.uv_start_x = rect.x / texture.width;
        this.uv_delta_x = rect.width / texture.width;

        this.uv_start_y = rect.y / texture.height;
        this.uv_delta_y = rect.height / texture.height;

        this.offset_x = this.uv_delta_x / this.duration / cc.game.getFrameRate();
        this.offset_y = this.uv_delta_y / this.duration / cc.game.getFrameRate();

        this.rc.getMaterial(0).setProperty('uv_calc_x', cc.v2(this.uv_start_x, this.uv_delta_x));
        this.rc.getMaterial(0).setProperty('uv_calc_y', cc.v2(this.uv_start_y, this.uv_delta_y));
    },

    /**
     * 3——4
     * |  |
     * 1——2
     */
    _sprite_calc_with_uv() {
        let uv = this.node.getComponent(cc.Sprite).spriteFrame.uv;

        this.uv_start_x = uv[0];
        this.uv_delta_x = uv[2] - uv[0];

        this.uv_start_y = uv[5];
        this.uv_delta_y = uv[1] - uv[5];

        this.offset_x = this.uv_delta_x / this.duration / cc.game.getFrameRate();
        this.offset_y = this.uv_delta_y / this.duration / cc.game.getFrameRate();

        this.rc.getMaterial(0).setProperty('uv_calc_x', cc.v2(this.uv_start_x, this.uv_delta_x));
        this.rc.getMaterial(0).setProperty('uv_calc_y', cc.v2(this.uv_start_y, this.uv_delta_y));
    }, 

    _label_calc_with_uv() {
        let uv = this.node.getComponent(cc.Label)._frame.uv;
        this.uv_start_x = uv[0];
        this.uv_delta_x = uv[2] - uv[0];

        this.uv_start_y = uv[5];
        this.uv_delta_y = uv[1] - uv[5];

        this.offset_x = this.uv_delta_x / this.duration / cc.game.getFrameRate();
        this.offset_y = this.uv_delta_y / this.duration / cc.game.getFrameRate();

        this.rc.getMaterial(0).setProperty('uv_calc_x', cc.v2(this.uv_start_x, this.uv_delta_x));
        this.rc.getMaterial(0).setProperty('uv_calc_y', cc.v2(this.uv_start_y, this.uv_delta_y));
    }

});

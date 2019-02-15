const UVMaterial = require('UVMaterial');
const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/UVComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.Sprite,
    },
    properties: {
        _uvOffset: cc.v2(0.0, 0.0),
        offset: {
            get () {
                return this._uvOffset;
            },
            set (val) {
                this._uvOffset.x = val.x;
                this._uvOffset.y = val.y;
                if (this._material) {
                    this._material.u_offset = this._uvOffset;
                }
            }
        },

        _uvTiling: cc.v2(1.0, 1.0),
        tiling: {
            get () {
                return this._uvTiling;
            },
            set (val) {
                this._uvTiling.x = val.x;
                this._uvTiling.y = val.y;
                if (this._material) {
                    this._material.u_offset_tiling = this._uvTiling;
                }
            }
        },

        _color : cc.color(),
        _material : null
    },

    // onLoad () {},

    start () {
        this._applyShader();
    },

    _applyShader() {
        let sprite = this.getComponent(cc.Sprite);
        let material = new UVMaterial();
        let texture = sprite.spriteFrame.getTexture();

        material.texture = texture
        material.updateHash();

        sprite._material = material;
        sprite._renderData.material = material;

        this._material = material;
    },

    update(dt) {
        this.offset = cc.v2(this.offset.x + 0.001, this.offset.y);
    },
});

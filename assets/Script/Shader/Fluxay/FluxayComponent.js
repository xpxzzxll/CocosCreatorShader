const FluxayMaterial = require('FluxayMaterial');
const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/FluxayComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        _time: 0,
        time: {
            get () {
                return this._time;
            },
            set (val) {
                this._time = val;
                if (this._material) {
                    this._material.time = val;
                }
            },
            visible : false

        },
        _material : null
    },

    onEnable() {
        let rc = this.getComponent(cc.RenderComponent);
        let texture = null;
        if (rc instanceof cc.Sprite) {
            texture = rc.spriteFrame.getTexture();
        } else if (rc instanceof dragonBones.ArmatureDisplay) {
            texture = rc.dragonAtlasAsset && rc.dragonAtlasAsset.texture;
        }
        let material = this._material || new FluxayMaterial();
        material.useColor = false;
        if (texture) {
            material.texture = texture;
            rc.markForUpdateRenderData(true);
            rc.markForRender(true);
        } else {
            rc.disableRender();
        }
        rc._updateMaterial(material);
        this._material = material;

        this.scheduleOnce(()=>{
            this.enabled = false;
        }, 3.0)
    },

    update(dt) {
        if (this._time > 65535) {
            this._time = 0;
        }
        this.time += dt;
    },
});

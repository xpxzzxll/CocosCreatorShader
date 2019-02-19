const ShaderComponent = require('ShaderComponent');
cc.Class({
    extends: ShaderComponent,
    editor: CC_EDITOR && {
        menu: 'Shader/MultiTextureComponent',
        disallowMultiple: true,
        executeInEditMode: false,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        tex: {
            default: null,
            type: cc.Texture2D
        },
    },
    onLoad() {
        this.Material = require('MultiTextureMaterial');
    },

    onEnable() {
        let rc = this.getComponent(cc.RenderComponent);
        let texture = null;
        if (rc instanceof cc.Sprite) {
            texture = rc.spriteFrame.getTexture();
        } else if (rc instanceof dragonBones.ArmatureDisplay) {
            texture = rc.dragonAtlasAsset && rc.dragonAtlasAsset.texture;
        }
        let material = this._material || new this.Material();
        material.useColor = false;

        material.texture1 = this.tex;

        if (texture) {
            material.texture = texture;
            rc.markForUpdateRenderData(true);
            rc.markForRender(true);
        } else {
            rc.disableRender();
        }
        rc._updateMaterial(material);
        this._material = material;
    }
});

const ShaderMaterial = require('ShaderMaterial');
cc.Class({
    extends: cc.Component,
    editor: CC_EDITOR && {
        executeInEditMode: true,
        disallowMultiple: true,
        requireComponent: cc.RenderComponent,
    },
    properties: {
        //材质的构造函数
        Material: {
            default : null,
            type : Function
        },
        
        material : {
            get() {
                return this._material;
            }
        },
        _material : {
            default : null,
            type: ShaderMaterial,
            serializable : false
        }
    },

    onEnable() {
            let rc = this.getComponent(cc.RenderComponent);
            let texture = null;
            if (rc instanceof cc.Sprite) {
                texture = rc.spriteFrame.getTexture();
            } else if (rc instanceof dragonBones.ArmatureDisplay) {
                texture = rc.dragonAtlasAsset && rc.dragonAtlasAsset.texture;
            }
            let material = new this.Material();
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
    },
    onDisable () {
        let rc = this.getComponent(cc.RenderComponent);
        rc._material = null;
        rc._activateMaterial();
    }
});

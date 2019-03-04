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
            type : Function,
            visible : false
        },
        
        material : {
            get() {
                return this._material;
            },
            visible: false
        },
        _material : {
            default : null,
            type: ShaderMaterial,
            serializable : false
        }
    },

    onEnable() {
        /**
         * 开启会使得不是图集的texture被合到一起, 导致在native中shader不起作用, web中默认为false, native中默认为true
         * 如果texture被打包成atlas就没事
         * 查看creator的代码, (!spriteframe._original && dynamicAtlasManager) 会被 dynamicAtlasManager.insertSpriteFrame
         * 如果需要单独控制自行实现
         */
        cc.dynamicAtlasManager.enabled = false;

        let rc = this.getComponent(cc.RenderComponent);
        let texture = null;
        if (rc instanceof cc.Sprite) {
            texture = rc.spriteFrame.getTexture();
        } else if (rc instanceof dragonBones.ArmatureDisplay) {
            texture = rc.dragonAtlasAsset && rc.dragonAtlasAsset.texture;
        }
        let material = this._material || new this.Material();
        material.useColor = false;
        if (texture) {
            material.texture = texture;
            if (rc instanceof cc.Sprite && rc._renderData) {
                 rc._renderData.material = material;
            }
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

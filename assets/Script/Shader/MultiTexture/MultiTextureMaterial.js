const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'multi-texture',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform sampler2D texture1;
                varying mediump vec2 uv0;
                void main()
                {
                    gl_FragColor = texture2D(texture, uv0) + texture2D(texture1, uv0);
                }
            `,
            override: true
        },
        _texture1: {
            default: null,
            type: cc.Texture2D
        },
        texture1: {
            get() {
                return this._texture1;
            },
            set(val) {
                if (this._texture1 !== val) {
                    this._texture1 = val;
                    this._effect.setProperty('texture1', val.getImpl());
                    this._texIds['texture1'] = val.getId();
                }
            }
        },
    },

    ctor() {
        this._mainTech._parameters.push({
            name: 'texture1',
            type: renderer.PARAM_TEXTURE_2D
        });
    },

    
});

const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'uv_transform',
            override: true
        },
        fsh: {
            default: `
                precision lowp float;
                uniform sampler2D texture;
                varying mediump vec2 uv0;
                uniform lowp vec4 color;
                uniform vec2 u_offset;
                uniform vec2 u_offset_tiling;
                void main()
                {
                    vec2 uv = uv0;
                    uv = uv * u_offset_tiling + u_offset;
                    uv = fract(uv);
                    gl_FragColor = color * texture2D(texture, uv);
                }
            `,
            override: true
        },

        u_offset : {
            set(val) {
                this._effect.setProperty('u_offset', val);
            },
            // get() {
            //     return this._effect.getProperty('u_offset');
            // }
            
        },

        u_offset_tiling : {
            set(val) {
                this._effect.setProperty('u_offset_tiling', val);
            },
            // get() {
            //     return this._effect.getProperty('u_offset_tiling');
            // }
        },
    },

    ctor() {
        this.uniform(
            'u_offset',
            renderer.PARAM_FLOAT2,
            cc.Vec2.ZERO
        );

        this.uniform(
            'u_offset_tiling',
            renderer.PARAM_FLOAT2,
            cc.Vec2.ONE
        );
    },

    
});

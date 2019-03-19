const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'dissolve',
            override : true
        },
        range: {
            set(val) {
                this.effect.setProperty('range', val);
            },
        },
        fsh: {
            default: `
                #ifdef GL_ES
                precision lowp float;
                #endif
                uniform sampler2D texture;
                uniform sampler2D texture1;
                varying mediump vec2 uv0;
                uniform float range;

                void mainImage(out vec4 fragColor, in vec2 fragCoord) {
                    vec4 noise = texture2D(texture1, fragCoord);
                    float height = (noise.r + noise.g + noise.b) / 3.0;
                    vec4 color = texture2D(texture, fragCoord);
                    
                    if (range > height) {
                        // discard;
                        fragColor = vec4(0);
                    }else {
                        if (range + 0.05 > height) {
                            color = vec4(0.9, 0.6, 0.3, color.a);
                        }
                        fragColor = color;
                    }
                }

                void main() {
                    mainImage(gl_FragColor, uv0);
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
        this.uniform(
            'range',
            renderer.PARAM_FLOAT,
            0
        );
    }
});

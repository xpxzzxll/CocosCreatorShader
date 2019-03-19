const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'water',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform vec2 iResolution;
                uniform float iTime;
                uniform lowp vec4 color;
                varying vec2 uv0;
                #define F cos(x-y)*cos(y),sin(x+y)*sin(y)
                vec2 s(vec2 p)
                {
                    float d=iTime*0.2,x=8.*(p.x+d),y=8.*(p.y+d);
                    return vec2(F);
                }
                void mainImage( out vec4 fragColor, in vec2 fragCoord )
                {
                    // 换成resolution
                    vec2 rs = iResolution.xy;
                    // 换成纹理坐标v_texCoord.xy
                    vec2 uv = fragCoord;
                    vec2 q = uv+2./iResolution.x*(s(uv)-s(uv+rs));
                    //反转y
                    //q.y=1.-q.y;
                    fragColor = color * texture2D(texture, q);
                }
                void main()
                {
                    mainImage(gl_FragColor, uv0.xy);
                }
            `,
            override: true
        },
        time: {
            set(val) {
                this.effect.setProperty('iTime', val);
            },
        },

        resolution: {
            set(val) {
                this.effect.setProperty('iResolution', val);
            }
        }
    },

    ctor() {
        this.uniform(
            'iResolution',
            renderer.PARAM_FLOAT2,
            cc.v2(10, 10)
        );
        this.uniform(
            'iTime',
            renderer.PARAM_FLOAT,
            0
        );
    },

    
});

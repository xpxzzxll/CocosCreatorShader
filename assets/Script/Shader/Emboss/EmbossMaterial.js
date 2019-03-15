const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'emboss',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                uniform float u_time;
                void main() {
                    vec2 onePixel = vec2(1.0 / 480.0, 1.0 / 320.0);
                    vec4 c = vec4(0.5, 0.5, 0.5, 0.0);
                    c -= texture2D(texture, uv0 - onePixel) * 5.0;
                    c += texture2D(texture, uv0 + onePixel) * 5.0;
                    c.rgb = vec3((c.r + c.g + c.b) / 3.0);
                    gl_FragColor = vec4(c.rgb, texture2D(texture, uv0).a);
                }
            `,
            override: true
        },
    },
    ctor() {
    },
});
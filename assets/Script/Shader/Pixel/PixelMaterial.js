const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'pixel',
            override : true
        },
        fsh: {
            default: `
                precision lowp float;
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                void main() {     
                    float effectFactor = 0.85;
                    vec2 pixelSize = (1.0 - effectFactor * 0.95) * vec2(512, 512);
                    // float u = round(uv0.x * pixelSize.x) / pixelSize.x;
                    // float v = round(uv0.y * pixelSize.y) / pixelSize.y;
                    float u = step(0.5, fract(uv0.x * pixelSize.x)) + floor(uv0.x * pixelSize.x);
                    float v = step(0.5, fract(uv0.y * pixelSize.y)) + floor(uv0.y * pixelSize.y);
                    vec2 uv = vec2(u, v) / pixelSize;
                    vec4 c = texture2D(texture, uv);
                    c.a *= color.a;
                    gl_FragColor = c;
                }
            `,
            override: true
        },
    },
});
const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'gray',
            override : true
        },
        fsh: {
            default: `
                uniform sampler2D texture;
                varying vec2 uv0;
                void main() {
                    vec4 c = texture2D(texture, uv0);
                    float clrbright = (c.r + c.g + c.b) * (1.0 / 3.0);
                    float gray = 0.6 * clrbright;
                    gl_FragColor = vec4(gray, gray, gray, c.a);
                }
            `,
            override: true
        },
    },
});

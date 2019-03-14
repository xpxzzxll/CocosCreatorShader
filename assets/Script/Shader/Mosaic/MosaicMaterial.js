const ShaderMaterial = require('ShaderMaterial');
const renderer = cc.renderer.renderEngine.renderer;
cc.Class({
    extends: ShaderMaterial,
    properties: {
        name: {
            default: 'mosaic',
            override : true
        },
        fsh: {
            default: `
                precision highp float;
                uniform sampler2D texture;
                uniform lowp vec4 color;
                varying vec2 uv0;
                void main() {
                    float imageWidth = 512.0;
                    float imageHeight = 512.0;
                    float mosaicSize = 16.0;
                    vec2 texSize = vec2(imageWidth, imageHeight);
                    // 计算实际图像位置
                    vec2 xy = vec2(uv0.x * texSize.x, uv0.y * texSize.y);
                    // 计算某一个小mosaic的中心坐标
                    vec2 mosaicCenter = vec2(floor(xy.x / mosaicSize) * mosaicSize + 0.5 * mosaicSize,
                        floor(xy.y / mosaicSize) * mosaicSize + 0.5 * mosaicSize);
                    // 计算距离中心的长度
                    vec2 delXY = mosaicCenter - xy;
                    float delLength = length(delXY);
                    // 换算回纹理坐标系
                    vec2 uvMosaic = vec2(mosaicCenter.x / texSize.x, mosaicCenter.y / texSize.y);

                    if (delLength < 0.5 * mosaicSize) {
                        gl_FragColor = texture2D(texture, uvMosaic);
                    } else {
                        gl_FragColor = texture2D(texture, uv0);
                    }
                }
            `,
            override: true
        },
    },
});
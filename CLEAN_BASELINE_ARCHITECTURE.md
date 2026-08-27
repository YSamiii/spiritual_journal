# 属灵日记 v0.6 Clean Baseline

本版本不增加产品功能，只整理代码结构。

## 目录职责

- `index.html`：仅页面结构，不再包含业务 CSS / 业务 JS。
- `styles/app.css`：唯一全局样式源。
- `src/core.js`：数据库键、迁移入口、通用工具、modal、导航。
- `src/models/verse.js`：经文新增/编辑。
- `src/models/question.js`：问题本新增/编辑。
- `src/models/prayer.js`：长期祷告与今日祷告记录。
- `src/models/gratitude.js`：感恩。
- `src/models/daily-summary.js`：日终汇总。
- `src/services/bible-reference.js`：66 卷顺序、章/节解析与比较。
- `src/services/ocr.js`：拍照 OCR。
- `src/services/backup.js`：JSON 导入/导出。
- `src/services/settings.js`：设置。
- `src/screens/*.js`：只负责各页面渲染。
- `src/app.js`：应用启动与最终 render orchestration。

## 后续维护规则

1. 不在 `index.html` 底部追加修复函数。
2. 不建立第二份经文、问题、祷告状态源。
3. 圣经排序只改 `services/bible-reference.js`。
4. OCR 只改 `services/ocr.js`。
5. 数据兼容只改 `core.js` 中的 migration。
6. 页面 bug 优先修改对应 `screens/*`，数据 bug 修改对应 `models/*`。
7. CSS 只写入 `styles/app.css`，禁止在页面内追加 `<style>` override。
8. 新功能优先扩展现有 source of truth，不建立平行实现。

## 数据兼容

继续使用原数据库键 `spiritualJournal.v0.1`，因此本次代码整理不会主动创建第二套本地数据。

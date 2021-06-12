
/*--------------------------------------------------------------------------

　ステータス表示にゲージを付けるスクリプト -arrain-

■概要
　「力」「技」などのステータス表示にゲージをつけるスクリプト


■対応バージョン
　SRPG Studio Version:1.233


■規約
・MITライセンス
・商用・非商用 OK
・加工・再配布・転載　OK
・クレジット明記お願いします
・SRPG Studio利用規約は遵守してください。

■更新履歴
2021/06/11 公開

--------------------------------------------------------------------------*/


//--------------------------------------------
// 設定
//--------------------------------------------
// ゲージの色(0:黒、1:青, 2:緑, 3:赤)
DEFULT_COLOR_INDEX = 1;

// パラメータ上限に達した際にゲージの色(0:黒、1:青, 2:緑, 3:赤)
MAX_COLOR_INDEX = 2;

// ゲージUI素材(デフォルトでは、battle_gauge, unit_gaugeのいずれかから選択)
GAUGE_UI = 'battle_gauge';

// ゲージの幅
GAUGE_WIDTH = 60;

// ゲージのX,Y座標の補正値
GAUGE_CORR_X = 22;
GAUGE_CORR_Y = 8;


(function() {
//--------------------------------------------
// BaseUnitParameterクラス
//--------------------------------------------
BaseUnitParameter.drawUnitParameter=function(x, y, statusEntry) {
	var n = (statusEntry.param < 0) ? 0 : statusEntry.param;

	// ゲージの描画
	this._drawGauge(x + GAUGE_CORR_X, y + GAUGE_CORR_Y, n, statusEntry);

	// 数値の描画
	NumberRenderer.drawNumber(x, y, n);
};

BaseUnitParameter._drawGauge=function(x, y, n, statusEntry) {
	var unit = statusEntry.unit;
	var gauge = statusEntry.gaugeObj;
	var pic = root.queryUI(GAUGE_UI);
	var color = (n >= this.getMaxValue(unit)) ? MAX_COLOR_INDEX : DEFULT_COLOR_INDEX;

	gauge.setGaugeInfo(n, this.getMaxValue(unit), color);
	gauge.setPartsCount(GAUGE_WIDTH/10);
	gauge.drawGaugeBar(x - GAUGE_WIDTH, y, pic);
};

BaseUnitParameter.isParameterRenderable=function() {
	return true;
};

//--------------------------------------------
// UnitStatusScrollbarクラス
//--------------------------------------------
UnitStatusScrollbar._createStatusEntry=function(unit, index, weapon) {
	return {
		type: ParamGroup.getParameterName(index),
		param: ParamGroup.getLastValue(unit, index, weapon),
		bonus: 0,
		index: index,
		isRenderable: ParamGroup.isParameterRenderable(index),
		unit: unit,
		gaugeObj: createObject(GaugeBar)
	};
};

})();


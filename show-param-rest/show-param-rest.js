
/*--------------------------------------------------------------------------

　パラメータを拠点画面に表示するスクリプト -arrain-

■概要
　「ゴールド」「ボーナス」やユーザー定義のグローバルパラメータを拠点画面に表示するスクリプト

■使い方
拠点で表示させたいパラメータを決めて、RestScene._getParamPartsListに記載する
デフォルトでは
・ゴールド
・ボーナス
・発展度(ユーザー定義のグローバルパラメータ)
を表示するようになっているので、不要なものをコメントアウトし、必要なものを追加する。
※「発展度」は、データ設定 > コンフィグ > スクリプト > グローバルパラメータ にて、
{
	hubGrowth: 10
}
のように、グローバルパラメータを定義している状態を前提としている。


■対応バージョン
　SRPG Studio Version:1.233


■規約
・MITライセンス
・商用・非商用 OK
・加工・再配布・転載　OK
・クレジット明記お願いします
・SRPG Studio利用規約は遵守してください。

■更新履歴
2021/06/18 公開

--------------------------------------------------------------------------*/


//--------------------------------------------
// 設定
//--------------------------------------------
// パラメータを描画するX・Y座標
PARAM_DRAW_X = 480;
PARAM_DRAW_Y = 0;

// 2つ以上のパラメータを描画する際の行間
PARAM_DRAW_BETWEEN_CONTENT = 24;

// パラメータ描画で使用するUIテキスト
PARAM_TEXT_UI = 'questreward_title';

(function() {
///--------------------------------------------
// RestSceneクラス
//--------------------------------------------
RestScene._getParamPartsList=function() {
	var groupArray = [];

	// 以下に記載しているパラメータが拠点画面で表示される。必要に応じて以下をコメントアウト/追加して運用する
	// ---- ここから ----//

	// ゴールド
	groupArray.appendObject(GoldParts);

	// ボーナス
	groupArray.appendObject(BonusParts);

	// 発展度(デモ用ユーザー定義グローバルパラメータ)
	groupArray.appendObject(HubGrowthParts);

	// ---- ここまで ----//
	return groupArray;
};

RestScene._drawAreaName=function() {
	// 拠点シーンの右上に地名などを描画する

	// 拠点シーンの右上にパラメータを描画する
	this._drawParam();
};

RestScene._drawParam=function() {
	// パラメータの描画
	var paramPartsList = this._getParamPartsList();
	for (i = 0; i < paramPartsList.length; i++) {
		paramPartsList[i].draw(PARAM_DRAW_X, PARAM_DRAW_Y + PARAM_DRAW_BETWEEN_CONTENT * i);
	}
};

///--------------------------------------------
// BaseParamPartsクラス
//--------------------------------------------
var BaseParamParts = defineObject(BaseObject,
{
	draw: function (x, y) {
		var text = this._getParamName();
		var textui = this._getTextUI();
		var color = ColorValue.KEYWORD;
		var font = textui.getFont();
		var pic = textui.getUIImage();

		TitleRenderer.drawTitle(pic, x, y, TitleRenderer.getTitlePartsWidth(), TitleRenderer.getTitlePartsHeight(), this._getCount() - 2);
		TextRenderer.drawText(x + 15, y + 22, text, -1, color, font);
		NumberRenderer.drawNumber(x + 124, y + 16, this._getValue());
	},

	_getTextUI: function () {
		return root.queryTextUI(PARAM_TEXT_UI);
	},

	_getCount: function () {
		return 5;
	},

	_getParamName: function () {
		return '';
	},

	_getValue: function () {
		return 0;
	}
});

// ゴールド
var GoldParts = defineObject(BaseParamParts,
{
	_getParamName: function () {
		return StringTable.Signal_Gold;
	},

	_getValue: function () {
		return root.getMetaSession().getGold();
	}
});

// ボーナス
var BonusParts = defineObject(BaseParamParts,
{
	_getParamName: function () {
		return StringTable.Signal_Bonus;
	},

	_getValue: function () {
		return root.getMetaSession().getBonus();
	}
});

// 自作のグローバルパラメータ
var HubGrowthParts = defineObject(BaseParamParts,
{
	_getParamName: function () {
		return '発展度';
	},

	_getValue: function () {
		return root.getMetaSession().global.hubGrowth;
	}
});

})();


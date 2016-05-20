
;(function ($) {
	$.fn.waterFall = function (options) {

		// 默认值及参数
		var defalut = $.extend({
			gap: 20
		}, options);

		// 初始化
		var _this = $(this),
			items = _this.children(),
			width = items.width(),
			height = 0,
			// 计算可以放置几列
			count = Math.floor(_this.width() / (width + defalut.gap)),
			columns = [];

		items.each(function (key, val) {
			// 每个元素的高度
			height = $(val).height();

			// 第一行
			if(key < count) {
				// 每一列的高度
				columns[key] = height;

				// 设置定位坐标
				$(val).css({
					top: 0, 
					left: (width + defalut.gap) * key
				});
			} else {
				var min_h = columns[0];
				var min_k = 0;

				// 取出最小列及下标
				for(var i=0; i<columns.length; i++) {
					if(columns[i] < min_h) {
						min_h = columns[i];
						min_k = i;
					}
				}

				// 更新当前列的高度
				columns[min_k] += height;

				$(val).css({
					top: min_h + defalut.gap,
					left: (width + defalut.gap) * min_k
				});
			}
		});

		// 排序
		columns = columns.sort(function (a, b) {
			return b - a;
		});

		_this.css({
			height: columns[0]
		});

	}
})(jQuery);
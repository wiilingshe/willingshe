angular.module("security.authority", []).factory("authority", ["$translate", function(a) {
	var b = {
		GROUP_CUSTOMER: 1,
		SCENE_HIDE_LASTPAGE_SETTING: 2,
		TRANSFER_SCENE: 4,
		SCENE_EDIT_TRIGGER: 8,
		EXPAND_WEBSITE: 16,
		SCENE_EDIT_SOUND: 32,
		ACCESS_NEW_PAGEFLIP: 64,
		COMP_ANIMATION: 128,
		RADIO_CHECKBOX_RATING: 256,
		INTERACTION: 512,
		ACCESS_DOMAIN_BIND: 1024,
		LOADING_LOGO: 2048,
		TEMPLATE_PAYMENT: 4096,
		INTERACTION_COUNTER: 8192,
		SCENE_PASSWORD: 16384,
		USERCENTER_HISTORY: 32768,
		APPLY_XIUKE: 65536,
		SHAKE_TRIGGER: 131072
	},
		c = {
			1: {
				code: 74045,
				name: a.instant("common.security.CUSTOM_USER")
			},
			2: {
				code: 61439,
				name: a.instant("common.security.COMPANY_USER")
			},
			21: {
				code: 59903,
				name: a.instant("common.security.COMPANY_USER2")
			},
			3: {
				code: 193535,
				name: a.instant("common.security.SENIOR_USER")
			},
			4: {
				code: 128511,
				name: a.instant("common.security.SERVICE_USER")
			},
			12: {
				code: 127999,
				name: a.instant("common.security.VIP_USER")
			}
		};
	return {
		accessDef: b,
		userRoleDef: c
	}
}]);
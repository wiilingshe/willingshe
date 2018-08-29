(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 720,
	height: 1158,
	fps: 30,
	color: "#666666",
	manifest: [
		{src:"images/asd2.png", id:"asd2"},
		{src:"images/bg.png", id:"bg"},
		{src:"images/bgpng复制.png", id:"bgpng复制"},
		{src:"images/Bitmap1.png", id:"Bitmap1"},
		{src:"images/Bitmap10.png", id:"Bitmap10"},
		{src:"images/Bitmap100.png", id:"Bitmap100"},
		{src:"images/Bitmap102.png", id:"Bitmap102"},
		{src:"images/Bitmap104.png", id:"Bitmap104"},
		{src:"images/Bitmap106.png", id:"Bitmap106"},
		{src:"images/Bitmap108.png", id:"Bitmap108"},
		{src:"images/Bitmap11.png", id:"Bitmap11"},
		{src:"images/Bitmap111.png", id:"Bitmap111"},
		{src:"images/Bitmap113.png", id:"Bitmap113"},
		{src:"images/Bitmap115.png", id:"Bitmap115"},
		{src:"images/Bitmap117.png", id:"Bitmap117"},
		{src:"images/Bitmap119.png", id:"Bitmap119"},
		{src:"images/Bitmap12.png", id:"Bitmap12"},
		{src:"images/Bitmap120.png", id:"Bitmap120"},
		{src:"images/Bitmap122.png", id:"Bitmap122"},
		{src:"images/Bitmap124.png", id:"Bitmap124"},
		{src:"images/Bitmap126.png", id:"Bitmap126"},
		{src:"images/Bitmap128.png", id:"Bitmap128"},
		{src:"images/Bitmap13.png", id:"Bitmap13"},
		{src:"images/Bitmap131.png", id:"Bitmap131"},
		{src:"images/Bitmap133.png", id:"Bitmap133"},
		{src:"images/Bitmap135.png", id:"Bitmap135"},
		{src:"images/Bitmap137.png", id:"Bitmap137"},
		{src:"images/Bitmap139.png", id:"Bitmap139"},
		{src:"images/Bitmap14.png", id:"Bitmap14"},
		{src:"images/Bitmap140.png", id:"Bitmap140"},
		{src:"images/Bitmap142.png", id:"Bitmap142"},
		{src:"images/Bitmap144.png", id:"Bitmap144"},
		{src:"images/Bitmap146.png", id:"Bitmap146"},
		{src:"images/Bitmap148.png", id:"Bitmap148"},
		{src:"images/Bitmap15.png", id:"Bitmap15"},
		{src:"images/Bitmap151.png", id:"Bitmap151"},
		{src:"images/Bitmap153.png", id:"Bitmap153"},
		{src:"images/Bitmap155.png", id:"Bitmap155"},
		{src:"images/Bitmap157.png", id:"Bitmap157"},
		{src:"images/Bitmap159.png", id:"Bitmap159"},
		{src:"images/Bitmap16.png", id:"Bitmap16"},
		{src:"images/Bitmap160.png", id:"Bitmap160"},
		{src:"images/Bitmap162.png", id:"Bitmap162"},
		{src:"images/Bitmap164.png", id:"Bitmap164"},
		{src:"images/Bitmap166.png", id:"Bitmap166"},
		{src:"images/Bitmap168.png", id:"Bitmap168"},
		{src:"images/Bitmap17.png", id:"Bitmap17"},
		{src:"images/Bitmap171.png", id:"Bitmap171"},
		{src:"images/Bitmap173.png", id:"Bitmap173"},
		{src:"images/Bitmap175.png", id:"Bitmap175"},
		{src:"images/Bitmap177.png", id:"Bitmap177"},
		{src:"images/Bitmap179.png", id:"Bitmap179"},
		{src:"images/Bitmap18.png", id:"Bitmap18"},
		{src:"images/Bitmap19.png", id:"Bitmap19"},
		{src:"images/Bitmap2.png", id:"Bitmap2"},
		{src:"images/Bitmap20.png", id:"Bitmap20"},
		{src:"images/Bitmap21.png", id:"Bitmap21"},
		{src:"images/Bitmap22.png", id:"Bitmap22"},
		{src:"images/Bitmap25.png", id:"Bitmap25"},
		{src:"images/Bitmap26.png", id:"Bitmap26"},
		{src:"images/Bitmap27.png", id:"Bitmap27"},
		{src:"images/Bitmap28.png", id:"Bitmap28"},
		{src:"images/Bitmap29.png", id:"Bitmap29"},
		{src:"images/Bitmap2dasd.png", id:"Bitmap2dasd"},
		{src:"images/Bitmap3.png", id:"Bitmap3"},
		{src:"images/Bitmap30.png", id:"Bitmap30"},
		{src:"images/Bitmap31.png", id:"Bitmap31"},
		{src:"images/Bitmap32.png", id:"Bitmap32"},
		{src:"images/Bitmap33.png", id:"Bitmap33"},
		{src:"images/Bitmap34.png", id:"Bitmap34"},
		{src:"images/Bitmap3cvxv.png", id:"Bitmap3cvxv"},
		{src:"images/Bitmap4.png", id:"Bitmap4"},
		{src:"images/Bitmap5.png", id:"Bitmap5"},
		{src:"images/Bitmap6.png", id:"Bitmap6"},
		{src:"images/Bitmap7.png", id:"Bitmap7"},
		{src:"images/Bitmap8.png", id:"Bitmap8"},
		{src:"images/Bitmap84.png", id:"Bitmap84"},
		{src:"images/Bitmap86.png", id:"Bitmap86"},
		{src:"images/Bitmap88.png", id:"Bitmap88"},
		{src:"images/Bitmap9.png", id:"Bitmap9"},
		{src:"images/Bitmap91.png", id:"Bitmap91"},
		{src:"images/Bitmap93.png", id:"Bitmap93"},
		{src:"images/Bitmap95.png", id:"Bitmap95"},
		{src:"images/Bitmap97.png", id:"Bitmap97"},
		{src:"images/Bitmap99.png", id:"Bitmap99"},
		{src:"images/Bitmapddasd.png", id:"Bitmapddasd"},
		{src:"images/Bitmapsfsdfsdfs.png", id:"Bitmapsfsdfsdfs"},
		{src:"images/Black_1_213_82677.png", id:"Black_1_213_82677"},
		{src:"images/Black_1_215_32659.png", id:"Black_1_215_32659"},
		{src:"images/Black_1_217_21350.png", id:"Black_1_217_21350"},
		{src:"images/Black_1_219_82281.png", id:"Black_1_219_82281"},
		{src:"images/Black_1_221_19321.png", id:"Black_1_221_19321"},
		{src:"images/Black_1_223_29756.png", id:"Black_1_223_29756"},
		{src:"images/Black_1_225_76272.png", id:"Black_1_225_76272"},
		{src:"images/Black_1_227_17681.png", id:"Black_1_227_17681"},
		{src:"images/Black_1_229_26850.png", id:"Black_1_229_26850"},
		{src:"images/Black_1_231_90244.png", id:"Black_1_231_90244"},
		{src:"images/Black_1_235_56133.png", id:"Black_1_235_56133"},
		{src:"images/Black_1_237_35073.png", id:"Black_1_237_35073"},
		{src:"images/Black_1_239_17867.png", id:"Black_1_239_17867"},
		{src:"images/Black_1_241_28679.png", id:"Black_1_241_28679"},
		{src:"images/Black_1_243_24942.png", id:"Black_1_243_24942"},
		{src:"images/Black_1_245_4551.png", id:"Black_1_245_4551"},
		{src:"images/Black_1_247_75484.png", id:"Black_1_247_75484"},
		{src:"images/Black_1_249_45550.png", id:"Black_1_249_45550"},
		{src:"images/Black_1_251_86503.png", id:"Black_1_251_86503"},
		{src:"images/Black_1_253_1514.png", id:"Black_1_253_1514"},
		{src:"images/Black_1_269_89343.png", id:"Black_1_269_89343"},
		{src:"images/Black_1_291_14019.png", id:"Black_1_291_14019"},
		{src:"images/Black_1_293_67519.png", id:"Black_1_293_67519"},
		{src:"images/Black_1_295_2352.png", id:"Black_1_295_2352"},
		{src:"images/Black_1_297_63024.png", id:"Black_1_297_63024"},
		{src:"images/Black_1_299_64775.png", id:"Black_1_299_64775"},
		{src:"images/Black_1_301_99218.png", id:"Black_1_301_99218"},
		{src:"images/Black_1_303_55026.png", id:"Black_1_303_55026"},
		{src:"images/Black_1_305_92756.png", id:"Black_1_305_92756"},
		{src:"images/Black_1_307_37166.png", id:"Black_1_307_37166"},
		{src:"images/Black_1_309_2434.png", id:"Black_1_309_2434"},
		{src:"images/Black_1_311_37744.png", id:"Black_1_311_37744"},
		{src:"images/Black_1_313_16655.png", id:"Black_1_313_16655"},
		{src:"images/Black_1_315_13877.png", id:"Black_1_315_13877"},
		{src:"images/Black_1_319_82445.png", id:"Black_1_319_82445"},
		{src:"images/Black_1_321_49523.png", id:"Black_1_321_49523"},
		{src:"images/Black_1_341_52674.png", id:"Black_1_341_52674"},
		{src:"images/Black_1_343_37278.png", id:"Black_1_343_37278"},
		{src:"images/Black_1_347_11921.png", id:"Black_1_347_11921"},
		{src:"images/Black_1_349_43222.png", id:"Black_1_349_43222"},
		{src:"images/Black_1_351_38606.png", id:"Black_1_351_38606"},
		{src:"images/Black_1_353_89600.png", id:"Black_1_353_89600"},
		{src:"images/Black_1_355_38416.png", id:"Black_1_355_38416"},
		{src:"images/Black_1_367_60356.png", id:"Black_1_367_60356"},
		{src:"images/Black_1_371_90731.png", id:"Black_1_371_90731"},
		{src:"images/Black_1_373_76218.png", id:"Black_1_373_76218"},
		{src:"images/Black_1_375_33093.png", id:"Black_1_375_33093"},
		{src:"images/Black_1_379_41194.png", id:"Black_1_379_41194"},
		{src:"images/Black_1_381_10602.png", id:"Black_1_381_10602"},
		{src:"images/Black_1_385_91272.png", id:"Black_1_385_91272"},
		{src:"images/Black_1_387_11991.png", id:"Black_1_387_11991"},
		{src:"images/Black_1_391_47650.png", id:"Black_1_391_47650"},
		{src:"images/Black_1_392_83723.png", id:"Black_1_392_83723"},
		{src:"images/jiantou.png", id:"jiantou"},
		{src:"images/logo.png", id:"logo"},
		{src:"images/p11.png", id:"p11"},
		{src:"images/p12.png", id:"p12"},
		{src:"images/p13.png", id:"p13"},
		{src:"images/p14.png", id:"p14"},
		{src:"images/p15.png", id:"p15"},
		{src:"images/p16.png", id:"p16"},
		{src:"images/p17.png", id:"p17"}
	]
};



// symbols:



(lib.asd2 = function() {
	this.initialize(img.asd2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,664,874);


(lib.bg = function() {
	this.initialize(img.bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.bgpng复制 = function() {
	this.initialize(img.bgpng复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.Bitmap10 = function() {
	this.initialize(img.Bitmap10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.Bitmap100 = function() {
	this.initialize(img.Bitmap100);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,120);


(lib.Bitmap102 = function() {
	this.initialize(img.Bitmap102);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,435,723);


(lib.Bitmap104 = function() {
	this.initialize(img.Bitmap104);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap106 = function() {
	this.initialize(img.Bitmap106);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap108 = function() {
	this.initialize(img.Bitmap108);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap11 = function() {
	this.initialize(img.Bitmap11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,337,58);


(lib.Bitmap111 = function() {
	this.initialize(img.Bitmap111);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap113 = function() {
	this.initialize(img.Bitmap113);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap115 = function() {
	this.initialize(img.Bitmap115);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap117 = function() {
	this.initialize(img.Bitmap117);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap119 = function() {
	this.initialize(img.Bitmap119);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap12 = function() {
	this.initialize(img.Bitmap12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,692,1015);


(lib.Bitmap120 = function() {
	this.initialize(img.Bitmap120);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,41);


(lib.Bitmap122 = function() {
	this.initialize(img.Bitmap122);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap124 = function() {
	this.initialize(img.Bitmap124);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap126 = function() {
	this.initialize(img.Bitmap126);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap128 = function() {
	this.initialize(img.Bitmap128);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap13 = function() {
	this.initialize(img.Bitmap13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,338,149);


(lib.Bitmap131 = function() {
	this.initialize(img.Bitmap131);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap133 = function() {
	this.initialize(img.Bitmap133);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,435,723);


(lib.Bitmap135 = function() {
	this.initialize(img.Bitmap135);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap137 = function() {
	this.initialize(img.Bitmap137);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap139 = function() {
	this.initialize(img.Bitmap139);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap14 = function() {
	this.initialize(img.Bitmap14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,382,28);


(lib.Bitmap140 = function() {
	this.initialize(img.Bitmap140);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap142 = function() {
	this.initialize(img.Bitmap142);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap144 = function() {
	this.initialize(img.Bitmap144);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap146 = function() {
	this.initialize(img.Bitmap146);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,435,774);


(lib.Bitmap148 = function() {
	this.initialize(img.Bitmap148);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap15 = function() {
	this.initialize(img.Bitmap15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,195,27);


(lib.Bitmap151 = function() {
	this.initialize(img.Bitmap151);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap153 = function() {
	this.initialize(img.Bitmap153);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap155 = function() {
	this.initialize(img.Bitmap155);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap157 = function() {
	this.initialize(img.Bitmap157);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Bitmap159 = function() {
	this.initialize(img.Bitmap159);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,150);


(lib.Bitmap16 = function() {
	this.initialize(img.Bitmap16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,71,27);


(lib.Bitmap160 = function() {
	this.initialize(img.Bitmap160);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,400,676);


(lib.Bitmap162 = function() {
	this.initialize(img.Bitmap162);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap164 = function() {
	this.initialize(img.Bitmap164);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap166 = function() {
	this.initialize(img.Bitmap166);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap168 = function() {
	this.initialize(img.Bitmap168);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Bitmap17 = function() {
	this.initialize(img.Bitmap17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,454,27);


(lib.Bitmap171 = function() {
	this.initialize(img.Bitmap171);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,57);


(lib.Bitmap173 = function() {
	this.initialize(img.Bitmap173);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,395,183);


(lib.Bitmap175 = function() {
	this.initialize(img.Bitmap175);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,405,223);


(lib.Bitmap177 = function() {
	this.initialize(img.Bitmap177);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,394,66);


(lib.Bitmap179 = function() {
	this.initialize(img.Bitmap179);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,392,105);


(lib.Bitmap18 = function() {
	this.initialize(img.Bitmap18);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,454,27);


(lib.Bitmap19 = function() {
	this.initialize(img.Bitmap19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,27);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,172,89);


(lib.Bitmap20 = function() {
	this.initialize(img.Bitmap20);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,27);


(lib.Bitmap21 = function() {
	this.initialize(img.Bitmap21);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,344,105);


(lib.Bitmap22 = function() {
	this.initialize(img.Bitmap22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,543,88);


(lib.Bitmap25 = function() {
	this.initialize(img.Bitmap25);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.Bitmap26 = function() {
	this.initialize(img.Bitmap26);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,543,79);


(lib.Bitmap27 = function() {
	this.initialize(img.Bitmap27);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,543,119);


(lib.Bitmap28 = function() {
	this.initialize(img.Bitmap28);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,664,682);


(lib.Bitmap29 = function() {
	this.initialize(img.Bitmap29);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,350,59);


(lib.Bitmap2dasd = function() {
	this.initialize(img.Bitmap2dasd);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,324,128);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,235,54);


(lib.Bitmap30 = function() {
	this.initialize(img.Bitmap30);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.Bitmap31 = function() {
	this.initialize(img.Bitmap31);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,258,72);


(lib.Bitmap32 = function() {
	this.initialize(img.Bitmap32);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,598,138);


(lib.Bitmap33 = function() {
	this.initialize(img.Bitmap33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,669,533);


(lib.Bitmap34 = function() {
	this.initialize(img.Bitmap34);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,675,423);


(lib.Bitmap3cvxv = function() {
	this.initialize(img.Bitmap3cvxv);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,664,874);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,54);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,237,54);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,239,54);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,235,54);


(lib.Bitmap8 = function() {
	this.initialize(img.Bitmap8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,515,723);


(lib.Bitmap84 = function() {
	this.initialize(img.Bitmap84);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,351,58);


(lib.Bitmap86 = function() {
	this.initialize(img.Bitmap86);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,375,27);


(lib.Bitmap88 = function() {
	this.initialize(img.Bitmap88);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,222);


(lib.Bitmap9 = function() {
	this.initialize(img.Bitmap9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,200,133);


(lib.Bitmap91 = function() {
	this.initialize(img.Bitmap91);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,59,31);


(lib.Bitmap93 = function() {
	this.initialize(img.Bitmap93);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,124,31);


(lib.Bitmap95 = function() {
	this.initialize(img.Bitmap95);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,424,67);


(lib.Bitmap97 = function() {
	this.initialize(img.Bitmap97);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,124,31);


(lib.Bitmap99 = function() {
	this.initialize(img.Bitmap99);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,344,76);


(lib.Bitmapddasd = function() {
	this.initialize(img.Bitmapddasd);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,610,193);


(lib.Bitmapsfsdfsdfs = function() {
	this.initialize(img.Bitmapsfsdfsdfs);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,360,67);


(lib.Black_1_213_82677 = function() {
	this.initialize(img.Black_1_213_82677);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_215_32659 = function() {
	this.initialize(img.Black_1_215_32659);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_217_21350 = function() {
	this.initialize(img.Black_1_217_21350);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,41);


(lib.Black_1_219_82281 = function() {
	this.initialize(img.Black_1_219_82281);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,41);


(lib.Black_1_221_19321 = function() {
	this.initialize(img.Black_1_221_19321);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,41);


(lib.Black_1_223_29756 = function() {
	this.initialize(img.Black_1_223_29756);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,435,774);


(lib.Black_1_225_76272 = function() {
	this.initialize(img.Black_1_225_76272);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_227_17681 = function() {
	this.initialize(img.Black_1_227_17681);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_229_26850 = function() {
	this.initialize(img.Black_1_229_26850);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,181,47);


(lib.Black_1_231_90244 = function() {
	this.initialize(img.Black_1_231_90244);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_235_56133 = function() {
	this.initialize(img.Black_1_235_56133);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_237_35073 = function() {
	this.initialize(img.Black_1_237_35073);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_239_17867 = function() {
	this.initialize(img.Black_1_239_17867);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_241_28679 = function() {
	this.initialize(img.Black_1_241_28679);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_243_24942 = function() {
	this.initialize(img.Black_1_243_24942);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_245_4551 = function() {
	this.initialize(img.Black_1_245_4551);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_247_75484 = function() {
	this.initialize(img.Black_1_247_75484);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_249_45550 = function() {
	this.initialize(img.Black_1_249_45550);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_251_86503 = function() {
	this.initialize(img.Black_1_251_86503);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,409,28);


(lib.Black_1_253_1514 = function() {
	this.initialize(img.Black_1_253_1514);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,410,105);


(lib.Black_1_269_89343 = function() {
	this.initialize(img.Black_1_269_89343);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,908,1185);


(lib.Black_1_291_14019 = function() {
	this.initialize(img.Black_1_291_14019);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,63,31);


(lib.Black_1_293_67519 = function() {
	this.initialize(img.Black_1_293_67519);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,442,105);


(lib.Black_1_295_2352 = function() {
	this.initialize(img.Black_1_295_2352);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,650,971);


(lib.Black_1_297_63024 = function() {
	this.initialize(img.Black_1_297_63024);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,344,75);


(lib.Black_1_299_64775 = function() {
	this.initialize(img.Black_1_299_64775);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,76);


(lib.Black_1_301_99218 = function() {
	this.initialize(img.Black_1_301_99218);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,181,47);


(lib.Black_1_303_55026 = function() {
	this.initialize(img.Black_1_303_55026);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_305_92756 = function() {
	this.initialize(img.Black_1_305_92756);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,41);


(lib.Black_1_307_37166 = function() {
	this.initialize(img.Black_1_307_37166);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_309_2434 = function() {
	this.initialize(img.Black_1_309_2434);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_311_37744 = function() {
	this.initialize(img.Black_1_311_37744);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_313_16655 = function() {
	this.initialize(img.Black_1_313_16655);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_315_13877 = function() {
	this.initialize(img.Black_1_315_13877);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_319_82445 = function() {
	this.initialize(img.Black_1_319_82445);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_321_49523 = function() {
	this.initialize(img.Black_1_321_49523);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,409,106);


(lib.Black_1_341_52674 = function() {
	this.initialize(img.Black_1_341_52674);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.Black_1_343_37278 = function() {
	this.initialize(img.Black_1_343_37278);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,355,76);


(lib.Black_1_347_11921 = function() {
	this.initialize(img.Black_1_347_11921);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,41);


(lib.Black_1_349_43222 = function() {
	this.initialize(img.Black_1_349_43222);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_351_38606 = function() {
	this.initialize(img.Black_1_351_38606);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_353_89600 = function() {
	this.initialize(img.Black_1_353_89600);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_355_38416 = function() {
	this.initialize(img.Black_1_355_38416);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,35,35);


(lib.Black_1_367_60356 = function() {
	this.initialize(img.Black_1_367_60356);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,59,31);


(lib.Black_1_371_90731 = function() {
	this.initialize(img.Black_1_371_90731);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_373_76218 = function() {
	this.initialize(img.Black_1_373_76218);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,396,105);


(lib.Black_1_375_33093 = function() {
	this.initialize(img.Black_1_375_33093);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,301,67);


(lib.Black_1_379_41194 = function() {
	this.initialize(img.Black_1_379_41194);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_381_10602 = function() {
	this.initialize(img.Black_1_381_10602);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_385_91272 = function() {
	this.initialize(img.Black_1_385_91272);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,103);


(lib.Black_1_387_11991 = function() {
	this.initialize(img.Black_1_387_11991);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,452,105);


(lib.Black_1_391_47650 = function() {
	this.initialize(img.Black_1_391_47650);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1160,710);


(lib.Black_1_392_83723 = function() {
	this.initialize(img.Black_1_392_83723);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.jiantou = function() {
	this.initialize(img.jiantou);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.logo = function() {
	this.initialize(img.logo);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p11 = function() {
	this.initialize(img.p11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p12 = function() {
	this.initialize(img.p12);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p13 = function() {
	this.initialize(img.p13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p14 = function() {
	this.initialize(img.p14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p15 = function() {
	this.initialize(img.p15);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p16 = function() {
	this.initialize(img.p16);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.p17 = function() {
	this.initialize(img.p17);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.ss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p14();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.jiantou_1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.jiantou();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.元件sss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p12();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件47 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap34();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,675,423);


(lib.元件45 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap2dasd();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,324,128);


(lib.元件44 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmapddasd();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,610,193);


(lib.元件43 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap26();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,543,79);


(lib.元件42 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap22();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,543,88);


(lib.元件41 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap27();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,543,119);


(lib.元件38 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap33();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,669,533);


(lib.元件37 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap32();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,598,138);


(lib.元件36 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap31();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,258,72);


(lib.元件35 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap29();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,350,59);


(lib.元件34 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap30();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.元件32 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap28();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,664,682);


(lib.元件30 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.asd2();
	this.instance.setTransform(0.1,2.1);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0.1,2.1,664,874);


(lib.元件29 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmapsfsdfsdfs();
	this.instance.setTransform(-3.9,-6);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-3.9,-6,360,67);


(lib.元件28 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap25();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.元件26 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap3cvxv();
	this.instance.setTransform(0,0.8);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0.8,664,874);


(lib.元件24 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap12();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,692,1015);


(lib.元件23 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap13();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,338,149);


(lib.元件22 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap14();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,382,28);


(lib.元件21 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap15();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,195,27);


(lib.元件20 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap16();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,71,27);


(lib.元件19 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap17();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,454,27);


(lib.元件18 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap18();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,454,27);


(lib.元件17 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap19();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,452,27);


(lib.元件16 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap20();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,452,27);


(lib.元件15 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap21();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,344,105);


(lib.元件14 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap10();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.元件13 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap11();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,337,58);


(lib.元件11 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,235,54);


(lib.元件10sss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.logo();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件10 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,233,54);


(lib.元件9ss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件9 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,237,54);


(lib.元件8 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p16();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件7 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p15();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,239,54);


(lib.元件5ss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p13();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap7();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,235,54);


(lib.元件4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap8();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,515,723);


(lib.元件3ss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p11();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,724,115);


(lib.元件2ss = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.bg();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,172,89);


(lib.Black_1_207_17118 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_392_83723();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.Black_1_205_9457 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_253_1514();
	this.instance.setTransform(-205,-52.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-205,-52.5,410,105);


(lib.Black_1_204_43367 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap177();
	this.instance.setTransform(-197,-33);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-197,-33,394,66);


(lib.Black_1_203_21937 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_373_76218();
	this.instance.setTransform(-198,-52.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-198,-52.5,396,105);


(lib.Black_1_202_54712 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap179();
	this.instance.setTransform(-196,-52.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-196,-52.5,392,105);


(lib.Black_1_201_95505 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap171();
	this.instance.setTransform(-175,-28.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-175,-28.5,350,57);


(lib.Black_1_200_76129 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_251_86503();
	this.instance.setTransform(-204.5,-14);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-204.5,-14,409,28);


(lib.Black_1_199_99093 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap173();
	this.instance.setTransform(-197.5,-91.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-197.5,-91.5,395,183);


(lib.Black_1_198_46228 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_321_49523();
	this.instance.setTransform(-204.5,-53);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-204.5,-53,409,106);


(lib.Black_1_197_87885 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap175();
	this.instance.setTransform(-202.5,-111.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-202.5,-111.5,405,223);


(lib.Black_1_196_66758 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_381_10602();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_195_48579 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap160();
	this.instance.setTransform(-199.8,-337.8);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-199.8,-337.8,400,676);


(lib.Black_1_194_63283 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap159();
	this.instance.setTransform(-119.4,-74.7);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-119.4,-74.7,239,150);


(lib.Black_1_193_6656 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap162();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_192_65942 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_245_4551();
	this.instance.setTransform(-42.5,-51.3);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.3,85,103);


(lib.Black_1_191_65309 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap164();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_189_97190 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap166();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_188_36522 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_247_75484();
	this.instance.setTransform(-42.5,-51.3);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.3,85,103);


(lib.Black_1_187_79624 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap168();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_186_27060 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_319_82445();
	this.instance.setTransform(-42.5,-51.3);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.3,85,103);


(lib.Black_1_185_85872 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_355_38416();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_184_28870 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_249_45550();
	this.instance.setTransform(-42.5,-51.3);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.3,85,103);


(lib.Black_1_183_52281 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap146();
	this.instance.setTransform(-217.5,-387);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-217.5,-387,435,774);


(lib.Black_1_182_76766 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap148();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_181_90137 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_237_35073();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_180_17144 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_239_17867();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_179_6462 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_371_90731();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_178_43551 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_241_28679();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_177_18159 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap153();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_176_51607 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_353_89600();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_175_65382 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap155();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_174_65187 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_243_24942();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_173_53002 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap157();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_172_12734 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_315_13877();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_171_21976 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap151();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_170_50380 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap133();
	this.instance.setTransform(-217.5,-361.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-217.5,-361.5,435,723);


(lib.Black_1_169_97353 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_229_26850();
	this.instance.setTransform(-90.5,-23.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-90.5,-23.5,181,47);


(lib.Black_1_168_30297 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap135();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_167_96946 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_385_91272();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_166_52384 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap137();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_165_58237 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_231_90244();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_164_54926 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_351_38606();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_163_43090 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap140();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_162_46198 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_235_56133();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_161_76145 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap142();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_160_40828 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_313_16655();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_159_27383 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap144();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_158_89953 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap139();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_157_50042 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_311_37744();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_156_16419 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_223_29756();
	this.instance.setTransform(-217.5,-387);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-217.5,-387,435,774);


(lib.Black_1_155_67695 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_307_37166();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_154_30109 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap122();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_153_78517 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_225_76272();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_152_84579 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap124();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_151_18290 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_349_43222();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_150_85962 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap126();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_149_28096 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_227_17681();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_148_6017 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap128();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_147_87448 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap131();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_146_21704 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_309_2434();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_145_52321 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap102();
	this.instance.setTransform(-217.5,-361.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-217.5,-361.5,435,723);


(lib.Black_1_144_77976 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap104();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_143_31549 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap106();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_142_83909 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap108();
	this.instance.setTransform(-17.5,-17.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-17.5,35,35);


(lib.Black_1_141_19667 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_217_21350();
	this.instance.setTransform(-17.5,-20.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-20.5,35,41);


(lib.Black_1_140_26030 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_347_11921();
	this.instance.setTransform(-17.5,-20.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-20.5,35,41);


(lib.Black_1_139_2908 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_219_82281();
	this.instance.setTransform(-17.5,-20.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-20.5,35,41);


(lib.Black_1_138_48841 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_305_92756();
	this.instance.setTransform(-17.5,-20.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-20.5,35,41);


(lib.Black_1_137_64733 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_221_19321();
	this.instance.setTransform(-17.5,-20.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-20.5,35,41);


(lib.Black_1_136_79199 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap120();
	this.instance.setTransform(-17.5,-20.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-17.5,-20.5,35,41);


(lib.Black_1_135_33386 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_213_82677();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_134_87334 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_379_41194();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_133_55344 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_215_32659();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_132_97893 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_303_55026();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_131_12519 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap111();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_130_15256 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap113();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_129_68320 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap115();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_128_70427 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap117();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_127_67389 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap119();
	this.instance.setTransform(-42.5,-51.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-42.5,-51.5,85,103);


(lib.Black_1_126_54711 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_301_99218();
	this.instance.setTransform(-90.5,-23.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-90.5,-23.5,181,47);


(lib.Black_1_125_88622 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap95();
	this.instance.setTransform(-212,-33.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-212,-33.5,424,67);


(lib.Black_1_124_86865 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_367_60356();
	this.instance.setTransform(-29.5,-15.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-29.5,-15.5,59,31);


(lib.Black_1_123_71907 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap97();
	this.instance.setTransform(-62,-15.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-62,-15.5,124,31);


(lib.Black_1_122_85122 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_299_64775();
	this.instance.setTransform(-177.5,-38);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-177.5,-38,355,76);


(lib.Black_1_121_90451 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap99();
	this.instance.setTransform(-172,-38);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-172,-38,344,76);


(lib.Black_1_120_38956 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap100();
	this.instance.setTransform(-177.5,-60);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-177.5,-60,355,120);


(lib.Black_1_119_5455 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap91();
	this.instance.setTransform(-29.5,-15.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-29.5,-15.5,59,31);


(lib.Black_1_118_14211 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_343_37278();
	this.instance.setTransform(-177.5,-38);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-177.5,-38,355,76);


(lib.Black_1_83_18013 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap93();
	this.instance.setTransform(-62,-15.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-62,-15.5,124,31);


(lib.Black_1_82_98524 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_297_63024();
	this.instance.setTransform(-172,-37.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-172,-37.5,344,75);


(lib.Black_1_81_19452 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_295_2352();
	this.instance.setTransform(-325,-485.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-325,-485.5,650,971);


(lib.Black_1_76_69839 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_375_33093();
	this.instance.setTransform(-150.5,-33.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-150.5,-33.5,301,67);


(lib.Black_1_66_37850 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_291_14019();
	this.instance.setTransform(-31.5,-15.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-31.5,-15.5,63,31);


(lib.Black_1_64_16743 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_341_52674();
	this.instance.setTransform(-362,-57.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-362,-57.5,724,115);


(lib.Black_1_62_7813 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap84();
	this.instance.setTransform(-175.5,-29);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-175.5,-29,351,58);


(lib.Black_1_58_7752 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap86();
	this.instance.setTransform(-187.5,-13.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-187.5,-13.5,375,27);


(lib.Black_1_53_2951 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_293_67519();
	this.instance.setTransform(-221,-52.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-221,-52.5,442,105);


(lib.Black_1_36_15715 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Bitmap88();
	this.instance.setTransform(-226,-111);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-226,-111,452,222);


(lib.Black_1_26_7810 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_387_11991();
	this.instance.setTransform(-226,-52.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-226,-52.5,452,105);


(lib.Black_1_10_84841 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.Black_1_391_47650();
	this.instance.setTransform(0,0,0.151,0.151);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,175.5,107.5);


(lib.jiantou_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.jiantou_1("synched",0);
	this.instance.setTransform(31.5,16,1,1,180,0,0,31.5,16);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:26},29,cjs.Ease.get(-1)).to({y:6},60,cjs.Ease.get(1)).to({y:16},30,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.元件40 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 2dasd
	this.instance = new lib.元件45("synched",0);
	this.instance.setTransform(295.2,506.2,1.875,1.875,0,0,0,162,64);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(26).to({_off:false},0).to({regX:162.1,scaleX:0.56,scaleY:0.56,x:295.3,alpha:1},6).to({regX:162,scaleX:1,scaleY:1,x:295.2},8).wait(55));

	// Bitmap ddasd
	this.instance_1 = new lib.元件44("synched",0);
	this.instance_1.setTransform(305,504.3,0.108,0.108,0,0,0,305.2,96.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(26).to({_off:false},0).to({regX:305,scaleX:1.13,scaleY:1.13},6).to({scaleX:1,scaleY:1},8).wait(55));

	// 图层 6
	this.instance_2 = new lib.元件43("synched",0);
	this.instance_2.setTransform(288.4,792,1,1,0,0,0,271.5,39.5);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(12).to({_off:false},0).to({y:232,alpha:1},8).to({y:252},7).wait(68));

	// 图层 5
	this.instance_3 = new lib.元件42("synched",0);
	this.instance_3.setTransform(288.4,708.5,1,1,0,0,0,271.5,44);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(6).to({_off:false},0).to({y:148.5,alpha:1},8).to({y:168.5},7).wait(74));

	// Bitmap 1sda
	this.instance_4 = new lib.元件41("synched",0);
	this.instance_4.setTransform(288.4,599.5,1,1,0,0,0,271.5,59.5);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({y:39.5,alpha:1},8).to({y:59.5},7).wait(80));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(16.9,540,543,119);


(lib.元件39 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 31
	this.instance = new lib.Bitmap31();
	this.instance.setTransform(231,174.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},69).wait(11));

	// Bitmap 29
	this.instance_1 = new lib.Bitmap29();
	this.instance_1.setTransform(184.3,26.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},69).wait(11));

	// Bitmap 30
	this.instance_2 = new lib.Bitmap30();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},69).wait(11));

	// Bitmap 32
	this.instance_3 = new lib.Bitmap32();
	this.instance_3.setTransform(52.9,291.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({_off:true},69).wait(11));

	// Bitmap 34
	this.instance_4 = new lib.元件47("synched",0);
	this.instance_4.setTransform(353.9,1276.7,1,1,0,0,0,337.5,211.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({y:696.7},7).to({y:676.7},9).to({_off:true},53).wait(11));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,724,1488.2);


(lib.元件33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 31
	this.instance = new lib.元件36("synched",0);
	this.instance.setTransform(360,210.6,0.228,0.228,0,0,0,129.1,36);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({regX:129,scaleX:1.35,scaleY:1.35},6).to({scaleX:1,scaleY:1},6).wait(66));

	// Bitmap 29
	this.instance_1 = new lib.元件35("synched",0);
	this.instance_1.setTransform(359.3,-353.8,1,1,0,0,0,175,29.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:76.7},7).to({y:56.2},8).wait(75));

	// Bitmap 30
	this.instance_2 = new lib.元件34("synched",0);
	this.instance_2.setTransform(362,488,1,1,0,0,0,362,57.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:37},7).to({y:57.5},8).wait(75));

	// Bitmap 33
	this.instance_3 = new lib.元件38("synched",0);
	this.instance_3.setTransform(356.4,1490.2,1,1,0,0,0,334.5,266.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({_off:false},0).to({y:752.2},6).to({y:731.7},7).wait(48));

	// Bitmap 32
	this.instance_4 = new lib.元件37("synched",0);
	this.instance_4.setTransform(351.9,770.5,1,1,0,0,0,299,69);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({y:340,alpha:1},7).to({y:360.5},7).wait(55));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-383.3,724,928.8);


(lib.元件31 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 25
	this.instance = new lib.Bitmap25();

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},68).wait(21));

	// Bitmap 28
	this.instance_1 = new lib.元件32("synched",0);
	this.instance_1.setTransform(360.3,1501.6,1,1,0,0,0,332,341);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:538.1},6).to({y:517.6},8).to({_off:true},54).wait(21));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,724,1842.6);


(lib.元件27 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 24
	this.instance = new lib.元件29("synched",0);
	this.instance.setTransform(357.3,-251.7,1,1,0,0,0,173,29);
	this.instance.alpha = 0.219;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:76.3,alpha:1},7).to({y:55.8},9).to({_off:true},57).wait(24));

	// Bitmap 25
	this.instance_1 = new lib.元件28("synched",0);
	this.instance_1.setTransform(362,508.5,1,1,0,0,0,362,57.5);
	this.instance_1.alpha = 0.219;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:37,alpha:1},7).to({y:57.5},9).to({_off:true},57).wait(24));

	// Bitmap 23
	this.instance_2 = new lib.元件30("synched",0);
	this.instance_2.setTransform(360.3,1556.6,1,1,0,0,0,332,437);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({_off:false},0).to({y:634.1},7).to({y:613.6},9).to({_off:true},48).wait(24));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-286.7,724,852.8);


(lib.元件25 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 23
	this.instance = new lib.元件26("synched",0);
	this.instance.setTransform(360.3,1618.1,1,1,0,0,0,332,437);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:638.1},6).to({y:613.6},7).to({_off:true},66).wait(15));

	// Bitmap 11
	this.instance_1 = new lib.Bitmap11();
	this.instance_1.setTransform(184.3,26.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},79).wait(15));

	// Bitmap 10
	this.instance_2 = new lib.Bitmap10();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({_off:true},79).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,724,2055.9);


(lib.元件12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 11
	this.instance = new lib.元件13("synched",0);
	this.instance.setTransform(352.8,-311.8,1,1,0,0,0,168.5,29);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:80.2,alpha:1},8).to({y:55.7},9).wait(103));

	// Bitmap 10
	this.instance_1 = new lib.元件14("synched",0);
	this.instance_1.setTransform(362,596.5,1,1,0,0,0,362,57.5);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:33,alpha:1},8).to({y:57.5},9).wait(103));

	// Bitmap 21
	this.instance_2 = new lib.元件15("synched",0);
	this.instance_2.setTransform(304.4,1129.1,1,1,0,0,0,172,52.5);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(60).to({_off:false},0).to({y:916,alpha:1},8).to({y:908.6},7).wait(45));

	// Bitmap 20
	this.instance_3 = new lib.元件16("synched",0);
	this.instance_3.setTransform(360.4,1024.7,1,1,0,0,0,226,13.5);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(55).to({_off:false},0).to({y:811.6,alpha:1},8).to({y:804.2},7).wait(50));

	// Bitmap 19
	this.instance_4 = new lib.元件17("synched",0);
	this.instance_4.setTransform(360.4,978.7,1,1,0,0,0,226,13.5);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(50).to({_off:false},0).to({y:765.6,alpha:1},8).to({y:758.2},7).wait(55));

	// Bitmap 18
	this.instance_5 = new lib.元件18("synched",0);
	this.instance_5.setTransform(361.4,932.7,1,1,0,0,0,227,13.5);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(46).to({_off:false},0).to({y:719.6,alpha:1},8).to({y:712.2},7).wait(59));

	// Bitmap 17
	this.instance_6 = new lib.元件19("synched",0);
	this.instance_6.setTransform(360.2,886.7,1,1,0,0,0,227,13.5);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(42).to({_off:false},0).to({y:673.6,alpha:1},8).to({y:666.2},7).wait(63));

	// Bitmap 16
	this.instance_7 = new lib.元件20("synched",0);
	this.instance_7.setTransform(170.5,840.7,1,1,0,0,0,35.5,13.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(38).to({_off:false},0).to({y:627.5,alpha:1},8).to({y:620.2},7).wait(67));

	// Bitmap 15
	this.instance_8 = new lib.元件21("synched",0);
	this.instance_8.setTransform(229.6,775.5,1,1,0,0,0,97.5,13.5);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(33).to({_off:false},0).to({y:562.3,alpha:1},8).to({y:555},7).wait(72));

	// Bitmap 14
	this.instance_9 = new lib.元件22("synched",0);
	this.instance_9.setTransform(324.4,710.6,1,1,0,0,0,191,14);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(27).to({_off:false},0).to({y:497.5,alpha:1},8).to({y:490.1},7).wait(78));

	// Bitmap 13
	this.instance_10 = new lib.元件23("synched",0);
	this.instance_10.setTransform(360.8,353.3,0.15,0.15,0,0,0,169.1,74.5);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(21).to({_off:false},0).to({regX:169,scaleX:1.23,scaleY:1.23},8).to({scaleX:1,scaleY:1},7).wait(84));

	// Bitmap 12
	this.instance_11 = new lib.元件24("synched",0);
	this.instance_11.setTransform(362.7,614.3,0.144,0.144,0,0,0,345.9,507.6);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(10).to({_off:false},0).to({regX:346,regY:507.5,scaleX:1.07,scaleY:1.07,alpha:1},7).to({scaleX:1,scaleY:1},7).wait(96));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-340.8,724,994.8);


(lib.元件1ss = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// logo.png
	this.instance = new lib.元件10sss("synched",0);
	this.instance.setTransform(59.8,62.1,0.396,0.396,0,0,0,59.8,62.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:59.9,scaleX:1.12,scaleY:1.12,x:59.9},5).to({regX:59.8,scaleX:1,scaleY:1,x:59.8},6).wait(97));

	// p1-7.png
	this.instance_1 = new lib.元件9ss("synched",0);
	this.instance_1.setTransform(360,355,1,1,0,0,0,360,579);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25).to({_off:false},0).to({y:607,alpha:1},10).to({y:579},12).wait(61));

	// p1-6.png
	this.instance_2 = new lib.元件8("synched",0);
	this.instance_2.setTransform(360,887,1,1,0,0,0,360,579);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(16).to({_off:false},0).to({y:607},6).to({y:579},6).wait(80));

	// p1-5.png
	this.instance_3 = new lib.元件7("synched",0);
	this.instance_3.setTransform(360,943,1,1,0,0,0,360,579);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(18).to({_off:false},0).to({y:607,alpha:1},5).to({y:579},6).wait(79));

	// p1-4.png
	this.instance_4 = new lib.ss("synched",0);
	this.instance_4.setTransform(108,579,1,1,0,0,0,360,579);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({_off:false},0).to({x:304},6).to({x:360},5).wait(90));

	// p1-3.png
	this.instance_5 = new lib.元件5ss("synched",0);
	this.instance_5.setTransform(640,579,1,1,0,0,0,360,579);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(7).to({_off:false},0).to({x:416},6).to({x:360},5).wait(90));

	// p1-2.png
	this.instance_6 = new lib.元件sss("synched",0);
	this.instance_6.setTransform(312.8,495.6,0.12,0.12,0,0,0,312.8,495.4);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(12).to({_off:false},0).to({regY:495.6,scaleX:1.09,scaleY:1.09},6).to({scaleX:1,scaleY:1},6).wait(84));

	// p1-1.png
	this.instance_7 = new lib.元件3ss("synched",0);
	this.instance_7.setTransform(351.7,515.1,0.126,0.126,0,0,0,351.7,515);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(3).to({_off:false},0).to({scaleX:1.2,scaleY:1.2,y:515},4).to({scaleX:1,scaleY:1},5).wait(96));

	// bg.png
	this.instance_8 = new lib.元件2ss("synched",0);
	this.instance_8.setTransform(360,579,1,1,0,0,0,360,579);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(108));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,720,1158);


(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 2
	this.instance = new lib.元件2("synched",0);
	this.instance.setTransform(353.4,-221.7,1,1,0,0,0,86,44.5);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:79.3,alpha:1},6).to({y:57.8},6).wait(109));

	// Bitmap 1
	this.instance_1 = new lib.元件3("synched",0);
	this.instance_1.setTransform(362,358.5,1,1,0,0,0,362,57.5);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:36,alpha:1},6).to({y:57.5},6).to({_off:true},107).wait(2));

	// Bitmap 7
	this.instance_2 = new lib.元件5("synched",0);
	this.instance_2.setTransform(338.8,1315.7,1,1,0,0,0,117.5,27);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(55).to({_off:false},0).to({y:847,alpha:1},8).to({y:821.2},8).to({_off:true},48).wait(2));

	// Bitmap 6
	this.instance_3 = new lib.元件6("synched",0);
	this.instance_3.setTransform(337.3,1182.1,1,1,0,0,0,119.5,27);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(44).to({_off:false},0).to({y:713.4,alpha:1},8).to({y:687.6},8).to({_off:true},59).wait(2));

	// Bitmap 5
	this.instance_4 = new lib.元件9("synched",0);
	this.instance_4.setTransform(335.8,1048.6,1,1,0,0,0,118.5,27);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(34).to({_off:false},0).to({y:579.9,alpha:1},8).to({y:554.1},8).to({_off:true},69).wait(2));

	// Bitmap 4
	this.instance_5 = new lib.元件10("synched",0);
	this.instance_5.setTransform(337.4,915,1,1,0,0,0,116.5,27);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(26).to({_off:false},0).to({y:446.3,alpha:1},8).to({y:420.5},8).to({_off:true},77).wait(2));

	// Bitmap 3
	this.instance_6 = new lib.元件11("synched",0);
	this.instance_6.setTransform(338.4,781.5,1,1,0,0,0,117.5,27);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(21).to({_off:false},0).to({y:312.8,alpha:1},8).to({y:287},8).to({_off:true},82).wait(2));

	// Bitmap 8
	this.instance_7 = new lib.元件4("synched",0);
	this.instance_7.setTransform(361.3,559.4,0.147,0.147,0,0,0,257.4,361.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(10).to({_off:false},0).to({regX:257.5,scaleX:1.13,scaleY:1.13,alpha:1},6).to({scaleX:1,scaleY:1},6).to({_off:true},97).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-266.2,724,682.3);


(lib.Black_1_208_43967 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.Black_1_207_17118("synched",0);
	this.instance.setTransform(31.5,16,1,1,180,0,0,31.5,16);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:26},29,cjs.Ease.get(-1)).to({y:6},60,cjs.Ease.get(1)).to({y:16},30,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.Black_1_25_24283 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 179
	this.instance = new lib.Black_1_202_54712("synched",0);
	this.instance.setTransform(58.7,227.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(21).to({_off:false},0).to({y:195.5,alpha:1},7).to({y:207.5},7).to({y:203.5},7).wait(16));

	// Bitmap 178
	this.instance_1 = new lib.Black_1_203_21937("synched",0);
	this.instance_1.setTransform(60.5,71.6);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(14).to({_off:false},0).to({y:39.6,alpha:1},7).to({y:51.6},7).to({y:47.6},7).wait(23));

	// Bitmap 177
	this.instance_2 = new lib.Black_1_204_43367("synched",0);
	this.instance_2.setTransform(59.8,-65);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7).to({_off:false},0).to({y:-97,alpha:1},7).to({y:-85},7).to({y:-89},7).wait(30));

	// Bitmap 176
	this.instance_3 = new lib.Black_1_205_9457("synched",0);
	this.instance_3.setTransform(68.6,-201.5);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:-233.5,alpha:1},7).to({y:-221.5},7).to({y:-225.5},7).wait(37));

	// 图层 1
	this.instance_4 = new lib.Black_1_10_84841();
	this.instance_4.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_4.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_5 = new lib.Black_1_201_95505("synched",0);
	this.instance_5.setTransform(70.4,-482);

	this.instance_6 = new lib.Black_1_64_16743("synched",0);
	this.instance_6.setTransform(73.2,-479.7);

	this.instance_7 = new lib.Black_1_81_19452("synched",0);
	this.instance_7.setTransform(73.8,76.1);

	this.instance_8 = new lib.Black_1_269_89343();
	this.instance_8.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).wait(58));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_24_88526 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 2
	this.instance = new lib.Black_1_10_84841();
	this.instance.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(90));

	// Bitmap 175
	this.instance_1 = new lib.Black_1_197_87885("synched",0);
	this.instance_1.setTransform(64,337.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(43).to({_off:false},0).to({y:293.5,alpha:1},8).to({y:305.5},8).to({y:301.5},8).wait(23));

	// Bitmap 174
	this.instance_2 = new lib.Black_1_198_46228("synched",0);
	this.instance_2.setTransform(67.7,122.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35).to({_off:false},0).to({y:78.9,alpha:1},8).to({y:90.9},8).to({y:86.9},8).wait(31));

	// Bitmap 173
	this.instance_3 = new lib.Black_1_199_99093("synched",0);
	this.instance_3.setTransform(60.2,-72.5);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(27).to({_off:false},0).to({y:-116.5,alpha:1},8).to({y:-104.5},8).to({y:-108.5},8).wait(39));

	// Bitmap 172
	this.instance_4 = new lib.Black_1_200_76129("synched",0);
	this.instance_4.setTransform(68.2,-228);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(19).to({_off:false},0).to({y:-272,alpha:1},8).to({y:-260},8).to({y:-264},8).wait(47));

	// Bitmap 171
	this.instance_5 = new lib.Black_1_201_95505("synched",0);
	this.instance_5.setTransform(70.4,-540);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({y:-474,alpha:1},8).to({y:-486},8).to({y:-482},8).wait(66));

	// 补间 39
	this.instance_6 = new lib.Black_1_64_16743("synched",0);
	this.instance_6.setTransform(73.2,-385.7);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({y:-487.7,alpha:1},8).to({y:-475.7},8).to({y:-479.7},8).wait(66));

	// 补间 56
	this.instance_7 = new lib.Black_1_81_19452("synched",0);
	this.instance_7.setTransform(73.8,1088.4);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(8).to({_off:false},0).to({y:70.1},11).to({y:80.1},8).to({y:76.1},7).wait(56));

	// 图层 3
	this.instance_8 = new lib.Black_1_269_89343();
	this.instance_8.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(90));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_23_43309 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 2
	this.instance = new lib.Black_1_184_28870("synched",0);
	this.instance.setTransform(167.1,328);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).to({y:376,alpha:1},7).to({y:364},7).to({y:368},7).wait(63));

	// 图层 3
	this.instance_1 = new lib.Black_1_185_85872("synched",0);
	this.instance_1.setTransform(165.8,441.8,0.571,0.571);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(63));

	// 图层 4
	this.instance_2 = new lib.Black_1_186_27060("synched",0);
	this.instance_2.setTransform(2.5,173.7);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({y:221.7,alpha:1},7).to({y:209.7},7).to({y:213.7},7).wait(56));

	// 图层 5
	this.instance_3 = new lib.Black_1_187_79624("synched",0);
	this.instance_3.setTransform(1.2,287.5,0.571,0.571);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(56));

	// 图层 6
	this.instance_4 = new lib.Black_1_188_36522("synched",0);
	this.instance_4.setTransform(111.2,11.2);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({y:59.2,alpha:1},7).to({y:47.2},7).to({y:51.2},7).wait(49));

	// 图层 7
	this.instance_5 = new lib.Black_1_189_97190("synched",0);
	this.instance_5.setTransform(109.9,125,0.571,0.571);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(49));

	// 图层 8
	this.instance_6 = new lib.Black_1_196_66758("synched",0);
	this.instance_6.setTransform(-33.2,-141.3);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(28).to({_off:false},0).to({y:-93.3,alpha:1},7).to({y:-105.3},7).to({y:-101.3},7).wait(42));

	// 图层 9
	this.instance_7 = new lib.Black_1_191_65309("synched",0);
	this.instance_7.setTransform(-34.4,-27.7,0.571,0.571);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(28).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(42));

	// 图层 10
	this.instance_8 = new lib.Black_1_192_65942("synched",0);
	this.instance_8.setTransform(183.7,-295.4);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},0).to({y:-247.4,alpha:1},7).to({y:-259.4},7).to({y:-255.4},7).wait(35));

	// 图层 11
	this.instance_9 = new lib.Black_1_193_6656("synched",0);
	this.instance_9.setTransform(182.5,-181.6,0.571,0.571);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(35).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(35));

	// 图层 12
	this.instance_10 = new lib.Black_1_194_63283("synched",0);
	this.instance_10.setTransform(-43.5,-196.7);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({y:-246.7,alpha:1},7).to({y:-234.7},7).to({y:-238.7},7).wait(70));

	// 图层 13
	this.instance_11 = new lib.Black_1_195_48579("synched",0);
	this.instance_11.setTransform(72.2,164.4);
	this.instance_11.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).to({y:114.4,alpha:1},7).to({y:126.4},7).to({y:122.4},7).wait(70));

	// 图层 14
	this.instance_12 = new lib.Black_1_10_84841();
	this.instance_12.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_12.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_13 = new lib.Black_1_62_7813("synched",0);
	this.instance_13.setTransform(70.9,-481.5);

	this.instance_14 = new lib.Black_1_64_16743("synched",0);
	this.instance_14.setTransform(73.2,-479.7);

	this.instance_15 = new lib.Black_1_81_19452("synched",0);
	this.instance_15.setTransform(73.8,76.1);

	this.instance_16 = new lib.Black_1_269_89343();
	this.instance_16.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12}]}).wait(91));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_22_45368 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.Black_1_173_53002("synched",0);
	this.instance.setTransform(167,324.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).to({y:376.2,alpha:1},7).to({y:364.2},7).to({y:368.2},7).wait(101));

	// 图层 6
	this.instance_1 = new lib.Black_1_174_65187("synched",0);
	this.instance_1.setTransform(165.8,441.8,0.571,0.571);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(101));

	// 图层 7
	this.instance_2 = new lib.Black_1_175_65382("synched",0);
	this.instance_2.setTransform(-84.6,193.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({y:245.6,alpha:1},7).to({y:233.6},7).to({y:237.6},7).wait(94));

	// 图层 8
	this.instance_3 = new lib.Black_1_176_51607("synched",0);
	this.instance_3.setTransform(-85.8,311.2,0.571,0.571);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(94));

	// 图层 9
	this.instance_4 = new lib.Black_1_177_18159("synched",0);
	this.instance_4.setTransform(241.2,129.4);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({y:181.4,alpha:1},7).to({y:169.4},7).to({y:173.4},7).wait(87));

	// 图层 10
	this.instance_5 = new lib.Black_1_178_43551("synched",0);
	this.instance_5.setTransform(240,247.1,0.571,0.571);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(87));

	// 图层 3
	this.instance_6 = new lib.Black_1_171_21976("synched",0);
	this.instance_6.setTransform(50.7,9.4);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(28).to({_off:false},0).to({y:61.4,alpha:1},7).to({y:49.4},7).to({y:53.4},7).wait(80));

	// 图层 4
	this.instance_7 = new lib.Black_1_172_12734("synched",0);
	this.instance_7.setTransform(49.5,127,0.571,0.571);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(28).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(80));

	// 图层 11
	this.instance_8 = new lib.Black_1_179_6462("synched",0);
	this.instance_8.setTransform(-33.2,-145.3);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},0).to({y:-93.3,alpha:1},7).to({y:-105.3},7).to({y:-101.3},7).wait(73));

	// 图层 12
	this.instance_9 = new lib.Black_1_180_17144("synched",0);
	this.instance_9.setTransform(-34.4,-27.7,0.571,0.571);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(35).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(73));

	// 图层 13
	this.instance_10 = new lib.Black_1_181_90137("synched",0);
	this.instance_10.setTransform(183.7,-299.2);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(42).to({_off:false},0).to({y:-247.2,alpha:1},7).to({y:-259.2},7).to({y:-255.2},7).wait(66));

	// 图层 14
	this.instance_11 = new lib.Black_1_182_76766("synched",0);
	this.instance_11.setTransform(182.5,-181.6,0.571,0.571);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(42).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(66));

	// 图层 15
	this.instance_12 = new lib.Black_1_183_52281("synched",0);
	this.instance_12.setTransform(54.5,117.7);
	this.instance_12.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({y:65.7,alpha:1},7).to({y:77.7},7).to({y:73.7},7).wait(108));

	// 图层 1
	this.instance_13 = new lib.Black_1_10_84841();
	this.instance_13.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_13.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_14 = new lib.Black_1_62_7813("synched",0);
	this.instance_14.setTransform(70.9,-481.5);

	this.instance_15 = new lib.Black_1_64_16743("synched",0);
	this.instance_15.setTransform(73.2,-479.7);

	this.instance_16 = new lib.Black_1_81_19452("synched",0);
	this.instance_16.setTransform(73.8,76.1);

	this.instance_17 = new lib.Black_1_269_89343();
	this.instance_17.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13}]}).wait(129));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_21_7884 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.Black_1_159_27383("synched",0);
	this.instance.setTransform(167,330.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).to({y:376.2,alpha:1},7).to({y:364.2},7).to({y:368.2},7).wait(95));

	// 图层 6
	this.instance_1 = new lib.Black_1_160_40828("synched",0);
	this.instance_1.setTransform(165.8,441.8,0.571,0.571);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(95));

	// 图层 7
	this.instance_2 = new lib.Black_1_161_76145("synched",0);
	this.instance_2.setTransform(-84.6,199.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({y:245.6,alpha:1},7).to({y:233.6},7).to({y:237.6},7).wait(88));

	// 图层 8
	this.instance_3 = new lib.Black_1_162_46198("synched",0);
	this.instance_3.setTransform(-85.8,311.2,0.571,0.571);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(88));

	// 图层 9
	this.instance_4 = new lib.Black_1_163_43090("synched",0);
	this.instance_4.setTransform(241.2,135.4);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({y:181.4,alpha:1},7).to({y:169.4},7).to({y:173.4},7).wait(81));

	// 图层 10
	this.instance_5 = new lib.Black_1_164_54926("synched",0);
	this.instance_5.setTransform(240,247.1,0.571,0.571);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(81));

	// 图层 3
	this.instance_6 = new lib.Black_1_157_50042("synched",0);
	this.instance_6.setTransform(50.7,15.4);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(28).to({_off:false},0).to({y:61.4,alpha:1},7).to({y:49.4},7).to({y:53.4},7).wait(74));

	// 图层 4
	this.instance_7 = new lib.Black_1_158_89953("synched",0);
	this.instance_7.setTransform(49.5,127,0.571,0.571);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(28).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(74));

	// 图层 11
	this.instance_8 = new lib.Black_1_165_58237("synched",0);
	this.instance_8.setTransform(-33.2,-139.3);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},0).to({y:-93.3,alpha:1},7).to({y:-105.3},7).to({y:-101.3},7).wait(67));

	// 图层 12
	this.instance_9 = new lib.Black_1_166_52384("synched",0);
	this.instance_9.setTransform(-34.4,-27.7,0.571,0.571);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(35).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(67));

	// 图层 13
	this.instance_10 = new lib.Black_1_167_96946("synched",0);
	this.instance_10.setTransform(183.7,-293.2);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(42).to({_off:false},0).to({y:-247.2,alpha:1},7).to({y:-259.2},7).to({y:-255.2},7).wait(60));

	// 图层 14
	this.instance_11 = new lib.Black_1_168_30297("synched",0);
	this.instance_11.setTransform(182.5,-181.6,0.571,0.571);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(42).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(60));

	// 图层 15
	this.instance_12 = new lib.Black_1_169_97353("synched",0);
	this.instance_12.setTransform(-31.9,-253.8);
	this.instance_12.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).to({y:-297.8,alpha:1},7).to({y:-285.8},7).to({y:-289.8},7).wait(102));

	// 图层 16
	this.instance_13 = new lib.Black_1_170_50380("synched",0);
	this.instance_13.setTransform(54.5,134.7);
	this.instance_13.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).to({y:90.7,alpha:1},7).to({y:102.7},7).to({y:98.7},7).wait(102));

	// 图层 1
	this.instance_14 = new lib.Black_1_10_84841();
	this.instance_14.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_14.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_15 = new lib.Black_1_62_7813("synched",0);
	this.instance_15.setTransform(70.9,-481.5);

	this.instance_16 = new lib.Black_1_64_16743("synched",0);
	this.instance_16.setTransform(73.2,-479.7);

	this.instance_17 = new lib.Black_1_81_19452("synched",0);
	this.instance_17.setTransform(73.8,76.1);

	this.instance_18 = new lib.Black_1_269_89343();
	this.instance_18.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14}]}).wait(123));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_20_63928 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 3
	this.instance = new lib.Black_1_146_21704("synched",0);
	this.instance.setTransform(167,330.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(7).to({_off:false},0).to({y:376.2,alpha:1},7).to({y:364.2},7).to({y:368.2},7).wait(44));

	// 图层 4
	this.instance_1 = new lib.Black_1_147_87448("synched",0);
	this.instance_1.setTransform(165.8,441.8,0.571,0.571);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(44));

	// 图层 5
	this.instance_2 = new lib.Black_1_148_6017("synched",0);
	this.instance_2.setTransform(2.4,175.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({y:221.9,alpha:1},7).to({y:209.9},7).to({y:213.9},7).wait(37));

	// 图层 6
	this.instance_3 = new lib.Black_1_149_28096("synched",0);
	this.instance_3.setTransform(1.2,287.5,0.571,0.571);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(37));

	// 图层 7
	this.instance_4 = new lib.Black_1_150_85962("synched",0);
	this.instance_4.setTransform(111.1,13.3);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({y:59.3,alpha:1},7).to({y:47.3},7).to({y:51.3},7).wait(30));

	// 图层 8
	this.instance_5 = new lib.Black_1_151_18290("synched",0);
	this.instance_5.setTransform(109.9,125,0.571,0.571);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(30));

	// 图层 9
	this.instance_6 = new lib.Black_1_152_84579("synched",0);
	this.instance_6.setTransform(-33.2,-139.3);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(28).to({_off:false},0).to({y:-93.3,alpha:1},7).to({y:-105.3},7).to({y:-101.3},7).wait(23));

	// 图层 10
	this.instance_7 = new lib.Black_1_153_78517("synched",0);
	this.instance_7.setTransform(-34.4,-27.7,0.571,0.571);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(28).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(23));

	// 图层 11
	this.instance_8 = new lib.Black_1_154_30109("synched",0);
	this.instance_8.setTransform(183.7,-293.2);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},0).to({y:-247.2,alpha:1},7).to({y:-259.2},7).to({y:-255.2},7).wait(16));

	// 图层 12
	this.instance_9 = new lib.Black_1_155_67695("synched",0);
	this.instance_9.setTransform(182.5,-181.6,0.571,0.571);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(35).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(16));

	// 图层 13
	this.instance_10 = new lib.Black_1_156_16419("synched",0);
	this.instance_10.setTransform(54.5,101.7);
	this.instance_10.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).to({y:65.7,alpha:1},7).to({y:77.7},7).to({y:73.7},7).wait(51));

	// 图层 1
	this.instance_11 = new lib.Black_1_10_84841();
	this.instance_11.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_11.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_12 = new lib.Black_1_62_7813("synched",0);
	this.instance_12.setTransform(70.9,-481.5);

	this.instance_13 = new lib.Black_1_64_16743("synched",0);
	this.instance_13.setTransform(73.2,-479.7);

	this.instance_14 = new lib.Black_1_81_19452("synched",0);
	this.instance_14.setTransform(73.8,76.1);

	this.instance_15 = new lib.Black_1_269_89343();
	this.instance_15.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11}]}).wait(72));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_19_74881 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 3
	this.instance = new lib.Black_1_126_54711("synched",0);
	this.instance.setTransform(-31.9,-253.8);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:-297.8,alpha:1},7).to({y:-285.8},7).to({y:-289.8},7).wait(102));

	// 图层 4
	this.instance_1 = new lib.Black_1_127_67389("synched",0);
	this.instance_1.setTransform(167,320.2);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(7).to({_off:false},0).to({y:376.2,alpha:1},7).to({y:364.2},7).to({y:368.2},7).wait(95));

	// 图层 5
	this.instance_2 = new lib.Black_1_128_70427("synched",0);
	this.instance_2.setTransform(-80.9,298.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(14).to({_off:false},0).to({y:354.6,alpha:1},7).to({y:342.6},7).to({y:346.6},7).wait(88));

	// 图层 6
	this.instance_3 = new lib.Black_1_129_68320("synched",0);
	this.instance_3.setTransform(1.7,167.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(21).to({_off:false},0).to({y:223.1,alpha:1},7).to({y:211.1},7).to({y:215.1},7).wait(81));

	// 图层 7
	this.instance_4 = new lib.Black_1_130_15256("synched",0);
	this.instance_4.setTransform(214.5,152.6);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(28).to({_off:false},0).to({y:208.6,alpha:1},7).to({y:196.6},7).to({y:200.6},7).wait(74));

	// 图层 8
	this.instance_5 = new lib.Black_1_131_12519("synched",0);
	this.instance_5.setTransform(111.1,3.3);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(35).to({_off:false},0).to({y:59.3,alpha:1},7).to({y:47.3},7).to({y:51.3},7).wait(67));

	// 图层 9
	this.instance_6 = new lib.Black_1_132_97893("synched",0);
	this.instance_6.setTransform(-77.7,-11.6);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(42).to({_off:false},0).to({y:44.4,alpha:1},7).to({y:32.4},7).to({y:36.4},7).wait(60));

	// 图层 10
	this.instance_7 = new lib.Black_1_133_55344("synched",0);
	this.instance_7.setTransform(-33.2,-149.3);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(49).to({_off:false},0).to({y:-93.3,alpha:1},7).to({y:-105.3},7).to({y:-101.3},7).wait(53));

	// 图层 11
	this.instance_8 = new lib.Black_1_134_87334("synched",0);
	this.instance_8.setTransform(150.6,-152.4);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(56).to({_off:false},0).to({y:-96.4,alpha:1},7).to({y:-108.4},7).to({y:-104.4},7).wait(46));

	// 图层 12
	this.instance_9 = new lib.Black_1_135_33386("synched",0);
	this.instance_9.setTransform(183.7,-303.2);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(63).to({_off:false},0).to({y:-247.2,alpha:1},7).to({y:-259.2},7).to({y:-255.2},7).wait(39));

	// 图层 13
	this.instance_10 = new lib.Black_1_136_79199("synched",0);
	this.instance_10.setTransform(165.8,439.5,0.487,0.488);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(7).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,y:439.4,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1,y:439.5},7).wait(95));

	// 图层 14
	this.instance_11 = new lib.Black_1_137_64733("synched",0);
	this.instance_11.setTransform(-82.1,417.9,0.487,0.488);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(14).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(88));

	// 图层 15
	this.instance_12 = new lib.Black_1_138_48841("synched",0);
	this.instance_12.setTransform(1.2,285.2,0.487,0.488);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(21).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94,y:285.1},7).to({scaleX:1,scaleY:1,y:285.2},7).wait(81));

	// 图层 16
	this.instance_13 = new lib.Black_1_139_2908("synched",0);
	this.instance_13.setTransform(213.3,271.9,0.487,0.488);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(28).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(74));

	// 图层 17
	this.instance_14 = new lib.Black_1_140_26030("synched",0);
	this.instance_14.setTransform(109.9,123.9,0.487,0.488);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(35).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(67));

	// 图层 18
	this.instance_15 = new lib.Black_1_141_19667("synched",0);
	this.instance_15.setTransform(-78.9,109,0.487,0.488);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(42).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94,y:108.9},7).to({scaleX:1,scaleY:1,y:109},7).wait(60));

	// 图层 19
	this.instance_16 = new lib.Black_1_142_83909("synched",0);
	this.instance_16.setTransform(-34.4,-27.7,0.571,0.571);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(49).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(53));

	// 图层 20
	this.instance_17 = new lib.Black_1_143_31549("synched",0);
	this.instance_17.setTransform(149.4,-30.7,0.571,0.571);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(56).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(46));

	// 图层 21
	this.instance_18 = new lib.Black_1_144_77976("synched",0);
	this.instance_18.setTransform(182.5,-181.6,0.571,0.571);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(63).to({_off:false},0).to({scaleX:1.14,scaleY:1.14,alpha:1},7).to({scaleX:0.94,scaleY:0.94},7).to({scaleX:1,scaleY:1},7).wait(39));

	// 图层 22
	this.instance_19 = new lib.Black_1_145_52321("synched",0);
	this.instance_19.setTransform(54.5,128.7);
	this.instance_19.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).to({y:90.7,alpha:1},7).to({y:102.7},7).to({y:98.7},7).wait(102));

	// 图层 1
	this.instance_20 = new lib.Black_1_10_84841();
	this.instance_20.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_20.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_21 = new lib.Black_1_62_7813("synched",0);
	this.instance_21.setTransform(70.9,-481.5);

	this.instance_22 = new lib.Black_1_64_16743("synched",0);
	this.instance_22.setTransform(73.2,-479.7);

	this.instance_23 = new lib.Black_1_81_19452("synched",0);
	this.instance_23.setTransform(73.8,76.1);

	this.instance_24 = new lib.Black_1_269_89343();
	this.instance_24.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20}]}).wait(123));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_18_48323 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 100
	this.instance = new lib.Black_1_120_38956("synched",0);
	this.instance.setTransform(78.6,318.6);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(40).to({_off:false},0).to({y:274.6,alpha:1},8).to({y:286.6},8).to({y:282.6},8).wait(14));

	// Bitmap 99
	this.instance_1 = new lib.Black_1_121_90451("synched",0);
	this.instance_1.setTransform(73.1,177.8);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(32).to({_off:false},0).to({y:133.8,alpha:1},8).to({y:145.8},8).to({y:141.8},8).wait(22));

	// Bitmap 98
	this.instance_2 = new lib.Black_1_122_85122("synched",0);
	this.instance_2.setTransform(78.6,-61.3);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(16).to({_off:false},0).to({y:-105.3,alpha:1},8).to({y:-93.3},8).to({y:-97.3},8).wait(38));

	// Bitmap 97
	this.instance_3 = new lib.Black_1_123_71907("synched",0);
	this.instance_3.setTransform(68,-0.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({y:59.9,alpha:1},8).to({y:47.9},8).to({y:51.9},8).wait(30));

	// Bitmap 96
	this.instance_4 = new lib.Black_1_124_86865("synched",0);
	this.instance_4.setTransform(67.5,-242.3);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(8).to({_off:false},0).to({y:-182.3,alpha:1},8).to({y:-194.3},8).to({y:-190.3},8).wait(46));

	// Bitmap 95
	this.instance_5 = new lib.Black_1_125_88622("synched",0);
	this.instance_5.setTransform(74.1,-267.3,0.472,0.472);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleX:1.04,scaleY:1.04,alpha:1},8).to({scaleX:0.99,scaleY:0.99},8).to({scaleX:1,scaleY:1},8).wait(54));

	// 图层 1
	this.instance_6 = new lib.Black_1_10_84841();
	this.instance_6.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_6.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_7 = new lib.Black_1_62_7813("synched",0);
	this.instance_7.setTransform(70.9,-481.5);

	this.instance_8 = new lib.Black_1_64_16743("synched",0);
	this.instance_8.setTransform(73.2,-479.7);

	this.instance_9 = new lib.Black_1_81_19452("synched",0);
	this.instance_9.setTransform(73.8,76.1);

	this.instance_10 = new lib.Black_1_269_89343();
	this.instance_10.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]}).wait(78));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_16_88162 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Bitmap 94
	this.instance = new lib.Black_1_82_98524("synched",0);
	this.instance.setTransform(73.1,193.4);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({_off:false},0).to({y:131.4,alpha:1},8).to({y:143.4},8).to({y:139.4},8).wait(37));

	// Bitmap 93
	this.instance_1 = new lib.Black_1_83_18013("synched",0);
	this.instance_1.setTransform(68,13.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16).to({_off:false},0).to({y:61.9,alpha:1},8).to({y:47.9},8).to({y:51.9},8).wait(45));

	// Bitmap 92
	this.instance_2 = new lib.Black_1_118_14211("synched",0);
	this.instance_2.setTransform(78.6,-45.3);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(8).to({_off:false},0).to({y:-107.3,alpha:1},8).to({y:-95.3},8).to({y:-99.3},8).wait(53));

	// Bitmap 91
	this.instance_3 = new lib.Black_1_119_5455("synched",0);
	this.instance_3.setTransform(68.1,-228.3);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:-180.3,alpha:1},8).to({y:-194.3},8).to({y:-190.3},8).wait(61));

	// 图层 1
	this.instance_4 = new lib.Black_1_10_84841();
	this.instance_4.setTransform(-214.8,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance_4.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.instance_5 = new lib.Black_1_62_7813("synched",0);
	this.instance_5.setTransform(70.9,-481.5);

	this.instance_6 = new lib.Black_1_64_16743("synched",0);
	this.instance_6.setTransform(73.2,-479.7);

	this.instance_7 = new lib.Black_1_76_69839("synched",0);
	this.instance_7.setTransform(73.8,-267.3);

	this.instance_8 = new lib.Black_1_81_19452("synched",0);
	this.instance_8.setTransform(73.8,76.1);

	this.instance_9 = new lib.Black_1_269_89343();
	this.instance_9.setTransform(-454,-592.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).wait(85));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-454,-592.5,908,1185);


(lib.Black_1_15_38994 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 3
	this.instance = new lib.Black_1_10_84841();
	this.instance.setTransform(-914.2,-520.8,1,1,0,0,0,87.8,53.7);
	this.instance.shadow = new cjs.Shadow("rgba(203,10,12,1)",0,0,8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(157));

	// Bitmap 84
	this.instance_1 = new lib.Black_1_62_7813("synched",0);
	this.instance_1.setTransform(-628.5,-625.5);
	this.instance_1.alpha = 0.219;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({y:-473.4,alpha:1},8).to({y:-485.4},8).to({y:-481.4},8).wait(133));

	// Bitmap 85
	this.instance_2 = new lib.Black_1_64_16743("synched",0);
	this.instance_2.setTransform(-626.2,-329.6);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({y:-487.6,alpha:1},8).to({y:-475.6},8).to({y:-479.6},8).wait(133));

	// Bitmap 89
	this.instance_3 = new lib.Black_1_26_7810("synched",0);
	this.instance_3.setTransform(-632.2,432.3);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(64).to({_off:false},0).to({y:348.3,alpha:1},8).to({y:362.3},8).to({y:358.3},8).wait(69));

	// Bitmap 88
	this.instance_4 = new lib.Black_1_36_15715("synched",0);
	this.instance_4.setTransform(-632.2,240);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(56).to({_off:false},0).to({y:156,alpha:1},8).to({y:170},8).to({y:166},8).wait(77));

	// Bitmap 87
	this.instance_5 = new lib.Black_1_53_2951("synched",0);
	this.instance_5.setTransform(-637.2,49.6);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(48).to({_off:false},0).to({y:-34.4,alpha:1},8).to({y:-20.4},8).to({y:-24.4},8).wait(85));

	// Bitmap 86
	this.instance_6 = new lib.Black_1_58_7752("synched",0);
	this.instance_6.setTransform(-670.7,-47.5);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(40).to({_off:false},0).to({y:-131.5,alpha:1},8).to({y:-117.5},8).to({y:-121.5},8).wait(93));

	// Bitmap 83
	this.instance_7 = new lib.Black_1_66_37850("synched",0);
	this.instance_7.setTransform(-630.5,-228.3);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(32).to({_off:false},0).to({y:-184.3,alpha:1},8).to({y:-194.3},8).to({y:-190.3},8).wait(101));

	// Bitmap 45
	this.instance_8 = new lib.Black_1_76_69839("synched",0);
	this.instance_8.setTransform(-625.6,-267.3,0.448,0.448);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(24).to({_off:false},0).to({scaleX:1.07,scaleY:1.08,alpha:1},8).to({scaleX:0.97,scaleY:0.97},8).to({scaleX:1,scaleY:1},8).wait(109));

	// Bitmap 90
	this.instance_9 = new lib.Black_1_81_19452("synched",0);
	this.instance_9.setTransform(-625.6,1082.4);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(8).to({_off:false},0).to({y:68.2},12).to({y:80.2},8).to({y:76.2},8).wait(121));

	// 图层 1
	this.instance_10 = new lib.Black_1_269_89343();
	this.instance_10.setTransform(-1153.4,-592.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(157));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1153.4,-654.5,908,1247.1);


// stage content:
(lib.content = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{p1:2,p2:88,p3:178,p4:297,p5:376,p6:449,p7:517,p8:618,p19:1515,p9:687,p10:786,p11:833,p12:908,p13:1015,p14:1097,p15:1187,p16:1273,p17:1351,p18:1445});

	// timeline functions:
	this.frame_0 = function(obj) {
		this.stop();
        afc("PN3","d","none");
	}
	this.frame_1 = function(num) {
		this.gotoAndPlay("p"+num);
	}
	this.frame_87 = function() {
		this.stop();
	}
	this.frame_177 = function() {
		this.stop();
	}
	this.frame_296 = function() {
		this.stop();
	}
	this.frame_375 = function() {
		this.stop();
	}
	this.frame_448 = function() {
		this.stop();
	}
	this.frame_516 = function() {
		this.stop();
	}
	this.frame_617 = function() {
		this.stop();
	}
	this.frame_686 = function() {
		this.stop();
	}
	this.frame_785 = function() {
		this.stop();
	}
	this.frame_832 = function() {
		this.stop();
	}
	this.frame_907 = function() {
		this.stop();
	}
	this.frame_1014 = function() {
		this.stop();
	}
	this.frame_1096 = function() {
		this.stop();
	}
	this.frame_1186 = function() {
		this.stop();
	}
	this.frame_1272 = function() {
		this.stop();
	}
	this.frame_1350 = function() {
		this.stop();
	}
	this.frame_1444 = function() {
		this.stop();
	}
	this.frame_1514 = function() {
		this.stop();
	}
	this.frame_1620 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(86).call(this.frame_87).wait(90).call(this.frame_177).wait(119).call(this.frame_296).wait(79).call(this.frame_375).wait(73).call(this.frame_448).wait(68).call(this.frame_516).wait(101).call(this.frame_617).wait(69).call(this.frame_686).wait(99).call(this.frame_785).wait(47).call(this.frame_832).wait(75).call(this.frame_907).wait(107).call(this.frame_1014).wait(82).call(this.frame_1096).wait(90).call(this.frame_1186).wait(86).call(this.frame_1272).wait(78).call(this.frame_1350).wait(94).call(this.frame_1444).wait(70).call(this.frame_1514).wait(106).call(this.frame_1620).wait(1));

	// 图层 1
	this.instance = new lib.Bitmap9();
	this.instance.setTransform(-24.7,-6.5);

	this.instance_1 = new lib.jiantou_mc();
	this.instance_1.setTransform(360,1126,1,1,0,0,0,31.5,16);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},88).to({state:[]},599).to({state:[{t:this.instance_1}]},933).wait(1));

	// jt
	this.instance_2 = new lib.jiantou_mc();
	this.instance_2.setTransform(360,1126,1,1,0,0,0,31.5,16);
	this.instance_2._off = true;

	this.instance_3 = new lib.Bitmap9();
	this.instance_3.setTransform(-24.7,-6.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},87).to({state:[]},1).to({state:[{t:this.instance_2}]},89).to({state:[]},1).to({state:[{t:this.instance_2}]},118).to({state:[]},1).to({state:[{t:this.instance_2}]},78).to({state:[]},1).to({state:[{t:this.instance_2}]},72).to({state:[]},1).to({state:[{t:this.instance_2}]},67).to({state:[]},1).to({state:[{t:this.instance_2}]},100).to({state:[]},1).to({state:[{t:this.instance_2}]},68).to({state:[]},1).to({state:[{t:this.instance_3}]},828).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(87).to({_off:false},0).to({_off:true},1).wait(89).to({_off:false},0).to({_off:true},1).wait(118).to({_off:false},0).to({_off:true},1).wait(78).to({_off:false},0).to({_off:true},1).wait(72).to({_off:false},0).to({_off:true},1).wait(67).to({_off:false},0).to({_off:true},1).wait(100).to({_off:false},0).to({_off:true},1).wait(68).to({_off:false},0).to({_off:true},1).wait(934));

	// jt
	this.instance_4 = new lib.元件1("synched",0,false);
	this.instance_4.setTransform(367,572.5,1,1,0,0,0,362,460.4);

	this.instance_5 = new lib.元件12("synched",0);
	this.instance_5.setTransform(1070.8,602.8,1,1,0,0,0,1070.8,560.9);

	this.instance_6 = new lib.元件25("synched",0,false);
	this.instance_6.setTransform(362,567.2,1,1,0,0,0,362,525.3);

	this.instance_7 = new lib.元件27("synched",0,false);
	this.instance_7.setTransform(362,567.2,1,1,0,0,0,362,525.3);

	this.instance_8 = new lib.元件29("synched",0);
	this.instance_8.setTransform(357.3,97.6,1,1,0,0,0,173,29);

	this.instance_9 = new lib.元件31("synched",0,false);
	this.instance_9.setTransform(362,471.2,1,1,0,0,0,362,429.3);

	this.instance_10 = new lib.元件33("synched",0,false);
	this.instance_10.setTransform(362,541,1,1,0,0,0,362,499.1);

	this.instance_11 = new lib.元件39("synched",0,false);
	this.instance_11.setTransform(362,486,1,1,0,0,0,362,444.1);

	this.instance_12 = new lib.Black_1_208_43967();
	this.instance_12.setTransform(360,1126,1,1,0,0,0,31.5,16);
	this.instance_12._off = true;

	this.instance_13 = new lib.元件40("synched",0,false);
	this.instance_13.setTransform(355.8,582,1,1,0,0,0,305,300.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},88).to({state:[{t:this.instance_5}]},90).to({state:[{t:this.instance_6}]},119).to({state:[{t:this.instance_7}]},79).to({state:[{t:this.instance_9},{t:this.instance_8}]},73).to({state:[{t:this.instance_10}]},68).to({state:[{t:this.instance_11}]},101).to({state:[]},69).to({state:[{t:this.instance_12}]},98).to({state:[]},1).to({state:[{t:this.instance_12}]},46).to({state:[]},1).to({state:[{t:this.instance_12}]},74).to({state:[]},1).to({state:[{t:this.instance_12}]},106).to({state:[]},1).to({state:[{t:this.instance_12}]},81).to({state:[]},1).to({state:[{t:this.instance_12}]},89).to({state:[]},1).to({state:[{t:this.instance_12}]},85).to({state:[]},1).to({state:[{t:this.instance_12}]},77).to({state:[]},1).to({state:[{t:this.instance_12}]},93).to({state:[]},1).to({state:[{t:this.instance_12}]},69).to({state:[{t:this.instance_13}]},1).wait(106));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(785).to({_off:false},0).to({_off:true},1).wait(46).to({_off:false},0).to({_off:true},1).wait(74).to({_off:false},0).to({_off:true},1).wait(106).to({_off:false},0).to({_off:true},1).wait(81).to({_off:false},0).to({_off:true},1).wait(89).to({_off:false},0).to({_off:true},1).wait(85).to({_off:false},0).to({_off:true},1).wait(77).to({_off:false},0).to({_off:true},1).wait(93).to({_off:false},0).to({_off:true},1).wait(69).to({_off:false},0).to({_off:true},1).wait(106));

	// content
	this.instance_14 = new lib.元件1ss("synched",0,false);
	this.instance_14.setTransform(360.7,579.4,1,1,0,0,0,360,579);

	this.instance_15 = new lib.bgpng复制();

	this.instance_16 = new lib.Black_1_15_38994("synched",0,false);
	this.instance_16.setTransform(988.3,579);

	this.instance_17 = new lib.Black_1_16_88162("synched",0,false);
	this.instance_17.setTransform(288.9,579.1);

	this.instance_18 = new lib.Black_1_18_48323("synched",0,false);
	this.instance_18.setTransform(288.9,579.1);

	this.instance_19 = new lib.Black_1_19_74881("synched",0,false);
	this.instance_19.setTransform(288.9,579.1);

	this.instance_20 = new lib.Black_1_20_63928("synched",0,false);
	this.instance_20.setTransform(288.9,579.1);

	this.instance_21 = new lib.Black_1_21_7884("synched",0,false);
	this.instance_21.setTransform(288.9,579.1);

	this.instance_22 = new lib.Black_1_22_45368("synched",0);
	this.instance_22.setTransform(288.9,579.1);

	this.instance_23 = new lib.Black_1_23_43309("synched",0,false);
	this.instance_23.setTransform(288.9,579.1);

	this.instance_24 = new lib.Black_1_24_88526("synched",0,false);
	this.instance_24.setTransform(288.9,579.1);

	this.instance_25 = new lib.Black_1_25_24283("synched",0,false);
	this.instance_25.setTransform(288.9,579.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14}]},2).to({state:[{t:this.instance_15}]},86).to({state:[{t:this.instance_16}]},599).to({state:[{t:this.instance_17}]},99).to({state:[{t:this.instance_18}]},47).to({state:[{t:this.instance_19}]},75).to({state:[{t:this.instance_20}]},107).to({state:[{t:this.instance_21}]},82).to({state:[{t:this.instance_22}]},90).to({state:[{t:this.instance_23}]},86).to({state:[{t:this.instance_24}]},78).to({state:[{t:this.instance_25}]},94).to({state:[{t:this.instance_15}]},70).wait(106));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;
(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 640,
	height: 1008,
	fps: 24,
	color: "#333333",
	manifest: [
		{src:"images/_1.png", id:"_1"},
		{src:"images/_2.png", id:"_2"},
		{src:"images/_3.png", id:"_3"},
		{src:"images/gif0001.png", id:"gif0001"},
		{src:"images/gif00010.png", id:"gif00010"},
		{src:"images/gif00012.png", id:"gif00012"},
		{src:"images/gif00013.png", id:"gif00013"},
		{src:"images/gif00014.png", id:"gif00014"},
		{src:"images/gif00015.png", id:"gif00015"},
		{src:"images/gif0002.png", id:"gif0002"},
		{src:"images/gif0003.png", id:"gif0003"},
		{src:"images/gif0004.png", id:"gif0004"},
		{src:"images/gif0005.png", id:"gif0005"},
		{src:"images/gif0006.png", id:"gif0006"},
		{src:"images/gif0007.png", id:"gif0007"},
		{src:"images/gif0008.png", id:"gif0008"},
		{src:"images/gif0009.png", id:"gif0009"},
		{src:"images/jiantou.png", id:"jiantou"},
		{src:"images/leaf_1_136_64483.png", id:"leaf_1_136_64483"},
		{src:"images/p10_1.png", id:"p10_1"},
		{src:"images/p10_2.png", id:"p10_2"},
		{src:"images/p11_1.png", id:"p11_1"},
		{src:"images/p11_2.png", id:"p11_2"},
		{src:"images/p11_3.png", id:"p11_3"},
		{src:"images/p12_1.png", id:"p12_1"},
		{src:"images/p12_2.png", id:"p12_2"},
		{src:"images/p12_3.png", id:"p12_3"},
		{src:"images/p12_4.png", id:"p12_4"},
		{src:"images/p12_5.png", id:"p12_5"},
		{src:"images/p13_1.jpg", id:"p13_1"},
		{src:"images/p13_2.png", id:"p13_2"},
		{src:"images/p14_1.png", id:"p14_1"},
		{src:"images/p14_3.png", id:"p14_3"},
		{src:"images/p15_1.png", id:"p15_1"},
		{src:"images/p15_2.png", id:"p15_2"},
		{src:"images/p17_1.png", id:"p17_1"},
		{src:"images/p17_10.png", id:"p17_10"},
		{src:"images/p17_2.png", id:"p17_2"},
		{src:"images/p17_3.png", id:"p17_3"},
		{src:"images/p17_5.png", id:"p17_5"},
		{src:"images/p17_6.png", id:"p17_6"},
		{src:"images/p17_8.png", id:"p17_8"},
		{src:"images/p17_9.png", id:"p17_9"},
		{src:"images/p19_1.png", id:"p19_1"},
		{src:"images/p19_2.png", id:"p19_2"},
		{src:"images/p1_1.png", id:"p1_1"},
		{src:"images/p1_4.png", id:"p1_4"},
		{src:"images/p1_5.png", id:"p1_5"},
		{src:"images/p1_a.png", id:"p1_a"},
		{src:"images/p20_1.jpg", id:"p20_1"},
		{src:"images/p20_2.png", id:"p20_2"},
		{src:"images/p20_3.png", id:"p20_3"},
		{src:"images/p20_4.png", id:"p20_4"},
		{src:"images/p20_5.png", id:"p20_5"},
		{src:"images/p20_6.png", id:"p20_6"},
		{src:"images/p21_1.jpg", id:"p21_1"},
		{src:"images/p21_2.jpg", id:"p21_2"},
		{src:"images/p21_2_1.png", id:"p21_2_1"},
		{src:"images/p21_3.png", id:"p21_3"},
		{src:"images/p21_4.png", id:"p21_4"},
		{src:"images/p21_5.png", id:"p21_5"},
		{src:"images/p22_1.png", id:"p22_1"},
		{src:"images/p22_2.png", id:"p22_2"},
		{src:"images/p22_3.png", id:"p22_3"},
		{src:"images/p22_4.png", id:"p22_4"},
		{src:"images/p22_6.png", id:"p22_6"},
		{src:"images/p22_8.png", id:"p22_8"},
		{src:"images/p22_9.png", id:"p22_9"},
		{src:"images/p23_1.png", id:"p23_1"},
		{src:"images/p23_2.png", id:"p23_2"},
		{src:"images/p23_3.png", id:"p23_3"},
		{src:"images/p23_4.png", id:"p23_4"},
		{src:"images/p23_5.png", id:"p23_5"},
		{src:"images/p23_6.png", id:"p23_6"},
		{src:"images/p24_1.png", id:"p24_1"},
		{src:"images/p24_2.png", id:"p24_2"},
		{src:"images/p24_3.png", id:"p24_3"},
		{src:"images/p24_4.png", id:"p24_4"},
		{src:"images/p24_5.png", id:"p24_5"},
		{src:"images/p24_6.png", id:"p24_6"},
		{src:"images/p25_1.jpg", id:"p25_1"},
		{src:"images/p25_2.png", id:"p25_2"},
		{src:"images/p25_3.png", id:"p25_3"},
		{src:"images/p25_4.png", id:"p25_4"},
		{src:"images/p25_5.png", id:"p25_5"},
		{src:"images/p25_6.png", id:"p25_6"},
		{src:"images/p25_7.png", id:"p25_7"},
		{src:"images/p25_8.png", id:"p25_8"},
		{src:"images/p28_1.png", id:"p28_1"},
		{src:"images/p28_2.png", id:"p28_2"},
		{src:"images/p28_3.png", id:"p28_3"},
		{src:"images/p28_4.png", id:"p28_4"},
		{src:"images/p28_5.png", id:"p28_5"},
		{src:"images/p28_6.png", id:"p28_6"},
		{src:"images/p29_1.png", id:"p29_1"},
		{src:"images/p29_2.png", id:"p29_2"},
		{src:"images/p29_3.png", id:"p29_3"},
		{src:"images/p29_4.png", id:"p29_4"},
		{src:"images/p29_5.png", id:"p29_5"},
		{src:"images/p2_1.png", id:"p2_1"},
		{src:"images/p2_2.png", id:"p2_2"},
		{src:"images/p30_1.png", id:"p30_1"},
		{src:"images/p30_2.png", id:"p30_2"},
		{src:"images/p30_3.png", id:"p30_3"},
		{src:"images/p30_4.png", id:"p30_4"},
		{src:"images/p30_5.png", id:"p30_5"},
		{src:"images/p31_1.png", id:"p31_1"},
		{src:"images/p31_2.png", id:"p31_2"},
		{src:"images/p31_3.png", id:"p31_3"},
		{src:"images/p31_4.png", id:"p31_4"},
		{src:"images/p31_5.png", id:"p31_5"},
		{src:"images/p31_6.png", id:"p31_6"},
		{src:"images/p32_1.png", id:"p32_1"},
		{src:"images/p32_3.png", id:"p32_3"},
		{src:"images/p32_4.png", id:"p32_4"},
		{src:"images/p32_5.jpg", id:"p32_5"},
		{src:"images/p3_1.png", id:"p3_1"},
		{src:"images/p3_2.png", id:"p3_2"},
		{src:"images/p3_3.png", id:"p3_3"},
		{src:"images/p3_4.png", id:"p3_4"},
		{src:"images/p3_5.png", id:"p3_5"},
		{src:"images/p3_6.png", id:"p3_6"},
		{src:"images/p4_1.png", id:"p4_1"},
		{src:"images/p4_2.png", id:"p4_2"},
		{src:"images/p4_3.png", id:"p4_3"},
		{src:"images/p4_4.png", id:"p4_4"},
		{src:"images/p4_5.png", id:"p4_5"},
		{src:"images/p5_1.png", id:"p5_1"},
		{src:"images/p5_2.png", id:"p5_2"},
		{src:"images/p6_1.png", id:"p6_1"},
		{src:"images/p6_2.png", id:"p6_2"},
		{src:"images/p71.jpg", id:"p71"},
		{src:"images/p710.jpg", id:"p710"},
		{src:"images/p711.jpg", id:"p711"},
		{src:"images/p712.jpg", id:"p712"},
		{src:"images/p713.jpg", id:"p713"},
		{src:"images/p714.jpg", id:"p714"},
		{src:"images/p72.jpg", id:"p72"},
		{src:"images/p73.jpg", id:"p73"},
		{src:"images/p74.jpg", id:"p74"},
		{src:"images/p75.jpg", id:"p75"},
		{src:"images/p76.jpg", id:"p76"},
		{src:"images/p77.jpg", id:"p77"},
		{src:"images/p78.jpg", id:"p78"},
		{src:"images/p79.jpg", id:"p79"},
		{src:"images/p7_1.png", id:"p7_1"},
		{src:"images/p7_2.png", id:"p7_2"},
		{src:"images/p7_3.png", id:"p7_3"},
		{src:"images/p8_1.png", id:"p8_1"},
		{src:"images/p8_2.png", id:"p8_2"},
		{src:"images/p9_1.png", id:"p9_1"},
		{src:"images/p9_2.png", id:"p9_2"},
		{src:"images/shui.png", id:"shui"},
		{src:"images/title.png", id:"title"}
	]
};



// symbols:



(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib._3 = function() {
	this.initialize(img._3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.gif0001 = function() {
	this.initialize(img.gif0001);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif00010 = function() {
	this.initialize(img.gif00010);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif00012 = function() {
	this.initialize(img.gif00012);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif00013 = function() {
	this.initialize(img.gif00013);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif00014 = function() {
	this.initialize(img.gif00014);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif00015 = function() {
	this.initialize(img.gif00015);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0002 = function() {
	this.initialize(img.gif0002);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0003 = function() {
	this.initialize(img.gif0003);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0004 = function() {
	this.initialize(img.gif0004);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0005 = function() {
	this.initialize(img.gif0005);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0006 = function() {
	this.initialize(img.gif0006);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0007 = function() {
	this.initialize(img.gif0007);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0008 = function() {
	this.initialize(img.gif0008);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.gif0009 = function() {
	this.initialize(img.gif0009);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.jiantou = function() {
	this.initialize(img.jiantou);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.leaf_1_136_64483 = function() {
	this.initialize(img.leaf_1_136_64483);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1166,656);


(lib.p10_1 = function() {
	this.initialize(img.p10_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p10_2 = function() {
	this.initialize(img.p10_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p11_1 = function() {
	this.initialize(img.p11_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p11_2 = function() {
	this.initialize(img.p11_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p11_3 = function() {
	this.initialize(img.p11_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12_1 = function() {
	this.initialize(img.p12_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12_2 = function() {
	this.initialize(img.p12_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12_3 = function() {
	this.initialize(img.p12_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12_4 = function() {
	this.initialize(img.p12_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12_5 = function() {
	this.initialize(img.p12_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p13_1 = function() {
	this.initialize(img.p13_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p13_2 = function() {
	this.initialize(img.p13_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p14_1 = function() {
	this.initialize(img.p14_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p14_3 = function() {
	this.initialize(img.p14_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p15_1 = function() {
	this.initialize(img.p15_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p15_2 = function() {
	this.initialize(img.p15_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_1 = function() {
	this.initialize(img.p17_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_10 = function() {
	this.initialize(img.p17_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_2 = function() {
	this.initialize(img.p17_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_3 = function() {
	this.initialize(img.p17_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_5 = function() {
	this.initialize(img.p17_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_6 = function() {
	this.initialize(img.p17_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_8 = function() {
	this.initialize(img.p17_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17_9 = function() {
	this.initialize(img.p17_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p19_1 = function() {
	this.initialize(img.p19_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p19_2 = function() {
	this.initialize(img.p19_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1_1 = function() {
	this.initialize(img.p1_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1_4 = function() {
	this.initialize(img.p1_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1_5 = function() {
	this.initialize(img.p1_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1_a = function() {
	this.initialize(img.p1_a);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20_1 = function() {
	this.initialize(img.p20_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20_2 = function() {
	this.initialize(img.p20_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20_3 = function() {
	this.initialize(img.p20_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20_4 = function() {
	this.initialize(img.p20_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20_5 = function() {
	this.initialize(img.p20_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20_6 = function() {
	this.initialize(img.p20_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_1 = function() {
	this.initialize(img.p21_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_2 = function() {
	this.initialize(img.p21_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_2_1 = function() {
	this.initialize(img.p21_2_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_3 = function() {
	this.initialize(img.p21_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_4 = function() {
	this.initialize(img.p21_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_5 = function() {
	this.initialize(img.p21_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_1 = function() {
	this.initialize(img.p22_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_2 = function() {
	this.initialize(img.p22_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_3 = function() {
	this.initialize(img.p22_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_4 = function() {
	this.initialize(img.p22_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_6 = function() {
	this.initialize(img.p22_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_8 = function() {
	this.initialize(img.p22_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22_9 = function() {
	this.initialize(img.p22_9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_1 = function() {
	this.initialize(img.p23_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_2 = function() {
	this.initialize(img.p23_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_3 = function() {
	this.initialize(img.p23_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_4 = function() {
	this.initialize(img.p23_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_5 = function() {
	this.initialize(img.p23_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_6 = function() {
	this.initialize(img.p23_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24_1 = function() {
	this.initialize(img.p24_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24_2 = function() {
	this.initialize(img.p24_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24_3 = function() {
	this.initialize(img.p24_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24_4 = function() {
	this.initialize(img.p24_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24_5 = function() {
	this.initialize(img.p24_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24_6 = function() {
	this.initialize(img.p24_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_1 = function() {
	this.initialize(img.p25_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_2 = function() {
	this.initialize(img.p25_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_3 = function() {
	this.initialize(img.p25_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_4 = function() {
	this.initialize(img.p25_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_5 = function() {
	this.initialize(img.p25_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_6 = function() {
	this.initialize(img.p25_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_7 = function() {
	this.initialize(img.p25_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25_8 = function() {
	this.initialize(img.p25_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28_1 = function() {
	this.initialize(img.p28_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28_2 = function() {
	this.initialize(img.p28_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28_3 = function() {
	this.initialize(img.p28_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28_4 = function() {
	this.initialize(img.p28_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28_5 = function() {
	this.initialize(img.p28_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28_6 = function() {
	this.initialize(img.p28_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29_1 = function() {
	this.initialize(img.p29_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29_2 = function() {
	this.initialize(img.p29_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29_3 = function() {
	this.initialize(img.p29_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29_4 = function() {
	this.initialize(img.p29_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29_5 = function() {
	this.initialize(img.p29_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p2_1 = function() {
	this.initialize(img.p2_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p2_2 = function() {
	this.initialize(img.p2_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30_1 = function() {
	this.initialize(img.p30_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30_2 = function() {
	this.initialize(img.p30_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30_3 = function() {
	this.initialize(img.p30_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30_4 = function() {
	this.initialize(img.p30_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30_5 = function() {
	this.initialize(img.p30_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31_1 = function() {
	this.initialize(img.p31_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31_2 = function() {
	this.initialize(img.p31_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31_3 = function() {
	this.initialize(img.p31_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31_4 = function() {
	this.initialize(img.p31_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31_5 = function() {
	this.initialize(img.p31_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31_6 = function() {
	this.initialize(img.p31_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32_1 = function() {
	this.initialize(img.p32_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32_3 = function() {
	this.initialize(img.p32_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32_4 = function() {
	this.initialize(img.p32_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32_5 = function() {
	this.initialize(img.p32_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3_1 = function() {
	this.initialize(img.p3_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3_2 = function() {
	this.initialize(img.p3_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3_3 = function() {
	this.initialize(img.p3_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3_4 = function() {
	this.initialize(img.p3_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3_5 = function() {
	this.initialize(img.p3_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3_6 = function() {
	this.initialize(img.p3_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,262,518);


(lib.p4_1 = function() {
	this.initialize(img.p4_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4_2 = function() {
	this.initialize(img.p4_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4_3 = function() {
	this.initialize(img.p4_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4_4 = function() {
	this.initialize(img.p4_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4_5 = function() {
	this.initialize(img.p4_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p5_1 = function() {
	this.initialize(img.p5_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p5_2 = function() {
	this.initialize(img.p5_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p6_1 = function() {
	this.initialize(img.p6_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p6_2 = function() {
	this.initialize(img.p6_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p71 = function() {
	this.initialize(img.p71);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p710 = function() {
	this.initialize(img.p710);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p711 = function() {
	this.initialize(img.p711);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p712 = function() {
	this.initialize(img.p712);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p713 = function() {
	this.initialize(img.p713);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p714 = function() {
	this.initialize(img.p714);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p72 = function() {
	this.initialize(img.p72);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p73 = function() {
	this.initialize(img.p73);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p74 = function() {
	this.initialize(img.p74);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p75 = function() {
	this.initialize(img.p75);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p76 = function() {
	this.initialize(img.p76);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p77 = function() {
	this.initialize(img.p77);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p78 = function() {
	this.initialize(img.p78);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p79 = function() {
	this.initialize(img.p79);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p7_1 = function() {
	this.initialize(img.p7_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p7_2 = function() {
	this.initialize(img.p7_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p7_3 = function() {
	this.initialize(img.p7_3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p8_1 = function() {
	this.initialize(img.p8_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p8_2 = function() {
	this.initialize(img.p8_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p9_1 = function() {
	this.initialize(img.p9_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p9_2 = function() {
	this.initialize(img.p9_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.shui = function() {
	this.initialize(img.shui);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,266,337);


(lib.title = function() {
	this.initialize(img.title);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib._3();
	this.instance.setTransform(0,0.8);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0.8,640,1008);


(lib.p32mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p32_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p32_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p32_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p32_mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p32_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p31_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p31_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p31_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p31_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p31_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p31mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p31_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p30_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p30_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p30_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p30_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p30_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29mc10 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p29_2, null, new cjs.Matrix2D(1,0,0,1,-320,-578)).s().p("Egx/BDLMAAAiGVMBj+AAAMAAACGVg");
	this.shape.setTransform(320,430);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,860);


(lib.p29mc9 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p29_5, null, new cjs.Matrix2D(1,0,0,1,-320,-600.6)).s().p("Egx/AEkIAApIMBj+AAAIAAJIg");
	this.shape.setTransform(320,29.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,58.6);


(lib.p29mc8 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p29_5, null, new cjs.Matrix2D(1,0,0,1,-320,-542)).s().p("Egx/AEkIAApIMBj+AAAIAAJIg");
	this.shape.setTransform(320,29.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,58.6);


(lib.p29mc7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p29_5, null, new cjs.Matrix2D(1,0,0,1,-320,-488.5)).s().p("Egx/ADxIAAnhMBj+AAAIAAHhg");
	this.shape.setTransform(320,24.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,48.4);


(lib.p29mc6 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p29_5, null, new cjs.Matrix2D(1,0,0,1,-320,-414.6)).s().p("Egx/gHxMBj+AAAIAAPiMhj+AABg");
	this.shape.setTransform(320,49.8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,99.7);


(lib.p29mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p29_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p29_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p29_2, null, new cjs.Matrix2D(1,0,0,1,-320,-74)).s().p("Egx/ALkIAA3HMBj+AAAIAAXHg");
	this.shape.setTransform(320,74);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,148.1);


(lib.p29mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p29_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28mc6 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p28_6, null, new cjs.Matrix2D(1,0,0,1,-320,-787.4)).s().p("Egx/AN9IAA75MBj+AAAIAAb5g");
	this.shape.setTransform(320,89.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,178.7);


(lib.p28mc5 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p28_6, null, new cjs.Matrix2D(1,0,0,1,-320,-613.8)).s().p("Egx/ANKIAA6TMBj+AAAIAAaTg");
	this.shape.setTransform(320,84.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,168.5);


(lib.p28mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p28_6, null, new cjs.Matrix2D(1,0,0,1,-320,-452)).s().p("Egx/AMIIAA4PMBj+AAAIAAYPg");
	this.shape.setTransform(320,77.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,155.3);


(lib.p28mc3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.p28_3();

	this.instance_1 = new lib.p28_4();

	this.instance_2 = new lib.p28_5();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},6).to({state:[{t:this.instance_2}]},7).wait(7));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p28_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p28_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p27mc7 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_8();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc8 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_8();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p25_7, null, new cjs.Matrix2D(1,0,0,1,-158.9,-421.9)).s().p("AgGW4IAAmaI0JAAMAAAgnVMAofAAAMAAAAiTIoBAAIAADbIl9AAIAAIBg");
	this.shape.setTransform(0.7,-0.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-128.9,-146.9,259.3,293);


(lib.p25mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p25_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mcdz1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{a2:1,a3:15,a1:30});

	// timeline functions:
	this.frame_44 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(44).call(this.frame_44).wait(1));

	// 图层 1
	this.instance = new lib.p28_3();

	this.instance_1 = new lib.p28_4();

	this.instance_2 = new lib.p28_5();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},14).to({state:[{t:this.instance}]},15).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mc10 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p24_3, null, new cjs.Matrix2D(1,0,0,1,-320,-265.3)).s().p("Egx/ADCIAAmDMBj+AAAIAAGDg");
	this.shape.setTransform(320,19.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,39);


(lib.p24mc9 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p24_3, null, new cjs.Matrix2D(1,0,0,1,-320,-225.6)).s().p("Egx/ACsIAAlWMBj+gABIAAFXg");
	this.shape.setTransform(320,17.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,34.5);


(lib.p24mc8 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p24_3, null, new cjs.Matrix2D(1,0,0,1,-320,-181.4)).s().p("Egx/gENMBj+AAAIAAIaMhj+AABg");
	this.shape.setTransform(320,27);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,54);


(lib.p24mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p24_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p24_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p24_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p24_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p24_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p23_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23mc4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.shui();
	this.instance.setTransform(36.1,310.1,1.075,1.683);

	this.instance_1 = new lib.gif0001();
	this.instance_1.setTransform(36.1,310.1,1.075,1.683);

	this.instance_2 = new lib.gif0002();
	this.instance_2.setTransform(36.1,310.1,1.075,1.683);

	this.instance_3 = new lib.gif0003();
	this.instance_3.setTransform(36.1,310.1,1.075,1.683);

	this.instance_4 = new lib.gif0004();
	this.instance_4.setTransform(36.1,310.1,1.075,1.683);

	this.instance_5 = new lib.gif0005();
	this.instance_5.setTransform(36.1,310.1,1.075,1.683);

	this.instance_6 = new lib.gif0006();
	this.instance_6.setTransform(36.1,310.1,1.075,1.683);

	this.instance_7 = new lib.gif0007();
	this.instance_7.setTransform(36.1,310.1,1.075,1.683);

	this.instance_8 = new lib.gif0008();
	this.instance_8.setTransform(36.1,310.1,1.075,1.683);

	this.instance_9 = new lib.gif0009();
	this.instance_9.setTransform(36.1,310.1,1.075,1.683);

	this.instance_10 = new lib.gif00010();
	this.instance_10.setTransform(36.1,310.1,1.075,1.683);

	this.instance_11 = new lib.gif00012();
	this.instance_11.setTransform(36.1,310.1,1.075,1.683);

	this.instance_12 = new lib.gif00013();
	this.instance_12.setTransform(36.1,310.1,1.075,1.683);

	this.instance_13 = new lib.gif00014();
	this.instance_13.setTransform(36.1,310.1,1.075,1.683);

	this.instance_14 = new lib.gif00015();
	this.instance_14.setTransform(36.1,310.1,1.075,1.683);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).wait(1));

	// 图层 2
	this.instance_15 = new lib.p23_4();

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23mc32 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p23_5, null, new cjs.Matrix2D(1,0,0,1,-320,-507.4)).s().p("Egx/ACsIAAlXMBj+AAAIAAFXg");
	this.shape.setTransform(320,17.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,34.5);


(lib.p23mc31 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p23_5, null, new cjs.Matrix2D(1,0,0,1,-320,-433.9)).s().p("Egx/AIyIAAxjMBj+AAAIAARjg");
	this.shape.setTransform(320,56.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,112.4);


(lib.p23mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p23_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p23_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23_3_1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p23_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_9();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p22_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p21_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_4_1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p21_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_3_1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p21_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_2_2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p21_2_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21_1_1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p21_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p20_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p20_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p20_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p20_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p20_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p20_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p19mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p19_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p19mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p19_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p15mc6 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p15_1, null, new cjs.Matrix2D(1,0,0,1,-320,-678)).s().p("Egx/AzjMAAAhnFMBj+AAAMAAABnFg");
	this.shape.setTransform(320,330);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,659.9);


(lib.p15mc5 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p15_1, null, new cjs.Matrix2D(1,0,0,1,-320,-329.1)).s().p("Egx/AC9IAAl6MBj+AAAIAAF6g");
	this.shape.setTransform(320,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,38);


(lib.p15mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p15_1, null, new cjs.Matrix2D(1,0,0,1,-320,-286.1)).s().p("Egx/ADwIAAnfMBj+AAAIAAHfg");
	this.shape.setTransform(320,24);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,48.1);


(lib.p15mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p15_1, null, new cjs.Matrix2D(1,0,0,1,-320,-226)).s().p("Egx/AFoIAArOMBj+gABIAALPg");
	this.shape.setTransform(320,36);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,72.1);


(lib.p15mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p15_1, null, new cjs.Matrix2D(1,0,0,1,-320,-95)).s().p("Egx/gO1MBj+AAAIAAdqMhj+AABg");
	this.shape.setTransform(320,95);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,190.1);


(lib.p14mc8 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-331)).s().p("Egx/AAdIAAg5MBj+AAAIAAA5g");
	this.shape.setTransform(320,37);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-311)).s().p("Egx/ACqIAAlTMBj+AAAIAAFTg");
	this.shape_1.setTransform(320,17);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,40);


(lib.p14mc7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-376.1)).s().p("Egx/AGkIAAtHMBj+AAAIAANHg");
	this.shape.setTransform(320,48);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,6,640,84.1);


(lib.p14mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p14_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p14mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-713)).s().p("Egx/AuFMAAAhcJMBj+AAAMAAABcJg");
	this.shape.setTransform(320,295);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,589.9);


(lib.p14mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-271)).s().p("Egx/ADlIAAnKMBj+AAAIAAHKg");
	this.shape.setTransform(320,23);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,46);


(lib.p14mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-218)).s().p("Egx/AEsIAApXMBj+AAAIAAJXg");
	this.shape.setTransform(320,30);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,60.1);


(lib.p14mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p14_1, null, new cjs.Matrix2D(1,0,0,1,-320,-94)).s().p("Egx/gOrMBj+AAAIAAdWMhj+AABg");
	this.shape.setTransform(320,94);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,188);


(lib.p13mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p13_2, null, new cjs.Matrix2D(1,0,0,1,-320,-598)).s().p("Egx/BADMAAAiAFMBj+AAAMAAACAFg");
	this.shape.setTransform(320,410);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,820);


(lib.p13mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p13_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p13mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p13_2, null, new cjs.Matrix2D(1,0,0,1,-320,-94)).s().p("Egx/AOsIAA9XMBj+AAAIAAdXg");
	this.shape.setTransform(320,94);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,188.1);


(lib.p12mc8 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p21_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12mc7 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p12_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p12_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p12_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p12_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p12_2, null, new cjs.Matrix2D(1,0,0,1,-320,-624)).s().p("Egx/A7/MAAAh39MBj+AAAMAAAB39g");
	this.shape.setTransform(320,384);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,768);


(lib.p12mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p12_2, null, new cjs.Matrix2D(1,0,0,1,-320,-218)).s().p("Egx/ADcIAAm2MBj+gABIAAG3g");
	this.shape.setTransform(320,22);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,44.1);


(lib.p12mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p12_2, null, new cjs.Matrix2D(1,0,0,1,-320,-98)).s().p("Egx/gPTMBj+AAAIAAemMhj+AABg");
	this.shape.setTransform(320,98);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,196.1);


(lib.p11mc10 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p11_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p11mc8 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p11_3, null, new cjs.Matrix2D(1,0,0,1,-320,-664)).s().p("Egx/A1vMAAAhrdMBj+AAAMAAABrdg");
	this.shape.setTransform(320,344);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,688);


(lib.p11mc7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p11_3, null, new cjs.Matrix2D(1,0,0,1,-320,-283)).s().p("Egx/AFxIAArhMBj+gABIAALig");
	this.shape.setTransform(320,37);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,74);


(lib.p11mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p11_2, null, new cjs.Matrix2D(1,0,0,1,-320,-665)).s().p("Egx/A1lMAAAhrJMBj+AAAMAAABrJg");
	this.shape.setTransform(320,343);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,686);


(lib.p11mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p11_2, null, new cjs.Matrix2D(1,0,0,1,-320,-282)).s().p("Egx/AGQIAAsfMBj+AAAIAAMfg");
	this.shape.setTransform(320,40);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,80);


(lib.p11mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p11_2, null, new cjs.Matrix2D(1,0,0,1,-320,-214)).s().p("Egx/AEYIAAovMBj+AAAIAAIvg");
	this.shape.setTransform(320,28);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,56.1);


(lib.p11mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p11_2, null, new cjs.Matrix2D(1,0,0,1,-320,-93)).s().p("Egx/gOhMBj+AAAIAAdCMhj+AABg");
	this.shape.setTransform(320,93);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,186);


(lib.P10MC5 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(255,255,255,0)"],[0,1],0,0,0,0,0,85.1).s().p("ApPJNQjzjzAAlaQAAlZDzj2QD2jzFZAAQFaAADzDzQD2D2AAFZQAAFaj2DzQjzD2laAAQlZAAj2j2g");
	this.shape.setTransform(83.5,83.5);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,167,167);


(lib.p10mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p10_2, null, new cjs.Matrix2D(1,0,0,1,-320,-680)).s().p("Egx/AzPMAAAhmdMBj+AAAMAAABmdg");
	this.shape.setTransform(320,328);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,656);


(lib.p10mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p10_2, null, new cjs.Matrix2D(1,0,0,1,-320,-278)).s().p("Egx/ALjIAA3GMBj+AAAIAAXGg");
	this.shape.setTransform(320,74);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,148);


(lib.p10mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p10_2, null, new cjs.Matrix2D(1,0,0,1,-320,-102)).s().p("Egx/AP8IAA/3MBj+AAAIAAf3g");
	this.shape.setTransform(320,102);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,204.1);


(lib.p9mcxd = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.498)").s().p("Ah0B0QgvgwgBhEQABhDAvgxQAxgvBDgBQBEABAwAvQAwAxABBDQgBBEgwAwQgwAwhEABQhDgBgxgwg");
	this.shape.setTransform(16.5,16.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.475)").s().p("Ah/B/Qg0g0AAhLQAAhJA0g2QA2g0BJAAQBLAAA0A0QA1A2AABJQAABLg1A0Qg0A1hLAAQhJAAg2g1g");
	this.shape_1.setTransform(16.5,16.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.451)").s().p("AiKCKQg5g5AAhRQAAhQA5g6QA6g5BQAAQBRAAA5A5QA6A6AABQQAABRg6A5Qg5A6hRAAQhQAAg6g6g");
	this.shape_2.setTransform(16.5,16.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.427)").s().p("AiVCWQg9g/AAhXQAAhWA9g/QA/g9BWAAQBXAAA/A9QA+A/AABWQAABXg+A/Qg/A+hXAAQhWAAg/g+g");
	this.shape_3.setTransform(16.5,16.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.404)").s().p("AigCgQhDhCAAheQAAhdBDhDQBDhDBdAAQBeAABCBDQBEBDAABdQAABehEBCQhCBEheAAQhdAAhDhEg");
	this.shape_4.setTransform(16.5,16.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.38)").s().p("AirCrQhHhGAAhlQAAhjBHhIQBIhHBjAAQBlAABGBHQBIBIAABjQAABlhIBGQhGBIhlAAQhjAAhIhIg");
	this.shape_5.setTransform(16.5,16.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.357)").s().p("Ai2C3QhMhMAAhrQAAhqBMhMQBMhMBqAAQBrAABMBMQBMBMAABqQAABrhMBMQhMBMhrAAQhqAAhMhMg");
	this.shape_6.setTransform(16.5,16.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0.333)").s().p("AjBDCQhQhQAAhyQAAhwBQhRQBRhQBwAAQByAABQBQQBRBRAABwQAAByhRBQQhQBRhyAAQhwAAhRhRg");
	this.shape_7.setTransform(16.5,16.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,255,0.31)").s().p("AjNDNQhUhVAAh4QAAh3BUhWQBWhUB3AAQB4AABVBUQBVBWAAB3QAAB4hVBVQhVBVh4AAQh3AAhWhVg");
	this.shape_8.setTransform(16.5,16.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,255,0.286)").s().p("AjYDYQhZhZAAh/QAAh+BZhaQBahZB+AAQB/AABZBZQBaBaAAB+QAAB/haBZQhZBah/AAQh+AAhahag");
	this.shape_9.setTransform(16.5,16.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0.263)").s().p("AjjDjQhdheAAiFQAAiEBdhfQBfhdCEAAQCFAABeBdQBeBfAACEQAACFheBeQheBeiFAAQiEAAhfheg");
	this.shape_10.setTransform(16.5,16.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,255,0.235)").s().p("AjuDuQhihiAAiMQAAiLBihjQBjhiCLAAQCMAABiBiQBkBjAACLQAACMhkBiQhiBkiMAAQiLAAhjhkg");
	this.shape_11.setTransform(16.5,16.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,255,255,0.212)").s().p("Aj5D5QhnhnAAiSQAAiRBnhoQBohnCRAAQCSAABnBnQBoBoAACRQAACShoBnQhnBoiSAAQiRAAhohog");
	this.shape_12.setTransform(16.5,16.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,255,0.188)").s().p("AkFEEQhrhrAAiZQAAiYBrhtQBthrCYAAQCZAABrBrQBtBtAACYQAACZhtBrQhrBtiZAAQiYAAhthtg");
	this.shape_13.setTransform(16.5,16.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,255,0.165)").s().p("AkQEQQhvhxAAifQAAifBvhxQBxhvCfAAQCfAABxBvQBwBxAACfQAACfhwBxQhxBwifAAQifAAhxhwg");
	this.shape_14.setTransform(16.5,16.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,255,0.141)").s().p("AkaEbQh1h1AAimQAAilB1h1QB1h1ClAAQCmAAB1B1QB1B1AAClQAACmh1B1Qh1B1imAAQilAAh1h1g");
	this.shape_15.setTransform(16.5,16.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,255,0.118)").s().p("AkmElQh5h5AAisQAAirB5h7QB7h5CrAAQCsAAB5B5QB7B7AACrQAACsh7B5Qh5B7isAAQirAAh7h7g");
	this.shape_16.setTransform(16.5,16.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.094)").s().p("AkxEwQh+h9AAizQAAiyB+h/QB/h+CyAAQCzAAB9B+QCAB/gBCyQABCziAB9Qh9CAizgBQiyABh/iAg");
	this.shape_17.setTransform(16.5,16.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,255,0.071)").s().p("Ak8E7QiCiBAAi6QAAi4CCiEQCEiCC4AAQC6AACBCCQCECEAAC4QAAC6iECBQiBCEi6AAQi4AAiEiEg");
	this.shape_18.setTransform(16.5,16.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,255,0.047)").s().p("AlHFHQiHiHAAjAQAAi/CHiIQCIiHC/AAQDAAACHCHQCICIAAC/QAADAiICHQiHCIjAAAQi/AAiIiIg");
	this.shape_19.setTransform(16.5,16.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,255,0.024)").s().p("AlSFSQiMiLAAjHQAAjFCMiNQCNiMDFAAQDHAACLCMQCNCNAADFQAADHiNCLQiLCNjHAAQjFAAiNiNg");
	this.shape_20.setTransform(16.5,16.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,255,255,0)").s().p("AleFdQiPiQgBjNQABjMCPiSQCSiPDMgBQDNABCQCPQCRCSAADMQAADNiRCQQiQCRjNAAQjMAAiSiRg");
	this.shape_21.setTransform(16.5,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},27).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).wait(52));

	// 图层 3
	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,255,255,0.498)").s().p("Ah0B0QgvgwgBhEQABhDAvgxQAxgvBDgBQBEABAwAvQAwAxABBDQgBBEgwAwQgwAwhEABQhDgBgxgwg");
	this.shape_22.setTransform(16.5,16.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(255,255,255,0.475)").s().p("Ah/B/Qg0g0AAhLQAAhJA0g2QA2g0BJAAQBLAAA0A0QA1A2AABJQAABLg1A0Qg0A1hLAAQhJAAg2g1g");
	this.shape_23.setTransform(16.5,16.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,255,255,0.451)").s().p("AiKCKQg5g5AAhRQAAhQA5g6QA6g5BQAAQBRAAA5A5QA6A6AABQQAABRg6A5Qg5A6hRAAQhQAAg6g6g");
	this.shape_24.setTransform(16.5,16.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,255,255,0.427)").s().p("AiVCWQg9g/AAhXQAAhWA9g/QA/g9BWAAQBXAAA/A9QA+A/AABWQAABXg+A/Qg/A+hXAAQhWAAg/g+g");
	this.shape_25.setTransform(16.5,16.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(255,255,255,0.404)").s().p("AigCgQhDhCAAheQAAhdBDhDQBDhDBdAAQBeAABCBDQBEBDAABdQAABehEBCQhCBEheAAQhdAAhDhEg");
	this.shape_26.setTransform(16.5,16.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,255,255,0.38)").s().p("AirCrQhHhGAAhlQAAhjBHhIQBIhHBjAAQBlAABGBHQBIBIAABjQAABlhIBGQhGBIhlAAQhjAAhIhIg");
	this.shape_27.setTransform(16.5,16.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(255,255,255,0.357)").s().p("Ai2C3QhMhMAAhrQAAhqBMhMQBMhMBqAAQBrAABMBMQBMBMAABqQAABrhMBMQhMBMhrAAQhqAAhMhMg");
	this.shape_28.setTransform(16.5,16.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(255,255,255,0.333)").s().p("AjBDCQhQhQAAhyQAAhwBQhRQBRhQBwAAQByAABQBQQBRBRAABwQAAByhRBQQhQBRhyAAQhwAAhRhRg");
	this.shape_29.setTransform(16.5,16.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(255,255,255,0.31)").s().p("AjNDNQhUhVAAh4QAAh3BUhWQBWhUB3AAQB4AABVBUQBVBWAAB3QAAB4hVBVQhVBVh4AAQh3AAhWhVg");
	this.shape_30.setTransform(16.5,16.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(255,255,255,0.286)").s().p("AjYDYQhZhZAAh/QAAh+BZhaQBahZB+AAQB/AABZBZQBaBaAAB+QAAB/haBZQhZBah/AAQh+AAhahag");
	this.shape_31.setTransform(16.5,16.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(255,255,255,0.263)").s().p("AjjDjQhdheAAiFQAAiEBdhfQBfhdCEAAQCFAABeBdQBeBfAACEQAACFheBeQheBeiFAAQiEAAhfheg");
	this.shape_32.setTransform(16.5,16.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(255,255,255,0.235)").s().p("AjuDuQhihiAAiMQAAiLBihjQBjhiCLAAQCMAABiBiQBkBjAACLQAACMhkBiQhiBkiMAAQiLAAhjhkg");
	this.shape_33.setTransform(16.5,16.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(255,255,255,0.212)").s().p("Aj5D5QhnhnAAiSQAAiRBnhoQBohnCRAAQCSAABnBnQBoBoAACRQAACShoBnQhnBoiSAAQiRAAhohog");
	this.shape_34.setTransform(16.5,16.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(255,255,255,0.188)").s().p("AkFEEQhrhrAAiZQAAiYBrhtQBthrCYAAQCZAABrBrQBtBtAACYQAACZhtBrQhrBtiZAAQiYAAhthtg");
	this.shape_35.setTransform(16.5,16.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(255,255,255,0.165)").s().p("AkQEQQhvhxAAifQAAifBvhxQBxhvCfAAQCfAABxBvQBwBxAACfQAACfhwBxQhxBwifAAQifAAhxhwg");
	this.shape_36.setTransform(16.5,16.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(255,255,255,0.141)").s().p("AkaEbQh1h1AAimQAAilB1h1QB1h1ClAAQCmAAB1B1QB1B1AAClQAACmh1B1Qh1B1imAAQilAAh1h1g");
	this.shape_37.setTransform(16.5,16.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(255,255,255,0.118)").s().p("AkmElQh5h5AAisQAAirB5h7QB7h5CrAAQCsAAB5B5QB7B7AACrQAACsh7B5Qh5B7isAAQirAAh7h7g");
	this.shape_38.setTransform(16.5,16.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(255,255,255,0.094)").s().p("AkxEwQh+h9AAizQAAiyB+h/QB/h+CyAAQCzAAB9B+QCAB/gBCyQABCziAB9Qh9CAizgBQiyABh/iAg");
	this.shape_39.setTransform(16.5,16.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(255,255,255,0.071)").s().p("Ak8E7QiCiBAAi6QAAi4CCiEQCEiCC4AAQC6AACBCCQCECEAAC4QAAC6iECBQiBCEi6AAQi4AAiEiEg");
	this.shape_40.setTransform(16.5,16.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(255,255,255,0.047)").s().p("AlHFHQiHiHAAjAQAAi/CHiIQCIiHC/AAQDAAACHCHQCICIAAC/QAADAiICHQiHCIjAAAQi/AAiIiIg");
	this.shape_41.setTransform(16.5,16.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(255,255,255,0.024)").s().p("AlSFSQiMiLAAjHQAAjFCMiNQCNiMDFAAQDHAACLCMQCNCNAADFQAADHiNCLQiLCNjHAAQjFAAiNiNg");
	this.shape_42.setTransform(16.5,16.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(255,255,255,0)").s().p("AleFdQiPiQgBjNQABjMCPiSQCSiPDMgBQDNABCQCPQCRCSAADMQAADNiRCQQiQCRjNAAQjMAAiSiRg");
	this.shape_43.setTransform(16.5,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_22}]},12).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).wait(67));

	// 图层 2
	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(255,255,255,0.498)").s().p("Ah0B0QgvgwgBhEQABhDAvgxQAxgvBDgBQBEABAwAvQAwAxABBDQgBBEgwAwQgwAwhEABQhDgBgxgwg");
	this.shape_44.setTransform(16.5,16.5);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(255,255,255,0.475)").s().p("Ah/CAQg1g1AAhLQAAhKA1g1QA1g1BKAAQBLAAA1A1QA1A1AABKQAABLg1A1Qg1A1hLAAQhKAAg1g1g");
	this.shape_45.setTransform(16.5,16.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,255,255,0.447)").s().p("AiLCMQg6g6AAhSQAAhQA6g7QA7g6BQAAQBSAAA6A6QA5A7AABQQAABSg5A6Qg6A5hSAAQhQAAg7g5g");
	this.shape_46.setTransform(16.5,16.5);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(255,255,255,0.424)").s().p("AiXCXQg+g+AAhZQAAhXA+hAQBAg+BXAAQBZAAA+A+QA/BAAABXQAABZg/A+Qg+A/hZAAQhXAAhAg/g");
	this.shape_47.setTransform(16.5,16.5);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(255,255,255,0.4)").s().p("AijCiQhChDAAhfQAAhfBChEQBEhCBfAAQBfAABDBCQBEBEAABfQAABfhEBDQhDBEhfAAQhfAAhEhEg");
	this.shape_48.setTransform(16.5,16.5);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(255,255,255,0.373)").s().p("AiuCvQhIhJAAhmQAAhlBIhJQBJhIBlAAQBmAABJBIQBIBJAABlQAABmhIBJQhJBIhmAAQhlAAhJhIg");
	this.shape_49.setTransform(16.5,16.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(255,255,255,0.349)").s().p("Ai5C6QhOhNAAhtQAAhsBOhNQBNhOBsAAQBtAABNBOQBNBNABBsQgBBthNBNQhNBNhtABQhsgBhNhNg");
	this.shape_50.setTransform(16.5,16.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(255,255,255,0.325)").s().p("AjGDFQhRhRAAh0QAAhzBRhTQBThRBzAAQB0AABRBRQBTBTAABzQAAB0hTBRQhRBTh0AAQhzAAhThTg");
	this.shape_51.setTransform(16.5,16.5);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(255,255,255,0.298)").s().p("AjRDRQhXhWAAh7QAAh6BXhXQBXhXB6AAQB7AABWBXQBYBXgBB6QABB7hYBWQhWBYh7gBQh6ABhXhYg");
	this.shape_52.setTransform(16.5,16.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(255,255,255,0.275)").s().p("AjdDdQhbhbAAiCQAAiABbhdQBdhbCAAAQCCAABbBbQBcBdAACAQAACChcBbQhbBciCAAQiAAAhdhcg");
	this.shape_53.setTransform(16.5,16.5);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(255,255,255,0.251)").s().p("AjpDoQhfhgAAiIQAAiHBfhiQBihfCHAAQCIAABgBfQBhBiABCHQgBCIhhBgQhgBhiIABQiHgBhihhg");
	this.shape_54.setTransform(16.5,16.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(255,255,255,0.224)").s().p("Aj0D0QhlhkAAiQQAAiOBlhmQBmhlCOAAQCQAABkBlQBmBmAACOQAACQhmBkQhkBmiQAAQiOAAhmhmg");
	this.shape_55.setTransform(16.5,16.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(255,255,255,0.2)").s().p("AkAEAQhqhqAAiWQAAiVBqhrQBrhqCVAAQCWAABqBqQBrBrAACVQAACWhrBqQhqBriWAAQiVAAhrhrg");
	this.shape_56.setTransform(16.5,16.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(255,255,255,0.173)").s().p("AkMELQhuhuAAidQAAicBuhwQBwhuCcAAQCdAABuBuQBwBwAACcQAACdhwBuQhuBwidAAQicAAhwhwg");
	this.shape_57.setTransform(16.5,16.5);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("rgba(255,255,255,0.149)").s().p("AkYEXQhyhzgBikQABijByh1QB1hyCjgBQCkABBzByQB1B1gBCjQABCkh1BzQhzB1ikgBQijABh1h1g");
	this.shape_58.setTransform(16.5,16.5);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(255,255,255,0.125)").s().p("AkjEjQh4h4AAirQAAipB4h6QB6h4CpAAQCrAAB4B4QB5B6AACpQAACrh5B4Qh4B5irAAQipAAh6h5g");
	this.shape_59.setTransform(16.5,16.5);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("rgba(255,255,255,0.098)").s().p("AkuEuQh+h8ABiyQgBixB+h9QB9h+CxABQCygBB8B+QB+B9AACxQAACyh+B8Qh8B+iyAAQixAAh9h+g");
	this.shape_60.setTransform(16.5,16.5);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(255,255,255,0.075)").s().p("Ak7E6QiBiCAAi4QAAi3CBiEQCEiBC3AAQC4AACCCBQCDCEAAC3QAAC4iDCCQiCCDi4AAQi3AAiEiDg");
	this.shape_61.setTransform(16.5,16.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("rgba(255,255,255,0.051)").s().p("AlGFGQiHiGAAjAQAAi/CHiHQCHiHC/AAQDAAACGCHQCICHAAC/QAADAiICGQiGCIjAAAQi/AAiHiIg");
	this.shape_62.setTransform(16.5,16.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(255,255,255,0.024)").s().p("AlSFSQiLiMAAjGQAAjFCLiNQCNiLDFAAQDGAACMCLQCMCNAADFQAADGiMCMQiMCMjGAAQjFAAiNiMg");
	this.shape_63.setTransform(16.5,16.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(255,255,255,0)").s().p("AleFdQiPiQgBjNQABjMCPiSQCSiPDMgBQDNABCQCPQCRCSAADMQAADNiRCQQiQCRjNAAQjMAAiSiRg");
	this.shape_64.setTransform(16.5,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_44}]}).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).wait(80));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,33,33);


(lib.p9mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p9_2, null, new cjs.Matrix2D(1,0,0,1,-320,-717)).s().p("Egx/AtdMAAAha5MBj+AAAMAAABa5g");
	this.shape.setTransform(320,291);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,581.9);


(lib.p9mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p9_2, null, new cjs.Matrix2D(1,0,0,1,-320,-371.1)).s().p("Egx/AImIAAxLMBj+AAAIAARLg");
	this.shape.setTransform(320,55);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,110.1);


(lib.p9mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p9_2, null, new cjs.Matrix2D(1,0,0,1,-320,-260)).s().p("Egx/AIvIAAxeMBj+AAAIAAReg");
	this.shape.setTransform(320,56);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,112);


(lib.p9mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p9_2, null, new cjs.Matrix2D(1,0,0,1,-320,-102)).s().p("Egx/AP8IAA/3MBj+AAAIAAf3g");
	this.shape.setTransform(320,102);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,204.1);


(lib.p8mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p8_2, null, new cjs.Matrix2D(1,0,0,1,-502,-631)).s().p("EgViA65MAAAh1xMArFAAAMAAAB1xg");
	this.shape.setTransform(138,377);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,276,754);


(lib.p8mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p8_2, null, new cjs.Matrix2D(1,0,0,1,-182,-631)).s().p("EgcbA65MAAAh1xMA43AAAMAAAB1xg");
	this.shape.setTransform(182,377);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,364.1,754);


(lib.p8mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p8_2, null, new cjs.Matrix2D(1,0,0,1,-320,-202)).s().p("Egx/AIIIAAwPMBj+AAAIAAQPg");
	this.shape.setTransform(320,52);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,104.1);


(lib.p8mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p8_2, null, new cjs.Matrix2D(1,0,0,1,-320,-75)).s().p("Egx/ALuIAA3bMBj+AAAIAAXbg");
	this.shape.setTransform(320,75);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,150);


(lib.p7mcdz = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.p71();

	this.instance_1 = new lib.p72();

	this.instance_2 = new lib.p73();

	this.instance_3 = new lib.p74();

	this.instance_4 = new lib.p75();

	this.instance_5 = new lib.p76();

	this.instance_6 = new lib.p77();

	this.instance_7 = new lib.p78();

	this.instance_8 = new lib.p79();

	this.instance_9 = new lib.p710();

	this.instance_10 = new lib.p711();

	this.instance_11 = new lib.p712();

	this.instance_12 = new lib.p713();

	this.instance_13 = new lib.p714();

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},4).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},3).wait(3));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1280,640);


(lib.p7mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p7_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p7mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p7_2, null, new cjs.Matrix2D(1,0,0,1,-320,-741)).s().p("Egx/AptMAAAhTZMBj+AAAMAAABTZg");
	this.shape.setTransform(320,267);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,533.9);


(lib.p7mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p7_2, null, new cjs.Matrix2D(1,0,0,1,-320,-341.1)).s().p("Egx/AUyMAAAgpjMBj+AAAMAAAApjg");
	this.shape.setTransform(320,133);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,266.1);


(lib.p7mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p7_2, null, new cjs.Matrix2D(1,0,0,1,-320,-104)).s().p("Egx/AQQMAAAggfMBj+AAAMAAAAgfg");
	this.shape.setTransform(320,104);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,208.1);


(lib.p6mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img._1, null, new cjs.Matrix2D(1,0,0,1,-320,-654.9)).s().p("Egx/A3KMAAAhuTMBj+AAAMAAABuTg");
	this.shape.setTransform(320,348.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-4.1,640,706.2);


(lib.p6mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img._2, null, new cjs.Matrix2D(1,0,0,1,-320,-225.9)).s().p("Egx/ANvIAA7dMBj+AAAIAAbdg");
	this.shape.setTransform(320,85.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,-2,640,176);


(lib.p6mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p6_2, null, new cjs.Matrix2D(1,0,0,1,-320,-70)).s().p("Egx/AK8IAA13MBj+AAAIAAV3g");
	this.shape.setTransform(320,70);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,140);


(lib.p5mc7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p5_2, null, new cjs.Matrix2D(1,0,0,1,-418,-944.1)).s().p("EgirAJ+IAAz7MBFWAAAIAAT7g");
	this.shape.setTransform(222,63.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,444,127.8);


(lib.p5mc6 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p5_2, null, new cjs.Matrix2D(1,0,0,1,-98,-672)).s().p("EgPTA0fMAAAho9IenAAMAAABo9g");
	this.shape.setTransform(98,336);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,196,672);


(lib.p5mc5 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p5_2, null, new cjs.Matrix2D(1,0,0,1,-418,-608.1)).s().p("EgiqAqhMAAAhVBMBFVAAAMAAABVBg");
	this.shape.setTransform(418,272.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(196,0,444,544.2);


(lib.p5mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p5_2, null, new cjs.Matrix2D(1,0,0,1,-320,-280)).s().p("Egx/AIvIAAxeMBj+AAAIAAReg");
	this.shape.setTransform(320,56);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,112);


(lib.p5mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p5_2, null, new cjs.Matrix2D(1,0,0,1,-320,-185)).s().p("Egx/AGGIAAsLMBj+AAAIAAMLg");
	this.shape.setTransform(320,39);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,78.1);


(lib.p5mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p5_2, null, new cjs.Matrix2D(1,0,0,1,-320,-73)).s().p("Egx/ALZIAA2yMBj+AAAIAAWyg");
	this.shape.setTransform(320,73);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,146);


(lib.p5mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p5_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4mc6 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AGMFLIIDq+IA3AnIoELAgAM/FXQgggUgUgdQgRgZgHggQgHgeAAgiQAAgjAHgeQAHggARgZQAUgeAggUQAhgRAvgBQAvABAhARQAfAUAVAeQARAZAHAgQAHAeAAAjQAAAigHAeQgHAggRAZQgVAdgfAUQghATgvABQgvgBghgTgANsA3QgOAGgJALQgQARgHAbQgGAZAAAgQAAAfAGAZQAHAaAQASQAJALAOAGQAOAHAVAAQAUAAAOgHQANgGAKgLQAQgSAHgZQAHgagBgfIAAAAQABgggHgZQgHgbgQgRQgKgLgNgGQgOgHgUAAQgVAAgOAHgAmBFaQgogQgdgeQgbgagPgmQgQglgBgvIBXAAQABAdAJAZQAJAYARARQAPASAYALQAXALAhAAQAgAAAZgKQAagKASgVQAPgPAJgWQAIgVABgdQgBhAgnggQgmghhBAAIgqAAIAAhNIAqAAQA8AAAigfQAhgfABg3QAAgYgIgUQgJgVgQgQQgPgOgUgKQgVgJgdgBQgdAAgUAIQgUAHgQANQgUARgLAYQgLAaAAAfIhXAAQABg0ARglQASgmAfgZQAdgZAmgNQAlgNAtAAQAsABAmAOQAmAPAcAaQAaAYAPAiQAOAhABAtQgBAhgNAgQgOAfgXAYQgWAZgcAMQAkALAaAaQAaAaANAiQAOAjAAAkIAAAAQAAApgOAjQgNAkgZAbQgcAegqAQQgoARg7AAQgyAAgogRgAu2FYQgugUgfgkQgVgZgMgfQgMghgBgnQABg6AegtQAdguAxgUQgsgYgZgoQgZgqgBgzQABgqAPgiQAPgiAagYQAegbAngOQAngPAvAAQAtAAAnAPQAoAOAdAbQAaAYAPAiQAPAiABAqQgBAzgZAqQgZAogsAYQAxAUAdAuQAeAtABA6QgBAngMAhQgMAfgVAZQgfAkguAUQgvATg2AAQg5AAgugTgAu3A/QgkAlAAA3QABA/AmAjQAnAjA+ABQA9gBAmgjQAmgjABg/QAAg3gkglQglgkhBAAQhDAAglAkgAuPkLQgdAOgQAaQgQAZgBAkQAAAgAOAcQAPAbAcARQAbAPAqABQAogBAbgPQAcgRAPgbQAOgcAAggQAAgkgRgZQgQgagcgOQgdgOgiAAQgkAAgcAOgAFrgHQgggUgTgeQgSgZgHgfQgHgeAAgjQAAgjAHgeQAHgfASgaQATgdAggUQAigTAugBQAvABAhATQAgAUAUAdQARAaAIAfQAGAeAAAjQAAAjgGAeQgIAfgRAZQgUAeggAUQghARgvABQgugBgigRgAGYkoQgNAGgKALQgQASgHAaQgGAaAAAfQAAAgAGAZQAHAaAQARQAKALANAGQAOAIAVAAQAUAAAPgIQANgGAKgLQAQgSAGgZQAHgagBgfQABgfgHgaQgGgagQgSQgKgLgNgGQgPgHgUAAQgVAAgOAHg");
	this.shape.setTransform(107.5,37.3);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,214.9,74.5);


(lib.p4mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p4_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p4_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p4_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p4_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p4_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3mc7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ArkFaQgpgQgdgcQgdgdgQgmQgQgngDgwIBWAAQABAgAKAZQAKAYASARQARASAZAKQAZAKAhAAQAkAAAZgNQAZgMAPgUQASgWAIgeQAIgdAAgjQAAglgKgeQgJgegUgWQgQgRgYgKQgXgLghAAQgkAAgfAQQgeAPgSAdIhfAAIATl1IGAAAIAABOIk3AAIgLDeQAYghAmgPQAngPAtAAQAuABAjAPQAkAPAZAaQAfAgAQArQAPAsAAA1QAAA2gOAuQgPAtgdAgQgbAegoASQgoARg3ABQgzgBgpgPgABrFaQglgPgagbQgYgYgQggQgNgfgCgnIBUAAQACAaALATQAKAUARAOQAPANATAHQATAHAZAAQAhgBAXgLQAYgMAPgSQAWgaAKgkQALgjADgoQADgnAAglQgLAYgYASQgXASggALQgfAKghAAQgwgBglgOQglgPgZgYQgighgQgsQgSguAAg4QABg0AQgrQARgrAbggQAcgfApgSQApgSA3gBQA7ABArAZQArAZAZAkQAlA0AMBGQALBFgBBKQABBKgJBIQgKBIghA6QgZAogtAbQguAahCABQgtgBgkgOgACDkQQgXAKgRATQgUAWgKAeQgLAeAAAlQAAAlALAeQALAeATAWQAQARAZALQAZAKAhAAQAhAAAYgLQAYgMAQgRQAngrAAhKQAAglgKgdQgLgegUgVQgQgTgYgLQgYgMghAAQghAAgYALgAkhFcIAAh3IB2AAIAAB3gALuh/QAngRANgaQANgZAAgqIg/AAIAAh2IB7AAIAAB2QAAA3gWAnQgWAng3AYgAIoh/QAmgRAOgaQANgZgBgqIg+AAIAAh2IB6AAIAAB2QABA3gWAnQgXAng2AYg");
	this.shape.setTransform(87.5,36.2);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,175.1,72.5);


(lib.p3mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_6();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,262,518);


(lib.p3mc4 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_2();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_3();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p2mc6 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.title();

	this.instance_1 = new lib.title();

	this.addChild(this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p2mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p2_2, null, new cjs.Matrix2D(1,0,0,1,-481,-745)).s().p("EgY0ApFMAAAhSIMAxpgABMAAABSJg");
	this.shape.setTransform(159,263);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,318,525.9);


(lib.p2mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p2_2, null, new cjs.Matrix2D(1,0,0,1,-161,-745.1)).s().p("EgZJApFMAAAhSJMAyTAAAMAAABSJg");
	this.shape.setTransform(161,262.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,322.1,525.9);


(lib.p2mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p2_2, null, new cjs.Matrix2D(1,0,0,1,-481,-241.1)).s().p("EgY0glpMAxpAAAMAAABLTMgxpAAAg");
	this.shape.setTransform(159,241.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,318,482.2);


(lib.p2mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p2_2, null, new cjs.Matrix2D(1,0,0,1,-161,-241.1)).s().p("EgZJAlqMAAAhLTMAyTAAAMAAABLTg");
	this.shape.setTransform(161,241.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,322.1,482.2);


(lib.p1mc5 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1A1C22").s().p("AQoC5QgagLgPgTQgSgVgHgbQgIgbAAgiQAAgcAJgaQAKgdAPgSQARgVAWgMQAXgLAdAAQAgAAAVALQAVALAOAUQAOAUAHAbQAGAaAAAdIAAARIi3AAQAAASAFATQAHASALAMQALANAQAHQAPAHAUAAQATAAAXgFQAXgFAPgKIAEAtQgVAIgZAEQgXAEgYAAQghAAgagMgAQ9gzQgOAIgIANQgJAPgEAPQgEAPAAAMICDAAQAAgOgDgQQgDgQgHgMQgIgOgLgHQgMgIgRAAQgTAAgMAJgANwC9QgNgGgJgOQgHgNgDgTQgCgQAAgWIAAiXIgzAAIAAgqIAzAAIAAg+IA3gSIAABQIA+AAIAAAqIg+AAIAACdQAAAJACAJQAAAGAFAIQAEAHAGADQAGAEAMAAQAPAAAPgGIADAqQgMAEgPADQgPADgMAAQgVAAgOgIgAJKDAQgSgGgLgKQgMgIgIgRQgHgOAAgXQAAgbALgUQAMgTAVgLQAUgMAbgFQAbgGAfAAIAbABIAAgMQAAgdgPgRQgPgRghAAQgTAAgWAGQgUAFgUAMIgDgsQATgHAYgGQAagFAUAAQA2AAAdAZQAdAZAAA4IADC3Ig1AAIgCgtQgOAZgXANQgXAOgbAAQgTAAgQgFgAKVAzQgTACgSAGQgRAHgLALQgMANAAAVQAAAYAQALQAOAKAVAAQAVAAANgHQANgHAJgNQAIgNADgQQAEgPAAgUIAAgPgAX+CyQgYgRgQgdQgOgcgHgjQgFgoAAgdQAAgfAGglQAHgmAOgZQAPgdAZgSQAagSAoAAQAoAAAZASQAZASAPAdQAOAbAHAkQAGAkAAAgQAAAfgGAlQgGAkgOAcQgQAcgZASQgZASgoAAQgoAAgbgSgAYZiIQgOAPgIAXQgHAYgCAYQgCAYAAAaQAAAZACAYQACAbAHAWQAHAXAPAPQAOAPAaAAQAZAAAOgPQAPgPAHgXQAIgWABgcQADgYAAgYQAAgagDgYQgBgbgIgWQgHgXgPgOQgOgPgZAAQgZAAgPAPgEAlmAC5QgZgLgQgUQgRgUgIgbQgIgcAAgiQAAgbAJgbQAJgcAQgTQAQgUAXgMQAWgNAdAAQAfAAAWAMQAWALAOAVQAOATAHAbQAGAaAAAdIAAARIi3AAQAAAVAFAQQAGARALANQAMANAPAHQARAIATAAQAQAAAagGQAWgFAQgJIAEAsQgVAIgZAEQgYADgXAAQgiAAgZgKgEAl7gA0QgOAIgIANQgIAOgFAPQgEAMAAAPICDAAQAAgNgDgQQgDgPgHgNQgHgMgMgJQgMgIgSAAQgRAAgNAJgEAivAC8QgOgIgHgMQgIgOgCgSQgDgOAAgYIAAiYIgzAAIAAgpIAzAAIAAg9IA4gTIAABQIA+AAIAAApIg+AAIAACeIABASQACAHADAIQAFAGAGAEQAGADALAAQAPAAAPgHIADArIgaAHQgNACgOAAQgWAAgOgHgEggBACzQgmgNgZgcQgOgOgFgaQgFgXAAgmIAAjjIBWAAIAADhQAAAzAUAWQAVAVA0AAQA0AAAVgVQATgWAAgzIAAjhIBWAAIAADjQAABMgYAZQgZAcgmANQglAMg2AAQg3AAglgMgAGmC+IAAlPIh4FPIg3AAIh6lPIAAFPIg2AAIAAl7IBbAAIBxE3IBxk3IBbAAIAAF7gAf5C9IAAkJIA3AAIAAEJgAeBC9IAAl7IA3AAIAAF7gAVbC9IAAk8IhCA4IgYgqIBghNIAzAAIAAF7gAkyC7IAAl5IBaAAIAAF5gAoQC7QgqAAgZgGQghgHgcgUQg+gvAAhnQAAhiAugwQAvgwBjAAICQAAIAABCIiOAAQhcAAgFBYIDvAAIAABAIjwAAQABAyAXAWQAXAVAzAAICOAAIAABCgAvKC7IhXkZIhNEZIhpAAIiIl5IBcAAIBfEhIBQkhIBmAAIBcEhIBYkhIBZAAIh/F5gA2KC7IgmhaIiyAAIglBaIhbAAICul5IBbAAICvF5gA5GAdIB6AAIg+iQgEgj1AC7IAAifIjAAAIAACfIhWAAIAAl5IBWAAIAACZIDAAAIAAiZIBXAAIAAF5gAf5iHIAAg3IA3AAIAAA3g");
	this.shape.setTransform(320,110.8);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(62.8,91.1,514.6,39.5);


(lib.p1mc4mc4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p1_a, null, new cjs.Matrix2D(1,0,0,1,-320,-645)).s().p("Egx/A4tMAAAhxZMBj+AAAMAAABxZg");
	this.shape.setTransform(320,363);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,725.9);


(lib.p1mc4mc3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p1_a, null, new cjs.Matrix2D(1,0,0,1,-320,-259.1)).s().p("Egx/ADlIAAnKMBj+AAAIAAHKg");
	this.shape.setTransform(320,23);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,46);


(lib.p1mc4mc2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p1_a, null, new cjs.Matrix2D(1,0,0,1,-320,-218.1)).s().p("Egx/AC0IAAlnMBj+AAAIAAFng");
	this.shape.setTransform(320,18);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,36.1);


(lib.p1mc4mc1 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.p1_a, null, new cjs.Matrix2D(1,0,0,1,-320,-175)).s().p("Egx/AD6IAAnzMBj+AAAIAAHzg");
	this.shape.setTransform(320,25);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,50.1);


(lib.p1mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p1_4();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1mc2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p1_5();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1mc1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p1_1();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.leaf_1_7_37930 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.leaf_1_136_64483();
	this.instance.setTransform(-430.9,-242.4,0.739,0.739);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-430.9,-242.4,861.9,484.9);


(lib.jiantou3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhggvIDBAAIhhBgg");
	this.shape.setTransform(16.9,74,1,1,0,0,0,0.1,-5.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AIMBJQgMgGgJgLQgKgLgEgOQgFgPAAgQQAAgMADgMQACgMAHgLQAIgOAOgIQAPgJAUAAQAPAAALAFQAMAFAIAJQAJAKAGAOQAEAOAAAPIAAAOIhsAAQABAKAEAKQADALAHAHQAFAFAHADQAIADAIAAQAJAAAHgDQAHgCAFgFIAGgHQACgEABgGIAZAAQgBAMgHAJQgFAKgKAHQgJAFgJADQgKADgLAAQgQAAgNgGgAJQgMQAAgJgCgIQgDgIgEgGQgFgGgIgEQgHgEgKAAQgOAAgJAHQgKAGgEAKQgFAKAAAMIBRAAIAAAAgADzBKQgMgEgHgJQgNgMgEgQQgGgQABgRQgBgRAGgPQAEgQANgNQAHgIAMgEQAMgFAPAAQAOAAALAFQAMAEAIAIQANANAEAQQAFAPgBARQABARgFAQQgEAQgNAMQgIAJgMAEQgLAFgOAAQgPAAgMgFgAD+g1QgIADgEAEQgIAJgDAMQgDANAAAMQAAANADAMQADANAIAIQAEAFAIADQAGADAKAAQAIAAAHgDQAHgDAFgFQAHgIAEgNQACgMAAgNQAAgMgCgNQgEgMgHgJQgFgEgHgDQgHgDgIAAQgKAAgGADgAj+BJQgNgGgIgLQgKgLgFgOQgFgPABgQQgBgMADgMQADgMAGgLQAIgOAPgIQAOgJAUAAQAPAAALAFQAMAFAJAJQAJAKAFAOQAFAOAAAPIAAAOIhsAAQAAAKAEAKQADALAIAHQAFAFAHADQAHADAJAAQAJAAAHgDQAHgCAFgFIAFgHQADgEABgGIAZAAQgCAMgGAJQgGAKgJAHQgJAFgJADQgKADgLAAQgQAAgNgGgAi6gMQAAgJgCgIQgDgIgEgGQgGgGgHgEQgIgEgKAAQgNAAgJAHQgKAGgFAKQgEAKAAAMIBRAAIAAAAgAmjBJQgNgGgJgLQgKgLgEgOQgFgPAAgQQAAgMADgMQACgMAHgLQAIgOAOgIQAPgJAUAAQAPAAALAFQAMAFAIAJQAJAKAGAOQAEAOAAAPIAAAOIhsAAQAAAKAFAKQADALAHAHQAFAFAHADQAHADAJAAQAJAAAIgDQAGgCAFgFIAGgHQACgEABgGIAZAAQgBAMgHAJQgFAKgKAHQgIAFgKADQgKADgLAAQgQAAgMgGgAlggMQAAgJgCgIQgDgIgEgGQgFgGgIgEQgHgEgKAAQgOAAgJAHQgJAGgFAKQgEAKgBAMIBRAAIAAAAgApFBLQgMgEgKgJQgHgHgEgJQgDgJAAgKIAZAAQAAAIADAGQAEAGAFAEQAFAEAIABQAHACAHAAQAIAAAIgCQAGgCAGgFQADgCADgEQACgFAAgFQAAgJgGgFQgGgGgMgCIgigEQgRgDgKgIQgKgKAAgSQAAgJAEgHQADgIAGgFQAHgIALgFQAMgEAOAAQAQAAAMAFQANAEAHAKQAFAGADAHQADAHAAAJIgZAAQAAgGgDgFQgCgFgEgDQgFgEgGgCQgGgCgIAAIgIAAIgJADQgIADgDAFQgFAGAAAGQAAAKAGAEQAFAFAJABIAQACIAVADQALACAJAGQAJADAEAJQAGAJAAALQAAAKgEAIQgDAHgFAGQgJAJgNAEQgMAEgQAAQgOAAgNgEgAF9BLIAAiWIAXAAIACAbQAFgOANgHQAMgGAPAAIAFAAIAGAAIAAAZIgHAAIgGgBQgJAAgIAEQgHADgFAFQgGAGgEAIQgCAJgBAJIgBAPIAABDgACHBLIAAheQAAgQgHgKQgHgKgSAAQgGAAgGADQgGACgEAFQgIAIgDALQgCALgBAMIAABOIgZAAIAAheQABgQgHgKQgHgKgSAAQgIAAgEADQgHAEgFAGQgFAIgCAKQgCALgBAKIAABOIgZAAIAAiWIAWAAIADAWQAGgNAMgGQAJgGANAAQARAAAMAHQALAHAGAPQAEgKAHgGQAHgHAKgDQAIgDAKAAQAaAAAMAPQANAPAAAZIAABig");
	this.shape_1.setTransform(16.9,57.7);

	this.addChild(this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-45,49.8,123.8,35.1);


(lib.jiantou2 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.jiantou();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.jiantou_1 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.jiantou();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.元件17 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsCKQgagLgQgUQgRgUgHgbQgJgbAAghQAAgbAJgdQAKgbAPgUQAQgUAXgMQAXgNAbAAQAfAAAWAMQAVAMAPAUQAOAUAGAaQAHAcAAAdIAAAPIi2AAQAAAVAGAQQAFARAMANQALANAQAHQAPAIATAAQAQAAAZgGQAWgEARgKIADAsQgVAIgYAFQgYACgXAAQghAAgYgKgAgYhjQgNAIgJAOQgIAOgEAOQgEAOAAAPICAAAQAAgNgCgRQgEgQgHgNQgGgMgNgJQgLgIgTAAQgPAAgNAJg");
	this.shape.setTransform(12,14.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,24.1,29.8);


(lib.元件16 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgBCzQgOgIgHgNQgHgNgDgSQgCgPAAgYIAAiXIg0AAIAAgpIA0AAIAAg+IA2gTIAABRIA9AAIAAApIg9AAIAACeIABASQABAHAEAHQAEAGAGAEQAHAEALAAQAPAAAPgHIACAqIgaAIQgNACgOAAQgWAAgMgHg");
	this.shape.setTransform(8.7,18.6);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,17.4,37.3);


(lib.元件15 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgaC+IAAkJIA1AAIAAEJgAgaiGIAAg3IA1AAIAAA3g");
	this.shape.setTransform(2.8,19.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,5.6,38.1);


(lib.元件14 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgaC+IAAl7IA1AAIAAF7g");
	this.shape.setTransform(2.8,19.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,5.5,38.1);


(lib.元件13 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhBCzQgYgSgQgcQgOgcgHgkQgFgoAAgdQAAgfAGglQAHglAOgaQAPgdAZgSQAagRAmgBQAoABAZARQAZASAPAdQAOAbAHAkQAGAkAAAgQAAAfgGAlQgGAkgOAcQgQAcgZASQgZATgoAAQgmgBgbgRgAgmiHQgOAPgIAWQgHAYgCAYQgCAZAAAZQAAAZACAYQACAbAHAXQAHAWAPAPQAOAPAYAAQAZAAAOgPQAPgPAHgXQAIgWABgcQADgXAAgZQAAgZgDgZQgBgbgIgVQgHgXgPgOQgOgPgZgBQgXABgPAPg");
	this.shape.setTransform(13.3,19.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,26.6,39.4);


(lib.元件12 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAPC+IAAk8IhAA4IgXgqIBehNIAzAAIAAF7g");
	this.shape.setTransform(7.4,19.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,14.7,38.1);


(lib.元件11 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsCJQgagLgQgUQgRgUgHgbQgJgcAAgfQAAgcAJgdQAKgcAPgSQARgWAXgLQAWgMAcAAQAfAAAVALQAVAMAPAUQAOAUAHAbQAGAbAAAeIAAAOIi2AAQAAASAGAUQAGASALAMQALANAQAHQANAHAVAAQATAAAWgFQAXgFAQgKIADAsQgUAJgZAEQgXADgYAAQggAAgZgLgAgYhkQgNAJgIANQgJAPgEAOQgEASAAALICBAAQAAgNgDgSQgEgRgHgLQgHgOgMgHQgMgJgRAAQgQABgNAIg");
	this.shape.setTransform(12,14.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,24.1,29.8);


(lib.元件10 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgBCyQgNgGgIgOQgHgMgDgUQgCgQAAgWIAAiXIg0AAIAAgqIA0AAIAAg9IA1gTIAABQIA+AAIAAAqIg+AAIAACeQAAAIACAJQAAAHAFAHQAEAIAGACQAGAFAMAAQAPgBAPgGIACAqQgLAEgQADQgOADgMAAQgWAAgMgIg");
	this.shape.setTransform(8.7,18.7);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,17.4,37.3);


(lib.元件9 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag7CQQgSgHgLgJQgMgIgIgRQgHgPAAgWQAAgbALgUQAMgTAVgKQAUgMAbgFQAZgFAfAAIAbABIAAgMQAAgfgPgRQgPgRgfAAQgTAAgWAFQgUAGgUAMIgDgsQATgIAYgFQAagGASAAQA2AAAdAaQAdAZAAA6IADC1Ig1AAIgCgtQgOAZgXANQgXAOgZgBQgTAAgQgEgAAOADQgRACgSAGQgRAGgLAMQgMANAAAVQAAAYAQAKQAOALAVAAQATAAANgHQANgHAJgNQAIgNADgRQAEgPAAgTIAAgPg");
	this.shape.setTransform(11.7,14.9);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,23.4,29.8);


(lib.元件8 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ACSC+IAAlPIh4FPIg1AAIh5lPIAAFPIg3AAIAAl7IBbAAIBwE3IBwk3IBbAAIAAF7g");
	this.shape.setTransform(20.4,19.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,40.8,38.2);


(lib.元件7 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgsC9IAAl5IBZAAIAAF5g");
	this.shape.setTransform(4.5,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,9,37.9);


(lib.元件6 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAWC9QgpAAgZgGQgggHgcgUQg/gvAAhnQAAhjAvgvQAvgwBhAAICQAAIAABCIiOAAQhagBgGBZIDuAAIAABAIjuAAQAAAyAYAWQAWAUAyAAICOAAIAABDg");
	this.shape.setTransform(16.8,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,33.7,37.9);


(lib.元件5 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABWC9IhWkaIhMEaIhqAAIiIl5IBcAAIBfEhIBQkhIBkAAIBcEhIBZkhIBZAAIiAF5g");
	this.shape.setTransform(31.9,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,63.9,37.9);


(lib.元件4 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AB8C9IgmhaIixAAIgkBaIhcAAICul5IBaAAICvF5gAg/AeIB5AAIg8iPg");
	this.shape.setTransform(22,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,44,37.9);


(lib.元件3 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhaCzQgmgNgZgcQgOgOgFgaQgFgXAAgmIAAjjIBWAAIAADhQAAAzAUAWQAVAVAyAAQA0AAAVgVQATgWAAgzIAAjhIBWAAIAADjQAABMgYAZQgZAcgmANQglAMg2AAQg1AAglgMg");
	this.shape.setTransform(17.8,19.1);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,35.7,38.3);


(lib.元件2 = function() {
	this.initialize();

	// 图层 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABfC9IAAifIi+AAIAACfIhWAAIAAl5IBWAAIAACZIC+AAIAAiZIBXAAIAAF5g");
	this.shape.setTransform(18.3,19);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,36.5,37.9);


(lib._000045 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000044 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000043 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_2();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000042 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_2();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000041 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_3();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000040 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_3();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000039 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_5();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000038 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_5();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000035 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_6();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000034 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_6();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000033 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_8();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000032 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_8();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000031 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_9();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000030 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_9();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000028 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_10();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000027 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p17_10();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000026 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p15_2();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000025 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p15_2();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000014 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p10_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000013 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p10_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000012 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p9_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000011 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p9_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._000010 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p8_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00009 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p8_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00008 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p7_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00007 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p6_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00006 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p6_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00005 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p6_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00004 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00003 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00002 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p2_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib._00001 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p2_1();
	this.instance.setTransform(-320,-504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-320,-504,640,1008);


(lib.p31content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.p31mc5("single",0);
	this.instance.setTransform(320,1123.5,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(43).to({_off:false},0).to({y:504,alpha:1},24,cjs.Ease.get(1)).wait(18));

	// 图层 4
	this.instance_1 = new lib.p31mc4("single",0);
	this.instance_1.setTransform(320,1123.5,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(34).to({_off:false},0).to({y:504,alpha:1},24,cjs.Ease.get(1)).wait(27));

	// 图层 3
	this.instance_2 = new lib.p31mc3("single",0);
	this.instance_2.setTransform(320,1123.5,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).to({y:504,alpha:1},24,cjs.Ease.get(1)).wait(34));

	// 图层 2
	this.instance_3 = new lib.p31mc2("single",0);
	this.instance_3.setTransform(320,1123.5,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).to({y:504,alpha:1},24,cjs.Ease.get(1)).wait(42));

	// 图层 6
	this.instance_4 = new lib.p31mc1("single",0);
	this.instance_4.setTransform(320,1123.5,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(11).to({_off:false},0).to({y:504,alpha:1},24,cjs.Ease.get(1)).wait(50));

	// bg
	this.instance_5 = new lib.p31mc6("single",0);
	this.instance_5.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},24,cjs.Ease.get(1)).wait(61));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p30content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc5
	this.instance = new lib.p30mc5("single",0);
	this.instance.setTransform(-144,504,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(47).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(15));

	// mc4
	this.instance_1 = new lib.p30mc4("single",0);
	this.instance_1.setTransform(320,794,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(32).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(30));

	// mc3
	this.instance_2 = new lib.p30mc3("single",0);
	this.instance_2.setTransform(320,794,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(23).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(39));

	// mc2
	this.instance_3 = new lib.p30mc2("single",0);
	this.instance_3.setTransform(320,794,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(48));

	// bg
	this.instance_4 = new lib.p30mc1("single",0);
	this.instance_4.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:1},23,cjs.Ease.get(1)).wait(62));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p29content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc9
	this.instance = new lib.p29mc9("single",0);
	this.instance.setTransform(421.5,600.6,1,1,0,0,0,320,29.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(89).to({_off:false},0).to({x:320},23,cjs.Ease.get(1)).wait(1));

	// mc8
	this.instance_1 = new lib.p29mc8("single",0);
	this.instance_1.setTransform(421.5,542,1,1,0,0,0,320,29.3);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(80).to({_off:false},0).to({x:320},23,cjs.Ease.get(1)).wait(10));

	// mc7
	this.instance_2 = new lib.p29mc7("single",0);
	this.instance_2.setTransform(421.5,488.6,1,1,0,0,0,320,24.2);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(71).to({_off:false},0).to({x:320},23,cjs.Ease.get(1)).wait(19));

	// mc6
	this.instance_3 = new lib.p29mc6("single",0);
	this.instance_3.setTransform(421.5,414.6,1,1,0,0,0,320,49.8);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(61).to({_off:false},0).to({x:320},23,cjs.Ease.get(1)).wait(29));

	// mc4
	this.instance_4 = new lib.p29mc4("single",0);
	this.instance_4.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(48).to({_off:false},0).to({y:414.1,alpha:1},23,cjs.Ease.get(1)).wait(42));

	// mc3
	this.instance_5 = new lib.p29mc3("single",0);
	this.instance_5.setTransform(40.2,504,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(25).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(65));

	// 图层 2
	this.instance_6 = new lib.p29mc10();
	this.instance_6.setTransform(320,818,1,1,0,0,0,320,429.9);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(18).to({_off:false},0).to({y:578},24).wait(71));

	// mc2
	this.instance_7 = new lib.p29mc2("single",0);
	this.instance_7.setTransform(320,678,1,1,0,0,0,320,504);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(12).to({_off:false},0).to({y:504},23,cjs.Ease.get(1)).wait(78));

	// bg
	this.instance_8 = new lib.p29mc1("single",0);
	this.instance_8.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_8.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).to({alpha:1},23,cjs.Ease.get(1)).wait(90));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p28content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc6
	this.instance = new lib.p28mc6("single",0);
	this.instance.setTransform(523,787.5,1,1,0,0,0,320,89.4);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(47).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(20));

	// mc5
	this.instance_1 = new lib.p28mc5("single",0);
	this.instance_1.setTransform(523,613.9,1,1,0,0,0,320,84.3);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(39).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(28));

	// mc4
	this.instance_2 = new lib.p28mc4("single",0);
	this.instance_2.setTransform(523,452,1,1,0,0,0,320,77.6);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(30).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(37));

	// mc3
	this.instance_3 = new lib.p28mc3("single",0);
	this.instance_3.setTransform(44.5,504,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(22).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).to({_off:true},31).wait(14));

	// mc2
	this.instance_4 = new lib.p28mc2("single",0);
	this.instance_4.setTransform(320,678,1,1,0,0,0,320,504);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(10).to({_off:false},0).to({y:504},23,cjs.Ease.get(1)).wait(57));

	// bg
	this.instance_5 = new lib.p28mc1("single",0);
	this.instance_5.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},23,cjs.Ease.get(1)).wait(67));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p25content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc8
	this.instance = new lib.p25mc8("single",0);
	this.instance.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(77).to({_off:false},0).to({alpha:1},23,cjs.Ease.get(1)).wait(10));

	// mc7
	this.instance_1 = new lib.p25mc7("single",0);
	this.instance_1.setTransform(190.7,553.3,0.004,0.004,0,0,0,129.5,146.5);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(56).to({_off:false},0).to({regX:129.7,scaleX:1,scaleY:1,x:287.9,y:567.3,alpha:1},23).wait(31));

	// mc6
	this.instance_2 = new lib.p25mc6("single",0);
	this.instance_2.setTransform(320,852,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(48).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(39));

	// mc5
	this.instance_3 = new lib.p25mc5("single",0);
	this.instance_3.setTransform(319.3,852.7,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(39).to({_off:false},0).to({y:504.7,alpha:1},23,cjs.Ease.get(1)).wait(48));

	// mc4
	this.instance_4 = new lib.p25mc4("single",0);
	this.instance_4.setTransform(320,852,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(30).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(57));

	// mc3
	this.instance_5 = new lib.p25mc3("single",0);
	this.instance_5.setTransform(320,852,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(66));

	// mc2
	this.instance_6 = new lib.p25mc2("single",0);
	this.instance_6.setTransform(320,852,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(12).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(75));

	// bg
	this.instance_7 = new lib.p25mc1("single",0);
	this.instance_7.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({alpha:1},23,cjs.Ease.get(1)).wait(87));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p24mc3 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p24mc8("synched",0);
	this.instance.setTransform(320,27,1,1,0,0,0,320,27);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,54);


(lib.p24content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc6
	this.instance = new lib.p24mc6("single",0);
	this.instance.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(70).to({_off:false},0).to({alpha:1},23,cjs.Ease.get(1)).wait(12));

	// mc5
	this.instance_1 = new lib.p24mc5("single",0);
	this.instance_1.setTransform(320,729,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(54).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(28));

	// mc4
	this.instance_2 = new lib.p24mc4("single",0);
	this.instance_2.setTransform(56,504,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(46).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(36));

	// mc10
	this.instance_3 = new lib.p24mc10("single",0);
	this.instance_3.setTransform(320,490.3,1,1,0,0,0,320,19.4);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(39).to({_off:false},0).to({y:265.3,alpha:1},23,cjs.Ease.get(1)).wait(43));

	// mc9
	this.instance_4 = new lib.p24mc9("single",0);
	this.instance_4.setTransform(320,450.7,1,1,0,0,0,320,17.3);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(31).to({_off:false},0).to({y:225.7,alpha:1},23,cjs.Ease.get(1)).wait(51));

	// mc3
	this.instance_5 = new lib.p24mc3("single",0);
	this.instance_5.setTransform(320,406.4,1,1,0,0,0,320,27);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(23).to({_off:false},0).to({y:181.4,alpha:1},23,cjs.Ease.get(1)).wait(59));

	// mc2
	this.instance_6 = new lib.p24mc2("single",0);
	this.instance_6.setTransform(320,729,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(14).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(68));

	// bg
	this.instance_7 = new lib.p24mc1("single",0);
	this.instance_7.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({alpha:1},23,cjs.Ease.get(1)).wait(82));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p23content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc5-2
	this.instance = new lib.p23mc32("single",0);
	this.instance.setTransform(320,567.5,1,1,0,0,0,320,17.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(72).to({_off:false},0).to({y:507.5},23,cjs.Ease.get(1)).wait(12));

	// mc5-1
	this.instance_1 = new lib.p23mc31("single",0);
	this.instance_1.setTransform(320,494,1,1,0,0,0,320,56.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(63).to({_off:false},0).to({y:434},23,cjs.Ease.get(1)).wait(21));

	// mc6
	this.instance_2 = new lib.p23mc6("single",0);
	this.instance_2.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(53).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(31));

	// 图层 2
	this.instance_3 = new lib.p23mc4();
	this.instance_3.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(76).to({_off:false},0).wait(31));

	// mc4
	this.instance_4 = new lib.p23mc4("single",0);
	this.instance_4.setTransform(-25,504,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(30).to({_off:false},0).to({x:320,alpha:1},23,cjs.Ease.get(1)).wait(54));

	// mc3
	this.instance_5 = new lib.p23_3_1("single",0);
	this.instance_5.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(63));

	// mc2
	this.instance_6 = new lib.p23mc2("single",0);
	this.instance_6.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(11).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(73));

	// mc1
	this.instance_7 = new lib.p23mc1("single",0);
	this.instance_7.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_7.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({alpha:1},23,cjs.Ease.get(1)).wait(84));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p22content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc6
	this.instance = new lib.p22mc6("single",0);
	this.instance.setTransform(320,944,1,1,0,0,0,320,504);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(66).to({_off:false},0).to({y:522},13,cjs.Ease.get(1)).wait(17).to({y:524},0).to({y:312},13,cjs.Ease.get(1)).wait(17));

	// 图层 2
	this.instance_1 = new lib.p27mc7("single",0);
	this.instance_1.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(96).to({_off:false},0).to({alpha:1,mode:"synched"},13,cjs.Ease.get(1)).wait(17));

	// mc5
	this.instance_2 = new lib.p22mc5("single",0);
	this.instance_2.setTransform(695,504,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(36).to({_off:false},0).to({x:320,alpha:1},19,cjs.Ease.get(1)).wait(71));

	// mc4
	this.instance_3 = new lib.p22mc4("single",0);
	this.instance_3.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(28).to({_off:false},0).to({y:504,alpha:1},19,cjs.Ease.get(1)).wait(79));

	// mc3
	this.instance_4 = new lib.p22mc3("single",0);
	this.instance_4.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(21).to({_off:false},0).to({y:504,alpha:1},17,cjs.Ease.get(1)).wait(88));

	// mc2
	this.instance_5 = new lib.p22mc2("single",0);
	this.instance_5.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(14).to({_off:false},0).to({y:504,alpha:1},18,cjs.Ease.get(1)).wait(94));

	// bg
	this.instance_6 = new lib.p22mc1("single",0);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1},22,cjs.Ease.get(1)).wait(104));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p21content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc5
	this.instance = new lib.p21mc5("single",0);
	this.instance.setTransform(320,1164,1,1,0,0,0,320,504);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({_off:false},0).to({y:504},21,cjs.Ease.get(1)).wait(51));

	// mc4
	this.instance_1 = new lib.p21_4_1("single",0);
	this.instance_1.setTransform(320,714,1,1,0,0,0,320,504);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(53).to({_off:false},0).to({y:504},22,cjs.Ease.get(1)).wait(15));

	// mc3
	this.instance_2 = new lib.p21_3_1("single",0);
	this.instance_2.setTransform(320,714,1,1,0,0,0,320,504);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(46).to({_off:false},0).to({y:504},23,cjs.Ease.get(1)).wait(21));

	// mc2
	this.instance_3 = new lib.p21_2_2("single",0);
	this.instance_3.setTransform(320,714,1,1,0,0,0,320,504);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(13).to({_off:false},0).to({y:504},22,cjs.Ease.get(1)).wait(55));

	// bg
	this.instance_4 = new lib.p12mc8("synched",0);
	this.instance_4.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(40).to({_off:false},0).to({alpha:1},16,cjs.Ease.get(1)).wait(34));

	// bg
	this.instance_5 = new lib.p21_1_1("single",0);
	this.instance_5.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},23,cjs.Ease.get(1)).wait(67));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p20content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc6
	this.instance = new lib.p20mc6("single",0);
	this.instance.setTransform(320,654,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(58).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(9));

	// mc5
	this.instance_1 = new lib.p20mc5("single",0);
	this.instance_1.setTransform(320,654,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(47).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(20));

	// mc4
	this.instance_2 = new lib.p20mc4("single",0);
	this.instance_2.setTransform(320,1179,1,1,0,0,0,320,504);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35).to({_off:false},0).to({y:504},23,cjs.Ease.get(1)).wait(32));

	// mc3
	this.instance_3 = new lib.p20mc3("single",0);
	this.instance_3.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(43));

	// mc2
	this.instance_4 = new lib.p20mc2("single",0);
	this.instance_4.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(13).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(54));

	// bg
	this.instance_5 = new lib.p20mc1("single",0);
	this.instance_5.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1},23,cjs.Ease.get(1)).wait(67));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p19content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc2
	this.instance = new lib.p19mc2("single",0);
	this.instance.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(14).to({_off:false},0).wait(1).to({y:668.7,alpha:0.085},0).wait(1).to({y:654.1,alpha:0.166},0).wait(1).to({y:640.1,alpha:0.244},0).wait(1).to({y:626.8,alpha:0.318},0).wait(1).to({y:614.2,alpha:0.388},0).wait(1).to({y:602.3,alpha:0.454},0).wait(1).to({y:591.1,alpha:0.516},0).wait(1).to({y:580.6,alpha:0.575},0).wait(1).to({y:570.7,alpha:0.629},0).wait(1).to({y:561.5,alpha:0.681},0).wait(1).to({y:553,alpha:0.728},0).wait(1).to({y:545.2,alpha:0.771},0).wait(1).to({y:538,alpha:0.811},0).wait(1).to({y:531.6,alpha:0.847},0).wait(1).to({y:525.8,alpha:0.879},0).wait(1).to({y:520.7,alpha:0.907},0).wait(1).to({y:516.2,alpha:0.932},0).wait(1).to({y:512.5,alpha:0.953},0).wait(1).to({y:509.4,alpha:0.97},0).wait(1).to({y:507.1,alpha:0.983},0).wait(1).to({y:505.4,alpha:0.992},0).wait(1).to({y:504.3,alpha:0.998},0).wait(1).to({y:504,alpha:1},0).wait(23));

	// bg
	this.instance_1 = new lib.p19mc1("single",0);
	this.instance_1.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({alpha:0.085},0).wait(1).to({alpha:0.166},0).wait(1).to({alpha:0.244},0).wait(1).to({alpha:0.318},0).wait(1).to({alpha:0.388},0).wait(1).to({alpha:0.454},0).wait(1).to({alpha:0.516},0).wait(1).to({alpha:0.575},0).wait(1).to({alpha:0.629},0).wait(1).to({alpha:0.681},0).wait(1).to({alpha:0.728},0).wait(1).to({alpha:0.771},0).wait(1).to({alpha:0.811},0).wait(1).to({alpha:0.847},0).wait(1).to({alpha:0.879},0).wait(1).to({alpha:0.907},0).wait(1).to({alpha:0.932},0).wait(1).to({alpha:0.953},0).wait(1).to({alpha:0.97},0).wait(1).to({alpha:0.983},0).wait(1).to({alpha:0.992},0).wait(1).to({alpha:0.998},0).wait(1).to({alpha:1},0).wait(37));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p17content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// mc9
	this.instance = new lib._000027("single",0);
	this.instance.setTransform(320,604);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.instance_1 = new lib._000028("synched",0);
	this.instance_1.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},113).to({state:[{t:this.instance_1}]},22).wait(17));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(113).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(17));

	// mc8
	this.instance_2 = new lib._000030("single",0);
	this.instance_2.setTransform(320,604);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.instance_3 = new lib._000031("synched",0);
	this.instance_3.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},108).to({state:[{t:this.instance_3}]},22).wait(22));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(108).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(22));

	// mc7
	this.instance_4 = new lib._000032("single",0);
	this.instance_4.setTransform(320,604);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.instance_5 = new lib._000033("synched",0);
	this.instance_5.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},102).to({state:[{t:this.instance_5}]},22).wait(28));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(102).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(28));

	// mc6
	this.instance_6 = new lib._000034("single",0);
	this.instance_6.setTransform(320,604);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.instance_7 = new lib._000035("synched",0);
	this.instance_7.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},96).to({state:[{t:this.instance_7}]},22).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(96).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(34));

	// mc5
	this.instance_8 = new lib._000038("single",0);
	this.instance_8.setTransform(320,604);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.instance_9 = new lib._000039("synched",0);
	this.instance_9.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_8}]},57).to({state:[{t:this.instance_9}]},22).wait(73));
	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(57).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(73));

	// mc3
	this.instance_10 = new lib._000040("single",0);
	this.instance_10.setTransform(320,604);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.instance_11 = new lib._000041("synched",0);
	this.instance_11.setTransform(320,504);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(35).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(95));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(35).to({_off:false},22,cjs.Ease.get(1)).wait(32).to({startPosition:0},0).to({alpha:0,mode:"single"},16).wait(47));

	// mc2
	this.instance_12 = new lib._000042("single",0);
	this.instance_12.setTransform(320,604);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.instance_13 = new lib._000043("synched",0);
	this.instance_13.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},22).to({state:[{t:this.instance_13}]},22).wait(108));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(22).to({_off:false},0).to({_off:true,y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(108));

	// bg
	this.instance_14 = new lib._000044("single",0);
	this.instance_14.setTransform(320,504);
	this.instance_14.alpha = 0;

	this.instance_15 = new lib._000045("synched",0);
	this.instance_15.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14}]}).to({state:[{t:this.instance_15}]},22).wait(130));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).to({_off:true,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(130));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p15content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 6
	this.instance = new lib.p15mc6();
	this.instance.setTransform(320,758,1,1,0,0,0,320,329.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(35).to({_off:false},0).to({y:678,alpha:1},21,cjs.Ease.get(1)).wait(18));

	// 图层 5
	this.instance_1 = new lib.p15mc5();
	this.instance_1.setTransform(320,409.1,1,1,0,0,0,320,19);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(31).to({_off:false},0).to({y:329.1,alpha:1},21,cjs.Ease.get(1)).wait(22));

	// 图层 4
	this.instance_2 = new lib.p15mc3("single",0);
	this.instance_2.setTransform(320,755,1,1,0,0,0,320,372.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(26).to({_off:false},0).to({y:635,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(26));

	// 图层 3
	this.instance_3 = new lib.p15mc2("single",0);
	this.instance_3.setTransform(320,346,1,1,0,0,0,320,36);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(18).to({_off:false},0).to({y:226,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(34));

	// 图层 1
	this.instance_4 = new lib.p15mc1("single",0);
	this.instance_4.setTransform(320,215,1,1,0,0,0,320,95);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({y:95,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(43));

	// 图层 2
	this.instance_5 = new lib._000025("single",0);
	this.instance_5.setTransform(320,504);
	this.instance_5.alpha = 0;

	this.instance_6 = new lib._000026("synched",0);
	this.instance_6.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},22).wait(52));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(52));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p14content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 6
	this.instance = new lib.p14mc4("single",0);
	this.instance.setTransform(320,713.1,0.24,0.24,0,0,0,319.9,294.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(68).to({_off:false},0).to({regX:320,scaleX:1,scaleY:1,y:713,alpha:1,mode:"synched"},19,cjs.Ease.get(1)).wait(12));

	// 图层 8
	this.instance_1 = new lib.p14mc7();
	this.instance_1.setTransform(320,553.1,1,1,0,0,0,320,45);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(61).to({_off:false},0).to({y:373.1,alpha:1},20).wait(18));

	// 图层 7
	this.instance_2 = new lib.p14mc8();
	this.instance_2.setTransform(320,491.1,1,1,0,0,0,320,17);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(55).to({_off:false},0).to({y:311.1,alpha:1},20).wait(24));

	// 图层 5
	this.instance_3 = new lib.p14mc3("single",0);
	this.instance_3.setTransform(320,513.1,1,1,0,0,0,320,85);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(49).to({_off:false},0).to({y:333.1,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(28));

	// 图层 4
	this.instance_4 = new lib.p14mc2("single",0);
	this.instance_4.setTransform(320,398,1,1,0,0,0,320,30);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(40).to({_off:false},0).to({y:218,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(37));

	// 图层 3
	this.instance_5 = new lib.p14mc1("single",0);
	this.instance_5.setTransform(320,274,1,1,0,0,0,320,94);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(31).to({_off:false},0).to({y:94,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(46));

	// 图层 1
	this.instance_6 = new lib.p14mc6("single",0);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(77));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p13content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 3
	this.instance = new lib.p13mc3();
	this.instance.setTransform(320,698,1,1,0,0,0,320,409.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(19).to({_off:false},0).to({y:598,alpha:1},18,cjs.Ease.get(1)).wait(44));

	// 图层 2
	this.instance_1 = new lib.p13mc1("single",0);
	this.instance_1.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(10).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},19,cjs.Ease.get(1)).wait(52));

	// 图层 1
	this.instance_2 = new lib.p13mc2("single",0);
	this.instance_2.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(59));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p12content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.p12mc4("single",0);
	this.instance.setTransform(108,408,0.176,0.176,0,0,0,107.8,408);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(67).to({_off:false},0).to({regX:108,scaleX:1,scaleY:1,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(20));

	// 图层 4
	this.instance_1 = new lib.p12mc5("single",0);
	this.instance_1.setTransform(104,416,0.322,0.322,0,0,0,103.9,416);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(78).to({_off:false},0).to({regX:102,regY:414,scaleX:1,scaleY:1,x:102,y:414,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(9));

	// 图层 3
	this.instance_2 = new lib.p12mc6("single",0);
	this.instance_2.setTransform(320,764,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(48).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(39));

	// 图层 7
	this.instance_3 = new lib.p12mc3("single",0);
	this.instance_3.setTransform(320,704,1,1,0,0,0,320,383.9);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(24).to({_off:false},0).to({y:624,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(63));

	// 图层 6
	this.instance_4 = new lib.p12mc2("single",0);
	this.instance_4.setTransform(320,298,1,1,0,0,0,320,22);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(17).to({_off:false},0).to({y:218,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(70));

	// 图层 2
	this.instance_5 = new lib.p12mc1("single",0);
	this.instance_5.setTransform(320,178,1,1,0,0,0,320,98);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(12).to({_off:false},0).to({y:98,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(75));

	// 图层 1
	this.instance_6 = new lib.p12mc7("single",0);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(87));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p11cotnent = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 8
	this.instance = new lib.p11mc8("single",0);
	this.instance.setTransform(320,664,1,1,0,0,0,320,343.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(87).to({_off:false},0).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(2));

	// 图层 1
	this.instance_1 = new lib.p11mc7("single",0);
	this.instance_1.setTransform(320,283.1,1,1,0,0,0,320,37);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(87).to({_off:false},0).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(2));

	// 图层 7
	this.instance_2 = new lib.p11mc4("single",0);
	this.instance_2.setTransform(320,785,1,1,0,0,0,320,342.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(44).to({_off:false},0).to({y:665,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(45));

	// 图层 6
	this.instance_3 = new lib.p11mc3("single",0);
	this.instance_3.setTransform(320,402.1,1,1,0,0,0,320,40);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(34).to({_off:false},0).to({y:282.1,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(31).to({startPosition:0},0).to({alpha:0},22,cjs.Ease.get(1)).wait(2));

	// 图层 5
	this.instance_4 = new lib.p11mc2("single",0);
	this.instance_4.setTransform(320,334,1,1,0,0,0,320,28);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(22).to({_off:false},0).to({y:214,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(67));

	// 图层 4
	this.instance_5 = new lib.p11mc1("single",0);
	this.instance_5.setTransform(320,213,1,1,0,0,0,320,93);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(12).to({_off:false},0).to({y:93,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(77));

	// 图层 2
	this.instance_6 = new lib.p11mc10("single",0);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(89));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p10content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.P10MC5("synched",0);
	this.instance.setTransform(221,402.1,1,1,0,0,0,83.5,83.5);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(43).to({_off:false},0).to({alpha:1},17).wait(29));

	// 图层 4
	this.instance_1 = new lib.p10mc3("single",0);
	this.instance_1.setTransform(320,800,1,1,0,0,0,320,327.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(21).to({_off:false},0).to({y:680,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(46));

	// 图层 3
	this.instance_2 = new lib.p10mc2("single",0);
	this.instance_2.setTransform(320,398.1,1,1,0,0,0,320,74);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(32).to({_off:false},0).to({y:278.1,alpha:1,mode:"synched"},21,cjs.Ease.get(1)).wait(36));

	// 图层 2
	this.instance_3 = new lib.p10mc1("single",0);
	this.instance_3.setTransform(320,222,1,1,0,0,0,320,102);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(13).to({_off:false},0).to({y:102,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(54));

	// 图层 1
	this.instance_4 = new lib._000013("single",0);
	this.instance_4.setTransform(320,504);
	this.instance_4.alpha = 0;

	this.instance_5 = new lib._000014("synched",0);
	this.instance_5.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},22).wait(67));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(67));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p9content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 6
	this.instance = new lib.p9mcxd();
	this.instance.setTransform(470.1,479.2,1,1,0,0,0,16.5,16.5);

	this.instance_1 = new lib.p9mcxd();
	this.instance_1.setTransform(418.6,479.2,1,1,0,0,0,16.5,16.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},46).wait(38));

	// 图层 5
	this.instance_2 = new lib.p9mc4("single",0);
	this.instance_2.setTransform(320,837,1,1,0,0,0,320,290.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(23).to({_off:false},0).to({y:717,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(38));

	// 图层 4
	this.instance_3 = new lib.p9mc3("single",0);
	this.instance_3.setTransform(320,491.1,1,1,0,0,0,320,55);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(53).to({_off:false},0).to({y:371.1,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(8));

	// 图层 3
	this.instance_4 = new lib.p9mc2("single",0);
	this.instance_4.setTransform(320,380.1,1,1,0,0,0,320,56);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(47).to({_off:false},0).to({y:260.1,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(14));

	// 图层 1
	this.instance_5 = new lib.p9mc1("single",0);
	this.instance_5.setTransform(320,222,1,1,0,0,0,320,102);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(13).to({_off:false},0).to({y:102,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(48));

	// 图层 2
	this.instance_6 = new lib._000011("single",0);
	this.instance_6.setTransform(320,504);
	this.instance_6.alpha = 0;

	this.instance_7 = new lib._000012("synched",0);
	this.instance_7.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_7}]},23).wait(61));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:true,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(61));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p8content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.p8mc4("single",0);
	this.instance.setTransform(682.1,631,1,1,0,0,0,138,376.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(46).to({_off:false},0).to({x:502.1,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(21));

	// 图层 4
	this.instance_1 = new lib.p8mc3("single",0);
	this.instance_1.setTransform(2,631,1,1,0,0,0,182,376.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(37).to({_off:false},0).to({x:182,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(30));

	// 图层 3
	this.instance_2 = new lib.p8mc2("single",0);
	this.instance_2.setTransform(320,282,1,1,0,0,0,320,52);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},0).to({y:202,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(43));

	// 图层 1
	this.instance_3 = new lib.p8mc1("single",0);
	this.instance_3.setTransform(320,155,1,1,0,0,0,320,75);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(16).to({_off:false},0).to({y:75,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(51));

	// 图层 2
	this.instance_4 = new lib._00009("single",0);
	this.instance_4.setTransform(320,504);
	this.instance_4.alpha = 0;

	this.instance_5 = new lib._000010("synched",0);
	this.instance_5.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},23).wait(67));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(67));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p7content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.p7mc5();
	this.instance.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(50).to({_off:false},0).to({alpha:1},14,cjs.Ease.get(1)).wait(12));

	// 图层 6
	this.instance_1 = new lib.p7mcdz();
	this.instance_1.setTransform(-106.2,607.2,0.412,0.421,0,0,0,-390.1,182);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(50).to({_off:false},0).wait(26));

	// 图层 4
	this.instance_2 = new lib.p7mc3("single",0);
	this.instance_2.setTransform(320,901,1,1,0,0,0,320,266.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(28).to({_off:false},0).to({y:741,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(26));

	// 图层 3
	this.instance_3 = new lib.p7mc2("single",0);
	this.instance_3.setTransform(320,501.1,1,1,0,0,0,320,133);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(18).to({_off:false},0).to({y:341.1,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(36));

	// 图层 2
	this.instance_4 = new lib.p7mc1("single",0);
	this.instance_4.setTransform(320,264,1,1,0,0,0,320,104);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(10).to({_off:false},0).to({y:104,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(44));

	// 图层 1
	this.instance_5 = new lib._00007("single",0);
	this.instance_5.setTransform(320,504);
	this.instance_5.alpha = 0;

	this.instance_6 = new lib._00008("synched",0);
	this.instance_6.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},22).wait(54));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(54));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p6jiantou = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.jiantou3("synched",0);
	this.instance.setTransform(26,40.9,1,1,0,0,0,26,40.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:20.9},44,cjs.Ease.get(1)).to({y:40.9},55,cjs.Ease.get(1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45,49.8,123.8,35.1);


(lib.p6cpntent = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.p6jiantou();
	this.instance.setTransform(320.1,857.3,1,1,0,0,0,26,40.9);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(59).to({_off:false},0).wait(35));

	// 图层 4
	this.instance_1 = new lib.p6mc3("single",0);
	this.instance_1.setTransform(320,777,1,1,0,0,0,320,350.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(36).to({_off:false},0).to({y:657,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(35));

	// 图层 3
	this.instance_2 = new lib.p6mc2("single",0);
	this.instance_2.setTransform(320,343,1,1,0,0,0,320,83);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(24).to({_off:false},0).to({y:223,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(47));

	// 图层 1
	this.instance_3 = new lib.p6mc1("single",0);
	this.instance_3.setTransform(320,190,1,1,0,0,0,320,70);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(12).to({_off:false},0).to({y:70,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(59));

	// 图层 2
	this.instance_4 = new lib._00005("single",0);
	this.instance_4.setTransform(320,504);
	this.instance_4.alpha = 0;

	this.instance_5 = new lib._00006("synched",0);
	this.instance_5.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_5}]},23).wait(71));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({_off:true,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(71));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p5content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 8
	this.instance = new lib.p5mc6("single",0);
	this.instance.setTransform(38,671.2,1,1,0,0,0,98,335.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(69).to({_off:false},0).to({x:98,alpha:1,mode:"synched"},15).wait(31));

	// 图层 7
	this.instance_1 = new lib.p5mc7("single",0);
	this.instance_1.setTransform(418,1003.4,1,1,0,0,0,222,63.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).to({y:943.4,alpha:1,mode:"synched"},15).wait(31));

	// 图层 5
	this.instance_2 = new lib.p5mc5("single",0);
	this.instance_2.setTransform(320,792,1,1,0,0,0,320,335.9);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(47).to({_off:false},0).to({y:672,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(46));

	// 图层 4
	this.instance_3 = new lib.p5mc4("single",0);
	this.instance_3.setTransform(320,400.1,1,1,0,0,0,320,56);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(33).to({_off:false},0).to({y:280.1,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(60));

	// 图层 3
	this.instance_4 = new lib.p5mc3("single",0);
	this.instance_4.setTransform(320,305,1,1,0,0,0,320,39);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(19).to({_off:false},0).to({y:185,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(74));

	// 图层 1
	this.instance_5 = new lib.p5mc2("single",0);
	this.instance_5.setTransform(320,193,1,1,0,0,0,320,73);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(10).to({_off:false},0).to({y:73,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(83));

	// 图层 2
	this.instance_6 = new lib.p5mc1("single",0);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(93));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p4_content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 6
	this.instance = new lib.p4mc6("single",0);
	this.instance.setTransform(334.7,659.1,2.117,2.117,0,0,0,107.5,37.3);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(53).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1,mode:"synched"},12).wait(32));

	// 图层 7
	this.instance_1 = new lib.p3mc6("single",0);
	this.instance_1.setTransform(332.1,661.2,1,0.081,0,0,0,131,259);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(53).to({_off:false},0).to({scaleY:1,alpha:1,mode:"synched"},12).wait(32));

	// 图层 4
	this.instance_2 = new lib.p4mc1("single",0);
	this.instance_2.setTransform(320,584,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(10).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(65));

	// 图层 3
	this.instance_3 = new lib.p4mc2("single",0);
	this.instance_3.setTransform(320,584,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(56));

	// 图层 2
	this.instance_4 = new lib.p4mc3("single",0);
	this.instance_4.setTransform(320,584,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(31).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(44));

	// 图层 5
	this.instance_5 = new lib.p4mc4("single",0);
	this.instance_5.setTransform(320,584,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(43).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(32));

	// 图层 1
	this.instance_6 = new lib.p4mc5("single",0);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_6.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(75));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3mc5 = function() {
	this.initialize();

	// 图层 1
	this.instance = new lib.p3mc1("synched",0);
	this.instance.setTransform(320,504,1,1,0,0,0,320,504);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p3content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 7
	this.instance = new lib.p3mc7("single",0);
	this.instance.setTransform(346.1,633.2,2.577,2.577,0,0,0,87.5,36.2);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(46).to({_off:false},0).to({scaleX:1,scaleY:1,alpha:1,mode:"synched"},18,cjs.Ease.get(1)).wait(36));

	// 图层 6
	this.instance_1 = new lib.p3mc6("single",0);
	this.instance_1.setTransform(322.1,651.2,1,0.07,0,0,0,131,259);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(52).to({_off:false},0).to({scaleY:1,alpha:1,mode:"synched"},12,cjs.Ease.get(1)).wait(36));

	// 图层 4
	this.instance_2 = new lib.p3mc5("synched",0);
	this.instance_2.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(41).to({_off:false},0).to({alpha:0.371},23,cjs.Ease.get(1)).wait(36));

	// 图层 3
	this.instance_3 = new lib.p3mc2("synched",0);
	this.instance_3.setTransform(320,624,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(48));

	// 图层 2
	this.instance_4 = new lib.p3mc3("synched",0);
	this.instance_4.setTransform(320,624,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(18).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(59));

	// 图层 5
	this.instance_5 = new lib.p3mc4("synched",0);
	this.instance_5.setTransform(320,624,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(10).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(67));

	// 图层 1
	this.instance_6 = new lib._00003("single",0);
	this.instance_6.setTransform(320,504);
	this.instance_6.alpha = 0;

	this.instance_7 = new lib._00004("synched",0);
	this.instance_7.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_7}]},23).wait(77));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).to({_off:true,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(77));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p2content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 5
	this.instance = new lib.p2mc4("single",0);
	this.instance.setTransform(481.1,785,1,1,0,0,0,159,262.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30).to({_off:false},0).to({y:745,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).to({_off:true},3).wait(48));

	// 图层 4
	this.instance_1 = new lib.p2mc3("synched",0);
	this.instance_1.setTransform(161,785.1,1,1,0,0,0,161,262.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(25).to({_off:false},0).to({y:745.1,alpha:1},23,cjs.Ease.get(1)).to({_off:true},8).wait(48));

	// 图层 3
	this.instance_2 = new lib.p2mc2("synched",0);
	this.instance_2.setTransform(481.1,201.1,1,1,0,0,0,159,241.1);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(20).to({_off:false},0).to({y:241.1,alpha:1},23,cjs.Ease.get(1)).to({_off:true},13).wait(48));

	// 图层 1
	this.instance_3 = new lib.p2mc1("single",0);
	this.instance_3.setTransform(161,201.1,1,1,0,0,0,161,241.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(15).to({_off:false},0).to({y:241.1,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).to({_off:true},18).wait(48));

	// 图层 9
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AywAAMAlhAAA");
	this.shape.setTransform(289.7,483.8,0.033,1,0,0,0,120.7,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AizAAIFnAA");
	this.shape_1.setTransform(271.7,483.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("Ak3AAIJuAA");
	this.shape_2.setTransform(258.6,483.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AmxAAINjAA");
	this.shape_3.setTransform(246.3,483.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AoiAAIRGAA");
	this.shape_4.setTransform(235,483.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AqLAAIUXAA");
	this.shape_5.setTransform(224.5,483.8);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("ArqAAIXVAA");
	this.shape_6.setTransform(215,483.8);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AtAAAIaBAA");
	this.shape_7.setTransform(206.4,483.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AuNAAIcbAA");
	this.shape_8.setTransform(198.7,483.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AvRAAIejAA");
	this.shape_9.setTransform(191.9,483.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AwMAAMAgZAAA");
	this.shape_10.setTransform(186,483.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("Aw+AAMAh9AAA");
	this.shape_11.setTransform(181,483.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AxnAAMAjPAAA");
	this.shape_12.setTransform(176.9,483.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AyHAAMAkPAAA");
	this.shape_13.setTransform(173.7,483.8);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AydAAMAk7AAA");
	this.shape_14.setTransform(171.5,483.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AyrAAMAlXAAA");
	this.shape_15.setTransform(170.1,483.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape,p:{regX:120.7,scaleX:0.033,x:289.7}}]},15).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape,p:{regX:0,scaleX:1,x:169.7}}]},1).to({state:[]},25).wait(48));

	// 图层 8
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAA1IAAhp");
	this.shape_16.setTransform(320,519.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAC/IAAl9");
	this.shape_17.setTransform(320,533.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAFAIAAp/");
	this.shape_18.setTransform(320,546.1);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAG4IAAtv");
	this.shape_19.setTransform(320,558.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAInIAAxN");
	this.shape_20.setTransform(320,569.3);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAKNIAA0Z");
	this.shape_21.setTransform(320,579.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAALrIAA3U");
	this.shape_22.setTransform(320,588.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAM/IAA59");
	this.shape_23.setTransform(320,597.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAOLIAA8U");
	this.shape_24.setTransform(320,604.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAPNIAA+Z");
	this.shape_25.setTransform(320,611.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAQHMAAAggN");
	this.shape_26.setTransform(320,617.3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAQ4MAAAghv");
	this.shape_27.setTransform(320,622.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAARgMAAAgi/");
	this.shape_28.setTransform(320,626.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAR/MAAAgj9");
	this.shape_29.setTransform(320,629.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAASVMAAAgkp");
	this.shape_30.setTransform(320,631.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAASjMAAAglE");
	this.shape_31.setTransform(320,632.8);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAASnMAAAglN");
	this.shape_32.setTransform(320,633.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_16}]},15).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[]},25).wait(48));

	// 图层 7
	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AA1AAIhpAA");
	this.shape_33.setTransform(355.6,483.9);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("Ai/AAIF/AA");
	this.shape_34.setTransform(369.5,483.9);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AlBAAIKDAA");
	this.shape_35.setTransform(382.5,483.9);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("Am6AAIN1AA");
	this.shape_36.setTransform(394.6,483.9);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AoqAAIRVAA");
	this.shape_37.setTransform(405.8,483.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AqRAAIUjAA");
	this.shape_38.setTransform(416.1,483.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("ArwAAIXhAA");
	this.shape_39.setTransform(425.6,483.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AtFAAIaLAA");
	this.shape_40.setTransform(434.1,483.9);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AuRAAIcjAA");
	this.shape_41.setTransform(441.7,483.9);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AvUAAIepAA");
	this.shape_42.setTransform(448.4,483.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AwOAAMAgdAAA");
	this.shape_43.setTransform(454.2,483.9);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AxAAAMAiBAAA");
	this.shape_44.setTransform(459.2,483.9);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AxoAAMAjRAAA");
	this.shape_45.setTransform(463.2,483.9);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AyIAAMAkRAAA");
	this.shape_46.setTransform(466.4,483.9);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AyeAAMAk9AAA");
	this.shape_47.setTransform(468.6,483.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AyrAAMAlXAAA");
	this.shape_48.setTransform(469.9,483.9);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("ASxAAMglhAAA");
	this.shape_49.setTransform(470.4,483.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_33}]},15).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[]},25).wait(48));

	// 图层 2
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAg4IAABx");
	this.shape_50.setTransform(320,447.9);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAjBIAAGD");
	this.shape_51.setTransform(320,434.2);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAlCIAAKF");
	this.shape_52.setTransform(320,421.3);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAm5IAANz");
	this.shape_53.setTransform(320,409.3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAooIAARR");
	this.shape_54.setTransform(320,398.3);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAqOIAAUd");
	this.shape_55.setTransform(320,388.1);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAArrIAAXX");
	this.shape_56.setTransform(320,378.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAs/IAAZ/");
	this.shape_57.setTransform(320,370.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAuLIAAcX");
	this.shape_58.setTransform(320,362.8);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAvNIAAeb");
	this.shape_59.setTransform(320,356.2);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAwHMAAAAgP");
	this.shape_60.setTransform(320,350.4);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAw3MAAAAhv");
	this.shape_61.setTransform(320,345.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAxfMAAAAi/");
	this.shape_62.setTransform(320,341.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAx+MAAAAj9");
	this.shape_63.setTransform(320,338.5);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAyUMAAAAkp");
	this.shape_64.setTransform(320,336.2);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAyiMAAAAlF");
	this.shape_65.setTransform(320,334.9);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("rgba(51,51,51,0.631)").ss(1,1,1).p("AAAymMAAAAlN");
	this.shape_66.setTransform(320,334.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_50}]},15).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[]},25).wait(48));

	// 图层 6
	this.instance_4 = new lib.p2mc6("synched",0);
	this.instance_4.setTransform(320,624,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(9).to({_off:false},0).to({y:504,alpha:1},19,cjs.Ease.get(1)).to({_off:true},28).wait(48));

	// bg
	this.instance_5 = new lib._00001("single",0);
	this.instance_5.setTransform(320,504);
	this.instance_5.alpha = 0;

	this.instance_6 = new lib._00002("synched",0);
	this.instance_6.setTransform(320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5}]}).to({state:[{t:this.instance_6}]},23).to({state:[]},33).wait(48));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({_off:true,alpha:1,mode:"synched"},23,cjs.Ease.get(1)).wait(81));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.p1mc4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 4
	this.instance = new lib.p1mc4mc4();
	this.instance.setTransform(320,555,1,1,0,0,0,320,362.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(27).to({_off:false},0).to({y:495,alpha:1},22,cjs.Ease.get(1)).wait(32));

	// 图层 3
	this.instance_1 = new lib.p1mc4mc3();
	this.instance_1.setTransform(320,169.1,1,1,0,0,0,320,23);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(18).to({_off:false},0).to({y:109.1,alpha:1},22,cjs.Ease.get(1)).wait(41));

	// 图层 2
	this.instance_2 = new lib.p1mc4mc2();
	this.instance_2.setTransform(320,128.1,1,1,0,0,0,320,18);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(8).to({_off:false},0).to({y:68.1,alpha:1},22,cjs.Ease.get(1)).wait(51));

	// 图层 1
	this.instance_3 = new lib.p1mc4mc1();
	this.instance_3.setTransform(320,85,1,1,0,0,0,320,25);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({y:25,alpha:1},22,cjs.Ease.get(1)).wait(59));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,60,640,50.1);


(lib.p1content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 6
	this.instance = new lib.p1mc4("synched",0,false);
	this.instance.setTransform(320,579,1,1,0,0,0,320,429);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({_off:false},0).wait(77));

	// 图层 5
	this.instance_1 = new lib.p1mc5("single",0);
	this.instance_1.setTransform(320,255,1,1,0,0,0,320,75);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(11).to({_off:false},0).to({y:75,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(67));

	// 图层 4
	this.instance_2 = new lib.p1mc3("single",0);
	this.instance_2.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(55).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(23));

	// 图层 3
	this.instance_3 = new lib.p1mc2("single",0);
	this.instance_3.setTransform(320,684,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(45).to({_off:false},0).to({y:504,alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(33));

	// 图层 1
	this.instance_4 = new lib.p1mc1("single",0);
	this.instance_4.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({alpha:1,mode:"synched"},22,cjs.Ease.get(1)).wait(78));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


(lib.jiantou_mc2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.jiantou2("synched",0);
	this.instance.setTransform(31.5,16,1,1,180,0,0,31.5,16);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:26},29,cjs.Ease.get(-1)).to({y:6},60,cjs.Ease.get(1)).to({y:16},30,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.jiantou_mc = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.jiantou_1("synched",0);
	this.instance.setTransform(31.5,16,1,1,180,0,0,31.5,16);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:26},29,cjs.Ease.get(-1)).to({y:6},60,cjs.Ease.get(1)).to({y:16},30,cjs.Ease.get(-1)).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,63,32);


(lib.元件1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 元件 17
	this.instance = new lib.元件17("synched",0);
	this.instance.setTransform(857.5,24.4,1,1,0,0,0,12,14.9);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(31).to({_off:false},0).to({x:502.5,alpha:1},5).to({x:497.5},4).to({x:502.5},3).wait(74));

	// 元件 16
	this.instance_1 = new lib.元件16("synched",0);
	this.instance_1.setTransform(834.9,20.7,1,1,0,0,0,8.7,18.6);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(29).to({_off:false},0).to({x:479.9,alpha:1},5).to({x:474.9},4).to({x:479.9},3).wait(76));

	// 元件 15
	this.instance_2 = new lib.元件15("synched",0);
	this.instance_2.setTransform(819.2,19.7,1,1,0,0,0,2.8,19.1);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(27).to({_off:false},0).to({x:464.2,alpha:1},5).to({x:459.2},4).to({x:464.2},3).wait(78));

	// 元件 14
	this.instance_3 = new lib.元件14("synched",0);
	this.instance_3.setTransform(807.2,19.7,1,1,0,0,0,2.8,19.1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(25).to({_off:false},0).to({x:452.2,alpha:1},5).to({x:447.2},4).to({x:452.2},3).wait(80));

	// 元件 13
	this.instance_4 = new lib.元件13("synched",0);
	this.instance_4.setTransform(772.4,19.7,1,1,0,0,0,13.3,19.7);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(23).to({_off:false},0).to({x:417.4,alpha:1},5).to({x:412.4},4).to({x:417.4},3).wait(82));

	// 元件 12
	this.instance_5 = new lib.元件12("synched",0);
	this.instance_5.setTransform(747.9,19.7,1,1,0,0,0,7.4,19.1);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(21).to({_off:false},0).to({x:392.9,alpha:1},5).to({x:387.9},4).to({x:392.9},3).wait(84));

	// 元件 11
	this.instance_6 = new lib.元件11("synched",0);
	this.instance_6.setTransform(723.3,24.6,1,1,0,0,0,12,14.9);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(19).to({_off:false},0).to({x:368.3,alpha:1},5).to({x:363.3},4).to({x:368.3},3).wait(86));

	// 元件 10
	this.instance_7 = new lib.元件10("synched",0);
	this.instance_7.setTransform(700.5,20.9,1,1,0,0,0,8.7,18.7);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(16).to({_off:false},0).to({x:345.5,alpha:1},5).to({x:340.5},4).to({x:345.5},3).wait(89));

	// 元件 9
	this.instance_8 = new lib.元件9("synched",0);
	this.instance_8.setTransform(677,24.6,1,1,0,0,0,11.7,14.9);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(14).to({_off:false},0).to({x:322,alpha:1},5).to({x:317},4).to({x:322},3).wait(91));

	// 元件 8
	this.instance_9 = new lib.元件8("synched",0);
	this.instance_9.setTransform(639.9,19.8,1,1,0,0,0,20.4,19.1);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(12).to({_off:false},0).to({x:284.9,alpha:1},5).to({x:279.9},4).to({x:284.9},3).wait(93));

	// 元件 7
	this.instance_10 = new lib.元件7("synched",0);
	this.instance_10.setTransform(586.1,19.5,1,1,0,0,0,4.5,18.9);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(10).to({_off:false},0).to({x:231.1,alpha:1},5).to({x:226.1},4).to({x:231.1},3).wait(95));

	// 元件 6
	this.instance_11 = new lib.元件6("synched",0);
	this.instance_11.setTransform(557.1,19.5,1,1,0,0,0,16.8,18.9);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(8).to({_off:false},0).to({x:202.1,alpha:1},5).to({x:197.1},4).to({x:202.1},3).wait(97));

	// 元件 5
	this.instance_12 = new lib.元件5("synched",0);
	this.instance_12.setTransform(506.5,19.5,1,1,0,0,0,31.9,18.9);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(6).to({_off:false},0).to({x:151.5,alpha:1},5).to({x:146.5},4).to({x:151.5},3).wait(99));

	// 元件 4
	this.instance_13 = new lib.元件4("synched",0);
	this.instance_13.setTransform(457.9,19.5,1,1,0,0,0,22,18.9);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(4).to({_off:false},0).to({x:102.9,alpha:1},5).to({x:97.9},4).to({x:102.9},3).wait(101));

	// 元件 3
	this.instance_14 = new lib.元件3("synched",0);
	this.instance_14.setTransform(416.4,19.7,1,1,0,0,0,17.8,19.1);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(2).to({_off:false},0).to({x:61.4,alpha:1},5).to({x:56.4},4).to({x:61.4},3).wait(103));

	// 元件 2
	this.instance_15 = new lib.元件2("synched",0);
	this.instance_15.setTransform(373.3,19.5,1,1,0,0,0,18.3,18.9);
	this.instance_15.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).to({x:18.3,alpha:1},5).to({x:13.3},4).to({x:18.3},3).wait(105));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(355,0.6,36.5,37.9);


(lib.p32content = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 2
	this.instance = new lib.元件1("synched",0);
	this.instance.setTransform(320.1,190,1,1,0,0,0,257.3,19.7);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(99).to({_off:false},0).to({_off:true},47).wait(27));

	// 图层 5
	this.instance_1 = new lib.p32mc1("synched",0);
	this.instance_1.setTransform(320,681,1,1,0,0,0,320,504);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(37).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).to({_off:true},86).wait(27));

	// 图层 4
	this.instance_2 = new lib.p32mc2("synched",0);
	this.instance_2.setTransform(320,681,1,1,0,0,0,320,504);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(30).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).to({_off:true},93).wait(27));

	// 图层 3
	this.instance_3 = new lib.p32mc3("synched",0);
	this.instance_3.setTransform(320,681,1,1,0,0,0,320,504);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(22).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).to({_off:true},101).wait(27));

	// 图层 1
	this.instance_4 = new lib.p32mc4("synched",0);
	this.instance_4.setTransform(320,681,1,1,0,0,0,320,504);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(13).to({_off:false},0).to({y:504,alpha:1},23,cjs.Ease.get(1)).wait(49).to({startPosition:0},0).to({alpha:0,mode:"single"},18).to({_off:true},43).wait(27));

	// bg
	this.instance_5 = new lib.p32_mc5("single",0);
	this.instance_5.setTransform(320,504,1,1,0,0,0,320,504);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({alpha:1,mode:"synched"},23,cjs.Ease.get(1)).to({_off:true},123).wait(27));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,640,1008);


// stage content:



(lib.content = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{p1:2,p2:87,p3:143,p4:207,p5:279,p6:375,p7:440,p8:510,p9:583,p10:660,p11:731,p12:844,p13:952,p14:991,p15:1097,p16:1160,p17:1308,p18:1351,p19:1432,p20:1512,p21:1622,p22:1730,p23:1828,p24:1926,p25:2006,p26:2123,p27:2204,p28:2284});

	// timeline functions:
	this.frame_0 = function(obj) {
		this.stop();
        afc("PN3","d","none");
	}
	this.frame_1 = function(num) {
		this.gotoAndPlay("p"+num);
	}
	this.frame_86 = function() {
		this.stop();
	}
	this.frame_142 = function() {
		this.stop();
	}
	this.frame_206 = function() {
		this.stop();
	}
	this.frame_278 = function() {
		this.stop();
	}
	this.frame_374 = function() {
		this.stop();
	}
	this.frame_439 = function() {
		this.stop();
	}
	this.frame_509 = function() {
		this.stop();
	}
	this.frame_582 = function() {
		this.stop();
	}
	this.frame_629 = function(obj) {
		afc("p9","d","none");
		this.stop();
		afc("p9_btn","d","block");
		if(obj==1){this.play();}
	}
	this.frame_659 = function() {
		this.stop();
	}
	this.frame_704 = function(obj) {
		this.stop();
		afc("p10_btn","d","block");
		if(obj==1){this.play();}
	}
	this.frame_730 = function() {
		this.stop();
	}
	this.frame_815 = function(obj) {
		this.stop();
		afc("p11_btn","d","block");
		if(obj==1){this.play();}
	}
	this.frame_843 = function() {
		this.stop();
	}
	this.frame_951 = function() {
		this.stop();
	}
	this.frame_990 = function() {
		this.stop();
	}
	this.frame_1096 = function() {
		this.stop();
	}
	this.frame_1159 = function() {
		this.stop();
	}
	this.frame_1245 = function(obj) {
		afc("p16","d","none");
		this.stop();
		afc("p16_btn","d","block");
		if(obj==1){this.play();}
	}
	this.frame_1307 = function() {
		this.stop();
	}
	this.frame_1350 = function() {
		this.stop();
	}
	this.frame_1431 = function() {
		this.stop();
	}
	this.frame_1471 = function(obj) {
		afc("p19","d","none");
		this.stop();
		afc("p19_btn","d","block");
		if(obj==1){this.play();}
	}
	this.frame_1511 = function() {
		this.stop();
	}
	this.frame_1621 = function() {
		this.stop();
	}
	this.frame_1729 = function() {
		this.stop();
	}
	this.frame_1827 = function() {
		this.stop();
	}
	this.frame_1925 = function() {
		this.stop();
	}
	this.frame_2005 = function(obj) {
		this.stop();
		if(obj==1||obj==2||obj==3){
		this.p24mc.gotoAndStop("a"+obj);}else{this.p24mc.gotoAndPlay(0);}
	}
	this.frame_2122 = function() {
		this.stop();
	}
	this.frame_2203 = function() {
		this.stop();
	}
	this.frame_2283 = function() {
		this.stop();
	}
	this.frame_2429 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(85).call(this.frame_86).wait(56).call(this.frame_142).wait(64).call(this.frame_206).wait(72).call(this.frame_278).wait(96).call(this.frame_374).wait(65).call(this.frame_439).wait(70).call(this.frame_509).wait(73).call(this.frame_582).wait(47).call(this.frame_629).wait(30).call(this.frame_659).wait(71).call(this.frame_730).wait(85).call(this.frame_815).wait(28).call(this.frame_843).wait(108).call(this.frame_951).wait(39).call(this.frame_990).wait(106).call(this.frame_1096).wait(63).call(this.frame_1159).wait(86).call(this.frame_1245).wait(62).call(this.frame_1307).wait(43).call(this.frame_1350).wait(81).call(this.frame_1431).wait(40).call(this.frame_1471).wait(40).call(this.frame_1511).wait(110).call(this.frame_1621).wait(108).call(this.frame_1729).wait(98).call(this.frame_1827).wait(98).call(this.frame_1925).wait(80).call(this.frame_2005).wait(117).call(this.frame_2122).wait(81).call(this.frame_2203).wait(80).call(this.frame_2283).wait(146).call(this.frame_2429).wait(1));

	// jt
	this.instance = new lib.jiantou_mc2();
	this.instance.setTransform(320,980.3,1,1,0,0,0,31.5,16);
	this.instance._off = true;

	this.instance_1 = new lib.jiantou_mc();
	this.instance_1.setTransform(320,980.3,1,1,0,0,0,31.5,16);
	this.instance_1._off = true;

	this.instance_2 = new lib.p9mcxd();
	this.instance_2.setTransform(318.1,966.8,1.576,1.576,0,0,0,16.5,16.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","rgba(255,255,255,0.498)","rgba(255,255,255,0)"],[0,0.282,1],-0.1,-0.1,0,-0.1,-0.1,74.3).s().p("AoMIMQjZjaAAkyQAAkzDZjZQDZjZEzAAQEyAADbDZQDZDZAAEzQAAEyjZDaQjbDakyAAQkzAAjZjag");
	this.shape.setTransform(224.2,357.2);

	this.instance_3 = new lib.p9mcxd();
	this.instance_3.setTransform(332.1,611.2,1.031,1.031,0,0,0,16.5,16.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("EgY6ApeMAAAhS7MAx1AAAMAAABS7g");
	this.shape_1.setTransform(321.6,662.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(217,217,217,0.8)").s().p("EgY6ApeMAAAhS7MAx1AAAMAAABS7g");
	this.shape_2.setTransform(321.6,662.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(179,179,179,0.6)").s().p("EgY6ApeMAAAhS7MAx1AAAMAAABS7g");
	this.shape_3.setTransform(321.6,662.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(142,142,142,0.4)").s().p("EgY6ApeMAAAhS7MAx1AAAMAAABS7g");
	this.shape_4.setTransform(321.6,662.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(104,104,104,0.2)").s().p("EgY6ApeMAAAhS7MAx1AAAMAAABS7g");
	this.shape_5.setTransform(321.6,662.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(66,66,66,0)").s().p("EgY6ApeMAAAhS7MAx1AAAMAAABS7g");
	this.shape_6.setTransform(321.6,662.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},86).to({state:[]},1).to({state:[{t:this.instance_1}]},55).to({state:[]},1).to({state:[{t:this.instance_1}]},63).to({state:[]},1).to({state:[{t:this.instance_1}]},71).to({state:[]},1).to({state:[{t:this.instance}]},95).to({state:[]},1).to({state:[{t:this.instance}]},64).to({state:[]},1).to({state:[{t:this.instance}]},69).to({state:[]},1).to({state:[{t:this.instance}]},72).to({state:[]},1).to({state:[{t:this.instance}]},76).to({state:[]},1).to({state:[{t:this.instance}]},70).to({state:[]},1).to({state:[{t:this.instance_2,p:{scaleX:1.576,scaleY:1.576,x:318.1,y:966.8}}]},83).to({state:[{t:this.shape}]},2).to({state:[{t:this.instance}]},27).to({state:[]},1).to({state:[{t:this.instance}]},107).to({state:[]},1).to({state:[{t:this.instance}]},38).to({state:[]},1).to({state:[{t:this.instance}]},105).to({state:[]},1).to({state:[{t:this.instance}]},62).to({state:[]},1).to({state:[{t:this.instance_3},{t:this.instance_2,p:{scaleX:1.031,scaleY:1.031,x:332.1,y:664.7}}]},82).to({state:[]},4).to({state:[{t:this.instance_1}]},61).to({state:[]},1).to({state:[{t:this.instance}]},42).to({state:[]},1).to({state:[{t:this.instance_1}]},80).to({state:[]},1).to({state:[{t:this.instance_2,p:{scaleX:1.576,scaleY:1.576,x:318.1,y:966.8}}]},38).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[]},1).to({state:[{t:this.instance_1}]},33).to({state:[]},1).to({state:[{t:this.instance}]},109).to({state:[]},1).to({state:[{t:this.instance}]},107).to({state:[]},1).to({state:[{t:this.instance}]},97).to({state:[]},1).to({state:[{t:this.instance_1}]},97).to({state:[]},1).to({state:[{t:this.instance}]},79).to({state:[]},1).to({state:[{t:this.instance}]},116).to({state:[]},1).to({state:[{t:this.instance}]},80).to({state:[]},1).to({state:[{t:this.instance}]},79).to({state:[]},1).wait(146));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(86).to({_off:false},0).to({_off:true},1).wait(287).to({_off:false},0).to({_off:true},1).wait(64).to({_off:false},0).to({_off:true},1).wait(69).to({_off:false},0).to({_off:true},1).wait(72).to({_off:false},0).to({_off:true},1).wait(76).to({_off:false},0).to({_off:true},1).wait(70).to({_off:false},0).to({_off:true},1).wait(112).to({_off:false},0).to({_off:true},1).wait(107).to({_off:false},0).to({_off:true},1).wait(38).to({_off:false},0).to({_off:true},1).wait(105).to({_off:false},0).to({_off:true},1).wait(62).to({_off:false},0).to({_off:true},1).wait(190).to({_off:false},0).to({_off:true},1).wait(270).to({_off:false},0).to({_off:true},1).wait(107).to({_off:false},0).to({_off:true},1).wait(97).to({_off:false},0).to({_off:true},1).wait(177).to({_off:false},0).to({_off:true},1).wait(116).to({_off:false},0).to({_off:true},1).wait(80).to({_off:false},0).to({_off:true},1).wait(79).to({_off:false},0).to({_off:true},1).wait(146));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(142).to({_off:false},0).to({_off:true},1).wait(63).to({_off:false},0).to({_off:true},1).wait(71).to({_off:false},0).to({_off:true},1).wait(1028).to({_off:false},0).to({_off:true},1).wait(123).to({_off:false},0).to({_off:true},1).wait(79).to({_off:false},0).to({_off:true},1).wait(413).to({_off:false},0).to({_off:true},1).wait(504));

	// xg
	this.instance_4 = new lib.leaf_1_7_37930();
	this.instance_4.setTransform(536.8,96.1,0.457,0.457);
	this.instance_4.alpha = 0.672;
	this.instance_4.compositeOperation = "lighter";

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1A1C22").s().p("AOIBGQgIgDgGgGIgGgKQgCgFAAgGIAKAAQAAAFACAEQACAEADADQAFAFAGABQAGACAHAAQAIAAAGgCQAGgBADgEQADgDABgDQACgDAAgEQAAgHgFgFQgFgFgJgCIgTgCQgGgBgGgCQgGgCgFgFIgEgHQgBgEAAgDQAAgGACgFQACgFAEgEQAGgEAHgDQAHgCAIABQAJgBAIADQAIADAFAGIAFAJIADAJIgKAAIgCgFQgBgEgCgDQgEgDgGgDQgFgCgIgBQgGABgFABQgEABgDADQgEACgCADQgCAEAAAEQAAAEAEAFQAEAEALACIATACQAKACAGAEQAGAFADAFQADAGAAAGQAAAGgCAEIgFAIQgFAHgJACQgIAEgKAAQgLAAgIgEgAKnBGQgIgEgEgHQgFgHAAgJQABgNAJgIQAJgIAPgBIAlgCIAAgKQAAgLgIgFQgHgFgMgBQgMABgIAFQgIAFAAAKIgKAAQAAgJAFgGQAFgIAJgDQAIgDALAAQAHAAAHABQAHACAFAEQAFAEADAGIACAKIABAIIAAAtQAAAGABACQACADAFAAIABAAIABAAIAAAJIgCAAIgCAAQgKAAgDgFQgDgGAAgIQgDAHgGAFQgFAFgHACQgHADgIAAQgKAAgIgEgAK5AWQgLABgHAFQgGAFAAAKQAAALAHAFQAHAGALAAQAMgBAIgFQAIgGADgKQAEgJAAgJIAAgFgAH7BFQgIgDgFgHQgGgHgEgKQgDgJAAgLQAAgKACgJQACgHAGgIQAGgJAJgEQAIgEALAAQANgBAKAIQAJAGAFALQAGAJAAANIgBADIAAADIhMAAQAAAJADAIQADAIAEAFQAEAGAGACQAHADAIAAQAGAAAGgDQAFgCAEgDIAFgHQACgEABgEIAKAAQgBAGgDAFQgDAGgEAEQgFAFgIADQgHAEgIAAQgLAAgIgFgAItAOQAAgJgEgHQgEgIgHgFQgHgFgKgBQgLABgHAFQgIAEgEAJQgEAGAAAKIBCAAIAAAAgAGIBHQgHgDgFgEQgIgIgEgKQgEgMAAgNQAAgNAEgJQAEgKAIgJQAFgEAGgDQAHgCAJAAQAHAAAHACQAGADAFADQAGAFACAFIAAg9IAKAAIAACPIgJAAIgBgSQgDAHgFAEQgFAFgHACQgGADgHAAQgIAAgHgDgAGLgSQgGADgEAEQgFAGgDAIQgDAIAAAKQAAALADAJQAEAJAGAHIAJAFQAFACAGAAQAHAAAFgDQAFgCAEgDQAGgHADgJQAEgIgBgLQABgLgDgJQgDgHgHgGQgEgEgFgCQgFgCgHAAQgHAAgFACgACjBGQgHgDgFgGQgIgHgDgKQgEgLAAgMQAAgMAEgJQADgKAIgIQAFgFAHgEQAIgDAJABQAJgBAHADQAIAEAFAFQAIAIADAKQADAJAAAMQAAAMgDALQgDAKgIAHQgFAGgIADQgHAEgJAAQgJAAgIgEgACngSQgFADgEAEQgHAHgCAHQgDAIABAKQgBAKADAJQACAIAHAHQAEAEAFACQAGADAHAAQAHAAAGgDQAFgCAEgEQAGgHADgIQACgJAAgKQAAgKgCgIQgDgHgGgHQgEgEgFgDQgGgCgHAAQgHAAgGACgAg2BFQgHgDgGgHQgGgHgDgKQgEgJAAgLQAAgKACgJQACgHAGgIQAHgJAIgEQAJgEAKAAQAOgBAJAIQAKAGADALQAFAJAAANIAAADIAAADIhLAAQABAJACAIQADAIAFAFQAEAGAGACQAGADAIAAQAHAAAFgDQAGgCAEgDIAFgHQACgEAAgEIAJAAQgBAGgCAFQgCAGgEAEQgGAFgHADQgHAEgJAAQgLAAgIgFgAgDAOQAAgJgEgHQgEgIgHgFQgIgFgKgBQgKABgIAFQgHAEgEAJQgEAGAAAKIBCAAIAAAAgAjsBFQgHgDgGgHQgGgHgDgKQgEgJAAgLQAAgKACgJQACgHAGgIQAHgJAIgEQAJgEAKAAQAOgBAJAIQAKAGAFALQAFAJAAANIAAADIAAADIhNAAQABAJACAIQADAIAFAFQAEAGAGACQAGADAIAAQAHAAAFgDQAGgCAEgDIAFgHQACgEAAgEIALAAQgBAGgDAFQgDAGgEAEQgGAFgHADQgHAEgJAAQgLAAgIgFgAi5AOQAAgJgEgHQgEgIgHgFQgIgFgKgBQgKABgIAFQgHAEgEAJQgEAGAAAKIBCAAIAAAAgApkBGQgHgDgGgFQgHgIgDgKQgEgKAAgNQAAgNAEgIQADgKAHgIQAGgFAHgEQAHgDAKABQAQgBAKAJQAKAKACANIgKAAQgCgJgHgGQgIgGgLgBQgHAAgGACQgFACgEAEQgHAIgCAHQgDAIABAKQgBAKADAJQACAJAHAHQAEADAFACQAGADAHAAQAIAAAGgEQAFgDAEgFQAEgGABgGIALAAQgCAJgFAIQgFAHgIAFQgJAFgKAAQgKAAgHgEgArjBAQgJgKAAgRIAAhAIAJAAIAAA/QAAANAHAIQAGAGANABQANgBAHgFQAHgHADgKQAEgJAAgLIAAgwIAKAAIAABiIgJAAIgBgTQgDAHgGAFQgFAEgHADQgGADgHAAQgSgBgIgJgAtFBGQgIgDgFgGQgIgHgDgKQgDgLAAgMQAAgMADgJQADgKAIgIQAFgFAIgEQAHgDAJABQAKgBAHADQAHAEAGAFQAHAIADAKQAEAJAAAMQAAAMgEALQgDAKgHAHQgGAGgHADQgHAEgKAAQgJAAgHgEgAtBgSQgGADgEAEQgGAHgDAHQgCAIAAAKQAAAKACAJQADAIAGAHQAEAEAGACQAFADAHAAQAIAAAFgDQAGgCADgEQAHgHACgIQADgJAAgKQAAgKgDgIQgCgHgHgHQgDgEgGgDQgFgCgIAAQgHAAgFACgAJgBBQgHgJABgNIAAg9IgUAAIAAgJIAUAAIAAgcIAKgCIAAAeIAfAAIAAAJIgfAAIAAA9QgBAJAEAGQADAFAKAAIAIgBIAIgBIAAAJIgIABIgJACQgOgBgFgHgANWBIQgKAAgFgFQgFgFAAgLIAAh7IAKAAIAAB6QAAAGACADQACADAGAAIAFAAIAEAAIAAAJIgEABIgFAAgAMQBHIAAhiIAKAAIAABigAD+BHIAAhiIAJAAIABAUQACgHAFgFQAFgEAGgDQAHgCAHAAIAFAAIAFAAIAAAKIgFgBIgFAAQgNABgHAGQgGAHgDAIQgDAJAAALIAAAwgABVBHIAAhZIgUAAIAAgJIAUAAIAAgSQAAgHADgGQADgHAGgDQAGgFAKAAIAIAAIAHABIAAAJIgGAAIgIgBQgKAAgFAGQgEAEAAAKIAAARIAfAAIAAAJIgfAAIAABZgAiRBHIAAhiIAJAAIABAUQACgHAFgFQAFgEAGgDQAHgCAHAAIAFAAIAFAAIAAAKIgFgBIgFAAQgNABgHAGQgGAHgDAIQgDAJAAALIAAAwgAksBHIAAhCQAAgKgGgIQgHgHgNgBQgMABgIAGQgHAHgDAHQgEAKABALIAAAyIgKAAIAAiPIAKAAIAAA/QACgGAGgFQAFgFAHgCQAGgCAHAAQASAAAJAJQAJAKAAAPIAABCgAnMBHIAAhCQAAgKgGgIQgGgHgOgBQgMABgHAGQgIAHgDAHQgDAKAAALIAAAyIgKAAIAAiPIAKAAIAAA/QADgGAFgFQAFgFAHgCQAHgCAHAAQARAAAJAJQAJAKAAAPIAABCgAuUBHIAAiCIgtAAIAAgKIBlAAIAAAKIgtAAIAACCgAMOg3IAAgOIAOAAIAAAOg");
	this.shape_7.setTransform(448.5,425.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().ls(["#B4F91C","#29D6CA","#FFCA03","#FFA748"],[0,0.325,0.714,1],-7.3,-4.5,16.3,-4.5).ss(1,1,1).p("AhCBDICFiF");
	this.shape_8.setTransform(447.4,451.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().ls(["#B4F91C","#29D6CA","#FFCA03","#FFA748"],[0,0.325,0.714,1],7.4,-4.5,-16.2,-4.5).ss(1,1,1).p("AhChCICFCF");
	this.shape_9.setTransform(433.9,451.3);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().ls(["#B4F91C","#29D6CA","#FFCA03","#FFA748"],[0,0.325,0.714,1],-111.7,0,111.8,0).ss(1,1,1).p("ABSDIIOiAAQBkAAAAhkIAAjHQAAhkhkAAI/nAAQhkAAAABkIAADHQAABkBkAAIM6AA");
	this.shape_10.setTransform(445.9,424.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#1A1C22").s().p("AgLBGQgHgDgFgFQgIgJgDgJQgEgKAAgNQAAgOAEgIQADgJAIgJQAFgFAHgDQAIgDAHAAQAQAAAKAJQALAJABAOIgKAAQgCgJgHgHQgHgGgMgBQgFABgFACQgGACgEAEQgHAIgCAGQgCAIAAALQAAAKACAIQACAJAHAHQAEAEAGACQAFACAFABQAIgBAGgDQAFgDAFgGQADgFABgHIALAAQgCAJgEAIQgGAIgIAEQgJAFgKAAQgHAAgIgDgAiKA/QgJgKAAgQIAAhBIAJAAIAABAQABANAGAHQAGAHANAAQANAAAHgGQAHgGADgKQAEgJAAgLIAAgxIAKAAIAABjIgJAAIgBgTQgDAGgFAGQgFAEgHADQgHACgHAAQgSgBgIgJgAjsBGQgIgEgEgFQgJgIgCgJQgEgLAAgMQAAgNAEgJQACgJAJgIQAEgFAIgEQAHgDAJAAQAKAAAHADQAHAEAGAFQAHAIAEAJQADAJAAANQAAAMgDALQgEAJgHAIQgGAFgHAEQgHADgKAAQgJAAgHgDgAjogSQgFACgEAEQgHAIgCAGQgDAIAAALQAAAKADAIQACAIAHAIQAEADAFADQAGACAGABQAIgBAGgCQAFgDAEgDQAGgIADgIQACgIAAgKQAAgLgCgIQgDgGgGgIQgEgEgFgCQgGgCgIgBQgGABgGACgAEmBAQgGgIABgNIAAg+IgUAAIAAgJIAUAAIAAgbIAKgDIAAAeIAeAAIAAAJIgeAAIAAA9QgBAJADAGQAEAGAKAAIAIgBIAHgBIAAAIIgHACIgJABQgOAAgGgIgAFrBHIAAgPIAQAAIAAAPgADpBHIAAhjIAKAAIAABjgACNBHIAAhCQAAgLgGgIQgGgHgOAAQgMAAgIAHQgHAGgDAIQgEAJABAMIAAAyIgKAAIAAiPIAKAAIAAA/QACgGAGgGQAFgEAHgDQAGgCAIAAQARAAAJAJQAJALAAAOIAABDgAlMBHIAAiCIgtAAIAAgKIBkAAIAAAKIgtAAIAACCgAFwAZIgEheIANAAIgDBegADmg4IAAgNIAPAAIAAANg");
	this.shape_11.setTransform(321,900.2);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().ls(["#B4F91C","#29D6CA","#FFCA03","#FFA748"],[0,0.325,0.714,1],-81.7,0,81.8,0).ss(1,1,1).p("AsrimIAADGQAABkBkAAIIOAAICGCHICFiHIJ2AAQBkAAAAhkIAAjGQAAhkhkAAI2PAAQhkAAAABkg");
	this.shape_12.setTransform(321,906.2);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,255,0.698)").s().p("Ai5CEIoOAAQhkAAAAhkIAAjGQAAhkBkAAIWPAAQBkAAAABkIAADGQAABkhkAAIp2AAIiFCHg");
	this.shape_13.setTransform(321,906.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("EgZxAooMAAAhRPMAzjAAAMAAABRPg");
	this.shape_14.setTransform(319.1,670.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.rf(["#FFFFFF","rgba(255,255,255,0.498)","rgba(255,255,255,0)"],[0,0.282,1],-0.1,-0.1,0,-0.1,-0.1,74.3).s().p("AoMIMQjZjaAAkyQAAkzDZjZQDZjZEzAAQEyAADbDZQDZDZAAEzQAAEyjZDaQjbDakyAAQkzAAjZjag");
	this.shape_15.setTransform(224.2,357.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#1A1C22").s().p("AOIBGQgIgDgGgGIgGgKQgCgEAAgHIAKAAQAAAFACAEQACAEADADQAFAFAGABQAGACAHAAQAIAAAGgCQAGgCADgDQADgDABgDQACgDAAgEQAAgHgFgFQgFgFgJgCIgTgCQgGgBgGgCQgGgDgFgEIgEgHQgBgEAAgDQAAgGACgFQACgFAEgEQAGgEAHgDQAHgCAIAAQAJAAAIADQAIADAFAGIAFAJIADAJIgKAAIgCgFQgBgEgCgDQgEgDgGgDQgFgCgIgBQgGABgFABQgEABgDADQgEACgCADQgCAEAAAEQAAAFAEAEQAEAEALACIATACQAKACAGAEQAGAFADAFQADAGAAAGQAAAGgCAFIgFAHQgFAHgJACQgIAEgKAAQgLAAgIgEgAKnBGQgIgEgEgHQgFgGAAgKQABgOAJgHQAJgIAPgBIAlgCIAAgKQAAgKgIgGQgHgFgMgBQgMABgIAFQgIAGAAAJIgKAAQAAgJAFgGQAFgIAJgDQAIgDALgBQAHABAHABQAHACAFAEQAFAEADAGIACAKIABAIIAAAtQAAAGABACQACADAFABIABAAIABAAIAAAIIgCABIgCAAQgKgBgDgFQgDgGAAgIQgDAHgGAFQgFAFgHACQgHACgIABQgKgBgIgDgAK5AWQgLABgHAFQgGAGAAAJQAAAKAHAGQAHAFALABQAMAAAIgHQAIgFADgKQAEgIAAgKIAAgFgAH7BFQgIgDgFgHQgGgHgEgKQgDgJAAgMQAAgJACgJQACgHAGgJQAGgIAJgEQAIgEALgBQANAAAKAIQAJAGAFALQAGAJAAANIgBADIAAADIhMAAQAAAJADAIQADAHAEAHQAEAFAGACQAHADAIAAQAGAAAGgDQAFgCAEgDIAFgHQACgEABgEIAKAAQgBAGgDAFQgDAGgEAEQgFAFgIADQgHAEgIAAQgLAAgIgFgAItAOQAAgJgEgHQgEgIgHgFQgHgFgKgBQgLABgHAFQgIAFgEAIQgEAGAAAKIBCAAIAAAAgAGIBHQgHgCgFgFQgIgIgEgKQgEgMAAgNQAAgMAEgKQAEgKAIgJQAFgEAGgDQAHgCAJgBQAHABAHACQAGADAFADQAGAFACAFIAAg9IAKAAIAACPIgJAAIgBgRQgDAGgFAEQgFAFgHACQgGACgHABQgIgBgHgCgAGLgSQgGADgEAEQgFAGgDAIQgDAIAAAKQAAALADAJQAEAJAGAHIAJAFQAFACAGAAQAHAAAFgDQAFgBAEgEQAGgHADgJQAEgJgBgKQABgLgDgJQgDgGgHgHQgEgEgFgCQgFgCgHAAQgHAAgFACgACjBGQgHgDgFgGQgIgHgDgKQgEgLAAgMQAAgMAEgJQADgKAIgIQAFgFAHgEQAIgDAJAAQAJAAAHADQAIAEAFAFQAIAIADAKQADAJAAAMQAAAMgDALQgDAKgIAHQgFAGgIADQgHAEgJAAQgJAAgIgEgACngSQgFADgEAEQgHAHgCAHQgDAIABAKQgBAKADAJQACAIAHAHQAEAEAFACQAGADAHAAQAHAAAGgDQAFgCAEgEQAGgHADgIQACgJAAgKQAAgKgCgIQgDgHgGgHQgEgEgFgDQgGgCgHAAQgHAAgGACgAg2BFQgHgDgGgHQgGgHgDgKQgEgJAAgMQAAgJACgJQACgHAGgJQAHgIAIgEQAJgEAKgBQAOAAAJAIQAKAGADALQAFAJAAANIAAADIAAADIhLAAQABAJACAIQADAHAFAHQAEAFAGACQAGADAIAAQAHAAAFgDQAGgCAEgDIAFgHQACgEAAgEIAJAAQgBAGgCAFQgCAGgEAEQgGAFgHADQgHAEgJAAQgLAAgIgFgAgDAOQAAgJgEgHQgEgIgHgFQgIgFgKgBQgKABgIAFQgHAFgEAIQgEAGAAAKIBCAAIAAAAgAjsBFQgHgDgGgHQgGgHgDgKQgEgJAAgMQAAgJACgJQACgHAGgJQAHgIAIgEQAJgEAKgBQAOAAAJAIQAKAGAFALQAFAJAAANIAAADIAAADIhNAAQABAJACAIQADAHAFAHQAEAFAGACQAGADAIAAQAHAAAFgDQAGgCAEgDIAFgHQACgEAAgEIALAAQgBAGgDAFQgDAGgEAEQgGAFgHADQgHAEgJAAQgLAAgIgFgAi5AOQAAgJgEgHQgEgIgHgFQgIgFgKgBQgKABgIAFQgHAFgEAIQgEAGAAAKIBCAAIAAAAgApkBGQgHgDgGgFQgHgIgDgKQgEgKAAgNQAAgNAEgIQADgKAHgIQAGgFAHgEQAHgDAKAAQAQAAAKAJQAKAKACANIgKAAQgCgIgHgHQgIgGgLgBQgHAAgGACQgFADgEADQgHAIgCAHQgDAIABAKQgBAKADAJQACAIAHAIQAEADAFACQAGADAHAAQAIAAAGgEQAFgDAEgFQAEgGABgGIALAAQgCAJgFAIQgFAHgIAFQgJAEgKABQgKAAgHgEgArjBAQgJgKAAgRIAAhAIAJAAIAAA/QAAANAHAIQAGAGANABQANgBAHgGQAHgFADgLQAEgJAAgLIAAgwIAKAAIAABiIgJAAIgBgTQgDAHgGAFQgFAFgHACQgGACgHABQgSgBgIgJgAtFBGQgIgDgFgGQgIgHgDgKQgDgLAAgMQAAgMADgJQADgKAIgIQAFgFAIgEQAHgDAJAAQAKAAAHADQAHAEAGAFQAHAIADAKQAEAJAAAMQAAAMgEALQgDAKgHAHQgGAGgHADQgHAEgKAAQgJAAgHgEgAtBgSQgGADgEAEQgGAHgDAHQgCAIAAAKQAAAKACAJQADAIAGAHQAEAEAGACQAFADAHAAQAIAAAFgDQAGgCADgEQAHgHACgIQADgJAAgKQAAgKgDgIQgCgHgHgHQgDgEgGgDQgFgCgIAAQgHAAgFACgAJgBBQgHgJABgNIAAg9IgUAAIAAgJIAUAAIAAgcIAKgCIAAAeIAfAAIAAAJIgfAAIAAA9QgBAJAEAFQADAGAKAAIAIAAIAIgCIAAAJIgIACIgJABQgOgBgFgHgANWBIQgKAAgFgFQgFgFAAgLIAAh7IAKAAIAAB6QAAAGACADQACAEAGAAIAFAAIAEgBIAAAJIgEABIgFAAgAMQBHIAAhiIAKAAIAABigAD+BHIAAhiIAJAAIABAUQACgHAFgFQAFgEAGgCQAHgDAHAAIAFAAIAFAAIAAAKIgFgBIgFAAQgNAAgHAHQgGAGgDAJQgDAJAAALIAAAwgABVBHIAAhZIgUAAIAAgJIAUAAIAAgSQAAgIADgFQADgHAGgDQAGgFAKAAIAIAAIAHABIAAAJIgGAAIgIgBQgKABgFAFQgEAEAAAKIAAARIAfAAIAAAJIgfAAIAABZgAiRBHIAAhiIAJAAIABAUQACgHAFgFQAFgEAGgCQAHgDAHAAIAFAAIAFAAIAAAKIgFgBIgFAAQgNAAgHAHQgGAGgDAJQgDAJAAALIAAAwgAksBHIAAhCQAAgLgGgHQgHgHgNgBQgMABgIAGQgHAGgDAIQgEAKABALIAAAyIgKAAIAAiPIAKAAIAAA/QACgGAGgFQAFgFAHgCQAGgCAHgBQASAAAJAKQAJAKAAAPIAABCgAnMBHIAAhCQAAgLgGgHQgGgHgOgBQgMABgHAGQgIAGgDAIQgDAKAAALIAAAyIgKAAIAAiPIAKAAIAAA/QADgGAFgFQAFgFAHgCQAHgCAHgBQARAAAJAKQAJAKAAAPIAABCgAuUBHIAAiCIgtAAIAAgKIBlAAIAAAKIgtAAIAACCgAMOg3IAAgOIAOAAIAAAOg");
	this.shape_16.setTransform(336.5,507.2);

	this.p24mc = new lib.p24mcdz1();
	this.p24mc.setTransform(320,504,1,1,0,0,0,320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},2).to({state:[]},85).to({state:[{t:this.shape_10,p:{x:445.9,y:424.6}},{t:this.shape_9,p:{x:433.9,y:451.3}},{t:this.shape_8,p:{x:447.4,y:451.3}},{t:this.shape_7}]},540).to({state:[]},3).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},184).to({state:[{t:this.shape_14}]},2).to({state:[]},3).to({state:[{t:this.shape_15}]},24).to({state:[]},1).to({state:[{t:this.shape_10,p:{x:333.9,y:506.6}},{t:this.shape_9,p:{x:321.9,y:533.3}},{t:this.shape_8,p:{x:335.4,y:533.3}},{t:this.shape_16}]},400).to({state:[]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},224).to({state:[]},2).to({state:[{t:this.p24mc}]},529).to({state:[]},5).wait(424));

	// content
	this.instance_5 = new lib.p1content("synched",0,false);
	this.instance_5.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_6 = new lib.p2content("synched",0,false);
	this.instance_6.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_7 = new lib.p3content("synched",0,false);
	this.instance_7.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_8 = new lib.p4_content("synched",0,false);
	this.instance_8.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_9 = new lib.p5content("synched",0,false);
	this.instance_9.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_10 = new lib.p6cpntent("synched",0);
	this.instance_10.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_11 = new lib.p7content("synched",0,false);
	this.instance_11.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_12 = new lib.p8content("synched",0,false);
	this.instance_12.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_13 = new lib.p9content("synched",0,false);
	this.instance_13.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_14 = new lib.p10content("synched",0,false);
	this.instance_14.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_15 = new lib.p11cotnent("synched",0,false);
	this.instance_15.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_16 = new lib.p12content("synched",0,false);
	this.instance_16.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_17 = new lib.p13content("synched",0,false);
	this.instance_17.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_18 = new lib.p14content("synched",0,false);
	this.instance_18.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_19 = new lib.p15content("synched",0,false);
	this.instance_19.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_20 = new lib.p17content("synched",0);
	this.instance_20.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_21 = new lib.p19content("synched",0,false);
	this.instance_21.setTransform(320,504.4,1,1,0,0,0,320,504);

	this.instance_22 = new lib.p20content("synched",0);
	this.instance_22.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_23 = new lib.p21content("synched",0,false);
	this.instance_23.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_24 = new lib.p22content("synched",0,false);
	this.instance_24.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_25 = new lib.p23content("synched",0,false);
	this.instance_25.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_26 = new lib.p24content("synched",0,false);
	this.instance_26.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_27 = new lib.p25content("synched",0,false);
	this.instance_27.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_28 = new lib.p28content("synched",0,false);
	this.instance_28.setTransform(320,504.7,1,1,0,0,0,320,504);

	this.instance_29 = new lib.p29content("synched",0,false);
	this.instance_29.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_30 = new lib.p30content("synched",0,false);
	this.instance_30.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_31 = new lib.p31content("synched",0,false);
	this.instance_31.setTransform(320,504,1,1,0,0,0,320,504);

	this.instance_32 = new lib.p32content("synched",0,false);
	this.instance_32.setTransform(320,504.7,1,1,0,0,0,320,504);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},85).to({state:[{t:this.instance_7}]},56).to({state:[{t:this.instance_8}]},64).to({state:[{t:this.instance_9}]},72).to({state:[{t:this.instance_10}]},96).to({state:[{t:this.instance_11}]},65).to({state:[{t:this.instance_12}]},70).to({state:[{t:this.instance_13}]},73).to({state:[{t:this.instance_14}]},77).to({state:[{t:this.instance_15}]},71).to({state:[{t:this.instance_16}]},113).to({state:[{t:this.instance_17}]},108).to({state:[{t:this.instance_18}]},39).to({state:[{t:this.instance_19}]},106).to({state:[{t:this.instance_20}]},63).to({state:[{t:this.instance_21}]},148).to({state:[{t:this.instance_22}]},43).to({state:[{t:this.instance_23}]},81).to({state:[{t:this.instance_24}]},80).to({state:[{t:this.instance_25}]},110).to({state:[{t:this.instance_26}]},108).to({state:[{t:this.instance_27}]},98).to({state:[{t:this.instance_28}]},98).to({state:[{t:this.instance_29}]},80).to({state:[{t:this.instance_30}]},117).to({state:[{t:this.instance_31}]},81).to({state:[{t:this.instance_32}]},80).wait(146));

	// bg
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("Egx/BOwMAAAidfMBj+AAAMAAACdfg");
	this.shape_17.setTransform(320,504);
	this.shape_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(2).to({_off:false},0).wait(2428));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;
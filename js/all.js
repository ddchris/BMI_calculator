// 設定全域變數
var bmiDatas;
var resultBtnShowData = false;


// 儲存待用元件
var el_height = document.getElementById('height');
var el_weight = document.getElementById('weight');
var el_retest = document.getElementById('retest_open');
var el_reset  = document.getElementById('reset');
var el_resultBtn = document.getElementById('resultBtn');
var el_dataList = document.getElementById('dataList');

//定義函式
function addAndShowData () {

	if (resultBtnShowData){
		el_resultBtn.setAttribute('class','resultBtn');
		el_resultBtn.innerHTML = '<span><p class="btnText">看結果</p></span>';
		resultBtnShowData = false;
		return 0;
	}

	// 若沒輸入資料不動作
	else if (el_height.value === '' || el_weight.value === ''){return 0};

	var height  = el_height.value;
	var weight  = el_weight.value;
	var bmi_str = (weight / Math.pow(height/100, 2)).toFixed(2);
	var status  = '';
	var color   = '';
	if (bmi_str < 18.5){ status = '體重過輕'; color ='a'; el_resultBtn.setAttribute('class','resultBtn a');}
	else if ( bmi_str <= 24.0) { status = '體重理想'; color = 'b'; el_resultBtn.setAttribute('class','resultBtn b');}
	else if ( bmi_str <= 30.0) { status = '輕度肥胖'; color ='c'; el_resultBtn.setAttribute('class','resultBtn c');}
	else if ( bmi_str <= 40.0) { status = '中度肥胖'; color ='d'; el_resultBtn.setAttribute('class','resultBtn d');}
	else { status = '重度肥胖'; color ='e'; el_resultBtn.setAttribute('class','resultBtn e');};
	//建立一筆資料
	var bmiData_obj = {
			'height': height,
		    'weight': weight,
		    'bmi':bmi_str,
		    'status':status,
		    'color':color
		};

	//取得,添加並更新資料至 localstorge
	bmiDatas = JSON.parse(localStorage.getItem('bmiDatas'));
	bmiDatas.push(bmiData_obj);
	localStorage.setItem('bmiDatas', JSON.stringify(bmiDatas));

	//按鈕處顯示結果
	var result_str = '';
	result_str += ('<p class="statusText '+ color +'">'+status+'</p>');
	result_str += ('<span><p class="btnText">'+bmi_str+'</p>');
	result_str += ('<p class="dataText">BMI</p>');
	result_str += ('<img src="imgs/icons_loop.png"');
	result_str += ('class="picLoop"></span>');

	el_resultBtn.innerHTML = result_str;
    showData();
}

function showData () {
    var html_str ='';
    var len = bmiDatas.length;
    for (var i = 0; i < len; i++) {
    		var height = bmiDatas[i].height;
    		var weight = bmiDatas[i].weight;
    		var bmi    = bmiDatas[i].bmi;
    		var status = bmiDatas[i].status;
    		var color = bmiDatas[i].color;
    		var date_obj = new Date();
    		today = (date_obj.getFullYear() +'-'
    			    + (date_obj.getMonth()+1) + '-'
    			    + date_obj.getDate());

    		html_str += ('<li><span class="colorBar ' + color +'">');
			html_str +=	('</span><span class="status">'+status);
			html_str += ('</span><span class="field">BMI</span>');
			html_str += ('<span class="data">'+bmi+ '</span>');
			html_str += ('<span class="field">Height</span>');
			html_str += ('<span class="data">'+height+ 'cm</span>');
			html_str += ('<span class="field">Weight</span>');
			html_str += ('<span class="data">'+weight+ 'kg</span>');
			html_str += ('<span class="time">'+today);
			html_str += '</span></li>';
    	}
	el_dataList.innerHTML = html_str;
	el_height.value ='';
	el_weight.value ='';
	resultBtnShowData = true;
}

function resetData () {
	localStorage.setItem('bmiDatas','[]');
	el_dataList.innerHTML = '';
	el_height.value ='';
	el_weight.value ='';
}

//事件監聽
el_resultBtn.addEventListener('click', addAndShowData, false);
el_reset.addEventListener('click', resetData, false);


// 頁面初始化
if(!localStorage.getItem('bmiDatas')){
	console.log('worked')
    bmiDatas = '[]';
	localStorage.setItem('bmiDatas',bmiDatas);
};

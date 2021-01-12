resetForm();

var classEstimate = '';
var facilityInput = '';

var contingencyFinal = 0;
var mgmRsvFinal = 0;
var kursFinal = 0;
var krFinal = 0;

function resetForm () {
	$('#facility_container').hide();
	$('#table_section').hide();
	$('#metodology_label').hide();
	$('#accuracy_label').hide();
	hideTerminalBbm();
	$('#depotlpg_container').hide();
	hideDppu();
	$('#kurs_container').hide();
	hidePipeline();
	hideStorageTank();
	$('#jetty_container').hide();
}

function convertPdf () {
	// console.log($('#contingencyInput').val())
	// $('#contingencyInput').val($('#contingencyInput').val());
	// html2canvas(document.getElementById("unseen")).then(canvas => {
	// 	var data = canvas.toDataURL();
	// 	var docDefinition = {
	// 		content: [{
	// 			image: data,
	// 			width: 500
	// 		}]
	// 	};
	// 	pdfMake.createPdf(docDefinition).download(classEstimate + ' - ' + facilityInput + ".pdf");
	// });

	/* html2canvas(document.getElementById('unseen'), {height: 3000, width: 3000}).then((canvas) => {
		console.log(canvas)
		var data = canvas.toDataURL();
		var docDefinition = {
			content: [{
				image: data,
				width: 500
			}]
		};
		pdfMake.createPdf(docDefinition).download(classEstimate + ' - ' + facilityInput + ".pdf");
    }); */

	/* html2canvas(document.getElementById('unseen'), {
        onrendered: function (canvas) {
			console.log(canvas)
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                },{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download(classEstimate + ' - ' + facilityInput + ".pdf");
        }
	}); */

	// <script src="https://parall.ax/parallax/js/jspdf.js"></script>
	// test (23)
	/* var pdf = new jsPDF('p', 'pt', 'letter');
	$("#unseen").css("background-color", "white");
	pdf.addHTML($('#unseen'), function () {
		pdf.save('Test.pdf');
	}); */

	// <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.1/dist/html2canvas.min.js"></script>
	// <script src="https://cdn.jsdelivr.net/npm/jspdf@1.5.3/dist/jspdf.min.js"></script>
	// web (15).pdf
	/* var pdf = new jsPDF('p', 'pt', 'legal');
	pdf.internal.scaleFactor = 30;
	pdf.html(document.getElementById('unseen'), {
		callback: (pdf) => {
			pdf.save('web.pdf');
		},
		background: '#000',
		format: 'PNG',
		pagesplit: true
	}); */

	// <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.1/dist/html2canvas.min.js"></script>
	// <script src="https://cdn.jsdelivr.net/npm/jspdf@1.5.3/dist/jspdf.min.js"></script>
	// File(2).pdf
	var pdf = new jsPDF('p', 'pt', 'a4');
	html2canvas(document.getElementById('unseen')).then(canvas => {
		imgData = canvas.toDataURL('image/jpeg', 1.0)
		window.open(imgData)
		pdf = new jsPDF("l", "pt", [canvas.height+20, canvas.width+500])
		pdf.addImage(imgData, 'JPEG', 10, 10, canvas.width, canvas.height)
		var img = new Image()
		img.src = 'img/capex_matrix.png'
		pdf.addPage('a2', 'p')
		pdf.addImage(img, 'png', 10, 10)
		pdf.save(classEstimate + ' - ' + facilityInput + ".pdf")
	})

	// <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-rc.1/dist/html2canvas.min.js"></script>
	// <script src="https://cdn.jsdelivr.net/npm/jspdf@1.5.3/dist/jspdf.min.js"></script>
	// download (9).pdf
	/* html2canvas(document.getElementById('unseen'))
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
        });
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = ((imgProps.height * pdfWidth) / imgProps.width);
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
	  });
	   */
}

function changeEstimate (select) {
	var estimateValue = $(select).val();
	resetFormContainer();
	classEstimate = estimateValue;
	if (estimateValue == 'Class 4 Estimate') {
		$('#class_method_label').text('Equipment Factored')
		$('#class_acc_label').text('-30% to +50%')

		$('#class_method_table').text('Equipment Factored')
		$('#class_acc_table').text('-30% to +50%')
		$('#class_est_table').text(classEstimate)
		
		$('#facility_input').empty()
		$('#facility_input').append(new Option('Pilih Fasilitas', 'Pilih Fasilitas'))
		$('#facility_input').append(new Option('Terminal BBM', 'Terminal BBM'))
		$('#facility_input').append(new Option('Depot LPG Pressurized', 'Depot LPG Pressurized'))
		$('#facility_input').append(new Option('DPPU', 'DPPU'))
		$('#facility_input').append(new Option('Jetty', 'Jetty4'))
	} else if (estimateValue == 'Class 5 Estimate') {
		$('#class_method_label').text('Capacity Factored, Parametric')
		$('#class_acc_label').text('-50% to +100%')
		
		$('#class_method_table').text('Capacity Factored, Parametric')
		$('#class_acc_table').text('-50% to +100%')
		$('#class_est_table').text(classEstimate)
		
		$('#facility_input').empty()
		$('#facility_input').append(new Option('Pilih Fasilitas', 'Pilih Fasilitas'))
		$('#facility_input').append(new Option('Pipeline', 'Pipeline'))
		$('#facility_input').append(new Option('Storage Tank', 'Storage Tank'))
		$('#facility_input').append(new Option('Jetty', 'Jetty'))
	}
	$('#metodology_label').show();
	$('#accuracy_label').show();
	$('#facility_container').show();
}

function resetFormContainer () {
	hideTerminalBbm();
	$('#depotlpg_container').hide();
	hideDppu();
	$('#kurs_container').hide();
	hidePipeline();
	hideStorageTank();
	$('#jetty_container').hide();
	hideJetty4();
}

function changeFacility (select) {
	var facilityValue = $(select).val();
	facilityInput = facilityValue;
	switch (facilityValue) {
		case 'Terminal BBM': 
			showTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			hideJetty4();
			break;
		case 'Depot LPG Pressurized': 
			hideTerminalBbm();
			$('#depotlpg_container').show();
			hideDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			hideJetty4();
			break;
		case 'DPPU': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			showDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			hideJetty4();
			break;
		case 'Pipeline': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			showPipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			hideJetty4();
			break;
		case 'Storage Tank': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			hidePipeline();
			showStorageTank();
			$('#jetty_container').hide();
			hideJetty4();
			break;
		case 'Jetty': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').show();
			hideJetty4();
			break;
		case 'Jetty4': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			showJetty4();
			break;

	}
	$('#kurs_container').show();
}

function showJetty4 () {
	$('#jettyhead_container').show();
	$('#mooringdolphin_container').show();
	$('#breastingdolphin_container').show();
	$('#trestletype_container').show();
	$('#catwalk_container').show();
}

function hideJetty4 () {
	$('#jettyhead_container').hide();
	$('#mooringdolphin_container').hide();
	$('#breastingdolphin_container').hide();
	$('#trestletype_container').hide();
	$('#catwalk_container').hide();
}

function showDppu () {
	$('#kelasdppu_container').show();
	$('#tangkidppu_container').show();
}

function hideDppu () {
	$('#kelasdppu_container').hide();
	$('#tangkidppu_container').hide();
}

function showStorageTank () {
	$('#tangkistoragetank_container').show();
	$('#jenisstoragetank_container').show();
}

function hideStorageTank () {
	$('#tangkistoragetank_container').hide();
	$('#jenisstoragetank_container').hide();
}

function showTerminalBbm () {
	$('#tangki_container').show();
	$('#dermaga_container').show();
	$('#trestle_container').show();
}

function hideTerminalBbm () {
	$('#tangki_container').hide();
	$('#dermaga_container').hide();
	$('#trestle_container').hide();
}

function showPipeline () {
	$('#jenispipeline_container').show();
	$('#diameterpipeline_container').show();
	$('#panjangpipeline_container').show();
}

function hidePipeline () {
	$('#jenispipeline_container').hide();
	$('#diameterpipeline_container').hide();
	$('#panjangpipeline_container').hide();
}

function doReset () {
	resetForm();
	return false;
}

function doCalculate () {
	formValidate();
	return false;
}

function formValidate () {
	var tableTitle  = '';
	var tableTitleh4 = '';
	var isItValid = false;
	$('#project_name_label').text($('#project_name_input').val())

	$('#calc-table > tbody').empty();
	kursFinal = parseInt($('#kurs_input').val())

	tableTitle = 'Calculation Result ' + classEstimate
	if (classEstimate == '') {
		isItValid = false;
	} else {
		switch (facilityInput) {
			case 'Terminal BBM':
				if ($('#tankibbm_unit').val()) {
					if ($('#trestle_input').val()) {
						if ($('#kurs_input').val()) {
							isItValid = true;

							var tangkiCapArr = $('select[id=tangkibbm_cap]').map(function() {
								return this.value;
							}).get();
							
							var tangkiUnitArr = $('input[id=tankibbm_unit]').map(function() {
								var thisValue = '';
								thisValue = this.value;
								if (this.value == '') {
									thisValue = '0'
								}
								return thisValue;
							}).get();

							var dermagaTypeArr = $('select[id=dermaga_input]').map(function() {
								return this.value;
							}).get();
							
							var trestleInputArr = $('input[id=trestle_input]').map(function() {
								var thisValue = '';
								thisValue = this.value;
								if (this.value == '') {
									thisValue = '0'
								}
								return thisValue;
							}).get();

							var totalTangkiCap = 0;
							var tangkiParameter = 0;
							tangkiCapArr.forEach((tangkiCap, index) => {
								totalTangkiCap = totalTangkiCap + (tangkiCap * tangkiUnitArr[index])
							});
							tableTitleh4 = facilityInput + ' - ' + totalTangkiCap + ' KL - ' + $('#dermaga_input').val() + ' - ' + $('#trestle_input').val() + ' M'

							console.log(totalTangkiCap)
							if (totalTangkiCap <= 100000) {
								tangkiParameter = 100000;
							} else if (totalTangkiCap <= 200000) {
								tangkiParameter = 200000;
							} else {
								tangkiParameter = 400000;
							}


							$.ajax({
								url: '/api/v1/storage_tank',
								contentType: 'application/json',
								dataType: 'json',
								success: function (tankResult) {
									var panjangParameter = '';
									trestleInputArr.forEach((trestleInput, index) => {
										panjangParameter+='panjang=' + trestleInput
										if (index < trestleInputArr.length-1) {
											panjangParameter+='&'
										}
									});
									console.log(panjangParameter)
									$.ajax({
										url: '/api/v1/jettytbbm/' + $('#kurs_input').val() + '?' + panjangParameter,
										contentType: 'application/json',
										dataType: 'json',
										success: function (jettyResult) {
											$.ajax({
												url: '/api/v1/tbbm/' + tangkiParameter + '/' + $('#kurs_input').val(),
												contentType: 'application/json',
												dataType: 'json',
												success: function (tbbmResult) {
		
													tangkiCapArr.forEach((tangkiCap, index) => {
														tankResult.forEach(tank => {
															if (tangkiCap == tank.kapasitas) {
																var newTank = {
																	"position": "",
																	"name": "Storage Tank " + tank.kapasitas + ' KL',
																	"cap": tangkiParameter,
																	"remarks": "",
																	"qty": tangkiUnitArr[index],
																	"satuan": "ea",
																	"price_idr": tank.harga,
																	"price_formula": ""
																}
																tbbmResult.splice(1, 0, newTank);
															}
														});
													});

													dermagaTypeArr.forEach((dramagaType, index) => {
														jettyResult.forEach(jetty => {
															var jettyPriceJson = JSON.parse(jetty.multi_price);
															if (dramagaType == jetty.name) {
																var newJetty = {
																	"position": "",
																	"name": jetty.name,
																	"cap": "",
																	"remarks": 'Asumsi trestle ' + trestleInputArr[index] + ' M',
																	"qty": '1',
																	"satuan": "ea",
																	"price_idr": jettyPriceJson[trestleInputArr[index]],
																	"price_formula": ""
																}
																tbbmResult.splice((tbbmResult.length-1), 0, newJetty);
															}
														});
													});
													generateCalculationTable(tbbmResult)
												}
											});
										}
									});
								}
							});
						} else {
							isItValid = false;
						}
					} else {
						isItValid = false;
					}
				} else {
					isItValid = false;
				}
				break;
			case 'Depot LPG Pressurized': 
				if ($('#kurs_input').val()) {
					isItValid = true;
					tableTitleh4 = facilityInput + ' - ' + $('#lpg_cap').val() + ' MT'
					$.ajax({
						url: '/api/v2/depot/' + $('#lpg_cap').val() + '/' + $('#kurs_input').val(),
						contentType: "application/json",
						dataType: 'json',
						success: function(result){
							console.log(result);
							var calculationTbody = document.getElementById('calculation_tbody');

							var totalPriceIdr = 0;
							result.forEach(itemCalc => {
								var row = document.createElement('tr');
								var cellId = document.createElement('td');
								var cellItem = document.createElement('td');
								var cellRemarks = document.createElement('td');
								var cellQty = document.createElement('td');
								var cellSatuan = document.createElement('td');
								var cellPriceIdr = document.createElement('td');
								var cellPriceIdrTotal = document.createElement('td');
								var cellPriceUsdTotal = document.createElement('td');

								var floatPrice = parseFloat(itemCalc.price_idr).toFixed(0)

								totalPriceIdr = parseInt(floatPrice) * parseInt(itemCalc.qty) + totalPriceIdr;

								cellId.innerHTML = itemCalc.position;
								cellItem.innerHTML = itemCalc.name;
								cellRemarks.innerHTML = itemCalc.remarks;
								cellQty.innerHTML = itemCalc.qty;
								cellSatuan.innerHTML = itemCalc.satuan;
								cellPriceIdr.innerHTML = floatPrice;
								cellPriceIdrTotal.innerHTML = parseInt(floatPrice) * parseInt(itemCalc.qty);
								cellPriceUsdTotal.innerHTML = parseInt(floatPrice) * parseInt(itemCalc.qty) / parseInt($('#kurs_input').val());

								row.appendChild(cellId)
								row.appendChild(cellItem)
								row.appendChild(cellRemarks)
								row.appendChild(cellQty)
								row.appendChild(cellSatuan)
								row.appendChild(cellPriceIdr)
								row.appendChild(cellPriceIdrTotal)
								row.appendChild(cellPriceUsdTotal)

								
								reformatCurrCell(cellPriceIdr, "IDR");
								reformatCurrCell(cellPriceIdrTotal, "IDR");
								reformatCurrCell(cellPriceUsdTotal, "USD");

								calculationTbody.appendChild(row);
							});
							
							taxTotal(calculationTbody, 'Total', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(calculationTbody, 'K&R (8%)', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + parseFloat(totalPriceIdr).toFixed(0) + ')") /> %', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + parseFloat(totalPriceIdr).toFixed(0) + ')") /> %', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(calculationTbody, 'Grand Total (IDR)', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(calculationTbody, 'Grand Total (USD)', parseFloat(totalPriceIdr).toFixed(0));
				
						}
					})
				} else {
					isItValid = false;
				}
				break;
			case 'DPPU': 
				if ($('#tangkidppu_input').val()) {
					if ($('#kurs_input').val()) {
						isItValid = true;
						tableTitleh4 = facilityInput + ' - Kelas ' + $('#kelas_dppu').val() + ' - ' + $('#tangkidppu_input').val() + ' KL'

						var tangkiDppuInputArr = $('input[id=tangkidppu_input]').map(function() {
							var thisValue = '';
							thisValue = this.value;
							if (this.value == '') {
								thisValue = '0'
							}
							return thisValue;
						}).get();

						var tangkiDppuCountInputArr = $('input[id=tangkidppu_count_input]').map(function() {
							var thisValue = '';
							thisValue = this.value;
							if (this.value == '') {
								thisValue = '0'
							}
							return thisValue;
						}).get();

						var volumeParameter = '';
						tangkiDppuInputArr.forEach((tangkiDppuInput, index) => {
							volumeParameter+='vol=' + tangkiDppuInput + 'x' + tangkiDppuCountInputArr[index]
							if (index < tangkiDppuInputArr.length-1) {
								volumeParameter+='&'
							}
						});

						$.ajax({
							url: '/api/v1/dppu/' + $('#kelas_dppu').val() + '/' + $('#kurs_input').val() + '?' + volumeParameter,
							contentType: "application/json",
							dataType: 'json',
							success: function(result){
								console.log(result);
								var calculationTbody = document.getElementById('calculation_tbody');
	
								var totalPriceIdr = 0;
								var totalPriceUsd = 0;
								result.forEach(itemCalc => {
									var row = document.createElement('tr');
									var cellId = document.createElement('td');
									var cellItem = document.createElement('td');
									var cellRemarks = document.createElement('td');
									var cellQty = document.createElement('td');
									var cellSatuan = document.createElement('td');
									var cellPriceIdr = document.createElement('td');
									var cellPriceIdrTotal = document.createElement('td');
									var cellPriceUsdTotal = document.createElement('td');

									var newQty = '';
									if (itemCalc.name == 'Recovery Vessel Kap. 200 Liter') {
										newQty = tangkiDppuCountInputArr[0]
									} else {
										newQty = itemCalc.qty;
									}


									var usdPerItem = itemCalc.price_idr;
									var usdTotalItem = itemCalc.price_idr * newQty;
									var usdTotalItemFixed = parseFloat(usdTotalItem).toFixed(2);

									totalPriceIdr = usdTotalItemFixed * parseInt($('#kurs_input').val()) + totalPriceIdr;
									totalPriceUsd = parseFloat(usdTotalItemFixed) + parseFloat(totalPriceUsd)
	
									cellId.innerHTML = itemCalc.position;
									cellItem.innerHTML = itemCalc.name;
									cellRemarks.innerHTML = itemCalc.remarks;
									cellQty.innerHTML = newQty;
									cellSatuan.innerHTML = itemCalc.satuan;
									cellPriceIdr.innerHTML = parseFloat(usdPerItem) * parseInt($('#kurs_input').val());
									cellPriceIdrTotal.innerHTML = usdTotalItemFixed * parseInt($('#kurs_input').val());
									cellPriceUsdTotal.innerHTML = usdTotalItemFixed;

									if (itemCalc.name.includes('Storage Tanks')) {
										// console.log(parseFloat(usdPerItem))
										// console.log(parseInt($('#kurs_input').val()))
										// console.log(usdTotalItem)
									}
	
									row.appendChild(cellId)
									row.appendChild(cellItem)
									row.appendChild(cellRemarks)
									row.appendChild(cellQty)
									row.appendChild(cellSatuan)
									row.appendChild(cellPriceIdr)
									row.appendChild(cellPriceIdrTotal)
									row.appendChild(cellPriceUsdTotal)
	
									
									reformatCurrCell(cellPriceIdr, "IDR");
									reformatCurrCell(cellPriceIdrTotal, "IDR");
									reformatCurrCell(cellPriceUsdTotal, "USD");
	
									calculationTbody.appendChild(row);
								});

								// console.log('total usd')
								// console.log(totalPriceUsd)
								// console.log(parseFloat(totalPriceUsd) * parseInt($('#kurs_input').val()))
								totalPriceUsd = totalPriceUsd*1.05
								
								taxTotal(calculationTbody, 'Total', totalPriceUsd * parseInt($('#kurs_input').val()));
								taxTotal(calculationTbody, 'K&R (8%)', totalPriceUsd * parseInt($('#kurs_input').val()));
								taxTotal(calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceUsd * parseInt($('#kurs_input').val()) + ')") /> %', totalPriceUsd * parseInt($('#kurs_input').val()));
								taxTotal(calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceUsd * parseInt($('#kurs_input').val()) + ')") /> %', totalPriceUsd * parseInt($('#kurs_input').val()));
								taxTotal(calculationTbody, 'Grand Total (IDR)', totalPriceUsd * parseInt($('#kurs_input').val()));
								taxTotal(calculationTbody, 'Grand Total (USD)', totalPriceUsd * parseInt($('#kurs_input').val()));
					
							}
						})
					} else {
						isItValid = false;
					}
				} else {
					isItValid = false;
				}
				break;
			case 'Pipeline': 
				if ($('#panjangpipeline_input').val()) {
					if ($('#diameterpipeline_input').val()) {
						if ($('#kurs_input').val()) {
							isItValid = true;
							var jenisPipeline = $('#jenispipeline_input').val();
							tableTitleh4 = facilityInput + ' - ' + jenisPipeline + ' - ' + $('#panjangpipeline_input').val() + ' M - ' + $('#diameterpipeline_input').val() + ' Inch';

							var calculationTbody = document.getElementById('calculation_tbody');
							var row = document.createElement('tr');
							var cellId = document.createElement('td');
							var cellItem = document.createElement('td');
							var cellRemarks = document.createElement('td');
							var cellQty = document.createElement('td');
							var cellSatuan = document.createElement('td');
							var cellPriceIdr = document.createElement('td');
							var cellPriceIdrTotal = document.createElement('td');
							var cellPriceUsdTotal = document.createElement('td');

							var basePrice = 0;

							if (jenisPipeline == 'Onshore Cross Country Pipeline (BBM)') {
								basePrice = 46
							} else {
								basePrice = 69
							}

							var totalPriceIdr = parseInt($('#panjangpipeline_input').val()) *  parseInt($('#diameterpipeline_input').val()) * basePrice * parseInt($('#kurs_input').val())
							var totalPriceUsd = parseInt($('#panjangpipeline_input').val()) *  parseInt($('#diameterpipeline_input').val()) * basePrice
				
							cellId.innerHTML = '1';
							cellItem.innerHTML = facilityInput;
							cellRemarks.innerHTML = jenisPipeline;
							cellQty.innerHTML = $('#panjangpipeline_input').val()
							cellSatuan.innerHTML = 'M'
							cellPriceIdr.innerHTML = basePrice * parseInt($('#kurs_input').val())
							cellPriceIdrTotal.innerHTML = totalPriceIdr
							cellPriceUsdTotal.innerHTML = totalPriceUsd
							
							row.appendChild(cellId)
							row.appendChild(cellItem)
							row.appendChild(cellRemarks)
							row.appendChild(cellQty)
							row.appendChild(cellSatuan)
							row.appendChild(cellPriceIdr)
							row.appendChild(cellPriceIdrTotal)
							row.appendChild(cellPriceUsdTotal)

							reformatCurrCell(cellPriceIdr, "IDR");
							reformatCurrCell(cellPriceIdrTotal, "IDR");
							reformatCurrCell(cellPriceUsdTotal, "USD");
				
							calculationTbody.appendChild(row);

							taxTotal(calculationTbody, 'Total', totalPriceIdr);
							taxTotal(calculationTbody, 'K&R (8%)', totalPriceIdr);
							taxTotal(calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
							taxTotal(calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
							taxTotal(calculationTbody, 'Grand Total (IDR)', totalPriceIdr);
							taxTotal(calculationTbody, 'Grand Total (USD)', totalPriceIdr);

						} else {
							isItValid = false;
						}
					} else {
						isItValid = false;
					}
				} else {
					isItValid = false;
				}
				break;
			case 'Storage Tank': 
				if ($('#tangkistoragetank_input').val()) {
					if ($('#kurs_input').val()) {
						var jenisTank = $('#jenisstoragetank_input').val()
						isItValid = true;
						tableTitleh4 = facilityInput + ' - ' + jenisTank + ' - ' + $('#tangkistoragetank_input').val() + ' KL'
						
						var calculationTbody = document.getElementById('calculation_tbody');
						var row = document.createElement('tr');
						var cellId = document.createElement('td');
						var cellItem = document.createElement('td');
						var cellRemarks = document.createElement('td');
						var cellQty = document.createElement('td');
						var cellSatuan = document.createElement('td');
						var cellPriceIdr = document.createElement('td');
						var cellPriceIdrTotal = document.createElement('td');
						var cellPriceUsdTotal = document.createElement('td');

						var basePrice = 0;

						if (jenisPipeline == 'Avtur Include Floating Suction, Foundation') {
							basePrice = 326
						} else {
							basePrice = 246
						}

						var totalPriceIdr = parseInt($('#tangkistoragetank_input').val()) * basePrice * parseInt($('#kurs_input').val())
						var totalPriceUsd = parseInt($('#tangkistoragetank_input').val()) * basePrice
			
						cellId.innerHTML = '1';
						cellItem.innerHTML = facilityInput;
						cellRemarks.innerHTML = jenisTank;
						cellQty.innerHTML = $('#tangkistoragetank_input').val()
						cellSatuan.innerHTML = 'KL'
						cellPriceIdr.innerHTML = basePrice * parseInt($('#kurs_input').val())
						cellPriceIdrTotal.innerHTML = totalPriceIdr
						cellPriceUsdTotal.innerHTML = totalPriceUsd
			
						row.appendChild(cellId)
						row.appendChild(cellItem)
						row.appendChild(cellRemarks)
						row.appendChild(cellQty)
						row.appendChild(cellSatuan)
						row.appendChild(cellPriceIdr)
						row.appendChild(cellPriceIdrTotal)
						row.appendChild(cellPriceUsdTotal)

						reformatCurrCell(cellPriceIdr, "IDR");
						reformatCurrCell(cellPriceIdrTotal, "IDR");
						reformatCurrCell(cellPriceUsdTotal, "USD");
			
						calculationTbody.appendChild(row);

						taxTotal(calculationTbody, 'Total', totalPriceIdr);
						taxTotal(calculationTbody, 'K&R (8%)', totalPriceIdr);
						taxTotal(calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
						taxTotal(calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
						taxTotal(calculationTbody, 'Grand Total (IDR)', totalPriceIdr);
						taxTotal(calculationTbody, 'Grand Total (USD)', totalPriceIdr);
					} else {
						isItValid = false;
					}
				} else {
					isItValid = false;
				}
				break;
			case 'Jetty': 
				if ($('#kurs_input').val()) {
					isItValid = true;
					var jenisItem = $('#jetty_input').val();
					tableTitleh4 = facilityInput + ' - ' + jenisItem
					var calculationTbody = document.getElementById('calculation_tbody');
					var row = document.createElement('tr');
					var cellId = document.createElement('td');
					var cellItem = document.createElement('td');
					var cellRemarks = document.createElement('td');
					var cellQty = document.createElement('td');
					var cellSatuan = document.createElement('td');
					var cellPriceIdr = document.createElement('td');
					var cellPriceIdrTotal = document.createElement('td');
					var cellPriceUsdTotal = document.createElement('td');

					var basePrice = 0;
					switch (jenisItem) {
						case 'Type LR & MR (50.000 DWT-100.000 DWT)': 
							basePrice = 8760575.32; 
							break;
						case 'Type MR & GP (17.500 DWT-50.000 DWT)':
							basePrice = 4781303.6; 
							break;
						case 'Type Small 2 (6.500 DWT)':
							basePrice = 3082147.651; 
							break;
						case 'Type Small 1 (3.500 DWT)':
							basePrice = 1778523.49; 
							break;
						case 'Type Lighter (1.500 DWT)':
							basePrice = 654885; 
							break;
					}
				
					var totalPriceIdr = basePrice * parseInt($('#kurs_input').val())
					var totalPriceUsd = basePrice
		
					cellId.innerHTML = '1';
					cellItem.innerHTML = facilityInput;
					cellRemarks.innerHTML = jenisItem;
					cellQty.innerHTML = 1
					cellSatuan.innerHTML = ''
					cellPriceIdr.innerHTML = basePrice * parseInt($('#kurs_input').val())
					cellPriceIdrTotal.innerHTML = totalPriceIdr
					cellPriceUsdTotal.innerHTML = totalPriceUsd
		
					row.appendChild(cellId)
					row.appendChild(cellItem)
					row.appendChild(cellRemarks)
					row.appendChild(cellQty)
					row.appendChild(cellSatuan)
					row.appendChild(cellPriceIdr)
					row.appendChild(cellPriceIdrTotal)
					row.appendChild(cellPriceUsdTotal)
					
					reformatCurrCell(cellPriceIdr, "IDR");
					reformatCurrCell(cellPriceIdrTotal, "IDR");
					reformatCurrCell(cellPriceUsdTotal, "USD");
		
					calculationTbody.appendChild(row);

					taxTotal(calculationTbody, 'Total', totalPriceIdr);
					// taxTotal(calculationTbody, 'K&R (8%)', totalPriceIdr);
					// taxTotal(calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
					// taxTotal(calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
					taxTotal(calculationTbody, 'Grand Total (IDR)', totalPriceIdr);
					taxTotal(calculationTbody, 'Grand Total (USD)', totalPriceIdr);
				} else {
					isItValid = false;
				}
				break;
			case 'Jetty4':
				if ($('#kurs_input').val()) {
					if ($('#catwalk_input').val()) {
						tableTitleh4 = facilityInput + ' - ' + $('#jettyhead_input').val() + ' - ' + $('#mooringdolphin_input').val() + ' - ' + $('#breastingdolphin_input').val() + ' - ' + $('#trestletype_input').val();
						isItValid = true;
						var jettyHeadInput = $('#jettyhead_input').val()
						var jettyMooringInput = $('#mooringdolphin_input').val()
						var jettyBreastingInput = $('#breastingdolphin_input').val()
						var jettyTrestleInput = $('#trestletype_input').val()
						var jettyCatwalkInput = $('#catwalk_input').val()

						var jettyParam = {
							'head': jettyHeadInput,
							'mooring': jettyMooringInput,
							'breasting': jettyBreastingInput,
							'trestle': jettyTrestleInput,
							'catwalk': jettyCatwalkInput,
							'kurs': $('#kurs_input').val()
						}

						console.log(jettyParam)

						$.ajax({
							url: '/api/v1/jetty_4/calculate',
							contentType: "application/json",
							dataType: 'json',
							method: 'post',
							data: JSON.stringify(jettyParam),
							success: function(jetty4Result) {
								generateCalculationTable(jetty4Result)
							}

						})
					}
				}
				break;
		}
	}

	if (isItValid) {
		$("#table_title").html(tableTitle);
		$("#table_title_h4").html(tableTitleh4);
		$('#warning-alert').hide();
		$('#table_section').show();
	} else {
		$('#warning-alert').show();
	}
}

function generateCalculationTable (itemResult) {
	var calculationTbody = document.getElementById('calculation_tbody');

	var totalPriceIdr = 0;
	itemResult.forEach((itemCalc, index) => {
		var row = document.createElement('tr');
		var cellId = document.createElement('td');
		var cellItem = document.createElement('td');
		var cellRemarks = document.createElement('td');
		var cellQty = document.createElement('td');
		var cellSatuan = document.createElement('td');
		var cellPriceIdr = document.createElement('td');
		var cellPriceIdrTotal = document.createElement('td');
		var cellPriceUsdTotal = document.createElement('td');

		totalPriceIdr = parseInt(parseFloat(itemCalc.price_idr).toFixed(0)) * parseInt(itemCalc.qty) + totalPriceIdr;

		cellId.innerHTML = itemCalc.position;
		cellItem.innerHTML = itemCalc.name;
		cellRemarks.innerHTML = itemCalc.remarks;
		cellQty.innerHTML = itemCalc.qty;
		cellSatuan.innerHTML = itemCalc.satuan;
		cellPriceIdr.innerHTML = parseFloat(itemCalc.price_idr).toFixed(0);
		cellPriceIdrTotal.innerHTML = parseInt(parseFloat(itemCalc.price_idr).toFixed(0)) * parseInt(itemCalc.qty);
		cellPriceUsdTotal.innerHTML = parseInt(parseFloat(itemCalc.price_idr).toFixed(0)) / parseInt($('#kurs_input').val());

		row.appendChild(cellId)
		row.appendChild(cellItem)
		row.appendChild(cellRemarks)
		row.appendChild(cellQty)
		row.appendChild(cellSatuan)
		row.appendChild(cellPriceIdr)
		row.appendChild(cellPriceIdrTotal)
		row.appendChild(cellPriceUsdTotal)

		
		reformatCurrCell(cellPriceIdr, "IDR");
		reformatCurrCell(cellPriceIdrTotal, "IDR");
		reformatCurrCell(cellPriceUsdTotal, "USD");

		calculationTbody.appendChild(row);
	});
	
	taxTotal(calculationTbody, 'Total', parseFloat(totalPriceIdr).toFixed(0));
	taxTotal(calculationTbody, 'K&R (8%)', parseFloat(totalPriceIdr).toFixed(0));
	taxTotal(calculationTbody, 'Contingency <input type="number" id="contingencyInput" onchange="contingencyChange(this, ' + parseFloat(totalPriceIdr).toFixed(0) + ')") /> %', parseFloat(totalPriceIdr).toFixed(0));
	taxTotal(calculationTbody, 'Management Reserve <input type="number" id="mgmInput" onchange="mgmChange(this, ' + parseFloat(totalPriceIdr).toFixed(0) + ')") /> %', parseFloat(totalPriceIdr).toFixed(0));
	taxTotal(calculationTbody, 'Grand Total (IDR)', parseFloat(totalPriceIdr).toFixed(0));
	taxTotal(calculationTbody, 'Grand Total (USD)', parseFloat(totalPriceIdr).toFixed(0));
}

function taxTotal (calculationTbody, labelHtml, priceIdr) {
	var row = document.createElement('tr');
	var cellLabel = document.createElement('td');
	var cellTaxIdr = document.createElement('td');
	var cellTaxUsd = document.createElement('td');
	cellLabel.colSpan = 6;
	cellLabel.style.textAlign = 'right';

	cellLabel.innerHTML = labelHtml;

	// console.log(labelHtml)
	if (labelHtml == 'Total') {
		cellTaxIdr.innerHTML = priceIdr;
		cellTaxUsd.innerHTML = '';
		reformatCurrCell(cellTaxIdr, 'IDR');
	} else if (labelHtml == 'K&R (8%)') {
		cellTaxIdr.innerHTML = priceIdr * 0.08;
		krFinal = priceIdr * 0.08;
		cellTaxUsd.innerHTML = '';
		reformatCurrCell(cellTaxIdr, 'IDR');
	} else if (labelHtml.includes('Contingency')) {
		cellTaxIdr.innerHTML = 0;
		cellTaxIdr.id = 'calculateContingen'
		cellTaxUsd.innerHTML = 'Mengakomodasi variasi harga';
		reformatCurrCell(cellTaxIdr, 'IDR');
	} else if (labelHtml == 'Grand Total (IDR)'){
		cellTaxIdr.innerHTML = parseFloat(priceIdr) + parseFloat(contingencyFinal) + parseFloat(mgmRsvFinal) + krFinal;
		cellTaxUsd.innerHTML = '';
		cellTaxIdr.id = 'grandTotalIdr';
		reformatCurrCell(cellTaxIdr, 'IDR');
	} else if (labelHtml == 'Grand Total (USD)') {
		cellTaxIdr.innerHTML = (parseFloat(priceIdr) + parseFloat(contingencyFinal) + parseFloat(mgmRsvFinal) + krFinal)/parseFloat(kursFinal);
		cellTaxUsd.innerHTML = '';
		cellTaxIdr.id = 'grandTotalUsd';
		reformatCurrCell(cellTaxIdr, 'USD');
	} else {
		cellTaxIdr.innerHTML = 0;
		cellTaxIdr.id = 'calculateMgm'
		cellTaxUsd.innerHTML = 'Mengakomodasi ketidakpastian TOR.<br>Ditentukan oleh user:<br>- Tingkat kepastian TOR Tinggi (0%)<br>- Tingkat kepastian TOR Sedang - Rendah (5% s/d 15%)';
		reformatCurrCell(cellTaxIdr, 'IDR');
	}


	row.appendChild(cellLabel);
	row.appendChild(cellTaxIdr);
	row.appendChild(cellTaxUsd);

	calculationTbody.appendChild(row);
}

function contingencyChange (input, priceIdr) {
	contingencyFinal = priceIdr * ($(input).val()/100)
	$('#calculateContingen').html(contingencyFinal);
	reformatCurrCell("#calculateContingen", 'IDR');
	calculateFinal(priceIdr);
}

function mgmChange (input, priceIdr) {
	mgmRsvFinal = priceIdr * ($(input).val()/100)
	$('#calculateMgm').html(mgmRsvFinal);
	reformatCurrCell("#calculateMgm", 'IDR');
	calculateFinal(priceIdr);
}

function calculateFinal (priceIdr) {
	$('#grandTotalIdr').html(priceIdr + contingencyFinal + mgmRsvFinal + krFinal)
	$('#grandTotalUsd').html((priceIdr + contingencyFinal + mgmRsvFinal + krFinal)/kursFinal)
	reformatCurrCell();
}

function reformatCurrCell (cellToFormat, curr) {
	// console.log($(cellToFormat).html())
	$(cellToFormat).css('text-align', 'right');
	if (!cellToFormat) {
		$("#grandTotalIdr").html(parseFloat($("#grandTotalIdr").html()).toLocaleString('en-US', {style: 'currency', currency: 'IDR'})); 
		$("#grandTotalUsd").html(parseFloat($("#grandTotalUsd").html()).toLocaleString('en-US', {style: 'currency', currency: 'USD'})); 
	} else {
		$(cellToFormat).html(parseFloat($(cellToFormat).html()).toLocaleString('en-US', {style: 'currency', currency: curr})); 
	}
}

function dismissAlert () {
	$('#warning-alert').hide();
}

function addMoreTanki () {
	$( "#tanki_dynamic" ).clone().appendTo( "#tanki_dynamic_list" );
}

function addMoreTrestle () {
	$( "#trestle_dynamic" ).clone().appendTo( "#trestle_dynamic_list" );
}

function addMoreTankiDppu () {
	$( "#tankidppu_dynamic" ).clone().appendTo( "#tankidppu_dynamic_list" );
}
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
	html2canvas(document.getElementById('unseen'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download(classEstimate + ' - ' + facilityInput + ".pdf");
        }
    });
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
			break;
		case 'Depot LPG Pressurized': 
			hideTerminalBbm();
			$('#depotlpg_container').show();
			hideDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			break;
		case 'DPPU': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			showDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			break;
		case 'Pipeline': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			showPipeline();
			hideStorageTank();
			$('#jetty_container').hide();
			break;
		case 'Storage Tank': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			hidePipeline();
			showStorageTank();
			$('#jetty_container').hide();
			break;
		case 'Jetty': 
			hideTerminalBbm();
			$('#depotlpg_container').hide();
			hideDppu();
			hidePipeline();
			hideStorageTank();
			$('#jetty_container').show();
			break;
	}
	$('#kurs_container').show();
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
							tableTitleh4 = facilityInput + ' - ' + $('#tangkibbm_cap').val() + ' KL - ' + $('#dermaga_input').val() + ' - ' + $('#trestle_input').val() + ' M'
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
						url: "/api/v1/depot/" + $('#lpg_cap').val(),
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
							
							taxTotal(row, calculationTbody, 'Total', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(row, calculationTbody, 'K&R (8%)', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(row, calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + parseFloat(totalPriceIdr).toFixed(0) + ')") /> %', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(row, calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + parseFloat(totalPriceIdr).toFixed(0) + ')") /> %', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(row, calculationTbody, 'Grand Total (IDR)', parseFloat(totalPriceIdr).toFixed(0));
							taxTotal(row, calculationTbody, 'Grand Total (USD)', parseFloat(totalPriceIdr).toFixed(0));
				
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
						tableTitleh4 = facilityInput + ' - ' + $('#kelas_dppu').val() + ' - ' + $('#tangkidppu_input').val() + ' KL'
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

							taxTotal(row, calculationTbody, 'Total', totalPriceIdr);
							taxTotal(row, calculationTbody, 'K&R (8%)', totalPriceIdr);
							taxTotal(row, calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
							taxTotal(row, calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
							taxTotal(row, calculationTbody, 'Grand Total (IDR)', totalPriceIdr);
							taxTotal(row, calculationTbody, 'Grand Total (USD)', totalPriceIdr);

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

						taxTotal(row, calculationTbody, 'Total', totalPriceIdr);
						taxTotal(row, calculationTbody, 'K&R (8%)', totalPriceIdr);
						taxTotal(row, calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
						taxTotal(row, calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
						taxTotal(row, calculationTbody, 'Grand Total (IDR)', totalPriceIdr);
						taxTotal(row, calculationTbody, 'Grand Total (USD)', totalPriceIdr);
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

					taxTotal(row, calculationTbody, 'Total', totalPriceIdr);
					// taxTotal(row, calculationTbody, 'K&R (8%)', totalPriceIdr);
					// taxTotal(row, calculationTbody, 'Contingency <input type="number" onchange="contingencyChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
					// taxTotal(row, calculationTbody, 'Management Reserve <input type="number" onchange="mgmChange(this, ' + totalPriceIdr + ')") /> %', totalPriceIdr);
					taxTotal(row, calculationTbody, 'Grand Total (IDR)', totalPriceIdr);
					taxTotal(row, calculationTbody, 'Grand Total (USD)', totalPriceIdr);
				} else {
					isItValid = false;
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

function taxTotal (row, calculationTbody, labelHtml, priceIdr) {
	row = document.createElement('tr');
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
		console.log(priceIdr)
		console.log(contingencyFinal)
		console.log(mgmRsvFinal)
		console.log(krFinal)
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
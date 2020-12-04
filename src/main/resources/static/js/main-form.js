resetForm();

var classEstimate = '';
var facilityInput = '';

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
	html2canvas(document.getElementById('calc-table'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("Table.pdf");
        }
    });
}

function changeEstimate (select) {
	var estimateValue = $(select).val();
	resetFormContainer();
	classEstimate = estimateValue;
	if (estimateValue == 'Class 4 Estimate') {
		$('#facility_input').empty()
		$('#facility_input').append(new Option('Pilih Fasilitas', 'Pilih Fasilitas'))
		$('#facility_input').append(new Option('Terminal BBM', 'Terminal BBM'))
		$('#facility_input').append(new Option('Depot LPG Pressurized', 'Depot LPG Pressurized'))
		$('#facility_input').append(new Option('DPPU', 'DPPU'))
	} else if (estimateValue == 'Class 5 Estimate') {
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
							tableTitleh4 = facilityInput + ' - ' + $('#jenispipeline_input').val() + ' - ' + $('#panjangpipeline_input').val() + ' M - ' + $('#diameterpipeline_input').val() + ' Inch'
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
						isItValid = true;
						tableTitleh4 = facilityInput + ' - ' + $('#jenisstoragetank_input').val() + ' - ' + $('#tangkistoragetank_input').val() + ' KL'
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
					tableTitleh4 = facilityInput + ' - ' + $('#jetty_input').val()
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

function dismissAlert () {
	$('#warning-alert').hide();
}
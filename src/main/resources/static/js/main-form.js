resetForm();

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
	if (estimateValue == 'Class 4 Estimate') {
		console.log('Class 4')
		$('#facility_input').empty()
		$('#facility_input').append(new Option('Pilih Fasilitas', 'Pilih Fasilitas'))
		$('#facility_input').append(new Option('Terminal BBM', 'Terminal BBM'))
		$('#facility_input').append(new Option('Depot LPG Pressurized', 'Depot LPG Pressurized'))
		$('#facility_input').append(new Option('DPPU', 'DPPU'))
		// $('#facility_input').append(new Option('Pipeline', 'Pipeline'))
	} else if (estimateValue == 'Class 5 Estimate') {
		console.log('Class 5')
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
	$('#table_section').show();
	return false;
}
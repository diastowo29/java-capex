resetForm();

function resetForm () {
	$('#facility_container').hide();
	$('#tangki_container').hide();
	$('#dermaga_container').hide();
	$('#trestle_container').hide();
	$('#kurs_container').hide();
	$('#table_section').hide();
	$('#metodology_label').hide();
	$('#accuracy_label').hide();
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
	$('#metodology_label').show();
	$('#accuracy_label').show();
	$('#facility_container').show();
}

function changeFacility () {
	$('#tangki_container').show();
	$('#dermaga_container').show();
	$('#trestle_container').show();
	$('#kurs_container').show();
}

function doReset () {
	resetForm();
	return false;
}

function doCalculate () {
	$('#table_section').show();
	return false;
}
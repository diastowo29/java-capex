/**
 * 
 */

function editThisStank (id) {
	$('#kapasitas-input').val($('#kapasitas_' + id).text())
	$('#diameter-input').val($('#diameter_' + id).text())
	$('#tinggi-input').val($('#tinggi_' + id).text())
	$('#luas-input').val($('#luas_' + id).text())
	$('#harga-input').val((parseFloat($('#harga_' + id).text())).toFixed(5))
	
    $('#update-stank-button').attr('onclick','updateStank(' + id + ')');
}

function updateStank (id) {
	var stankParam = {
		'id': id,
		'kapasitas': $('#kapasitas-input').val(),
		'diameter': $('#diameter-input').val(),
		'tinggi': $('#tinggi-input').val(),
		'luas': $('#luas-input').val(),
		'harga': $('#harga-input').val()
	}
	$.ajax({
		url: '/api/v1/storage_tank/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(stankParam),
		success: function(stankResult) {
			location.reload();
		}
	})
}
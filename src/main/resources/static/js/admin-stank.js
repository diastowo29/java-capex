$('#create-panel').hide()

function editThisStank (id) {
	$('#kapasitas-input').val($('#kapasitas_' + id).text())
	$('#diameter-input').val($('#diameter_' + id).text())
	$('#tinggi-input').val($('#tinggi_' + id).text())
	$('#luas-input').val($('#luas_' + id).text())
	$('#harga-input').val((parseFloat($('#harga_' + id).text())).toFixed(5))
	
    $('#update-stank-button').attr('onclick','updateStank(' + id + ')');
}

function editThisStankAvtur (id) {
	$('#kapasitas-input').val($('#kapasitas_' + id).text())
	$('#diameter-input').val($('#diameter_' + id).text())
	$('#tinggi-input').val($('#tinggi_' + id).text())
	$('#luas-input').val($('#luas_' + id).text())
	$('#harga-input').val((parseFloat($('#harga_' + id).text())).toFixed(5))
	$('#harga-internal-coating-input').val((parseFloat($('#harga_internal_coating_' + id).text())).toFixed(5))
	$('#harga-floating-suction-input').val((parseFloat($('#harga_floating_' + id).text())).toFixed(5))
	
    $('#update-stank-button').attr('onclick','updateStankAvtur(' + id + ')');
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
		success: function(_stankResult) {
			location.reload();
		}
	})
}

function updateStankAvtur (id) {
	var stankAvturParam = {
		'id': id,
		'kapasitas': $('#kapasitas-input').val(),
		'diameter': $('#diameter-input').val(),
		'tinggi': $('#tinggi-input').val(),
		'luas': $('#luas-input').val(),
		'harga': $('#harga-input').val(),
		'hargaInternalCoating': $('#harga-internal-coating-input').val(),
		'hargaFloatingSuction': $('#harga-floating-suction-input').val()
	}
	$.ajax({
		url: '/api/v1/storage_tank_avtur/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(stankAvturParam),
		success: function(_stankAvturResult) {
			location.reload();
		}
	})
}

function editThisJetty (id) {
	var price = $('#price_' + id).text();
	if (price != '') {
		price = (parseFloat($('#price_' + id).text())).toFixed(5)
	}
	$('#name-input').val($('#name_' + id).text())
	$('#harga-input').val(price)
	$('#formula-harga-input').val($('#price_formula_' + id).text())
	$('#remarks-input').val($('#remarks_' + id).text())
	$('#satuan-input').val($('#satuan_' + id).text())
	$('#formula-harga-tbbm-input').val($('#price_tbbm_formula_' + id).text())
	
    $('#update-jetty-button').attr('onclick','updateJetty(' + id + ')');
}

function updateJetty (id) {
	var jettyParam = {
		'id': id,
		'name': $('#name-input').val(),
		'price_idr': $('#harga-input').val(),
		'price_formula': $('#formula-harga-input').val(),
		'remarks': $('#remarks-input').val(),
		'satuan': $('#satuan-input').val(),
		'price_tbbm_formula': $('#formula-harga-tbbm-input').val()
	}
	$.ajax({
		url: '/api/v1/jetty/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(jettyParam),
		success: function(_jettyResult) {
			location.reload();
		}
	})
}

function editThisDepot (id) {
	var price = $('#price_idr_' + id).text();
	if (price != '') {
		price = (parseFloat($('#price_idr_' + id).text())).toFixed(5)
	}
	$('#name-input').val($('#name_' + id).text())
	$('#cap-input').val($('#cap_' + id).text())
	$('#harga-input').val(price)
	$('#formula-harga-input').val($('#price_formula_' + id).text())
	$('#remarks-input').val($('#remarks_' + id).text())
	$('#satuan-input').val($('#satuan_' + id).text())
	$('#qty-input').val($('#qty_' + id).text())
	
    $('#update-depot-button').attr('onclick','updateDepot(' + id + ')');
}

function updateDepot (id) {
	var depotParam = {
		'id': id,
		'name': $('#name-input').val(),
		'price_idr': $('#harga-input').val(),
		'price_formula': $('#formula-harga-input').val(),
		'remarks': $('#remarks-input').val(),
		'satuan': $('#satuan-input').val(),
		'qty': $('#qty-input').val(),
	}
	$.ajax({
		url: '/api/v2/depot/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(depotParam),
		success: function(_depotResult) {
			location.reload();
		}
	})
}

function editThisTbbm (id) {
	var price = $('#price_idr_' + id).text();
	if (price != '') {
		price = (parseFloat($('#price_idr_' + id).text())).toFixed(5)
	}
	$('#name-input').val($('#name_' + id).text())
	$('#cap-input').val($('#cap_' + id).text())
	$('#harga-input').val(price)
	$('#formula-harga-input').val($('#price_formula_' + id).text())
	$('#remarks-input').val($('#remarks_' + id).text())
	$('#satuan-input').val($('#satuan_' + id).text())
	$('#qty-input').val($('#qty_' + id).text())
	
    $('#update-depot-button').attr('onclick','udpateTbbm(' + id + ')');
}

function udpateTbbm (id) {
	var tbbmParam = {
		'id': id,
		'name': $('#name-input').val(),
		'price_idr': $('#harga-input').val(),
		'price_formula': $('#formula-harga-input').val(),
		'remarks': $('#remarks-input').val(),
		'satuan': $('#satuan-input').val(),
		'qty': $('#qty-input').val(),
	}
	$.ajax({
		url: '/api/v1/tbbm/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(tbbmParam),
		success: function(_tbbmResult) {
			location.reload();
		}
	})
}

function editThisInflasi (id) {
	$('#update-panel').show()
	$('#create-panel').hide()
	$('#inflasi-input').val($('#inflasi_' + id).text());
	$('#tahun-input').val($('#tahun_' + id).text());
	
    $('#update-inflasi-button').attr('onclick','updateInflasi(' + id + ')');
}

function updateInflasi (id) {
	var inflasiParam = {
		'id': id,
		'inflasi': $('#inflasi-input').val(),
		'tahun': $('#tahun-input').val()
	}

	$.ajax({
		url: '/api/v1/inflasi/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(inflasiParam),
		success: function(_result) {
			location.reload();
		}
	})
}

function newInflasi () {
	$('#create-panel').show()
	$('#update-panel').hide()
}

function createInflasi () {
	var inflasiParam = {
		'inflasi': $('#new-inflasi-input').val(),
		'tahun': $('#new-tahun-input').val()
	}

	$.ajax({
		url: '/api/v1/inflasi/add',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(inflasiParam),
		success: function(_result) {
			location.reload();
		}
	})
}

function editThisDppu (id) {
	var price = $('#price_idr_' + id).text();
	if (price != '') {
		price = (parseFloat($('#price_idr_' + id).text())).toFixed(5)
	}
	$('#name-input').val($('#name_' + id).text())
	$('#cap-input').val($('#cap_' + id).text())
	$('#harga-input').val(price)
	$('#formula-harga-input').val($('#price_formula_' + id).text())
	$('#formula-pangkat-input').val($('#pangkat_formula_' + id).text())
	$('#remarks-input').val($('#remarks_' + id).text())
	$('#satuan-input').val($('#satuan_' + id).text())
	$('#qty-input').val($('#qty_' + id).text())
	
    $('#update-depot-button').attr('onclick','updateDppu(' + id + ')');
}

function updateDppu (id) {
	var dppuParam = {
		'id': id,
		'name': $('#name-input').val(),
		'price_idr': $('#harga-input').val(),
		'price_formula': $('#formula-harga-input').val(),
		'pangkat_formula': $('#formula-pangkat-input').val(),
		'remarks': $('#remarks-input').val(),
		'satuan': $('#satuan-input').val(),
		'qty': $('#qty-input').val(),
	}
	$.ajax({
		url: '/api/v1/dppu/update',
		contentType: "application/json",
		dataType: 'json',
		method: 'post',
		data: JSON.stringify(dppuParam),
		success: function(result) {
			location.reload();
		}
	})
}
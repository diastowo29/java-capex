package com.example.controller;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.DPPUFormula;
import com.example.model.Inflasi;
import com.example.model.StorageTank;
import com.example.model.StorageTankAvtur;
import com.example.model.TBBMFormula;
import com.example.repository.DPPUFormulaRepository;
import com.example.repository.InflasiRepository;
import com.example.repository.StorageTankAvturRepository;
import com.example.repository.StorageTankRepository;

@RestController
@RequestMapping("/api/v1")
public class RestDPPUFormulaController {

	@Autowired
	DPPUFormulaRepository dppuRepo;

	@Autowired
	InflasiRepository inflasiRepo;

	@Autowired
	StorageTankAvturRepository storageAvturRepo;

	@Autowired
	StorageTankRepository storageTankRepo;

	@GetMapping("/dppu")
	public List<DPPUFormula> getAllDppu() {
		return dppuRepo.findAll();
	}

	@PostMapping("/dppu/add")
	public DPPUFormula createDppu(@Validated @RequestBody DPPUFormula dppu) {
		return dppuRepo.save(dppu);
	}

	@PostMapping("/dppu/update")
	public DPPUFormula updateTank(@RequestBody Map<String, String> param) {
		long id = Long.valueOf(param.get("id"));
		Double price_idr = null;
		String name = param.get("name").toString();
		if (!param.get("price_idr").toString().isEmpty()) {			
			price_idr = Double.valueOf(param.get("price_idr").toString());
		}
		String price_formula = param.get("price_formula").toString();
		String remarks = param.get("remarks").toString();
		String satuan = param.get("satuan").toString();
		long qty = Long.valueOf(param.get("qty").toString());

		DPPUFormula jetty = dppuRepo.findById(id).orElse(new DPPUFormula());
		jetty.setName(name);
		if (!param.get("price_idr").toString().isEmpty()) {			
			jetty.setPrice_idr(price_idr);
		}
		jetty.setPrice_formula(price_formula);
		jetty.setRemarks(remarks);
		jetty.setSatuan(satuan);
		jetty.setQty(qty);
		return dppuRepo.save(jetty);
	}

	@GetMapping("/dppu/{cap}/{kurs}")
	public List<DPPUFormula> findDppubyCap(@PathVariable(value = "cap") Long dppuCap,
			@PathVariable(value = "kurs") Long kurs, @RequestParam(name = "vol") String[] dppuVolume) {
		List<DPPUFormula> newDppus = new ArrayList<>();

		List<DPPUFormula> dppus = dppuRepo.findByCapOrderByPositionAsc(dppuCap);
		List<Inflasi> inflasis = inflasiRepo.findAll();
		List<StorageTankAvtur> storageTankAvturs = storageAvturRepo.findAll();
		List<StorageTank> storageTanks = storageTankRepo.findAll();

		for (DPPUFormula dppu : dppus) {
			if (dppu.getName().equals("Storage Tanks")) {
				if (dppu.getPrice_formula().contains("HARGA_AVTUR_VOL")
						|| dppu.getPrice_formula().contains("HARGA_AVTUR_COATING_VOL")
						|| dppu.getPrice_formula().contains("HARGA_AVTUR_FLOATING_VOL")) {
					for (String vol : dppuVolume) {
						String[] volSplit = vol.split("x");
						if (dppu.getPrice_formula().contains("HARGA_AVTUR_VOL")) {
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_VOL", "HARGA_AVTUR_" + volSplit[0]));
						}
						if (dppu.getPrice_formula().contains("HARGA_AVTUR_COATING_VOL")) {
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_COATING_VOL", "HARGA_AVTUR_COATING_" + volSplit[0]));
						}
						if (dppu.getPrice_formula().contains("HARGA_AVTUR_FLOATING_VOL")) {
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_FLOATING_VOL", "HARGA_AVTUR_FLOATING_" + volSplit[0]));
						}
						DPPUFormula calculatedDppu = formulaMapping(dppu, inflasis, storageTankAvturs, storageTanks, kurs, volSplit[0]);
						calculatedDppu.setName("Storage Tanks " + volSplit[0] + " KL");
						calculatedDppu.setQty(Long.valueOf(volSplit[1]));
						newDppus.add(calculatedDppu);
					}
				} else {
					for (String vol : dppuVolume) {
						String[] volSplit = vol.split("x");
						DPPUFormula calculatedDppu = formulaMapping(dppu, inflasis, storageTankAvturs, storageTanks, kurs, volSplit[0]);
						calculatedDppu.setName("Storage Tanks " + volSplit[0] + " KL");
						calculatedDppu.setQty(Long.valueOf(volSplit[1]));
						newDppus.add(calculatedDppu);
					}
				}
				
			} else {
				newDppus.add(formulaMapping(dppu, inflasis, storageTankAvturs, storageTanks, kurs, "0"));
			}
		}
		return dppus;
	}

	public DPPUFormula formulaMapping(DPPUFormula dppu, List<Inflasi> inflasis,
			List<StorageTankAvtur> storageTankAvturs, List<StorageTank> storageTanks, long kurs, String dppuVolume) {
		DPPUFormula newDppu = new DPPUFormula();
		if (dppu.getPrice_idr() == null) {
			for (Inflasi inflasi : inflasis) {
				if (dppu.getPrice_formula().contains("INFLASI_" + inflasi.getTahun())) {
					dppu.setPrice_formula(dppu.getPrice_formula().replace("INFLASI_" + inflasi.getTahun(),
							String.valueOf(inflasi.getInflasi() / 100)));
				}
			}
			if (dppu.getPrice_formula().contains("POW")) {
				dppu.setPrice_formula(dppu.getPrice_formula().replace("POW",
						String.valueOf(doPowCalculation(dppu.getPangkat_formula(), dppuVolume))));
			}
			
			if (dppu.getCap() == 5) {
				if (dppu.getPrice_formula().contains("HARGA_AVTUR")) {
					for (StorageTankAvtur storageTankAvtur : storageTankAvturs) {
						int avturTankKap = storageTankAvtur.getKapasitas().intValue();
						if (avturTankKap == 500) {
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_" + avturTankKap,
									String.valueOf(storageTankAvtur.getHarga().doubleValue())));
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_COATING_" + avturTankKap,
									String.valueOf(storageTankAvtur.getHargaInternalCoating().doubleValue())));	
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_FLOATING_" + avturTankKap,
									String.valueOf(storageTankAvtur.getHargaFloatingSuction().doubleValue())));	
						}
					}
				}
			} else {
				if (dppu.getPrice_formula().contains("HARGA_AVTUR")) {
					for (StorageTankAvtur storageTankAvtur : storageTankAvturs) {
						int avturTankKap = storageTankAvtur.getKapasitas().intValue();
						
						if (Double.parseDouble(dppuVolume) == avturTankKap) {
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_" + avturTankKap,
									String.valueOf(storageTankAvtur.getHarga().doubleValue())));
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_COATING_" + avturTankKap,
									String.valueOf(storageTankAvtur.getHargaInternalCoating().doubleValue())));	
							dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_AVTUR_FLOATING_" + avturTankKap,
									String.valueOf(storageTankAvtur.getHargaFloatingSuction().doubleValue())));	
						}
					}
				}
			}
			
			if (dppu.getPrice_formula().contains("HARGA_NONAVTUR")) {
				for (StorageTank storageTank : storageTanks) {
					int tankKap = storageTank.getKapasitas().intValue();
					if (dppu.getPrice_formula().contains("HARGA_NONAVTUR_" + tankKap)) {
						dppu.setPrice_formula(dppu.getPrice_formula().replace("HARGA_NONAVTUR_" + tankKap,
								String.valueOf(storageTank.getHarga().doubleValue())));
					}
				}
			}
			if (dppu.getName().contains("Storage Tanks")) {
				System.out.println("before");
				System.out.println(dppu.getPrice_formula());
			}
			dppu.setPrice_idr(doCalculation(dppu.getPrice_formula(), kurs));
//			if (dppu.getName().contains("Storage Tanks")) {
//				System.out.println("after");
//				System.out.println(dppu.getPrice_formula());
//			}
		}
		newDppu = dppu;
		return newDppu;
	}

	public double doPowCalculation(String mathString, String dppuVolume) {
		ScriptEngineManager mgr = new ScriptEngineManager();
		ScriptEngine engine = mgr.getEngineByName("JavaScript");
		String mathReplace = "";

		mathReplace = mathString;
		String math = mathReplace.replaceAll(",", ".");
		String[] mathSplit = math.split(Pattern.quote("^"));

		double newLong = 0;
		try {
			Object result = engine.eval(mathSplit[0].replace("VOLUME", dppuVolume));
			Object powResult = Math.pow(Double.valueOf(result.toString()), Double.valueOf(mathSplit[1]));

			Double powDouble = Double.valueOf(powResult.toString());
			newLong = powDouble;
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			newLong = 0;
			e.printStackTrace();
		}
		return newLong;
	}

	public double doCalculation(String mathString, long kurs) {
		ScriptEngineManager mgr = new ScriptEngineManager();
		ScriptEngine engine = mgr.getEngineByName("JavaScript");
		String mathReplace = "";
		DecimalFormat df = new DecimalFormat("###.#####");
		if (mathString.contains("KURS")) {
			mathReplace = mathString.replace("KURS", String.valueOf(kurs)).replace(",", ".");
		} else {
			mathReplace = mathString;
		}
		String math = mathReplace.replaceAll(",", ".");
		double newLong = 0;
		try {
			Object result = engine.eval(math);
			BigDecimal bd = new BigDecimal(result.toString());
			newLong = Double.valueOf(result.toString());
		} catch (ScriptException e) {
			// TODO Auto-generated catch block
			newLong = 0;
			e.printStackTrace();
		}
		return newLong;
	}
}

package com.example.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.DepotLpg;
import com.example.repository.DepotLpgRepository;

@RestController
@RequestMapping("/api/v1")
public class MyRestController {
	public static final String HTML = "<h1>Hello</h1>"
			+ "<p>This was created using iText</p>"
			+ "<a href='hmkcode.com'>hmkcode.com</a>";
	@Autowired
	private DepotLpgRepository depotRepository;

	@PostMapping("/depot/add")
	public DepotLpg createDepot(@Validated @RequestBody DepotLpg depot) {
		return depotRepository.save(depot);
	}

	@GetMapping("/depot/{cap}")
	public List<DepotLpg> findDepotbyCap(@PathVariable(value = "cap") Long depotCap) {
		return depotRepository.findByCapOrderByPositionAsc(depotCap);
	}
	
	@GetMapping("/pdf")
	public byte[] serveFile() throws IOException {
	    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//	    HtmlConverter.convertToPdf(HTML, new FileOutputStream("string-to-pdf.pdf"));
//	    DbxEntry.File downloadedFile = client.getFile("/" + filename, null, outputStream);
	    return outputStream.toByteArray();
	} 

//	@GetMapping("/testing")
//	public Map<String, String> testing() {
//		String test = "";
//		ScriptEngineManager mgr = new ScriptEngineManager();
//		ScriptEngine engine = mgr.getEngineByName("JavaScript");
//
//		String foo = "(300/500)";
//		if (foo.contains("^")) {
//			String[] squared = foo.split("^");
//		}
//		try {
//			System.out.println(engine.eval(foo));
//			System.out.println(Math.pow(Double.valueOf(engine.eval(foo).toString()), 0.36));
//			test = String.valueOf(BigDecimal.valueOf(Double.valueOf(engine.eval(foo).toString())));
//		} catch (ScriptException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		HashMap<String, String> map = new HashMap<>();
//		map.put("key", test);
//		return map;
//	}
}

package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jetty_formula")
public class JettyFormula {
	private long id;
	private long position;
	private String name;
	private String remarks;
	private long qty;
	private String satuan;
	private Double price_idr;
	private String price_formula;
	private String price_tbbm_formula;
	private String multi_price;

	public JettyFormula() {

	}

	public JettyFormula(long position, String name, String remarks, long qty, String satuan,
			Double price_idr, String price_formula, String price_tbbm_formula, String multi_price) {
		this.position = position;
		this.name = name;
		this.remarks = remarks;
		this.qty = qty;
		this.satuan = satuan;
		this.price_idr = price_idr;
		this.price_formula = price_formula;
		this.price_tbbm_formula = price_tbbm_formula;
		this.multi_price = multi_price;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "position", nullable = false)
	public long getPosition() {
		return position;
	}

	public void setPosition(long position) {
		this.position = position;
	}

	@Column(name = "name", nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "remarks", nullable = true)
	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@Column(name = "qty", nullable = false)
	public long getQty() {
		return qty;
	}

	public void setQty(long qty) {
		this.qty = qty;
	}

	@Column(name = "satuan", nullable = false)
	public String getSatuan() {
		return satuan;
	}

	public void setSatuan(String satuan) {
		this.satuan = satuan;
	}

	@Column(name = "price_idr", nullable = true)
	public Double getPrice_idr() {
		return price_idr;
	}

	public void setPrice_idr(Double price_idr) {
		this.price_idr = price_idr;
	}

	@Column(name = "price_formula", nullable = true)
	public String getPrice_formula() {
		return price_formula;
	}

	public void setPrice_formula(String price_formula) {
		this.price_formula = price_formula;
	}
	
	@Column(name = "price_tbbm_formula", nullable = true)
	public String getPrice_tbbm_formula() {
		return price_tbbm_formula;
	}
	
	public void setPrice_tbbm_formula(String price_tbbm_formula) {
		this.price_tbbm_formula = price_tbbm_formula;
	}

	@Column(name = "multi_price", nullable = true)
	public String getMulti_price() {
		return multi_price;
	}
	
	public void setMulti_price(String multi_price) {
		this.multi_price = multi_price;
	}
}

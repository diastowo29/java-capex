package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "tbbm_prototype")
public class TerminalBbm {
	private long id;
	private long position;
	private String name;
	private long cap;
	private String remarks;
	private long qty;
	private String satuan;
	private Double price_idr;

	public TerminalBbm() {

	}

	public TerminalBbm(long position, String name, long cap, String remarks, long qty, String satuan, Double price_idr) {
		this.position = position;
		this.name = name;
		this.cap = cap;
		this.remarks = remarks;
		this.qty = qty;
		this.satuan = satuan;
		this.price_idr = price_idr;
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

	@Column(name = "cap", nullable = false)
	public long getCap() {
		return cap;
	}

	public void setCap(long cap) {
		this.cap = cap;
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

	@Column(name = "price_idr")
	public Double getPrice_idr() {
		return price_idr;
	}

	public void setPrice_idr(Double price_idr) {
		this.price_idr = price_idr;
	}
}

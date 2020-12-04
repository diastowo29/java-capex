package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "jetty")
public class Jetty {
	private long id;
	private String name;
	private Double price_idr;
	private Double price_usd;

	public Jetty() {

	}

	public Jetty(String name, Double price_idr, Double price_usd) {
		this.name = name;
		this.price_idr = price_idr;
		this.price_usd = price_usd;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "name", nullable = false)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "price_idr")
	public Double getPrice_idr() {
		return price_idr;
	}

	public void setPrice_idr(Double price_idr) {
		this.price_idr = price_idr;
	}

	@Column(name = "price_usd", nullable = false)
	public Double getPrice_usd() {
		return price_usd;
	}

	public void setPrice_usd(Double price_usd) {
		this.price_usd = price_usd;
	}
}

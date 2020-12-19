package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "inflasi")
public class Inflasi {
	private long id;
	private Double inflasi;
	private int tahun;

	public Inflasi() {

	}

	public Inflasi(Double inflasi, int tahun) {
		this.inflasi = inflasi;
		this.tahun = tahun;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	@Column(name = "inflasi", nullable = false)
	public Double getInflasi() {
		return inflasi;
	}

	public void setInflasi(Double inflasi) {
		this.inflasi = inflasi;
	}

	@Column(name = "tahun", nullable = false)
	public int getTahun() {
		return tahun;
	}

	public void setTahun(int tahun) {
		this.tahun = tahun;
	}
}

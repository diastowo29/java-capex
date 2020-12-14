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
	private long inflasi;
	private int tahun;

	public Inflasi() {

	}

	public Inflasi(long inflasi, int tahun) {
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
	public long getInflasi() {
		return inflasi;
	}

	public void setInflasi(long inflasi) {
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

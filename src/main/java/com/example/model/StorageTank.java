package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "storage_tank")
public class StorageTank {
	private long id;
	private Double kapasitas;
	private Double diameter;
	private Double tinggi;
	private Double luas;
	private Double harga;

	public StorageTank() {
	}

	public StorageTank(Double kapasitas, Double diameter, Double tinggi, Double luas, Double harga) {
		this.kapasitas = kapasitas;
		this.diameter = diameter;
		this.tinggi = tinggi;
		this.luas = luas;
		this.harga = harga;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
        this.id = id;
    }
	
	@Column(name = "kapasitas", nullable = false)
	public Double getKapasitas() {
		return kapasitas;
	}
	
	public void setKapasitas(Double kapasitas) {
		this.kapasitas = kapasitas;
	}
	
	@Column(name="diameter", nullable = false)
	public Double getDiameter() {
		return diameter;
	}
	
	public void setDiameter(Double diameter) {
		this.diameter = diameter;
	}
	
	@Column(name="tinggi", nullable = false)
	public Double getTinggi() {
		return tinggi;
	}
	
	public void setTinggi(Double tinggi) {
		this.tinggi = tinggi;
	}
	
	@Column(name="luas", nullable = false)
	public Double getLuas() {
		return luas;
	}
	
	public void setLuas(Double luas) {
		this.luas = luas;
	}
	
	@Column(name="harga", nullable = false)
	public Double getHarga() {
		return harga;
	}
	
	public void setHarga(Double harga) {
		this.harga = harga;
	}
}

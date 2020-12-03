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
	private long kapasitas;
	private long diameter;
	private long tinggi;
	private long luas;
	private long harga;

	public StorageTank() {

	}

	public StorageTank(long kapasitas, long diameter, long tinggi, long luas, long harga) {
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
	public long getKapasitas() {
		return kapasitas;
	}
	
	public void setKapasitas(long kapasitas) {
		this.kapasitas = kapasitas;
	}
	
	@Column(name="diameter", nullable = false)
	public long getDiameter() {
		return diameter;
	}
	
	public void setDiameter(long diameter) {
		this.diameter = diameter;
	}
	
	@Column(name="tinggi", nullable = false)
	public long getTinggi() {
		return tinggi;
	}
	
	public void setTinggi(long tinggi) {
		this.tinggi = tinggi;
	}
	
	@Column(name="luas", nullable = false)
	public long getLuas() {
		return luas;
	}
	
	public void setLuas(long luas) {
		this.luas = luas;
	}
	
	@Column(name="harga", nullable = false)
	public long getHarga() {
		return harga;
	}
	
	public void setHarga(long harga) {
		this.harga = harga;
	}
}

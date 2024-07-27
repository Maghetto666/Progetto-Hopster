package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "Suppliers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    @Id
    @Column(name = "supplier_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String supplierName;
    private Long partitaIVA;
    private String registeredOffice;
    private String suppliesType;

    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Invoice> invoices;
    @JoinColumn(name = "invoice_id")
    private Invoice invoice;
}
package it.hopster.dbapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;


@Entity(name = "Invoice")
@Table(name = "invoices")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invoice implements Serializable {
    @Id
    @Column(name = "invoice_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long invoiceNumber;
    private Date deliveryDate;
    private String suppliesType;

    @ManyToOne
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
}

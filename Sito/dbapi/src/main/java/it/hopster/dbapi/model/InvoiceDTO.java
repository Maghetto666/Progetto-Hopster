package it.hopster.dbapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDTO implements Serializable {
    private Long invoiceNumber;
    private LocalDate deliveryDate;
    private String suppliesType;
    private Long supplier_id;
}

package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByOrderBySupplier();

    List<Invoice> findByOrderByDeliveryDate();

    List<Invoice> findByOrderBySuppliesType();

    List<Invoice> findByOrderBySupplierDesc();

    List<Invoice> findByOrderByDeliveryDateDesc();

    List<Invoice> findByOrderBySuppliesTypeDesc();
}
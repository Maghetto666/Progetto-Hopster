package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    List<Invoice> findByOrderByInvoiceNumber();

    List<Invoice> findByOrderByDeliveryDate();

    List<Invoice> findByOrderBySuppliesType();

    List<Invoice> findByOrderBySupplier();

    List<Invoice> findByOrderByInvoiceNumberDesc();

    List<Invoice> findByOrderByDeliveryDateDesc();

    List<Invoice> findByOrderBySuppliesTypeDesc();

    List<Invoice> findByOrderBySupplierDesc();

    List<Invoice> findBySupplierId(Long supplier_id);
}
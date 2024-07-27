package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}

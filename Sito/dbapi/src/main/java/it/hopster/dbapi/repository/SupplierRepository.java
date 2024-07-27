package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}

package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Food;
import it.hopster.dbapi.model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    List<Supplier> findByOrderBySupplierName();

    List<Supplier> findByOrderBySuppliesType();

    List<Supplier> findByOrderBySupplierNameDesc();

    List<Supplier> findByOrderBySuppliesTypeDesc();
}

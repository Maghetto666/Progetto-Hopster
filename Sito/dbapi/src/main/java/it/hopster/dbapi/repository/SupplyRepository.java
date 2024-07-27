package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Supply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplyRepository extends JpaRepository<Supply, Long> {
}

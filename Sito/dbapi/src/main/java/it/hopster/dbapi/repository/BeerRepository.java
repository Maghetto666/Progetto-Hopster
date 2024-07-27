package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Beer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BeerRepository extends JpaRepository<Beer, Long> {
}

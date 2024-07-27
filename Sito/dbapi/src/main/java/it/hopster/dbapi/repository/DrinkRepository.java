package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Drink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DrinkRepository extends JpaRepository<Drink, Long> {
}

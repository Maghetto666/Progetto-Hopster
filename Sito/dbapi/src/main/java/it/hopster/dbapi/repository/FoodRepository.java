package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FoodRepository extends JpaRepository<Food, Long> {
}

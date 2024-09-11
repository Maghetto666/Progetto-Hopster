package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {
    List<Food> findByOrderByProduct();

    List<Food> findByOrderByQuantity();

    List<Food> findByOrderByDeliveryDate();

    List<Food> findByOrderByExpirationDate();

    List<Food> findByOrderByFreezingDate();

    List<Food> findByOrderByProductDesc();

    List<Food> findByOrderByQuantityDesc();

    List<Food> findByOrderByDeliveryDateDesc();

    List<Food> findByOrderByExpirationDateDesc();

    List<Food> findByOrderByFreezingDateDesc();
}

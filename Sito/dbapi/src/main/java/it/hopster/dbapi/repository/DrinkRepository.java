package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Drink;
import it.hopster.dbapi.model.Food;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DrinkRepository extends JpaRepository<Drink, Long> {
    List<Drink> findByOrderByProduct();

    List<Drink> findByOrderByBrand();

    List<Drink> findByOrderByQuantity();

    List<Drink> findByOrderByDeliveryDate();

    List<Drink> findByOrderByExpirationDate();

    List<Drink> findByOrderByProductDesc();

    List<Drink> findByOrderByBrandDesc();

    List<Drink> findByOrderByQuantityDesc();

    List<Drink> findByOrderByDeliveryDateDesc();

    List<Drink> findByOrderByExpirationDateDesc();
}

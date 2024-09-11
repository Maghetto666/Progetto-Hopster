package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Beer;
import it.hopster.dbapi.model.Drink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BeerRepository extends JpaRepository<Beer, Long> {
    List<Beer> findByOrderByBrewery();

    List<Beer> findByOrderByBeerName();

    List<Beer> findByOrderByBeerStyle();

    List<Beer> findByOrderByQuantity();

    List<Beer> findByOrderByBarrelTypeAndTap();

    List<Beer> findByOrderByDeliveryDate();

    List<Beer> findByOrderByBreweryDesc();

    List<Beer> findByOrderByFullBarrelDate();

    List<Beer> findByOrderByEmptyBarrelDate();

    List<Beer> findByOrderByBeerNameDesc();

    List<Beer> findByOrderByBeerStyleDesc();

    List<Beer> findByOrderByQuantityDesc();

    List<Beer> findByOrderByBarrelTypeAndTapDesc();

    List<Beer> findByOrderByDeliveryDateDesc();

    List<Beer> findByOrderByFullBarrelDateDesc();

    List<Beer> findByOrderByEmptyBarrelDateDesc();
}

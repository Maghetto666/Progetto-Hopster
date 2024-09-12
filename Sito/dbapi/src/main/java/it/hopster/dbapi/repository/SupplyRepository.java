package it.hopster.dbapi.repository;

import it.hopster.dbapi.model.Supply;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SupplyRepository extends JpaRepository<Supply, Long> {
    List<Supply> findByOrderByProduct();

    List<Supply> findByOrderByQuantity();

    List<Supply> findByOrderByDeliveryDate();

    List<Supply> findByOrderByExhaustionDate();

    List<Supply> findByOrderByDuration();

    List<Supply> findByOrderByProductDesc();

    List<Supply> findByOrderByQuantityDesc();

    List<Supply> findByOrderByDeliveryDateDesc();

    List<Supply> findByOrderByExhaustionDateDesc();

    List<Supply> findByOrderByDurationDesc();
}

package it.hopster.dbapi.service;

import it.hopster.dbapi.exception.FoodNotFoundException;
import it.hopster.dbapi.model.Supply;
import it.hopster.dbapi.repository.SupplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SupplyService {

    @Autowired
    private SupplyRepository supplyRepository;

    public List<Supply> getAllSupplies(String orderBy, String orderByDesc) {
        if (orderBy == null && orderByDesc == null) {
            return supplyRepository.findAll();
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            return orderBy(orderBy);
        }
        if (orderByDesc != null && !orderByDesc.isEmpty())
            return orderByDesc(orderByDesc);

        return supplyRepository.findAll();
    }

    private List<Supply> orderBy(String orderBy) {
        if (orderBy.equals("product")) {
            return supplyRepository.findByOrderByProduct();
        }
        if (orderBy.equals("quantity")) {
            return supplyRepository.findByOrderByQuantity();
        }
        if (orderBy.equals("deliveryDate")) {
            return supplyRepository.findByOrderByDeliveryDate();
        }
        if (orderBy.equals("exhaustionDate")) {
            return supplyRepository.findByOrderByExhaustionDate();
        }
        if (orderBy.equals("duration")) {
            return supplyRepository.findByOrderByDuration();
        }
        return supplyRepository.findAll();
    }

    private List<Supply> orderByDesc(String orderBy) {
        if (orderBy.equals("product")) {
            return supplyRepository.findByOrderByProductDesc();
        }
        if (orderBy.equals("quantity")) {
            return supplyRepository.findByOrderByQuantityDesc();
        }
        if (orderBy.equals("deliveryDate")) {
            return supplyRepository.findByOrderByDeliveryDateDesc();
        }
        if (orderBy.equals("exhaustionDate")) {
            return supplyRepository.findByOrderByExhaustionDateDesc();
        }
        if (orderBy.equals("duration")) {
            return supplyRepository.findByOrderByDurationDesc();
        }
        return supplyRepository.findAll();
    }

    public Supply getSupplyById(Long id) {
        return supplyRepository.findById(id).orElse(null);
    }

    public Supply createSupply(Supply newSupply) {
        return supplyRepository.save(newSupply);
    }

    public Supply updateSupply(Long id, Supply updatedSupply) {
        Supply supply = supplyRepository.findById(id).orElseThrow(() -> new FoodNotFoundException("Prodotto non trovato"));
        if (!supply.getId().equals(updatedSupply.getId())) {
            throw new FoodNotFoundException("ID prodotti discordanti");
        }
        return supplyRepository.save(updatedSupply);
    }

    public boolean deleteSupply(Long id) {
        Supply supply = supplyRepository.findById(id).orElse(null);
        if (supply != null) {
            supplyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
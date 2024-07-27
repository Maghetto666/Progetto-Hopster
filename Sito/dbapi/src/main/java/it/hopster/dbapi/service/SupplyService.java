package it.hopster.dbapi.service;

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

    public List<Supply> getAllSupplies() {
        return supplyRepository.findAll();
    }

    public Supply getSupplyById(Long id) {
        return supplyRepository.findById(id).orElse(null);
    }

    public Supply createSupply(
            String product, int quantity,
            Date deliveryDate, Date expirationDate
    ) {
        Supply newSupply = new Supply(
                null, product, quantity, deliveryDate, expirationDate
        );
        return supplyRepository.save(newSupply);
    }

    public Supply updateSupply(
            String product, int quantity,
            Date deliveryDate, Date expirationDate
    ) {
        Supply supply = new Supply(
                null, product, quantity, deliveryDate, expirationDate
        );
        return supplyRepository.save(supply);
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
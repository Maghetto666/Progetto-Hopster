package it.hopster.dbapi.service;

import it.hopster.dbapi.exception.FoodNotFoundException;
import it.hopster.dbapi.exception.SupplierNotFoundException;
import it.hopster.dbapi.model.Food;
import it.hopster.dbapi.model.Invoice;
import it.hopster.dbapi.model.Supplier;

import it.hopster.dbapi.repository.SupplierRepository;
import jakarta.persistence.CascadeType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;


@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> getAllSuppliers(String orderBy, String orderByDesc) {
        if (orderBy == null && orderByDesc == null) {
            return supplierRepository.findAll();
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            return orderBy(orderBy);
        }
        if (orderByDesc != null && !orderByDesc.isEmpty())
            return orderByDesc(orderByDesc);

        return supplierRepository.findAll();
    }

    private List<Supplier> orderBy(String orderBy) {
        if (orderBy.equals("supplierName")) {
            return supplierRepository.findByOrderBySupplierName();
        }
        if (orderBy.equals("ivanumber")) {
            return supplierRepository.findByOrderByIVANumber();
        }
        if (orderBy.equals("suppliesType")) {
            return supplierRepository.findByOrderBySuppliesType();
        }
        return supplierRepository.findAll();
    }

    private List<Supplier> orderByDesc(String orderBy) {
        if (orderBy.equals("supplierName")) {
            return supplierRepository.findByOrderBySupplierNameDesc();
        }
        if (orderBy.equals("ivanumber")) {
            return supplierRepository.findByOrderByIVANumberDesc();
        }
        if (orderBy.equals("suppliesType")) {
            return supplierRepository.findByOrderBySuppliesTypeDesc();
        }
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id).orElse(null);
    }

    public Supplier createSupplier(Supplier newSupplier) {
        return supplierRepository.save(newSupplier);
    }

    public Supplier updateSupplier(Long id, Supplier updatedSupplier) {
        Supplier supplier = supplierRepository.findById(id).orElseThrow(() -> new SupplierNotFoundException("Fornitore non trovato"));
        if (!supplier.getId().equals(updatedSupplier.getId()))
            throw new SupplierNotFoundException("ID fornitori discordanti");
        return supplierRepository.save(updatedSupplier);
    }

    public boolean deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id).orElse(null);
        if (supplier != null) {
            supplierRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
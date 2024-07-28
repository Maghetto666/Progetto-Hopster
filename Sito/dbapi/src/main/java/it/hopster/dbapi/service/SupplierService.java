package it.hopster.dbapi.service;

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

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier getSupplierById(Long id) {
        return supplierRepository.findById(id).orElse(null);
    }

    public Supplier createSupplier(
            String supplierName, Long partitaIVA,
            String registeredOffice, String suppliesType,
            List<Invoice> invoices, Invoice invoice
    ) {
        Supplier newSupplier = new Supplier(
                null, supplierName, partitaIVA, registeredOffice, suppliesType, invoices, invoice
        );
        return supplierRepository.save(newSupplier);
    }

    public Supplier updateSupplier(
            String supplierName, Long partitaIVA,
            String registeredOffice, String suppliesType,
            List<Invoice> invoices, Invoice invoice
    ) {
        Supplier supplier = new Supplier(
                null, supplierName, partitaIVA, registeredOffice, suppliesType, invoices, invoice
        );
        return supplierRepository.save(supplier);
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
package it.hopster.dbapi.service;

import it.hopster.dbapi.exception.InvoiceNotFoundException;
import it.hopster.dbapi.exception.SupplierNotFoundException;
import it.hopster.dbapi.mapper.InvoiceMapper;
import it.hopster.dbapi.model.Invoice;
import it.hopster.dbapi.model.InvoiceDTO;
import it.hopster.dbapi.model.Supplier;
import it.hopster.dbapi.repository.InvoiceRepository;
import it.hopster.dbapi.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;
    private SupplierRepository supplierRepository;

    private final InvoiceMapper invoiceMapper =InvoiceMapper.INSTANCE;

    public List<Invoice> getAllInvoices(String orderBy, String orderByDesc) {
        if (orderBy == null && orderByDesc == null) {
            return invoiceRepository.findAll();
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            return orderBy(orderBy);
        }
        if (orderByDesc != null && !orderByDesc.isEmpty())
            return orderByDesc(orderByDesc);

        return invoiceRepository.findAll();
    }

    private List<Invoice> orderBy(String orderBy) {
        if (orderBy.equals("deliveryDate")) {
            return invoiceRepository.findByOrderByDeliveryDate();
        }
        if (orderBy.equals("suppliesType")) {
            return invoiceRepository.findByOrderBySuppliesType();
        }
        if (orderBy.equals("supplier")) {
            return invoiceRepository.findByOrderBySupplier();
        }
        return invoiceRepository.findAll();
    }

    private List<Invoice> orderByDesc(String orderBy) {
        if (orderBy.equals("deliveryDate();")) {
            return invoiceRepository.findByOrderByDeliveryDateDesc();
        }
        if (orderBy.equals("suppliesType")) {
            return invoiceRepository.findByOrderBySuppliesTypeDesc();
        }
        if (orderBy.equals("supplier")) {
            return invoiceRepository.findByOrderBySupplierDesc();
        }
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElse(null);
    }

    public Invoice createInvoice(InvoiceDTO invoiceDTO) {
        supplierRepository.findById(invoiceDTO.getSupplier_id()).orElseThrow(() -> new SupplierNotFoundException("Fornitore non trovato"));
        Invoice newInvoice = invoiceMapper.DTOToEntity(invoiceDTO);
        return invoiceRepository.save(newInvoice);
    }

    public Invoice updateInvoice(Long id, InvoiceDTO invoiceDTO) {
        supplierRepository.findById(id).orElseThrow(() -> new SupplierNotFoundException("Fornitore non trovato"));
        Invoice updatedInvoice = invoiceMapper.DTOToEntity(invoiceDTO);
        updatedInvoice.setId(id);
        return invoiceRepository.save(updatedInvoice);
    }

    public boolean deleteInvoice(Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        if (invoice != null) {
            invoiceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
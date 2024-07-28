package it.hopster.dbapi.service;

import it.hopster.dbapi.model.Invoice;
import it.hopster.dbapi.model.Supplier;
import it.hopster.dbapi.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElse(null);
    }

    public Invoice createInvoice(
            Long invoiceNumber, Date deliveryDate,
            String suppliesType, Supplier supplier
    ) {
        Invoice newInvoice = new Invoice(
                null, invoiceNumber, deliveryDate, suppliesType, supplier
        );
        return invoiceRepository.save(newInvoice);
    }

    public Invoice updateInvoice(
            Long invoiceNumber, Date deliveryDate,
            String suppliesType, Supplier supplier
    ) {
        Invoice invoice = new Invoice(
                null, invoiceNumber, deliveryDate, suppliesType, supplier
        );
        return invoiceRepository.save(invoice);
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
package it.hopster.dbapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.SupplierNotFoundException;
import it.hopster.dbapi.model.Supplier;
import it.hopster.dbapi.service.SupplierService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/suppliers")
@Tag(name = "Gestione fornitori", description = "API di gestione fornitori database Hopster")
public class SupplierController {

    @Autowired
    SupplierService supplierService;

    private static final Logger logger = LoggerFactory.getLogger(SupplierController.class);

    @GetMapping
    @Operation(summary = "Recupera fornitori", description = "Recupera tutti i fornitori sul database")
    @ApiResponse(responseCode = "200", description = "Fornitori recuperati con successo")
    public List<Supplier> getAllSuppliers(@RequestParam(required = false) String orderBy, @RequestParam(required = false) String orderByDesc) {
        return supplierService.getAllSuppliers(orderBy, orderByDesc);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera fornitore per id", description = "Torna il fornitore con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Fornitore trovato"),
            @ApiResponse(responseCode = "404", description = "Fornitore non trovato con quell'id")
    })
    public Supplier getSupplierById(@PathVariable Long id) {
        Supplier supplier = supplierService.getSupplierById(id);
        if (supplier == null) {
            logger.error("Fornitore non trovato con quell'id");
            throw new SupplierNotFoundException("Supplier not found with id: " + id);
        }
        return supplier;
    }

    @PostMapping
    @Operation(summary = "Aggiunge un fornitore", description = "Aggiunge un nuovo fornitore sul database")
    @ApiResponse(responseCode = "200", description = "Fornitore aggiunto con successo")
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) {
        Supplier newSupplier = new Supplier();
        newSupplier.setSupplierName(supplier.getSupplierName());
        newSupplier.setIVANumber(supplier.getIVANumber());
        newSupplier.setRegisteredOffice(supplier.getRegisteredOffice());
        newSupplier.setSuppliesType(supplier.getSuppliesType());
        supplierService.createSupplier(newSupplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(newSupplier);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli fornitore", description = "Modifica i dettagli di un fornitore trovato tramite id")
    @ApiResponse(responseCode = "200", description = "Fornitore modificato con successo")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        Supplier updatedSupplier = supplierService.updateSupplier(id, supplier);
        return ResponseEntity.status(HttpStatus.OK).body(updatedSupplier);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella fornitore", description = "Cancella fornitore dal database")
    @ApiResponse(responseCode = "200", description = "Fornitore cancellato dal database")
    public void deleteSupplier(@PathVariable Long id) {
        boolean deleted = supplierService.deleteSupplier(id);
        if (!deleted) {
            logger.error("Fornitore non trovato con quell'id");
            throw new SupplierNotFoundException("Supplier not found with id: " + id);
        }
    }
}
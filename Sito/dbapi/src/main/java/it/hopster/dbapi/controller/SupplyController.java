package it.hopster.dbapi.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.SupplyNotFoundException;
import it.hopster.dbapi.model.Supply;
import it.hopster.dbapi.service.SupplyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/supplies")
@Tag(name = "Gestione prodotti di pulizia e servizio", description = "API di gestione prodotti di pulizia e servizio database Hopster")
public class SupplyController {

    @Autowired
    SupplyService supplyService;

    private static final Logger logger = LoggerFactory.getLogger(SupplyController.class);

    @GetMapping
    @Operation(summary = "Recupera utenti", description = "Recupera tutti gli utenti sul database")
    @ApiResponse(responseCode = "200", description = "Utenti recuperati con successo")
    public List<Supply> getAllSupplies() {
        return supplyService.getAllSupplies();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera prodotto per id", description = "Torna il prodotto con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Prodotto trovato"),
            @ApiResponse(responseCode = "404", description = "Prodotto non trovato con quell'id")
    })
    public Supply getSupplyById(@PathVariable Long id) {
        Supply supply = supplyService.getSupplyById(id);
        if (supply == null) {
            logger.error("Prodotto non trovato con quell'id");
            throw new SupplyNotFoundException("Supply not found with id: " + id);
        }
        return supply;
    }

    @PostMapping
    @Operation(summary = "Aggiunge un prodotto", description = "Aggiunge un nuovo prodotto sul database")
    @ApiResponse(responseCode = "200", description = "Prodotto aggiunto con successo")
    public ResponseEntity<Supply> createSupply(
            @RequestParam String product, @RequestParam int quantity,
            @RequestParam Date deliveryDate, @RequestParam Date expirationDate
    ) {
        Supply newSupply = supplyService.createSupply(product, quantity, deliveryDate, expirationDate);
        return ResponseEntity.status(HttpStatus.CREATED).body(newSupply);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli prodotto", description = "Modifica i dettagli di un prodotto trovato tramite id")
    @ApiResponse(responseCode = "200", description = "Prodotto modificato con successo")
    public Supply updateSupply(@PathVariable Long id,
                               @RequestParam String product, @RequestParam int quantity,
                               @RequestParam Date deliveryDate, @RequestParam Date expirationDate
    ) {
        Supply updatedSupply = supplyService.updateSupply(product, quantity, deliveryDate, expirationDate);
        if (updatedSupply == null) {
            logger.error("Prodotto non trovato con quell'id");
            throw new SupplyNotFoundException("Supply not found with id: " + id);
        } else {
            return updatedSupply;
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella prodotto", description = "Cancella prodotto dal database")
    @ApiResponse(responseCode = "200", description = "Prodotto cancellato dal database")
    public void deleteSupply(@PathVariable Long id) {
        boolean deleted = supplyService.deleteSupply(id);
        if (!deleted) {
            logger.error("Prodotto non trovato con quell'id");
            throw new SupplyNotFoundException("Supply not found with id: " + id);
        }
    }
}
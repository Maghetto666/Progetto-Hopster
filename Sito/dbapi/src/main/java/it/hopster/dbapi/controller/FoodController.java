package it.hopster.dbapi.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import it.hopster.dbapi.exception.FoodNotFoundException;
import it.hopster.dbapi.model.Food;
import it.hopster.dbapi.service.FoodService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/foods")
@Tag(name = "Gestione alimenti", description = "API di gestione alimenti database Hopster")
public class FoodController {

    @Autowired
    FoodService foodService = new FoodService();

    private static final Logger logger = LoggerFactory.getLogger(FoodController.class);

    @GetMapping
    @Operation(summary = "Recupera alimenti", description = "Recupera tutti gli alimenti sul database")
    @ApiResponse(responseCode = "200", description = "Alimenti recuperati con successo")
    public List<Food> getAllFoods(@RequestParam(required = false) String orderBy, @RequestParam(required = false) String orderByDesc) {
        return foodService.getAllFoods(orderBy, orderByDesc);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Recupera alimento per id", description = "Torna l'alimento con l'id cercato")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Alimento trovato"),
            @ApiResponse(responseCode = "404", description = "Alimento non trovato con quell'id")
    })
    public Food getFoodById(@PathVariable Long id) {
        Food food = foodService.getFoodById(id);
        if (food == null) {
            logger.error("Alimento non trovato con quell'id");
            throw new FoodNotFoundException("Food not found with id: " + id);
        }
        return food;
    }

    @PostMapping
    @Operation(summary = "Aggiunge un alimento", description = "Aggiunge un nuovo alimento sul database")
    @ApiResponse(responseCode = "200", description = "Alimento aggiunto con successo")
    public ResponseEntity<Food> createFood(@RequestBody Food food) {
        Food newFood = new Food();
        newFood.setProduct(food.getProduct());
        newFood.setQuantity(food.getQuantity());
        newFood.setDeliveryDate(food.getDeliveryDate());
        newFood.setExpirationDate(food.getExpirationDate());
        newFood.setIsFrozen(food.getIsFrozen());
        newFood.setFreezingDate(food.getFreezingDate());
        foodService.createFood(newFood);
        return ResponseEntity.status(HttpStatus.CREATED).body(newFood);
    }

    @PutMapping("{id}")
    @Operation(summary = "Modifica dettagli alimento", description = "Modifica i dettagli di un alimento trovato tramite id")
    @ApiResponse(responseCode = "200", description = "Alimento modificato con successo")
    public ResponseEntity<Food> updateFood(@PathVariable Long id, @RequestBody Food food) {
        Food updatedFood = foodService.updateFood(id, food);
        return ResponseEntity.status(HttpStatus.OK).body(updatedFood);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Cancella alimento", description = "Cancella alimento dal database")
    @ApiResponse(responseCode = "200", description = "Alimento cancellato dal database")
    public void deleteFood(@PathVariable Long id) {
        boolean deleted = foodService.deleteFood(id);
        if (!deleted) {
            logger.error("Alimento non trovato con quell'id");
            throw new FoodNotFoundException("Food not found with id: " + id);
        }
    }
}
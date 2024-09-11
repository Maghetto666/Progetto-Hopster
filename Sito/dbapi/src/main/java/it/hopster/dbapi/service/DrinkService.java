package it.hopster.dbapi.service;

import it.hopster.dbapi.exception.FoodNotFoundException;
import it.hopster.dbapi.model.Drink;
import it.hopster.dbapi.model.Food;
import it.hopster.dbapi.repository.DrinkRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class DrinkService {

    @Autowired
    private DrinkRepository drinkRepository;

    public List<Drink> getAllDrinks(String orderBy, String orderByDesc) {
        if (orderBy == null && orderByDesc == null) {
            return drinkRepository.findAll();
        }
        if (orderBy != null && !orderBy.isEmpty()) {
            return orderBy(orderBy);
        }
        if (orderByDesc != null && !orderByDesc.isEmpty())
            return orderByDesc(orderByDesc);

        return drinkRepository.findAll();
    }

    private List<Drink> orderBy(String orderBy) {
        if (orderBy.equals("product")) {
            return drinkRepository.findByOrderByProduct();
        }
        if (orderBy.equals("brand")) {
            return drinkRepository.findByOrderByBrand();
        }
        if (orderBy.equals("quantity")) {
            return drinkRepository.findByOrderByQuantity();
        }
        if (orderBy.equals("deliveryDate")) {
            return drinkRepository.findByOrderByDeliveryDate();
        }
        if (orderBy.equals("expirationDate")) {
            return drinkRepository.findByOrderByExpirationDate();
        }
        return drinkRepository.findAll();
    }

    private List<Drink> orderByDesc(String orderBy) {
        if (orderBy.equals("product")) {
            return drinkRepository.findByOrderByProductDesc();
        }
        if (orderBy.equals("brand")) {
            return drinkRepository.findByOrderByBrandDesc();
        }
        if (orderBy.equals("quantity")) {
            return drinkRepository.findByOrderByQuantityDesc();
        }
        if (orderBy.equals("deliveryDate")) {
            return drinkRepository.findByOrderByDeliveryDateDesc();
        }
        if (orderBy.equals("expirationDate")) {
            return drinkRepository.findByOrderByExpirationDateDesc();
        }
        return drinkRepository.findAll();
    }

    public Drink getDrinkById(Long id) {
        return drinkRepository.findById(id).orElse(null);
    }

    public Drink createDrink(Drink newDrink) {
        return drinkRepository.save(newDrink);
    }

    public Drink updateDrink(Long id, Drink updatedDrink) {
        Drink drink = drinkRepository.findById(id).orElseThrow(() -> new FoodNotFoundException("Bevanda non trovata"));
        if (!drink.getId().equals(updatedDrink.getId())) {
            throw new FoodNotFoundException("ID bevande discordanti");
        }
        return drinkRepository.save(updatedDrink);
    }

    public boolean deleteDrink(Long id) {
        Drink drink = drinkRepository.findById(id).orElse(null);
        if (drink != null) {
            drinkRepository.deleteById(id);
            return true;
        }
        return false;
    }
}